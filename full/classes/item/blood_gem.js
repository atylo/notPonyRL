function TItemBloodGem()
{
	ExtClass.call(this, {AbstractItem: null});
	
	this.cost        = 16;	
	this.achievement = REWARD_HAT_AND_WHIP;
	
	this.levels      = [3,5,7,9];
	this.type        = ITEM_TYPE_FIGHTER;
	this.subtype     = ITEM_SUBTYPE_BOOST;
	
	this.canSacrifice = function()
	{
		return false;
	};	
	
	this.onPurchuase = function()
	{
		if (World.player._religion != RELIGION_NONE)
			World.player.piety -= 5;
		
		World.player.lifesteal += 3;
		World.raiseEvent(LOG_MOD_CHANGE, MOD_HP_MULT, World.player, -0.2, lang('items.' + this.id + '.title'));
		
		if(World.player.hp > World.player.getMaxHP())
			World.player.hp = World.player.getMaxHP();
	};
	
	this.onSacrifice = function()
	{
		return false;
	};	
}

addItem(new TItemBloodGem(), ITEM_BLOOD_GEM);

