function TGodSanta()
{
	ExtClass.call(this, {AbstractGod: null});
	
	this.color = 'silver';
	
	
	this.customReact = function(e)
	{
		if(e[EVENT_TYPE] == LOG_KILL)
		{
			if(e[EVENT_TARGET_LVL] < e[EVENT_LEVEL] - 1)
				World.player.receivePiety(-5);
			if(e[EVENT_TARGET_LVL] == e[EVENT_LEVEL] - 1)
				World.player.receivePiety(1);
		}
		
		if(e[EVENT_TYPE] == LOG_BUY)
			World.player.receivePiety(2 + Math.floor(e[EVENT_TAG]/10));
	};
	
	this.customRenounce = function()
	{
		for(var i in World.shop.items)
		{
			var item = World.shop.items[i];
			if(item.state == ITEM_STATE_BOUGHT && item.subtype == ITEM_SUBTYPE_BOOST)
			{
				World.shop.items[i].onSacrifice();
				World.shop.items[i].state = ITEM_STATE_DESTROYED;
				break;
			}
		}
	};

	
	this.getSkills = function()
	{
		var c = [];
	
		c.push(SKILL_SANTA_BELLS);

		if(!World.player.hasEffect(EFFECT_MANA_DRAIN))
			c.push(SKILL_SANTA_STRONG);
		
		if(!World.player.hasFlag(FLAG_SKILL, SKILL_SANTA_REWARD))
			c.push(SKILL_SANTA_REWARD);
		
		return c;
	};
}

addGod(new TGodSanta(), RELIGION_SANTA);