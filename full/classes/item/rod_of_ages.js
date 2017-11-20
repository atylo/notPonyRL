function TItemRodOfAges()
{
	ExtClass.call(this, {AbstractItem: null});
	
	this.cost        = 13;	
	this.achievement = REWARD_WEAKLING;
	
	this.levels      = [5];
	this.type        = ITEM_TYPE_COMMON;
	this.subtype     = ITEM_SUBTYPE_BOOST;
	this.max_count   = 1;
	
	this.onPurchuase = function()
	{
		World.player.lifesteal += 3;
		World.player.abilities.push(TRAIT_SLOW);
	};
	
	this.onSacrifice = function()
	{
		World.player.lifesteal -= 3;
		World.player.removeAbility(TRAIT_SLOW);
	};	
}

addItem(new TItemRodOfAges(), ITEM_ROD_OF_AGES);