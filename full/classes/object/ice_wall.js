function TObjectIceWall()
{
	ExtClass.call(this, {AbstractObject: null});

	this.show         = '#';
	this.color        = 'cyan';
	this.id           = OBJECT_ICE_WALL;
	this.z            = 1;
	

	this.init = function()
	{
	
	};
	
	this.onMove = function()
	{
		if (World.player.hasEffect(EFFECT_POISON))
		{
			World.map.removeObject(this);
			World.queue.add(lang('object.' + this.id + '.action.1'));
			World.player.addWeakness(1);
			World.menu.need_draw = 1;
			
		
		}
		else
		{
			World.map.removeObject(this);	
			World.queue.add(lang('object.' + this.id + '.action.0'));
			World.player.addEffect(EFFECT_POISON);
			World.menu.need_draw = 1;
			
		}
		return false;
	};
	
	this.onNPCMove = function (o)
	{
		World.map.removeObject(this);	
		World.queue.add(lang('object.' + this.id + '.action.2'));		
		World.menu.need_draw = 1;
		
		return false;
	}

	
	 this.draw = function(seen)
	 {
		//TODO see how to change colors
		if(seen == SEEN_NO)
			return '';

		if(seen == SEEN_FOG)
			return '<span class="foggy">?</span>';
	
		var colors = ['#00FFFF', '#00CCFF', '#00AAFF', '#0099FF', '#0066FF', '#00AAFF', '#00CCFF', '#00FFFF'];
		var c = (this.x + this.y + World.turns)%colors.length;

		World.map.invalidate(this.x, this.y);

		return '<div style="color: ' + colors[c] + ';" class="t" xyz="' + this.x + ',' + this.y + '">' + this.show + '</div>';
	 };
 
}

TConfig.objects[KEY_OBJECT][OBJECT_ICE_WALL] = new TObjectIceWall();
