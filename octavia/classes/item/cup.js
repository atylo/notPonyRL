function TItemCup()
{
	ExtClass.call(this, {AbstractItem: null});
	
	this.cost        = 10;	
	this.achievement = REWARD_HOLY_ONE;
	
	this.levels      = [1, 3, 5];
	this.type        = ITEM_TYPE_COMMON;
	this.subtype     = ITEM_SUBTYPE_BOOST;
	this.max_count   = 2;
	
	this.onPurchuase = function()
	{
		World.raiseEvent(LOG_MOD_CHANGE, MOD_HP_BASE, World.player, 4, lang('items.' + this.id + '.title'));
		World.raiseEvent(LOG_MOD_CHANGE, MOD_MP_BASE, World.player, 2, lang('items.' + this.id + '.title'));
	};
	
	this.onSacrifice = function()
	{
		
	};	
}

addItem(new TItemCup(), ITEM_CUP);

