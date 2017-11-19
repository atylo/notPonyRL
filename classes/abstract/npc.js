/**
 * AbstractNPC class
 * Represents an abstract NPC on the map.
 * Every enemy is an instance of such an object, and this is important!
 * 
 * @return
 */

function AbstractNPC()
{
	ExtClass.call(this, {AbstractLivingObject: null});

	this.show        = '@';
	this.color       = 'red';
	
	this.id          = 0;
			
	this._religion   = RELIGION_NONE;
	this.piety       = 0;
		
		// NPC bonuses
	this.gold_mult   = 1;
	this.exp_mult    = 1;
	
	this.draw = function(seen)
	{
		if(seen == SEEN_NO)
			return '';
		
		if(seen == SEEN_FOG)
		{
			if(this.hasAbility(TRAIT_CHAMPION))
				return '<span class="foggy">@</span>';
			else
				return '<span class="foggy">!</span>';
		}
		
		return '<div xyz="' + this.x + ',' + this.y + '" class="npc t" style="color:' + this.color + '">' + this.show + '<div class="' + TConfig.npcLevelClass + '">' + this.level + '</div></div>';
	};
	
	this.getDescription = function()
	{
		if (this.description === undefined)
			return lang('npc.' + this.id + '.description');
		else
			return this.description;
	};
	
	this.getFormattedTitle = function()
	{
		return this.getTitle() + " [" + this.level + "]";
	};
	
	this.getTitle = function()
	{
		return lang('npc.' + this.id + '.title');
	};
	
	this.init = function(level)
	{
		this.level  = level*1.0;
		this.piety  = 0;
		
		this.preInit();
		
				// scaling mobs
		this.exp     = Math.floor(1.9*this.level*this.exp_mult + 0.5);
		this.gp      = Math.floor(this.gold_mult*(1.5*Math.sqrt(this.level + 2)));
		this.att_add = 0;
		
		this.hp = this.getMaxHP();
	};
	
	this.move = function(x, y, msg)
	{
		if(!World.map.isPassable(x, y, this.z))
			return false;
		
		if(msg)
			World.queue.add(msg);
		
		if(World.map.objects[y][x].length > 0)
			for(var z in World.map.objects[y][x])
				if(!World.map.objects[y][x][z].onNPCMove(this))
					return false;
		
		World.map.objects[y][x][this.z]   = this;
		delete World.map.objects[this.y][this.x][this.z];

		World.map.objects[y][x][this.z].x = x;
		World.map.objects[y][x][this.z].y = y;
		World.map.invalidate(x, y);
		
		if(World.map.objects[y][x][this.z].hp < 1)
			World.map.objects[y][x][this.z].onDeath(false);
		
		if(World.map.objects[y][x].length > 0)
			for(var z in World.map.objects[y][x])
				World.map.objects[y][x][z].afterNPCMove(this);
		
		return true;
	}
	
	this.onHover = function()
	{
		return false;
	};
	
	this.onLook = function()
	{
		return false;
	};
	
			// basically we are attacking a mob
	this.onMove = function()
	{
		return false;
	};
	
		// special npc functions
	this.onHit = function()
	{
		var res = new Array();
		var charge = World.player.hasFlag(FLAG_SPECIAL, TRAIT_CHARGE);
		
		if(this.x != World.player.x + World.player.dx || this.y != World.player.y + World.player.dy)
			charge = 0;
		
		res[BATTLE_INFLICTED] = 0;
		res[BATTLE_RECEIVED]  = 0;
		res[BATTLE_MESSAGE]   = [];

			// who strikes first?
				//  > 0 - player
				//  < 0 - monster
		var strike_order = 0;
		
		strike_order += this.hasAbilityLevel(TRAIT_SLOW);
		strike_order += World.player.hasAbilityLevel(TRAIT_FIRST_STRIKE);
		
		strike_order -= World.player.hasAbilityLevel(TRAIT_SLOW);
		strike_order -=	this.hasAbilityLevel(TRAIT_FIRST_STRIKE);
		
		if(charge >= 7)
			strike_order++;
		
		if(World.player._class == CLASS_ROGUE)
		{
			var add_bonus = true;
			for(var dx = -1; dx <= 1; dx++)
				for(var dy = -1; dy <= 1; dy++)
					if(!World.map.hasSeen(this.x + dx, this.y + dy))
						add_bonus = false;
					
			if(add_bonus)
				strike_order++;
		}

		if(strike_order > 0)
			res[BATTLE_MESSAGE].push(lang('battle.firststrike.you'));
		if(strike_order < 0)
			res[BATTLE_MESSAGE].push(lang('battle.firststrike.enemy'));

		var player_attack = World.player.getAttack();
		if(World.player.level < this.level && World.player._class == CLASS_WARRIOR)
			player_attack = Math.floor(player_attack * 1.15);
		if(charge > 0)
			player_attack = Math.floor(player_attack*(1 + 0.05*charge));

			// calculating raw damage
		var is_magical = World.player.hasAbility(TRAIT_MAGICAL_ATTACK);
		if(charge >= 5)
			is_magical = true;
						
		res[BATTLE_RECEIVED]  = World.player.getHit(this.getAttack(), this.hasAbility(TRAIT_MAGICAL_ATTACK));
		res[BATTLE_INFLICTED] = this.getHit(player_attack, is_magical);
		
			// does first strike matters?
		if(strike_order > 0 && res[BATTLE_INFLICTED] >= this.hp && !this.hasEffect(EFFECT_DEATH_WARD))
			res[BATTLE_RECEIVED]  = 0;
		if(strike_order < 0 && res[BATTLE_RECEIVED]  >= World.player.hp && !World.player.hasEffect(EFFECT_DEATH_WARD)) 
			res[BATTLE_INFLICTED] = 0;
		
		if(this.hasEffect(EFFECT_PEACEFUL)) 
			res[BATTLE_RECEIVED] = 0;
		
			// lifelinks
		res[BATTLE_LIFE_PLAYER] = Math.floor(World.player.lifesteal*res[BATTLE_INFLICTED]/20);
		res[BATTLE_LIFE_ENEMY]  = Math.floor(this.lifesteal*res[BATTLE_RECEIVED]/20);
		
		if(this.hasAbility(TRAIT_BLOODLESS))
			res[BATTLE_LIFE_PLAYER] = 0;
		if(World.player.hasAbility(TRAIT_BLOODLESS))
			res[BATTLE_LIFE_ENEMY] = 0;
		
			// we die
		if(res[BATTLE_RECEIVED] - res[BATTLE_LIFE_PLAYER] >= World.player.hp)
		{
			res[BATTLE_RESULT] = lang('battle.outcome.defeat');
			return res;
		}
		
		if(res[BATTLE_RECEIVED] > 0)
		{
			var e = this.attackEffects();
			var str = '';
			for(var i in e)
				str = str + ' &middot; ' + lang('abilities.onhit.' + e[i]);
			
			if(this.hasAbility(TRAIT_WEAKEN))
				str = str + ' &middot; ' + lang('abilities.onhit.' + TRAIT_WEAKEN);

			if(str)
				res[BATTLE_MESSAGE].push(str);
		}

			// NPC is killed
		if(res[BATTLE_INFLICTED] - res[BATTLE_LIFE_ENEMY] >= this.hp)
		{
			res[BATTLE_RESULT] = lang('battle.outcome.victory');
					// level up?
			if(this.exp > World.player.getNecessaryExp() - World.player.exp)
			{
				res[BATTLE_RECEIVED] = 0;
				res[BATTLE_MANA]     = 0;
			}
		}
		
		return res;
	};
	
	this.onDeath = function(is_combat)
	{
		if(is_combat)
			World.queue.add(lang('battle.victory'));

		var exp = this.exp;
		var lv  = this.level;
		
		this.gp = Math.floor(this.gp*World.player.gp_mult);
		
		World.raiseEvent(LOG_KILL, KEY_ENEMY, this.id, this.level, this);		
		
			// for defeating larger monsters you get more exp
		if(this.level > World.player.level)
		{
			exp += (this.level - World.player.level)*(this.level - World.player.level + 1);
			if(World.player._class == CLASS_WARRIOR)
				exp += this.level - World.player.level;
			
			if(World.player.level == 1 && this.level == 2)
				exp -= 2;
		}
		
		if(this.level >= World.player.level + 3 && World.fieldID != FIELD_TUTORIAL)
			World.wrapper.addPossibleAchievement(REWARD_DASH);

		if(!this.hasAbility(TRAIT_NO_EXPERIENCE))
		{
			World.player.receiveExp(exp);
			
			if(World.player._race != RACE_DRAGON)
				World.player.receiveGold(this.gp);
		}
		
		if(this.hasAbility(TRAIT_SPAWNS) && this.level > 1)
		{
			this.init((this.level - 1));
			for(var i in this.abilities)
				if(this.abilities[i] == TRAIT_SPAWNS)
					this.abilities[i] = TRAIT_NO_EXPERIENCE;
		}
		else
			World.map.removeObject(this);
		
		if(World.player._race == RACE_DRAGON)
		{
			var s = new TObjectMoney();
			s.init();
			s.gold = this.gp;
			World.map.addObject(s, this.x, this.y);
		}
		
		
		World.menu.hideEnemy();
		
		if(this.hasAbility(TRAIT_CHAMPION))
		{
			var win = true;
					// checking that no other champions left
			for(var y in World.map.objects)
				for(var x in World.map.objects[y])
					for(var z in World.map.objects[y][x])
						if(World.map.objects[y][x][z].getType() == KEY_ENEMY)
							if(World.map.objects[y][x][z].hasAbility(TRAIT_CHAMPION))
								win = false;
			if(win)
				World.changeGameState(STATE_SPLASH_SCREEN, [ENDING_GOOD,World.getHandler().isValidForAchievements]);	
		}
		
		var done = false;
		
		for(var i in World.shop.items)
			if(World.shop.items[i].id == ITEM_CAULDRON && World.shop.items[i].state == ITEM_STATE_BOUGHT)
				done = true;
		
		if(done)
		{
			var s = new TObjectHerb();
			s.init();
			if(World.map.objects[this.y][this.x][s.z] == undefined)
				World.map.addObject(s, this.x, this.y);
		}
	};
	
	this.onGameOver = function()
	{
		World.queue.add(lang('battle.defeat'));	
		World.raiseEvent(LOG_DEATH, KEY_ENEMY, this.id, this.level, false);
		World.player.die();
	};
	
	this.preInit = function()
	{
		
	};
	
	this.postHit = function()
	{
		return '';
	};
}
