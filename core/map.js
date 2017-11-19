function TMap()
{
	this.terrain = new Array();
	this.mode    = new Array();
	this.seen    = new Array();
	this.objects = new Array();
	
		// caching html
	this.html    = new Array();
	this.htmlrow = new Array();
	this.uncache = new Array();
	
	this.sizeX           = 1;
	this.sizeY           = 2;
	this.default_terrain = TERRAIN_FLOOR;
	
	this.addObject = function(o, x, y)
	{
		o.x = max(0, min(x, this.sizeX));
		o.y = max(0, min(y, this.sizeY));
		
		this.objects[y][x][o.z] = o;
	};
		
	this.getFreeCell = function()
	{
		var x     = 0;
		var y     = 0;
		var tries = 0;
		
		while(1)
		{	
			tries++;
			x = World.seedRandom.mt_rand(0, this.sizeX - 1);
			y = World.seedRandom.mt_rand(0, this.sizeY - 1);
			
			if(this.isPassable(x, y, -1) || tries > 1000)
				break;
		}
		
		return [x,y];
	};
	
	this.getFreeCellXY = function(x1, y1, x2, y2)
	{
		var xlow, xhigh, x;
		var ylow, yhigh, y;
		
		xlow  = Math.min(x1, x2);
		xlow  = Math.max(xlow, 0);
		
		xhigh = Math.max(x1, x2);
		xhigh = Math.min(xhigh, this.sizeX - 1);
	
		ylow  = Math.min(y1, y2);
		ylow  = Math.max(ylow, 0);
		
		yhigh = Math.max(y1, y2);
		yhigh = Math.min(yhigh, this.sizeY - 1);
	
		var tries = 0;
		while(tries < 10)
		{	
			tries++;
			x = World.seedRandom.mt_rand(xlow, xhigh);
			y = World.seedRandom.mt_rand(ylow, yhigh);
			
			if(!this.isPassable(x, y, -1))
				continue;
			
			return [x,y];
		}
		
		return false;
	};		
	
	this.hasSeen = function(x, y)
	{
			// we consider we've seen cells outside the map
		if(x < 0 || y < 0 || x >= this.sizeX || y >= this.sizeY)
			return true;
		
		if(this.seen[y][x] == SEEN_NO || this.seen[y][x] == SEEN_FOG)
			return false;
		
		return true;
	};
	
	this.init = function(sizeX, sizeY, default_terrain)
	{
		this.terrain = new Array();
		this.seen    = new Array();
		this.mode    = new Array();
		this.objects = new Array();
		this.html    = new Array();
		this.htmlrow = new Array();
		
		this.sizeX           = sizeX;
		this.sizeY           = sizeY;
		this.default_terrain = default_terrain;
		
		for(var y = 0; y < sizeY; y++)
		{
			this.terrain[y] = new Array();
			this.seen[y]    = new Array();
			this.mode[y]    = new Array();
			this.objects[y] = new Array();
			this.html[y]    = new Array();
			this.htmlrow[y] = '';
			
			for(var x = 0; x < sizeX; x++)
			{
				this.terrain[y][x] = default_terrain;
				this.objects[y][x] = new Array();
				this.seen[y][x]    = SEEN_NO;
				this.mode[y][x]    = MODE_ALL;
				this.html[y][x]    = '';
			}
		}
	};
	
	this.initFoV = function(px,py,sight,true_sight)
	{	
		var res = new Array();
		res[MODE_HP]    = 0;
		res[MODE_MP]    = 0;
		res[MODE_ALL]   = 0;
		res[KEY_ENEMY]  = 0;
		res[KEY_OBJECT] = 0;

		for(var y = max(0, py - sight); y <= min(this.sizeY-1, py + sight); y++)
			for(var x = max(0,px - sight); x <= min(this.sizeX-1, px + sight); x++)
			{
				if(this.seen[y][x] != SEEN_YES && this.seen[y][x] != SEEN_VISITED)
				{
					if(Math.abs(y - py) <= true_sight && Math.abs(x - px) <= true_sight)
					{
						res[this.mode[y][x]]++;
						this.seen[y][x] = SEEN_YES;
						
						for(var z in World.map.objects[y][x])
							if(!World.map.objects[y][x][z].isInvisible())
							{
								res[World.map.objects[y][x][z].getType()]++;
							}
					}
					else
						this.seen[y][x] = SEEN_FOG;
					
					this.invalidate(x, y);
				}
			}
		
		this.seen[py][px] = SEEN_VISITED;
		this.invalidate(px, py);
		
		return res;
	};
	
	this.invalidate = function(x, y)
	{
		this.html[y][x] = '';		
		this.htmlrow[y] = '';
		
		if(this.uncache[y] == undefined)
			this.uncache[y] = [];
		this.uncache[y][x] = 1;
		return false;
	};
	
	this.isExplored = function()
	{
		for(var y = 0; y < this.sizeY; y++)				
			for(var x = 0; x < this.sizeX; x++)
				if(this.seen[y][x] == SEEN_NO || this.seen[y][x] == SEEN_FOG)
					return false;
		
		return true;
	};
	
	/*
	 * This function is strictly for objects placing && NPC moving.
	 * Player uses another rules for movement.
	 * 
	 * @var z_index If -1, we are checking for ANY possible collision.
	 */
	
	this.isPassable = function(x, y, z_index)
	{
		if(x == World.player.x && y == World.player.y)
			return false;
		
		if(x < 0 || y < 0 || x >= this.sizeX || y >= this.sizeY)
			return false;
			
		var terrain = World.getObject(this.terrain[y][x], KEY_TERRAIN);
		if(!terrain.passable)
			return false;
		
		if(this.objects[y][x].length > 0)
			for(var z in this.objects[y][x])
				if(this.objects[y][x][z].z == z_index || z_index == -1)
					return false;
		
		return true;
	};
	
	this.placeObject = function(o)
	{
		var coords = this.getFreeCell();
		this.addObject(o, coords[0], coords[1]);
		this.invalidate(coords[0], coords[1]);
		
		return true;
	};
	
	this.removeObject = function(o)
	{
		if(this.objects[o.y][o.x][o.z] != undefined)
			delete (this.objects[o.y][o.x][o.z]);
		
		this.invalidate(o.x, o.y);
	}
	
	this.show = function()
	{
		var str      = '';
		this.uncache = [];
		for(var y = 0; y < this.sizeY; y++)				
		{
			var row = '';
			if(this.htmlrow[y] != '')
				row = this.htmlrow[y];
			else
			{
				for(var x = 0; x < this.sizeX; x++)
				{
					var seen = '';

					if(this.html[y][x] != '')
					{
						seen = this.html[y][x];
					}
					else
					{
						if(World.player.x == x && World.player.y == y)
							seen = World.player.draw(this.seen[y][x]);

						if(!seen && this.objects[y][x].length > 0)
						{
							for(var z in this.objects[y][x])
							{
								seen = this.objects[y][x][z].draw(this.seen[y][x]);
								if(seen)
									break;
							}
						}
						
						if(!seen)
						{
							var terrain = World.getObject(this.terrain[y][x], KEY_TERRAIN);
							seen        = terrain.draw(this.seen[y][x], this.mode[y][x]);
						}

						this.html[y][x] = seen;
					}

						// no lang here! 
					row = row + '<SPAN class="m" xyz="' + x + ',' + y + '">' + seen + '</SPAN>';						
				}
				
				this.htmlrow[y] = row;
			}
			
			str = str + row + '<BR />';
		}
		
		for(y in this.uncache)
		{
			this.htmlrow[y] = '';
			for(x in this.uncache[y])
				this.html[y][x] = '';
		}
		
		return str;
	};
}