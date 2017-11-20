function TItemCursedMonocle()
{
	ExtClass.call(this, {AbstractItem: null});
	
	this.cost        = 21;	
	this.achievement = REWARD_HOLY_ONE;
	
	this.levels      = [1,3,5,7];
	this.type        = ITEM_TYPE_MAGE;
	this.subtype     = ITEM_SUBTYPE_BOOST;
	
	this.canSacrifice = function()
	{
		return false;
	};	
	
	this.onPurchuase = function()
	{
		World.player.abilities.push(TRAIT_MAGICAL_ATTACK);
		
		if (World.player._religion != RELIGION_NONE)
			World.player.piety -= 5;
		
		World.player.lifesteal += 1;
	};
	
	this.onSacrifice = function()
	{
		return false;
	};	
}

addItem(new TItemCursedMonocle(), ITEM_CURSED_MONOCLE);

