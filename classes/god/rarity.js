function TGodRarity()
{
	ExtClass.call(this, {AbstractGod: null});
	
	this.color         = 'white';
	this.skills        = [SKILL_RARITY_RESTOCK, SKILL_RARITY_TOUCH, SKILL_RARITY_GENEROSITY, SKILL_RARITY_ARMOR];
	this.lastSacrifice = 0;
	this.sacrifices    = [];

	/*
	Following: per item equipped
	Likes:
	 - bashing gems and picking up money 
	 - swimming in pools 
	 - buying items 
	Dislikes:
	 - any statuses, including positive ones 
	 - too long without sacrifices (100 turns)
	Renounce:
	 - takes away all the gold.
	Abilities:
	 - regenerates sacrificed item 
	 - adds `exhausting` for the next strike 
	 - all mobs double their gold 
	 - add % armour for piety and gold
	*/
	
	this.customReact = function(e)
	{		
		if(e[EVENT_TYPE] == LOG_ACTIVATE)
		{
			if(e[EVENT_TARGET_ID] == OBJECT_GEMS || e[EVENT_TARGET_ID] == OBJECT_MONEY)
				World.player.receivePiety(2);
				
			if(e[EVENT_TARGET_ID] == OBJECT_CLEAR_POOL || e[EVENT_TARGET_ID] == OBJECT_SMALL_POOL)
				World.player.receivePiety(3);
		}
		
	
		if(e[EVENT_TYPE] == LOG_BUY)
			World.player.receivePiety(3);
			
		if(e[EVENT_TYPE] == LOG_STATE)
			World.player.receivePiety(-2);
		
		if(e[EVENT_TYPE] == LOG_SACRIFICE)
		{
			this.lastSacrifice = e[EVENT_TIME];
			this.sacrifices.push(e[EVENT_TARGET_LVL]);
		}
		if ((e[EVENT_TIME] - this.lastSacrifice) > 100)
		{
			World.player.receivePiety(-5);
			this.lastSacrifice = e[EVENT_TIME];
			World.queue.add(lang('religion.god.message.' + this.id +'.2'));
		}
		
		if ((e[EVENT_TIME] - this.lastSacrifice) == 77)
		{
			World.queue.add(lang('religion.god.message.' + this.id +'.1'));
		}
	};
	
	this.customRenounce = function()
	{
		World.player.receiveGold(-World.player.gp);
		
		World.player.gp_mult -= 0.5;
		if (World.player.hasFlag(FLAG_SKILL, SKILL_RARITY_GENEROSITY))
			World.player.gp_mult -= 1;
	};
	
	this.handlerConvert = function()
	{
		var items_worn = 0;
		for(var i in World.shop.items)
		{
			var item = World.shop.items[i];
			if(item.state == ITEM_STATE_BOUGHT && item.subtype == ITEM_SUBTYPE_BOOST)
				items_worn++;
		}
		
		World.player.receivePiety(items_worn*3);
		this.lastSacrifice = World.turns;
		this.sacrifices    = [];
		
		return true;
	};
};

addGod(new TGodRarity(), RELIGION_RARITY);