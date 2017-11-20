function TGodFrost()
{
	ExtClass.call(this, {AbstractGod: null});
	
	this.color = '#0D4F8B';
	this.achievement   = REWARD_NONE;

	
	this.customReact = function(e)
	{
		if(e[EVENT_TYPE] == LOG_KILL)
		{
			if(e[EVENT_TARGET_LVL] > e[EVENT_LEVEL])
				World.player.receivePiety((e[EVENT_TARGET_LVL] - e[EVENT_LEVEL])*3);
			if(e[EVENT_TARGET_LVL] < e[EVENT_LEVEL])
				World.player.receivePiety(1);
		}
		
		if(e[EVENT_TYPE] == LOG_STATE)
			World.player.receivePiety(-5);
	};
	
	this.customRenounce = function()
	{
		World.player.addEffect(EFFECT_POISON);
		World.player.addEffect(EFFECT_MANA_DRAIN);
	};	
		
	this.getPietyByItem = function(item, cost)
	{
		return Math.floor(cost/10 + 1);
	};			
	
	this.getSkills = function()
	{
		var c = [];
	
		c.push(SKILL_FROST_ICEBORN);
		c.push(SKILL_FROST_GENERAL);
		if(!World.player.hasFlag(FLAG_SKILL, SKILL_FROST_TOUCH))
			c.push(SKILL_FROST_TOUCH);
		
		return c;
	};
}

addGod(new TGodFrost(), RELIGION_FROST);