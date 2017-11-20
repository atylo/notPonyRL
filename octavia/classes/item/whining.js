function TItemWhining()
{
	ExtClass.call(this, {AbstractItem: null});
	
	this.cost        = 12;
	this.achievement = REWARD_100_DMG;
	
	this.levels      = [3,5,7];
	this.type        = ITEM_TYPE_FIGHTER;
	this.subtype     = ITEM_SUBTYPE_BOOST;
	
	this.onPurchuase = function()
	{
		World.raiseEvent(LOG_MOD_CHANGE, MOD_ATTACK_MULT, World.player, -0.1, lang('items.' + this.id + '.title'));
		World.raiseEvent(LOG_MOD_CHANGE, MOD_HP_BASE, World.player, 15, lang('items.' + this.id + '.title'));
		World.player.hp       += 15;

		if(World.player.hp > World.player.getMaxHP())
			World.player.hp = World.player.getMaxHP();
	};
	
	this.onSacrifice = function()
	{
		World.raiseEvent(LOG_MOD_CHANGE, MOD_ATTACK_MULT, World.player, 0.1, lang('items.' + this.id + '.title'))
		World.raiseEvent(LOG_MOD_CHANGE, MOD_HP_BASE, World.player, -15, lang('items.' + this.id + '.title'))
		World.player.hp       -= 15;
		
		if(World.player.hp > World.player.getMaxHP())
			World.player.hp = World.player.getMaxHP();

		if(World.player.hp < 1)
			World.player.hp = 1;
	};
}

addItem(new TItemWhining(),ITEM_WHINING);

