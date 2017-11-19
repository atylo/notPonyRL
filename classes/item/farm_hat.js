function TItemFarmHat()
{
	ExtClass.call(this, {AbstractItem: null});
	
	this.cost        = 12;
	this.achievement = REWARD_NONE;
	
	this.levels      = [1,3,5];
	this.type        = ITEM_TYPE_FIGHTER;
	this.subtype     = ITEM_SUBTYPE_BOOST;
	
	this.onPurchuase = function()
	{
		World.raiseEvent(LOG_MOD_CHANGE, MOD_ARMOR, World.player, 2, lang('items.' + this.id + '.title'));
	};
	
	this.onSacrifice = function()
	{
		World.raiseEvent(LOG_MOD_CHANGE, MOD_ARMOR, World.player, -2, lang('items.' + this.id + '.title'));
	};
}


addItem(new TItemFarmHat(),ITEM_FARM_HAT);

