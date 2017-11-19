function TItemSpoon()
{
	ExtClass.call(this, {AbstractItem: null});
	
	this.cost        = 2;
	this.achievement = REWARD_NONE;
	
	this.levels      = [1];
	this.type        = ITEM_TYPE_COMMON;
	this.subtype     = ITEM_SUBTYPE_BOOST;
	
	this.onPurchuase = function()
	{
		World.raiseEvent(LOG_MOD_CHANGE, MOD_ATTACK_BASE, World.player, 1, lang('items.' + this.id + '.title'));
	};
	
	this.onSacrifice = function()
	{
		World.raiseEvent(LOG_MOD_CHANGE, MOD_ATTACK_BASE, World.player, -1, lang('items.' + this.id + '.title'));
	};
}

addItem(new TItemSpoon(),ITEM_SPOON);

