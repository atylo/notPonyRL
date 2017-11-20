function TTerrainGrass()
{
	ExtClass.call(this, {AbstractTerrain: null});

	this.id          = TERRAIN_GRASS;
	this.show        = '.';
	this.color       = "#00FF00";
	this.passable    = true;
	this.see_through = true;
}

TConfig.objects[KEY_TERRAIN][TERRAIN_GRASS] = new TTerrainGrass();