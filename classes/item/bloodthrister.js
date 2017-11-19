function TItemBloodthrister()
{
	ExtClass.call(this, {AbstractItem: null});
	
	this.cost        = 15;	
	this.achievement = REWARD_NIGHTMARE;
	
	this.levels      = [7,9];
	this.type        = ITEM_TYPE_MAGE;
	this.subtype     = ITEM_SUBTYPE_BOOST;
	this.max_count   = 2;
	
	this.onPurchuase = function()
	{
		World.raiseEvent(LOG_MOD_CHANGE, MOD_ARMOR, World.player, -1, lang('items.' + this.id + '.title'));
		World.raiseEvent(LOG_MOD_CHANGE, MOD_RESIST, World.player, -1, lang('items.' + this.id + '.title'));
		World.player.lifesteal += 4;
	};
	
	this.onSacrifice = function()
	{
		World.raiseEvent(LOG_MOD_CHANGE, MOD_ARMOR, World.player, 1, lang('items.' + this.id + '.title'));
		World.raiseEvent(LOG_MOD_CHANGE, MOD_RESIST, World.player, 1, lang('items.' + this.id + '.title'));
		World.player.lifesteal -= 4;
	};	
}

addItem(new TItemBloodthrister(), ITEM_BLOODTHRISTER);