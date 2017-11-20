function TObjectRainbow()
{
	ExtClass.call(this, {AbstractObject: null});

	this.show         = '~';
	this.color        = 'red';
	this.id           = OBJECT_RAINBOW;
	this.z            = 5;
	this.life         = 0;

	this.draw = function(seen)
	{
		var colors = ['red', 'orange', 'yellow', 'green', 'cyan', 'blue', 'violet'];
		
		if(seen == SEEN_NO)
			return '';
		
		if(seen == SEEN_FOG)
			return '<span class="foggy">?</span>';
		
		this.life--;
		var time = World.turns - this.life;
		var c = (colors[time] == undefined)?'purple':colors[time];
		
		if(colors[time] == undefined)
			World.map.removeObject(this);
		
		World.map.invalidate(this.x, this.y);
		
		return '<div style="color: ' + c + ';" class="t" xyz="' + this.x + ',' + this.y + '">' + this.show + '</div>';
	};
	
	this.init = function()
	{
		this.life = World.turns;
	};
	
	this.onMove = function()
	{
		return true;
	};
}

TConfig.objects[KEY_OBJECT][OBJECT_RAINBOW] = new TObjectRainbow();
