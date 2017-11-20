function TObjectMoney()
{
	ExtClass.call(this, {AbstractObject: null});

	this.show         = '$';
	this.color        = 'yellow';
	this.id           = OBJECT_MONEY;
	this.isPassable   = true;
	this.z            = 4;
	this.gold         = 0;
	
	this.init = function()
	{
		var text = [];
		for(var i = 0; i < 10; i++)
			text.push(lang('object.' + OBJECT_MONEY + '.action.' + i));

		this.gold = World.seedRandom.mt_rand(3, 5);
		this.effect = text[World.seedRandom.mt_rand(0, text.length - 1)];
	};

	this.getDescription = function()
	{
		if(World.player._race == RACE_DRAGON) {
			if(this.gold < 3)
				return this.draw() + lang('object.' + this.id + '.description.dragon.0', {'m': this.gold});
			if(this.gold < 5)
				return this.draw() + lang('object.' + this.id + '.description.dragon.1', {'m': this.gold});
			if(this.gold < 15)
				return this.draw() + lang('object.' + this.id + '.description.dragon.2', {'m': this.gold});

			return this.draw() + lang('object.' + this.id + '.description.dragon.3', {'m': this.gold});
		}

		return this.draw() + lang('object.' + this.id + '.description.0');
	};

	this.onMove = function()
	{
		World.queue.add(this.effect + ' (' + this.gold + '$)');
		World.raiseEvent(LOG_ACTIVATE, KEY_OBJECT, this.id, false, this.gold);
		World.map.removeObject(this);
		
		World.player.receiveGold(this.gold);
	
		return true;
	};
	
	this.onNPCMove = function(o)
	{		
		if(World.map.seen[this.y][this.x] == SEEN_VISITED || World.map.seen[this.y][this.x] == SEEN_YES)
			World.queue.add(lang('object.' + this.id + '.step', {n: o.getTitle()}));
		World.map.removeObject(this);
		World.map.objects[o.y][o.x][o.z].gp *= 2;
		return true;
	};		
}

TConfig.objects[KEY_OBJECT][OBJECT_MONEY] = new TObjectMoney();