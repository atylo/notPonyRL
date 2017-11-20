function TGodApplejack()
{
	ExtClass.call(this, {AbstractGod: null});
	this.color = 'orange';
	this.skills        = [SKILL_APPLEJACK_AXIOM, SKILL_APPLEJACK_VISION, SKILL_APPLEJACK_PRAGMATISM, SKILL_APPLEJACK_EVOLUTION];
	this.achievement   = REWARD_HOLY_ONE;
	
	this.customReact = function(e)
	{
		if(e[EVENT_TYPE] == LOG_ACTIVATE)
			if(e[EVENT_TARGET_ID] == OBJECT_GEMS)
				World.player.receivePiety(2);
				
		if(e[EVENT_TYPE] == LOG_CAST && (e[EVENT_TAG] == SKILL_STONESKIN || e[EVENT_TAG] == SKILL_EMPOWER || e[EVENT_TAG] == SKILL_SHIELD))
			World.player.receivePiety(1);
			
		if(e[EVENT_TYPE] == LOG_LVLUP)
			World.player.receivePiety(2);
		
		if(e[EVENT_TYPE] == LOG_KILL && e[EVENT_TARGET_LVL] == e[EVENT_LEVEL])
			World.player.receivePiety(2);
			
		if(e[EVENT_TYPE] == LOG_KILL && e[EVENT_TARGET_LVL] != e[EVENT_LEVEL])
			World.player.receivePiety(-2);
			
		if(e[EVENT_TYPE] == LOG_CAST && e[EVENT_TAG] == SKILL_WHINE)
			World.player.receivePiety(-3);	
			
		if(e[EVENT_TYPE] == LOG_STATE && e[EVENT_TARGET_ID] == TRAIT_CORRUPTION && e[EVENT_TAG] >0)
			World.player.receivePiety(-5);
			
	};
	
	this.customRenounce = function()
	{
		World.raiseEvent(LOG_MOD_CHANGE, MOD_HP_MULT, World.player, -0.3, lang('religion.' + this.id + '.title'));
		if(this.hp > this.getMaxHP())
			this.hp = this.getMaxHP();
	};
	
	this.handlerConvert = function()
	{	
		var favor = 0;
		if (World.player.mods[MOD_HP_MULT] != undefined)
			for(var i = 0; i < World.player.mods[MOD_HP_MULT].length; i++)
				favor += World.player.mods[MOD_HP_MULT][i][0]*20;
		
		if (World.player.mods[MOD_ARMOR] != undefined)
			for (var i = 0; i < World.player.mods[MOD_ARMOR].length; i++)
				favor += World.player.mods[MOD_ARMOR][i][0];
				
		World.player.receivePiety(3 + favor);
		return true;
	};
}

addGod(new TGodApplejack(), RELIGION_APPLEJACK);