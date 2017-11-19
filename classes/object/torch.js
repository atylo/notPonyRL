function TObjectTorch()
{
	ExtClass.call(this, {AbstractObject: null});

	this.show         = '^';
	this.color        = 'crimson';
	this.id           = OBJECT_TORCH;
	this.z            = 1;
	
	this.init = function()
	{
		var descr = [];
		descr.push(lang('object.' + this.id + '.description.0'));
		descr.push(lang('object.' + this.id + '.description.1'));
		
		var action = [];
		action.push(lang('object.' + this.id + '.action.0'));
		action.push(lang('object.' + this.id + '.action.1'));
		action.push(lang('object.' + this.id + '.action.2'));

		this.action      = action[World.seedRandom.mt_rand(0, action.length - 1)]; 
		this.description = descr[World.seedRandom.mt_rand(0, descr.length - 1)]; 
	};
	
	this.onLook = function()
	{
		World.queue.add(this.description);
		return true;
	};
	
	this.onMove = function()
	{
		World.queue.add(this.action);
		var r = World.map.initFoV(this.x, this.y, 2, 1);
		World.player.explore(r);
		return true;
	};
}

TConfig.objects[KEY_OBJECT][OBJECT_TORCH] = new TObjectTorch();