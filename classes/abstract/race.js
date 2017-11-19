/**
 * Abstract race of player
 * Represents a player race
 * 
 */

function AbstractRace()
{
	this.id          = 0;
	
	this.getAbilities = function()
	{
		return '';
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
