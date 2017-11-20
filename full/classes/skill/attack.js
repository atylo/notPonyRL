function TSkillAttack()
{
	ExtClass.call(this, {AbstractSkill: null});
	
	this.audio = 'audio/skill-hit.mp3';
	this.title = 'Melee attack';
	this.range = 1;
	
	this.getDescription = function()
	{
		var s = World.player.getAttack(true);
		return s[1];
	};	
	
	this.onApply = function(object, object_type)
	{
		if(object_type != KEY_ENEMY)
			return false;
		
		if(object.hasAbility(TRAIT_CHAMPION))// && !World.queue.hasLog(LOG_CONFRONT))
		{
			if(World.fieldID != FIELD_TUTORIAL && World.map.isExplored())
				World.wrapper.addPossibleAchievement(REWARD_SCOUT);
			
			if(!World.events.hasEvent(LOG_CONFRONT))
				World.raiseEvent(LOG_CONFRONT, KEY_ENEMY, object.id, object.level, false);
		}
		
		this.preAttack();
		
		var res              = object.onHit();
		World.menu.need_draw = 1;
		
			// yay combat
		World.player.hp   -= (res[BATTLE_RECEIVED] - res[BATTLE_LIFE_PLAYER]);
		object.hp         -= (res[BATTLE_INFLICTED]  - res[BATTLE_LIFE_ENEMY]);
		
		if(World.player.hp > World.player.getMaxHP())
			World.player.hp = World.player.getMaxHP();
		if(object.hp > object.getMaxHP())
			object.hp = object.getMaxHP();
		
		if(res[BATTLE_RECEIVED]  > 0) 
		{
			var s = World.player.attackEffects();
			if(s.length > 0 && object.hasAbility(TRAIT_CHAMPION))
				res[BATTLE_MESSAGE].push(lang('battle.champion'));
			else
				object.applyAttackEffects(World.player);
		}
		
		if(res[BATTLE_INFLICTED] > 0) World.player.applyAttackEffects(object);
		
			// removing buffs
		if(World.player.hasEffect(EFFECT_STONESKIN)) World.player.removeEffect(EFFECT_STONESKIN);
		if(World.player.hasEffect(EFFECT_EMPOWER))   World.player.removeEffect(EFFECT_EMPOWER);
		if(World.player.hasEffect(EFFECT_WHINE))     World.player.removeEffect(EFFECT_WHINE);
		if(object.hasEffect(EFFECT_STONESKIN))       object.removeEffect(EFFECT_STONESKIN);
		if(object.hasEffect(EFFECT_EMPOWER))         object.removeEffect(EFFECT_EMPOWER);
		if(object.hasEffect(EFFECT_WHINE))           object.removeEffect(EFFECT_WHINE);
		
			// friends no more! :'(
		if(object.hasEffect(EFFECT_PEACEFUL))
		{
			object.removeEffect(EFFECT_PEACEFUL);
			res[BATTLE_MESSAGE].push(lang('battle.peaceful'));
		}
			//Corruption 
		if (World.player.hasBattleMode(BATTLE_SICKLE))
			object.addCorruption(1);
		
		if(World.player.hp <= 0 && World.player.hasEffect(EFFECT_DEATH_WARD)) 
		{
			World.player.hp = 1;
			World.player.removeEffect(EFFECT_DEATH_WARD);
			res[BATTLE_MESSAGE].push(lang('battle.deathward'));
		}
		
		if (object.hasAbility(TRAIT_FOLLOWING))
			object.startFollowing();

		if(World.player.getAttack() == 0)
			World.wrapper.addPossibleAchievement(REWARD_DESPERATION);

				// added an achievement `Buck for 100`
		if(res[BATTLE_INFLICTED] > 100 && World.fieldID != FIELD_TUTORIAL)
			World.wrapper.addPossibleAchievement(REWARD_100_DMG);
		
		if(object.hp <= 0 && object.hasEffect(EFFECT_DEATH_WARD)) 
		{
			object.hp = 1;
			object.removeEffect(EFFECT_DEATH_WARD);
		}
		
		if(res[BATTLE_INFLICTED] > 0 && res[BATTLE_LIFE_PLAYER] > 0)
		{
			World.queue.add(lang('battle.hit.lifesteal', {'d': res[BATTLE_INFLICTED],'m': World.player.getBattleMessage(),'l':res[BATTLE_LIFE_PLAYER]}));
			if(World.player._race == RACE_ZEBRA && object.hp <= 0)
			{
				World.player.addCorruption(1);
				World.queue.add(lang('battle.hit.lifesteal.zebra'));
			}
		}
		else if(res[BATTLE_INFLICTED] > 0)
			World.queue.add(lang('battle.hit', {'d': res[BATTLE_INFLICTED],'m': World.player.getBattleMessage()}));
		
		if(res[BATTLE_RECEIVED] > 0 && res[BATTLE_LIFE_ENEMY] > 0)
		{
			World.queue.add(lang('battle.hit.lifesteal', {'d': res[BATTLE_RECEIVED], 'm': object.getBattleMessage(),'l':res[BATTLE_LIFE_ENEMY]}));
		}
		else if(res[BATTLE_RECEIVED] > 0)
			World.queue.add(lang('battle.hit', {'d': res[BATTLE_RECEIVED], 'm': object.getBattleMessage()}));
		
		var str = '';
		if(res[BATTLE_MESSAGE].length > 0)
			for(var i in res[BATTLE_MESSAGE])
				str += res[BATTLE_MESSAGE][i];
		if(str)
			World.queue.add(str);
		
		if(object.hp > 0 && World.player.hp > 0)
		{
			if(object.hasAbility(TRAIT_COWARD))
			{
				var dx = World.player.x - object.x;
				var dy = World.player.y - object.y;

				object.move(object.x - dx,object.y - dy, lang('enemy.coward', {'e': object.getTitle()}));
			}
			
			if(object.hasAbility(TRAIT_BLINK))
			{
				var coords = World.map.getFreeCell();
				object.move(coords[0], coords[1], lang('enemy.blink', {'e': object.getTitle()}));
			}
				
			if(World.map.seen[object.y][object.x] != SEEN_NO && World.map.seen[object.y][object.x] != SEEN_FOG)
				World.menu.showEnemy(object, res);
			else
				World.menu.hideEnemy();
		}
		
		if(World.player.hp <= 0)
			object.onGameOver();
		else if(object.hp <= 0)
			object.onDeath(true);
		else
		{
			var s = object.postHit();
			if(s)
				World.queue.add(s);
		}
		
		World.raiseEvent(LOG_CAST, object_type, object, object.level, this.id);
		
		return true;
	};
	
	this.onClick = function()
	{
		return true;
	};
	
	this.onHover = function(object, object_type)
	{
		if(object_type != KEY_ENEMY)
			return false;

		var res = object.onHit();
		World.menu.showEnemy(object, res);

		var str = object.getDescription();
		if(res[BATTLE_MESSAGE].length > 0)
			for(var i in res[BATTLE_MESSAGE])
				str += lang('br') + res[BATTLE_MESSAGE][i];
		
		if(res[BATTLE_RESULT])
			str += lang('br') + res[BATTLE_RESULT];
			
		World.queue.addAlert(str);
		World.queue.drawAlerts();

		return true;
	};
	
	this.preAttack = function()
	{
			// when you hit anyone - all mobs lose poisoned trait
		for(var y in World.map.objects)
			for(var x in World.map.objects[y])
				for(var z in World.map.objects[y][x])
					if(World.map.objects[y][x][z].getType() == KEY_ENEMY && World.map.objects[y][x][z].hasEffect(EFFECT_POISON))
						World.map.objects[y][x][z].removeEffect(EFFECT_POISON)
	};
}

addSkill(new TSkillAttack(),SKILL_ATTACK);



