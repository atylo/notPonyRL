function TObjectTrapTeleport()
{
	ExtClass.call(this, {AbstractTrap: null});

	this.color        = 'green';
	this.id           = OBJECT_TRAP_TELEPORT;
	this.z            = 1;
	
	this.onMove = function()
	{
		var coords = World.map.getFreeCell();
		
		if(World.map.seen[this.y][this.x] == SEEN_VISITED && World.seedRandom.mt_rand(0,1) == 0)
		{
			World.queue.add(lang('object.' + this.id + '.action.1'));
			World.map.removeObject(this);
			return true;
		}
		
		World.map.seen[this.y][this.x] = SEEN_VISITED;
		World.map.invalidate(World.player.x, World.player.y);
		
		World.raiseEvent(LOG_ACTIVATE, KEY_OBJECT, this.id, false, false);
		
		World.player.x = coords[0];
		World.player.y = coords[1];
		
		World.queue.add(lang('object.' + this.id + '.action.0'));
		var r = World.map.initFoV(World.player.x, World.player.y, 1, 1);
		World.player.explore(r);
		return false;
	};
	
	this.onNPCMove = function(o)
	{		
		if(World.map.seen[this.y][this.x] == SEEN_VISITED || World.map.seen[this.y][this.x] == SEEN_YES)
		{
			World.queue.add(lang('object.' + this.id + '.step', {n: o.getTitle()}));
			World.map.seen[this.y][this.x] = SEEN_VISITED;
			World.map.invalidate(this.x, this.y);
		}
		
		var coords = World.map.getFreeCell();
		o.move(coords[0], coords[1], false);
		return false;
	};		
}

TConfig.objects[KEY_OBJECT][OBJECT_TRAP_TELEPORT] = new TObjectTrapTeleport();
