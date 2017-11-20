function AbstractSkill()
{
	this.add_cost = 0;
	this.cost     = 0;
	this.id       = 0;
	this.range    = 100;
	this.one_time = false;
	
	this.audio    = false;
	
	this.canUse = function()
	{
		if(this.one_time && World.player.hasFlag(FLAG_SKILL, this.id))
			return false;
		
		return true;
	};
	
		// no description for most skills
	this.getCost = function()
	{
		var c = this.cost;
		
		if(World.player.hasFlag(FLAG_SKILL, this.id))
			c += World.player.hasFlag(FLAG_SKILL, this.id)*this.add_cost;
		
		return c;
	};
		
	this.getDescription = function()
	{
		var d = lang('skills.' + this.id, {'c': this.getCost(), 's': this.getStrength()});
		return lang('skills.description', {'d': d, 'n': this.getTitle()});
	};

	this.getStrength = function()
	{
		return 0;
	};
	
	this.getTitle = function()
	{
		return lang('skills.' + this.id + '.title');
	};
	
	this.onApply = function(object, object_type)
	{
		return false;
	};
	
	this.onClick = function()
	{
		return false;
	};
	
	this.onHover = function(object, object_type)
	{
		return false;
	};
}
