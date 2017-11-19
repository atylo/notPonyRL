function TTerrainSandstone()
{
	ExtClass.call(this, {AbstractTerrain: null});

	this.id          = TERRAIN_SANDSTONE;
	this.show        = '#';
	this.color       = "#FFFF00";
	this.passable    = false;
	this.see_through = false;
}

TConfig.objects[KEY_TERRAIN][TERRAIN_SANDSTONE] = new TTerrainSandstone();