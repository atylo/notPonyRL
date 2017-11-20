function TObjectHerb()
{
	ExtClass.call(this, {AbstractObject: null});

	this.show         = '"';
	this.herbtype     = 0;
	this.id           = OBJECT_HERB;
	this.isPassable   = true;
	this.z            = 2;
	
	this.level        = 0;
	
	this.getDescription = function()
	{
		var s = lang('object.' + this.id + '.description.' + this.herbtype);
		
		if(this.level < World.player.level)
			s = s + ' ' + lang('object.' + this.id + '.withering');
			
		return this.draw() + s;
	};
	
	this.getTitle = function()
	{
		return lang('object.' + this.id + '.title.' + this.herbtype);
	};	
	
	this.init = function()
	{
		var possible = TConfig.possibleHerbs;
		
		this.level = World.player.level;
		
		shuffle(possible);
		this.herbtype = possible[0];

		this.color = lang('object.' + this.id + '.color.' + this.herbtype);	
	};
	
	this.onLook = function()
	{			
		var done = false;
		
		for(var i in World.shop.items)
			if(World.shop.items[i].id == ITEM_CAULDRON && World.shop.items[i].state == ITEM_STATE_BOUGHT)
			{
				World.shop.items[i].addHerb(this.herbtype);
				done = true;
			}
		
		if(done)
		{
			World.map.removeObject(this);
			World.queue.add(lang('object.' + this.id + '.action'));
		}
		else
			World.queue.add(lang('object.' + this.id + '.action.fail'));
		
		return false;
	};
	
	this.onMove = function()
	{
		World.queue.add(this.getDescription());
		return true;
	};
	
	this.wither = function()
	{
		if(this.level >= World.player.level - 1)
			return true;
		
		World.map.removeObject(this);
		
		if(World.map.seen[this.y][this.x] == SEEN_YES || World.map.seen[this.y][this.x] == SEEN_VISITED)
			World.queue.add(lang('object.' + this.id + '.wither', {'t': this.getTitle()}));
		
		return true;
	};
	
	this.onNPCMove = function(o)
	{		
		return true;
	};		
}

TConfig.objects[KEY_OBJECT][OBJECT_HERB] = new TObjectHerb();