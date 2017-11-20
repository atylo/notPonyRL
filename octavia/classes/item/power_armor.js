function TItemPowerArmor()
{
	ExtClass.call(this, {AbstractItem: null});
	
	this.cost        = 45;
	this.achievement = REWARD_100_DMG;
	
	this.levels      = [9];
	this.type        = ITEM_TYPE_FIGHTER;
	this.subtype     = ITEM_SUBTYPE_BOOST;
	
	this.onPurchuase = function()
	{
		World.raiseEvent(LOG_MOD_CHANGE, MOD_ARMOR, World.player, 6, lang('items.' + this.id + '.title'));	
	};
	
	this.onSacrifice = function()
	{
		World.raiseEvent(LOG_MOD_CHANGE, MOD_ARMOR, World.player, -6, lang('items.' + this.id + '.title'));	
	};
}

addItem(new TItemPowerArmor(),ITEM_POWER_ARMOR);

