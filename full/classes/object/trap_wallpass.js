function TObjectTrapWallPass()
{
	ExtClass.call(this, {AbstractTrap: null});

	this.color        = 'brown';
	this.id           = OBJECT_TRAP_WALLPASS;
	this.z            = 1;
	this.direction    = 0; 
	this.worked       = false;
	this.tryCount     = 0;
	
	this.initAfterPlacement = function ()
	{
		this.direction = World.seedRandom.mt_rand(0,3);
		switch (this.direction)
		{
			case 0: this.show = "↑";
				break;
			case 1: this.show = "→";
				break;
			case 2: this.show = "↓";
				break;
			case 3: this.show = "←";
				break;
		}
		
		this.tryCount++;
		place_is_valid = true;
			
		switch (this.direction)
		{
			case 0:	if (this.y > 2 && World.map.terrain[this.y][this.x] == TERRAIN_FLOOR)
					{
						if (World.map.terrain[this.y-1][this.x] != TERRAIN_WALL || World.map.terrain[this.y-2][this.x] != TERRAIN_FLOOR)
							place_is_valid = false;
							
						for (var z in World.map.objects[this.y-2][this.x])
							if (World.map.objects[this.y-2][this.x][z].getType() == KEY_ENEMY || World.map.objects[this.y-2][this.x][z].getType() == KEY_OBJECT)
								place_is_valid = false;		
					}
					else
						place_is_valid = false;
					break;
			case 1: if (this.x > 2 && World.map.terrain[this.y][this.x] == TERRAIN_FLOOR)
					{
						if (World.map.terrain[this.y][this.x+1] != TERRAIN_WALL || World.map.terrain[this.y][this.x+2] != TERRAIN_FLOOR)
							place_is_valid = false;
							
						for (var z in World.map.objects[this.y][this.x+2])
							if (World.map.objects[this.y][this.x+2][z].getType() == KEY_ENEMY || World.map.objects[this.y][this.x+2][z].getType() == KEY_OBJECT)
								place_is_valid = false;		
					}
					else
						place_is_valid = false;
					break;
			case 2: if (this.y < World.map.sizeY-2 && World.map.terrain[this.y][this.x] == TERRAIN_FLOOR)
					{
						if (World.map.terrain[this.y+1][this.x] != TERRAIN_WALL || World.map.terrain[this.y+2][this.x] != TERRAIN_FLOOR)
							place_is_valid = false;
							
						for (var z in World.map.objects[this.y+2][this.x])
							if (World.map.objects[this.y+2][this.x][z].getType() == KEY_ENEMY || World.map.objects[this.y+2][this.x][z].getType() == KEY_OBJECT)
								place_is_valid = false;		
					}
					else
						place_is_valid = false;
					break;
					
			case 3: if (this.x < World.map.sizeX-2 && World.map.terrain[this.y][this.x] == TERRAIN_FLOOR)
					{
						if (World.map.terrain[this.y][this.x-1] != TERRAIN_WALL || World.map.terrain[this.y][this.x-2] != TERRAIN_FLOOR)
							place_is_valid = false;
						
						for (var z in World.map.objects[this.y][this.x-2])
							if (World.map.objects[this.y][this.x-2][z].getType() == KEY_ENEMY || World.map.objects[this.y][this.x-2][z].getType() == KEY_OBJECT)
								place_is_valid = false;		
					}
					else
						place_is_valid = false;
					break;
		}
		if (!place_is_valid)
		{
			World.map.removeObject(this);
			World.map.placeObject(this);
			this.initAfterPlacement();
		}
		else
			console.log("walltrap tries", this.tryCount);
	};
	
	
	this.onMove = function()
	{
		if(World.map.seen[this.y][this.x] == SEEN_VISITED)
		{
			World.queue.add(lang('object.' + this.id + '.seen'));
			this.worked = false;
			return true;
		}
		if(World.player._class == CLASS_ROGUE)
			if(World.seedRandom.mt_rand(0,1) == 0)
			{
				World.queue.add(lang('object.' + this.id + '.avoid'));
				this.worked = false;
				return true;
			}
		World.queue.add(lang('object.' + this.id + '.step'));
		this.worked = true;
		return true;
	};
	
	this.onLook = function()
	{
		World.queue.add(lang('object.' + this.id + '.use'));
		this.worked = true;
		this.afterMove();
		return true;
	};
	
	this.onNPCMove = function(o)
	{		
		return true;
	};	
	
	this.afterNPCMove = function(o)
	{
		World.queue.add(lang('object.' + this.id + '.NPCtrap', {n: o.getTitle()}));
		switch (this.direction)
		{
			case 0:	World.map.objects[o.y][o.x][o.z].move(o.x, o.y-2);
				break;
			case 1:	World.map.objects[o.y][o.x][o.z].move(o.x+2, o.y);
				break;
			case 2:	World.map.objects[o.y][o.x][o.z].move(o.x, o.y+2);
				break;
			case 3:	World.map.objects[o.y][o.x][o.z].move(o.x-2, o.y);
				break;
		}
	}
	
	this.afterMove = function ()
	{
		if (this.worked)
		{
			World.raiseEvent(LOG_ACTIVATE, KEY_OBJECT, this.id, false, false);
			switch (this.direction)
			{
				case 0:	World.move(this.x, this.y-2)
					break;
				case 1:	World.move(this.x+2, this.y)
					break;
				case 2:	World.move(this.x, this.y+2)
					break;
				case 3:	World.move(this.x-2, this.y)
					break;
			}
		}
		return true;
	}
};

TConfig.objects[KEY_OBJECT][OBJECT_TRAP_WALLPASS] = new TObjectTrapWallPass();