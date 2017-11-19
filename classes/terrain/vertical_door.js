function TVerticalDoor()
{
	ExtClass.call(this, {AbstractTerrain: null});

	this.id          = TERRAIN_VERTICAL_DOOR;
	this.show        = '—';
	this.color       = "#C0C0C0";
	this.passable    = false;
	this.see_through = false;
}

this.onMove = function()
	{
		World.raiseEvent(LOG_ACTIVATE, KEY_TERRAIN, this.id, player.level, [this.x,this.y]);
	}

TConfig.objects[KEY_TERRAIN][TERRAIN_VERTICAL_DOOR] = new TVerticalDoor();