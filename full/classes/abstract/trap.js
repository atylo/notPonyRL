/**
 * AbstractObject class
 * Represents an abstract object on the map.
 * Every map object is an instance of such an object, and this is important!
 * 
 * @return
 */

function AbstractTrap()
{
	ExtClass.call(this, {AbstractObject: null});

	this.show        = '^';
	this.color       = 'gray';
	
	this.x      = 0;
	this.y      = 0;

	this.draw = function(seen)
	{
		if(seen != SEEN_VISITED)
			return '';
		
		return '<font color="' + this.color + '" onMouseOut="World.queue.draw();" onMouseOver="World.hover(' + this.x + ',' + this.y + ')">' + this.show + '</font>';
	};
	
	this.isInvisible = function()
	{
		return true;
	};	
	
	this.onHover = function()
	{
		if(World.map.seen[this.y][this.x] != SEEN_VISITED)
			return '';		
		
			// standing on that object already?
		if(World.player.x == this.x && World.player.y == this.y)
			return false;
		
		World.queue.addAlert(this.getDescription());
		World.queue.drawAlerts();
		return true;
	};
	
	this.onLook = function()
	{
		return false;
	};
	
	this.onMove = function()
	{
		return true;
	};
}
