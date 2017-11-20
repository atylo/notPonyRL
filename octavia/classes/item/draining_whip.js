function TItemDrainingWhip()
{
	ExtClass.call(this, {AbstractItem: null});
	
	this.cost        = 8;
	this.achievement = REWARD_HIVE;
	
	this.levels      = [1,3];
	this.type        = ITEM_TYPE_FIGHTER;
	this.subtype     = ITEM_SUBTYPE_BOOST;
	this.max_count   = 2;
	
	this.onPurchuase = function()
	{
		World.raiseEvent(LOG_MOD_CHANGE, MOD_ATTACK_BASE, World.player, 1, lang('items.' + this.id + '.title'));
		World.player.lifesteal += 1;
	};
	
	this.onSacrifice = function()
	{
		World.raiseEvent(LOG_MOD_CHANGE, MOD_ATTACK_BASE, World.player, -1, lang('items.' + this.id + '.title'));
		World.player.lifesteal -= 1;
	};
}

addItem(new TItemDrainingWhip(), ITEM_DRAINING_WHIP);