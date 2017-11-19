function TRaceDragon()
{
	this.id          = RACE_DRAGON;
	this.lastCount   = 0;

	ExtClass.call(this, {AbstractRace: null});

	this.getAbilities = function()
	{
		var str = '';
		var f = World.player.hasFlag(FLAG_SPECIAL, SKILL_HOARD);

		if(f > 0) {
			var n = TConfig.skills[SKILL_HOARD].getNextStage(f) - f;
			var d = ' ' + lang('abilities.' + TRAIT_HOARD + '.d', {'g': f, 'n': n});
			str = str + showAbility(TRAIT_HOARD, 0, 0, d);
		};

		return str;
	};

	this.init = function(creature)
	{
		creature.addSkill(SKILL_HOARD);
		creature.setFlag(FLAG_SPECIAL, SKILL_HOARD, 0);
	};

	this.refresh = function()
	{
		World.player.levelUp();
		this.lastCount = 0;
	};

	this.react = function(player, event)
	{
				// see all map
		if(event[EVENT_TYPE] == LOG_GAME_START)
		{
			for (var x = 0; x < World.map.sizeX; x++)
				for (var y = 0; y < World.map.sizeY; y++)
					World.map.seen[y][x] = SEEN_YES;

			World.draw();
		}

		if(event[EVENT_TYPE] == LOG_GOLD_GET)
		{
			var res = [];
			res[MODE_HP]  = Math.floor(event[EVENT_TARGET_LVL] / 2 + 1);
			res[MODE_MP]  = Math.floor(event[EVENT_TARGET_LVL] / 2);
			res[MODE_ALL] = 0;

			World.player.regen(res);
		}
		
		if(event[EVENT_TYPE] == LOG_ACTIVATE)
		{
			if(event[EVENT_TARGET_ID] == OBJECT_GEMS)
			{
				World.player.heal(1);
				World.menu.need_draw = 1;
				World.draw();
			}
				
			if(event[EVENT_TARGET_ID] == OBJECT_CLEAR_POOL || event[EVENT_TARGET_ID] == OBJECT_SMALL_POOL)
			{
				// add effect here
			}	
		}
		if(event[EVENT_TYPE] == LOG_BUY || event[EVENT_TYPE] == LOG_SACRIFICE)
		{
			this.itemCount = 0;
			for (var i = 0; i < World.shop.items.length; i++)
			{
				if (World.shop.items[i].state == ITEM_STATE_BOUGHT && World.shop.items[i].subtype == ITEM_SUBTYPE_BOOST)
					this.itemCount++;
			}
			
			if (this.itemCount > this.lastCount)
				World.raiseEvent(LOG_MOD_CHANGE, MOD_ATTACK_MULT,  World.player, (this.itemCount - this.lastCount)*0.03, lang('abilities.' + TRAIT_HOARD));
			
			if (this.itemCount < this.lastCount)
				World.raiseEvent(LOG_MOD_CHANGE, MOD_ATTACK_MULT,  World.player, (this.itemCount - this.lastCount)*-0.03, lang('abilities.' + TRAIT_HOARD));
				
			this.lastCount = this.itemCount;
			World.menu.need_draw = 1;
			World.draw();
		}
	}
}

TConfig.objects[KEY_RACE][RACE_DRAGON] = new TRaceDragon();
addRace(RACE_DRAGON     , REWARD_VOGUE_ROGUE);


