function TGodDash()
{
	ExtClass.call(this, {AbstractGod: null});
	this.color = 'cyan';
	this.skills        = [];
	this.achievement   = REWARD_DASH;
	this.turns         = 0;
	
	this.old_dx = 0;
	this.old_dy = 0;
	this.rainbows = false;
	
	this.customReact = function(e)
	{
		if(e[EVENT_TYPE] == LOG_ACTIVATE)
			if(e[EVENT_TARGET_ID] == OBJECT_CLEAR_POOL || e[EVENT_TARGET_ID] == OBJECT_SMALL_POOL || e[EVENT_TARGET_ID] == OBJECT_TOMES)
				World.player.receivePiety(-2);
		
		if(e[EVENT_TYPE] == LOG_CAST && e[EVENT_TAG] == SKILL_ATTACK)
		{
			var charge = World.player.hasFlag(FLAG_SPECIAL, TRAIT_CHARGE);
			World.player.receivePiety(-1*charge);
		}

		if(e[EVENT_TYPE] == LOG_STATE && e[EVENT_TARGET_ID] == TRAIT_SLOW)
			World.player.receivePiety(-10);

		if(this.turns*100 < World.turns)
		{
			this.turns = Math.floor(World.turns*100) + 1;
			World.player.receivePiety(-2);
			World.queue.add(lang('religion.god.message.' + this.id +'.1'));
		}

		if(e[EVENT_TYPE] == LOG_KILL && e[EVENT_TARGET_LVL] > e[EVENT_LEVEL])
			World.player.receivePiety(5);
		
		if(e[EVENT_TYPE] == LOG_KILL && e[EVENT_TARGET_LVL] == e[EVENT_LEVEL])
			World.player.receivePiety(3);
			
		if(e[EVENT_TYPE] == LOG_KILL && TConfig.objects[KEY_ENEMY][e[EVENT_TARGET_ID]].hasAbility(TRAIT_BEAST))
			World.player.receivePiety(3);
		
		if(e[EVENT_TYPE] == LOG_EXPLORE)
		{
			var charge = World.player.hasFlag(FLAG_SPECIAL, TRAIT_CHARGE) + 1;
			if(this.old_dx != World.player.dx || this.old_dy != World.player.dy || (World.player.dx == 0 && World.player.dy == 0))
				charge = 0;
			if(charge >= World.player.piety)
				charge = Math.max(0, World.player.piety);
			
			World.player.setFlag(FLAG_SPECIAL, TRAIT_CHARGE, charge);
			World.menu.need_draw = 1;
	
			this.old_dx = World.player.dx;
			this.old_dy = World.player.dy;
			
			if(charge > 3)
			{
				World.turns--;
				var rainbow = new TObjectRainbow();
				rainbow.init();			
				World.map.addObject(rainbow, World.player.x, World.player.y);
				this.rainbows = true;
			}
			
			if(charge == 0 && this.rainbows)
			{
				this.rainbows = false;
				
				for(var y in World.map.objects)
					for(var x in World.map.objects[y])
						for(var z in World.map.objects[y][x])
							if(World.map.objects[y][x][z].getType() == KEY_OBJECT && World.map.objects[y][x][z].id == OBJECT_RAINBOW)
								World.map.removeObject(World.map.objects[y][x][z]);
			}
		}
	};
	
	this.customRenounce = function()
	{
		World.raiseEvent(LOG_MOD_CHANGE, MOD_ATTACK_MULT, World.player, -0.45, lang('religion.' + this.id + '.title'));
	};
	
	this.getAbilities = function()
	{
		var str = '';
		
		var s1  = World.player.hasFlag(FLAG_SPECIAL, TRAIT_CHARGE);
		if(s1 > 0 && s1 <= 2)
			str = str + showAbility(TRAIT_CHARGE, s1, 2);
		if(s1 >= 3 && s1 <= 4)
			str = str + showAbility(TRAIT_CHARGE2, s1, 2);
		if(s1 >= 5 && s1 < 6)
			str = str + showAbility(TRAIT_CHARGE3, s1, 2);
		if(s1 >= 6)
			str = str + showAbility(TRAIT_CHARGE4, s1, 2);
		
		return str;
	};
		
	this.handlerConvert = function()
	{	
		var favor = 0;
		if (World.player.mods[MOD_ATTACK_MULT] != undefined)
			for(var i = 0; i < World.player.mods[MOD_ATTACK_MULT].length; i++)
				favor += World.player.mods[MOD_ATTACK_MULT][i][0]*40;
				
		if (World.player.mods[MOD_ATTACK_BASE] != undefined)
			for (var i = 0; i < World.player.mods[MOD_ATTACK_BASE].length; i++)
				favor += World.player.mods[MOD_ATTACK_BASE][i][0]*2;
				
		World.player.receivePiety(Math.floor(favor));
		this.turns  = Math.floor(World.turns/100) + 1;
		this.old_dx = 0;
		this.old_dy = 0;
		return true;
	};
}

addGod(new TGodDash(), RELIGION_DASH);