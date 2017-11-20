function TItemBinocular()
{
	ExtClass.call(this, {AbstractItem: null});
	
	this.cost        = 17;	
	this.achievement = REWARD_SCOUT;
	
	this.levels      = [3,5];
	this.type        = ITEM_TYPE_COMMON;
	this.subtype     = ITEM_SUBTYPE_BOOST;
	this.max_count   = 1;
	
	this.onPurchuase = function()
	{
		World.player.sight++;	
		World.map.initFoV(World.player.x, World.player.y, World.player.sight, 1);
	};
	
	this.onSacrifice = function()
	{
		World.player.sight--;
	};	
	
}

addItem(new TItemBinocular(), ITEM_BINOCULAR);