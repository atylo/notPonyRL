function TItemFork()
{
	ExtClass.call(this, {AbstractItem: null});
	
	this.cost        = 17;
	this.achievement = REWARD_POSTGRADUATE;
	
	this.levels      = [1];
	this.type        = ITEM_TYPE_FIGHTER;
	this.subtype     = ITEM_SUBTYPE_BOOST;
	
	this.onPurchuase = function()
	{
		World.raiseEvent(LOG_MOD_CHANGE, MOD_ATTACK_BASE, World.player, 4, lang('items.' + this.id + '.title'));
	};
	
	this.onSacrifice = function()
	{
		World.raiseEvent(LOG_MOD_CHANGE, MOD_ATTACK_BASE, World.player, -4, lang('items.' + this.id + '.title'));
	};
}

addItem(new TItemFork(),ITEM_FORK);

