function TItemVoodooDoll()
{
	ExtClass.call(this, {AbstractItem: null});
	
	this.cost        = 20;
	this.achievement = REWARD_NIGHTMARE;
	
	this.levels      = [7];
	this.type        = ITEM_TYPE_FIGHTER;
	this.subtype     = ITEM_SUBTYPE_BOOST;
	
	this.onPurchuase = function()
	{
		World.raiseEvent(LOG_MOD_CHANGE, MOD_HP_MULT, World.player, -0.2, lang('items.' + this.id + '.title'));
		World.raiseEvent(LOG_MOD_CHANGE, MOD_ATTACK_MULT, World.player, 0.2, lang('items.' + this.id + '.title'));
		
		if(World.player.hp > World.player.getMaxHP())
			World.player.hp = World.player.getMaxHP();
	};
	
	this.onSacrifice = function()
	{
		World.raiseEvent(LOG_MOD_CHANGE, MOD_HP_MULT, World.player, 0.2, lang('items.' + this.id + '.title'));
		World.raiseEvent(LOG_MOD_CHANGE, MOD_ATTACK_MULT, World.player, -0.2, lang('items.' + this.id + '.title'));
		
		if(World.player.hp > World.player.getMaxHP())
			World.player.hp = World.player.getMaxHP();
	};
}

addItem(new TItemVoodooDoll(),ITEM_VOODOO_DOLL);

