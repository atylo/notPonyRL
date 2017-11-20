function TItemEldersScroll()
{
	ExtClass.call(this, {AbstractItem: null});
	
	this.cost        = 16;
	this.achievement = REWARD_LIKE_A_BOSS;

	this.levels      = [5,7];
	this.type        = ITEM_TYPE_FIGHTER;
	this.subtype     = ITEM_SUBTYPE_BOOST;
	
	this.onPurchuase = function()
	{
		World.raiseEvent(LOG_MOD_CHANGE, MOD_ATTACK_MULT, World.player, 0.12, lang('items.' + this.id + '.title'));
	};
	
	this.onSacrifice = function()
	{
		World.raiseEvent(LOG_MOD_CHANGE, MOD_ATTACK_MULT, World.player, -0.12, lang('items.' + this.id + '.title'));
	};
}

addItem(new TItemEldersScroll(),ITEM_ELDERS_SCROLL);

