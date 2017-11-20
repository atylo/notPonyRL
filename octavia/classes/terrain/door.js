function THorizontalDoor()
{
	ExtClass.call(this, {AbstractTerrain: null});

	this.id          = TERRAIN_HORIZONTAL_DOOR;
	this.show        = '|';
	this.color       = "#C0C0C0";
	this.passable    = false;
	this.see_through = false;
}

TConfig.objects[KEY_TERRAIN][TERRAIN_HORIZONTAL_DOOR] = new THorizontalDoor();