function TTerrainIceFloor()
{
	ExtClass.call(this, {AbstractTerrain: null});

	this.id          = TERRAIN_ICE_FLOOR;
	this.show        = '.';
	this.color       = "#0066FF";
	this.passable    = true;
	this.see_through = true;
}

TConfig.objects[KEY_TERRAIN][TERRAIN_ICE_FLOOR] = new TTerrainIceFloor();