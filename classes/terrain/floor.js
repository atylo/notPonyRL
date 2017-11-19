function TTerrainFloor()
{
	ExtClass.call(this, {AbstractTerrain: null});

	this.id          = TERRAIN_FLOOR;
	this.show        = '.';
	this.color       = '#FFFFFF'
	this.passable    = true;
	this.see_through = true;
}

TConfig.objects[KEY_TERRAIN][TERRAIN_FLOOR] = new TTerrainFloor();