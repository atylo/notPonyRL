function TObjectBrightTorch()
{
	ExtClass.call(this, {AbstractObject: null});

	this.show         = '^';
	this.color        = 'red';
	this.id           = OBJECT_BRIGHT_TORCH;
	
	this.z = 1;
	
	this.init = function()
	{
		var descr             = [];
		descr.push(lang('object.' + this.id + '.description.0'));
		descr.push(lang('object.' + this.id + '.description.1'));
		
		var action            = [];
		action.push(lang('object.' + this.id + '.action.0'));
		
		this.action      = action[World.seedRandom.mt_rand(0, action.length - 1)];
		this.description = descr[World.seedRandom.mt_rand(0, descr.length - 1)]; 
	};
	
	this.onHover = function()
	{
		World.queue.draw();
		World.queue.add(this.description);
		World.queue.draw();
		return true;
	};
	
	this.onLook = function()
	{
		World.queue.add(this.action);
		return true;
	};
	
	this.onMove = function()
	{
		World.queue.add(this.action);
		var r = World.map.initFoV(this.x, this.y, 2, 2);
		World.player.explore(r);
		return true;
	};
}

TConfig.objects[KEY_OBJECT][OBJECT_BRIGHT_TORCH] = new TObjectBrightTorch();