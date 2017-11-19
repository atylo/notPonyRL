function TObjectAlthar()
{
	ExtClass.call(this, {AbstractObject: null});

	this.show         = '_';
	this.color        = 'gray';
	this.id           = OBJECT_ALTHAR;
	this.god          = RELIGION_NONE;
	this.z            = 1;
	
	this.convertMenu = function()
	{
		
	};

	this.getGod = function()
	{
		return TConfig.objects[KEY_GOD][this.god];
	};
	
	this.getDescription = function()
	{
		var s = [lang('object.' + this.id + '.description.' + this.god)];
		
		if(this.getGod().id != World.player.getGod().id)
		{
			if(this.getGod().canConvert())
				s.push(lang('religion.convert'));
		}
		else
			s.push(this.getGod().getPietyString());
				
		s.push(this.getGod().getDescription());
		s.push(lang('cleaner'));
		
		return s.join(lang('br'));
	};
	
	this.initGod = function(god)
	{
		if(god == undefined)
		{
			var gods = new Array()
			for(i in TConfig.objects[KEY_GOD])
			{
				var cur_god = TConfig.objects[KEY_GOD][i];
				if(cur_god.achievement && World.wrapper.achievements[cur_god.achievement] == undefined)
					continue;
				
				if(i != RELIGION_NONE)
					gods.push(TConfig.objects[KEY_GOD][i].id);
			}
			shuffle(gods);
			god = gods[0];
		}
		
		this.god   = god;

		var tgod    = this.getGod();
		this.color = tgod.color;
	};
	
	this.invokeMenu = function()
	{
		
	};
	
	this.onLook = function()
	{
		this.getGod().convert();
		World.queue.add(this.getDescription());		
		return false;
	};
	
	this.onMove = function()
	{
		World.queue.add(this.getDescription());
		return true;
	};
	
	this.renounceMenu = function()
	{
		
	};	
}

TConfig.objects[KEY_OBJECT][OBJECT_ALTHAR] = new TObjectAlthar();
