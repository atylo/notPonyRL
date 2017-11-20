function TFieldPolygon()
{
	ExtClass.call(this, {CustomField: null});
	this.id = FIELD_POLYGON;
	this.gameEnd = function(res)
	{
		if(res != ENDING_BAD)
			return 100;	
		
		return 0;
	}
	
	this.init = function()
	{
		World.map = new TMap();
		World.player.x     = 3;
		World.player.y     = 3;
		World.player.level = 12;
		World.player.gp    = 100;
//		World.player.hp_add = 1000;
		World.player.att_mult = 1;
		World.player.piety    = 500;
		
		World.map.init(5, 5, TERRAIN_FLOOR);

				// common mobs
		var levels = [1, 3, 2];
		var mobs   = [];

		///*
		mobs[NPC_FOALFIDDLER]        = [1, 1, 1]; 
		//*/
		
		this.fillMobs(mobs, levels);
		this.addGods(2);
				// finishing!
		World.player.refresh();
		World.map.initFoV(World.player.x, World.player.y, 10, 10);
	};
}

TConfig.objects[KEY_FIELD][FIELD_POLYGON] = new TFieldPolygon();
addField(FIELD_POLYGON    , REWARD_TUTORIAL , TYPE_LEVEL);


