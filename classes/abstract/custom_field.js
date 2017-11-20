function CustomField()
{
	ExtClass.call(this, {AbstractField: null});
			// text file with a field
	this.fieldFile = '';
	this.bookmarks = [];

	this.defaultTerrain = TERRAIN_FLOOR;
	
				// REDEFINE THIS IN YOUR FIELD
	this.customInit = function()
	{
	
	};

				// REDEFINE THIS IN YOUR FIELD
	this.getCustomObjects = function(c)
	{
		
		return false;
	};
	
				// REDEFINE THIS IN YOUR FIELD
	this.getCustomTerrain = function(c)
	{
		return false;
	};	
	
				// REDEFINE THIS IN YOUR FIELD
	this.getMobTable = function()
	{
		var mobs   = [];
		mobs[NPC_PARASPRITE]        = [0, 1,1,1,1,1,1,1,1,1,1]; 
		
		return mobs;
	};
	
	this.getMob = function(c)
	{
		var lvl = 0;
		if(c == '!')
			lvl = 10;
		else
			lvl = ord(c) - ord('0');
		
		if(lvl < 1 || lvl > 10)
			return false;
		
		var mobs = this.getMobTable();

				// getting all available mobs
		var mob_arr = [];
		for(var j in mobs)
			if(mobs[j][lvl] == 1)
				mob_arr.push(j);

		var mob = jQuery.extend(true, {}, TConfig.objects[KEY_ENEMY][mob_arr[World.seedRandom.mt_rand(0, mob_arr.length-1)]]);
		mob.init(lvl);
		mob = this.initMob(mob);
		
		if(lvl == 10)
			mob.abilities.push(TRAIT_CHAMPION);
		
		return mob;
	}
		
	this.getObject = function(c)
	{
		var s = this.getCustomObjects(c);
		if(s)
			return s;
		
		var res = false;
		if(c == '$') res = new TObjectMoney();
		if(c == '^') res = new TObjectTorch();
		if(c == '*') res = new TObjectGems();
		if(c == '"') res = new TObjectTomes();
		
		if(res)
			res.init();
		
		return res;
	};

		// default terrain loading
	this.getTerrain = function(c)
	{
		var s = this.getCustomTerrain(c);
		if(s)
			return s;
		
		if(c == '.') return this.defaultTerrain;
		if(c == '|') return TERRAIN_HORIZONTAL_DOOR;
		if(c == '#') return TERRAIN_WALL;
			
		return false;
	};
	
	this.init = function()
	{
				// we surely want something sinchronous here!
		var t = jQuery.ajax({
				url    : 'data/levels/' + this.fieldFile + '?' + World.seedRandom.mt_rand(0,1000),
				async  : false
			});
			
		if(t.readyState == 4)
		{
			notification(lang('custom.map.load.ok'));
			this.loadMapFromText(t.responseText);
		}
		else
			notification(lang('custom.map.load.fail'));
	};
	
	this.loadMapFromText = function(data) 
	{
		var lines = data.split("\n");
		
		var size_y = lines.length;
		var size_x = lines[0].length - 1;
		
		var px = 0;
		var py = 0;
		
		World.map = new TMap();
		World.map.init(size_x, size_y, this.defaultTerrain);

		this.bookmarks = [];

		for (var y = 0; y < lines.length; y++)
			for (var x = 0; x < lines[y].length; x++)
			{
				var c = lines[y][x];
				
				if(c == '@')
				{
					px = x;
					py = y;
				};
				
							// is it a terrain?							
				var s = this.getTerrain(c);
				if(s) World.map.terrain[y][x] = s;
				
							// is it an object?!
				s = this.getObject(c);
				if(s) World.map.addObject(s, x,y);
				
							// a dangerous creature of shadows?!!
				s = this.getMob(c);
				if(s) World.map.addObject(s, x,y);
				
							// And mark it as a bookmark.
				this.bookmarks[c] = {'x': x, 'y': y};
			}
			
			// Load player
		World.player.x     = px;
		World.player.y     = py;
		World.player.level = 1;

		this.customInit();
		
		World.player.refresh();
		World.map.initFoV(World.player.x, World.player.y, World.player.sight, 1);
	};

	
	this.placeBookmarkObject = function(obj, bookmark)
	{
		if(typeof this.bookmarks[bookmark] == 'undefined')
			return false;
		
		return World.map.addObject(obj, this.bookmarks[bookmark]['x'], this.bookmarks[bookmark]['y']);
	}
		
	this.isCustom = function()
	{
		return true;
	}

}
