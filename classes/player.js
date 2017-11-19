	function TPlayer()
	{
		ExtClass.call(this, {AbstractLivingObject: null});
		
		this.is_player = true;

			// Show
		this.color  = 'red';
		this.show   = '@';
				
			// Vision
		this.sight   = 1;
		
		this._name   = 'Silly Filly';
		this._race   = RACE_PONY;
		this._class  = CLASS_WIZARD;
		this._gender = 'f';
		
		this._skills      = [];
		this.flags        = [];
		this.attackLog    = [];
		this.active_skill = 0;
		this.last_hp      = -1;

		this.addBattleMode = function(mode)
		{
			this.battle_mode.push(mode);
			return true;
		};
		
		this.addSkill = function(skill)
		{
			this._skills.push(skill);
			return true;
		};
		
		this.assignName = function()
		{
			var c = this.getClass().getName(this._race);
			this._name  = c[0];
			this.color  = c[1];
			
			return true;
		};
		
		this.die = function()
		{			
			World.menu.need_draw = 1;
			
					// we could have some death event from some other handler
			if(!World.events.hasEvent(LOG_DEATH))
					World.raiseEvent(LOG_DEATH, false, false, false, false);
			
			World.changeGameState(STATE_SPLASH_SCREEN, [ENDING_BAD,World.getHandler().isValidForAchievements]);
		};
		
		this.explore = function(res)
		{
			this.regen(res);
			World.regen(res);
		};
	
		this.getClass = function()
		{
			return TConfig.objects[KEY_CLASS][this._class];
		};
		
		this.getGod = function()
		{
			return TConfig.objects[KEY_GOD][this._religion];
		};
		
		this.getNecessaryExp = function()
		{
			var need = 0;
			for(var i = 0; i < this.level; i++)
			{
				if(i < 10)
					need += (i + 1)*5;
				else
					need += (i + 1)*4;
			}
			
			if(this._race == RACE_ALICORN)
				need = Math.floor(need*1.5);
			
			if(this._race == RACE_ZEBRA)
				need = Math.floor(need*1.1);
			
			return need;
		};
		
		this.getRace = function()
		{
			return TConfig.objects[KEY_RACE][this._race];
		};
		
		this.getTitle = function()
		{
			return this._name;
		};
		
		this.hasBattleMode = function(mode)
		{
			for (var i = 0; i<this.battle_mode.length; i++)
			{
				if (this.battle_mode[i] == mode)
					return true;
			}
			return false;
		};
		
		this.hasSkill = function (id)
		{
			for (var i = 0; i<this._skills.length; i++)
			{
				if (this._skills[i] == id)
					return true;
			}		
			return false;
		};
		
		this.hasFlag = function(t, k)
		{
			if(this.flags[t] == undefined)
				return false;
			if(this.flags[t][k] == undefined)
				return false;
			
			return this.flags[t][k];
		};
		
		this.incFlag = function(t,k)
		{
			if(this.flags[t] == undefined)
				this.flags[t] = [];
			if(this.flags[t][k] == undefined)
				this.flags[t][k] = 0;
			
			this.flags[t][k]++;
		};
		
		this.init = function(_race, _class)
		{
			this._race        = _race;
			this._class       = _class;

			this._religion    = RELIGION_NONE;
			this.flags        = [];
			this.piety        = 0;
			
			this.lifesteal    = 0;
			this.weakness     = 0;
			this.corruption   = 0;
			
			this.color        = 'red';
			
			this._skills      = [SKILL_ATTACK];
			this.active_skill = SKILL_ATTACK;
			
			this.mods     = [];	
			
			this.level    = 1;

			this.hp_add   = 0;
			this.mp_add   = 0;
			this.att_add  = 0;
			
			this.hp_mult  = 1;
			this.mp_mult  = 1;
			this.att_mult = 1;
			this.gp_mult  = 1;
			
			this.sight    = 1;
			this.gp       = 5;
			
			this.phys_def = 0;
			this.mag_def  = 0;
			
			this.assignName();
			
			this.getClass().init(this);
			this.getRace().init(this);
			
			this.hp = this.getMaxHP();
			this.mp = this.getMaxMP();
			
		};		
		
		this.levelUp = function()
		{
			this.level += 1;
				
			if(this.level == 13)
				World.wrapper.addPossibleAchievement(REWARD_ALMOST_CELLY);

			if(this._race == RACE_ALICORN && this.level%2 == 1)
				World.raiseEvent(LOG_MOD_CHANGE, MOD_MP_BASE, World.player, 1, lang('race.' + RACE_ALICORN + '.title'));
			
			this.hp = this.getMaxHP();
			this.mp = this.getMaxMP();
			
			World.menu.need_draw = 1;
			World.shop.need_draw = 1;
			
			this.removeEffect(EFFECT_POISON);
			this.removeEffect(EFFECT_CURSED);
			this.removeEffect(EFFECT_MANA_DRAIN);
			this.removeEffect(EFFECT_SCARED);
			
			if (this.hasBattleMode(BATTLE_SICKLE))
			{
				this.addCorruption(1);
				World.queue.add(lang('event.levelup.corrupted'));	
			}
			
				// herbs
			for(var y in World.map.objects)
				for(var x in World.map.objects[y])
					for(var z in World.map.objects[y][x])
						if(World.map.objects[y][x][z].getType() == KEY_OBJECT && World.map.objects[y][x][z].id == OBJECT_HERB)
						{
							World.map.objects[y][x][z].wither();
						}
			
			World.queue.add(lang('event.levelup'));
			World.raiseEvent(LOG_LVLUP, false, false, false, this.level);
		};
		
		this.react = function(e)
		{
			if(e[EVENT_TYPE] == LOG_EXPLORE)
				this.explore(e[EVENT_TAG]);
			
			this.getGod().react(e);
			this.getClass().react(this, e);
			this.getRace().react(this, e);
			
			if (World.field != undefined)
				World.field.react(e);
			
			if (this.hasEffect(EFFECT_SCARED) && e[EVENT_TYPE] == LOG_KILL)
				this.removeEffect(EFFECT_SCARED)
				
			if (e[EVENT_TYPE] == LOG_CAST && e[EVENT_TARGET_ID] && e[EVENT_TARGET_ID].getType() == KEY_ENEMY && e[EVENT_TAG] == SKILL_ATTACK)
			{
				this.attackLog = [e[EVENT_TARGET_ID], World.turns];	
			}
			
			return true;
		};
		
		this.receiveExp = function(e)
		{
			this.exp += e;
			while(this.exp >= this.getNecessaryExp())
				this.levelUp();
			World.menu.need_draw = 1;
		};
		
		this.receiveGold = function(e)
		{
			this.gp += e;
			World.menu.need_draw = 1;
			World.raiseEvent(LOG_GOLD_GET, KEY_NONE, false, e, false);
		};
		
		this.receivePiety = function(e)
		{
			if(this._religion == RELIGION_NONE)
				return false;
			
			var s = this.getGod().getPietyString();
			this.piety += e;
			World.menu.need_draw = 1;
			
			if(this.getGod().getPietyString() != s)
				World.queue.add(this.getGod().getPietyString());

			if(this.piety < -15)
				this.getGod().renounce();
			
			return true;
		};
		
		this.refresh = function()
		{
			this.getClass().refresh();
			this.getRace().refresh();
			this.hp = this.getMaxHP();
			this.mp = this.getMaxMP();
		};
		
		this.removeBattleMode = function (mode)
		{	
			if (this.hasBattleMode(mode))
			{
				this.battle_mode.splice(this.battle_mode.indexOf(mode),1);
				return true;
			}
			
			return false;
		};
		
		this.removeSkill = function(skill)
		{
			a = new Array();
			var r = false;
			
					// removing ONLY the first instance!
			for(var i in this._skills)
			{
				 
				if(r || this._skills[i] != skill)
					a.push(this._skills[i]);
				else
					r = true;
			}
			
			this._skills = a;
			return true;
		};
		
		this.setFlag = function(t,k,val)
		{
			if(this.flags[t] == undefined)
				this.flags[t] = [];
			
			this.flags[t][k] = val;
		};
		
		this.waitMessage = function()
		{ 
			if (this._race == RACE_ZEBRA)
				World.queue.add(lang('event.wait.zebra'));
			else if(this._class == CLASS_HEALER)
				World.queue.add(lang('event.wait.healer'));
			else
				World.queue.add(lang('event.wait'));
		};
	}