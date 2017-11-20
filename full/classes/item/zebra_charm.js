function TItemZebraCharm()
{
	ExtClass.call(this, {AbstractItem: null});
	
	this.cost        = 10;
	this.can_be_used = false;
	this.achievement = REWARD_NONE;
	
	this.levels      = [5,7];
	this.type        = ITEM_TYPE_FIGHTER;
	this.max_count   = 2;
	this.subtype     = ITEM_SUBTYPE_BOOST;
	
	this.onPurchuase = function()
	{
		World.raiseEvent(LOG_MOD_CHANGE, MOD_HP_MULT, World.player, 0.1, lang('items.' + this.id + '.title'));
	};
	
	this.onSacrifice = function()
	{
		World.raiseEvent(LOG_MOD_CHANGE, MOD_HP_MULT, World.player, -0.1, lang('items.' + this.id + '.title'));
		if(World.player.hp > World.player.getMaxHP())
			World.player.hp = World.player.getMaxHP();
	};
}

addItem(new TItemZebraCharm(), ITEM_ZEBRA_CHARM);