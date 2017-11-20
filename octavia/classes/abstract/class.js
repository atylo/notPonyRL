/**
 * Abstract class of player
 * Represents a player class
 * 
 */

function AbstractClass()
{
	this.id          = 0;
	
	this.customNames = function(names, _race)
	{
		return names;
	};
	
	this.getAbilities = function()
	{
		return '';
	};
	
	this.getName = function(race)
	{
		var def   = lang('player.default');
		var t     = World.wrapper.getOption(OPTION_HERO_NAME);
		if(t)
			def   = t;
		
		var names = [[def, 'red']];

		names = this.customNames(names, race);

		shuffle(names);
		return names.pop();
	};
	
	this.init = function(creature)
	{
		return true;
	};
	
	this.react = function(e)
	{
		return true;
	};
	
	this.refresh = function()
	{
		return false;
	};
}
