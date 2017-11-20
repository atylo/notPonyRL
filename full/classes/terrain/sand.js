function TTerrainSand()
{
	ExtClass.call(this, {AbstractTerrain: null});

	this.id          = TERRAIN_SAND;
	this.show        = '.';
	this.color       = "#333300";
	this.passable    = true;
	this.see_through = true;
}

TConfig.objects[KEY_TERRAIN][TERRAIN_SAND] = new TTerrainSand();