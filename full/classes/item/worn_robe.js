function TItemWornRobe()
{
	ExtClass.call(this, {AbstractItem: null});
	
	this.cost        = 5;
	this.can_be_used = false;
	this.achievement = REWARD_NONE;
	this.max_count   = 2;
	
	this.levels      = [1,3];
	this.type        = ITEM_TYPE_MAGE;
	this.subtype     = ITEM_SUBTYPE_BOOST;
	
	this.onPurchuase = function()
	{
		World.raiseEvent(LOG_MOD_CHANGE, MOD_MP_BASE, World.player, 2, lang('items.' + this.id + '.title'));
		World.player.mp     += 2;
	};
	
	this.onSacrifice = function()
	{
		World.raiseEvent(LOG_MOD_CHANGE, MOD_MP_BASE, World.player, -2, lang('items.' + this.id + '.title'));
		World.player.mp -= 2;
		if(World.player.mp < 0)
			World.player.mp = 0;
	};
}

addItem(new TItemWornRobe(),ITEM_WORN_ROBE);