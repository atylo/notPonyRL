function TTerrainWall()
{
	ExtClass.call(this, {AbstractTerrain: null});

	this.id          = TERRAIN_WALL;
	this.show        = '#';
	this.color       = "#FFFFFF";
	this.passable    = false;
	this.see_through = false;
}

TConfig.objects[KEY_TERRAIN][TERRAIN_WALL] = new TTerrainWall();