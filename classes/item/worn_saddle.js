function TItemWornSaddle()
{
	ExtClass.call(this, {AbstractItem: null});
	
	this.cost        = 15;
	this.can_be_used = false;
	this.achievement = REWARD_NONE;
	
	this.levels      = [3];
	this.type        = ITEM_TYPE_FIGHTER;
	this.subtype     = ITEM_SUBTYPE_BOOST;
	
	this.onPurchuase = function()
	{
		World.raiseEvent(LOG_MOD_CHANGE, MOD_HP_BASE, World.player, 10, lang('items.' + this.id + '.title'))
		World.player.hp     += 10;

		if(World.player.hp > World.player.getMaxHP())
			World.player.hp = World.player.getMaxHP();
	};
	
	this.onSacrifice = function()
	{
		World.raiseEvent(LOG_MOD_CHANGE, MOD_HP_BASE, World.player, -10, lang('items.' + this.id + '.title'))
		World.player.hp     -= 10;
		
		if(World.player.hp > World.player.getMaxHP())
			World.player.hp = World.player.getMaxHP();

		if(World.player.hp < 1)
			World.player.hp = 1;
	};
}

addItem(new TItemWornSaddle(),ITEM_WORN_SADDLE);