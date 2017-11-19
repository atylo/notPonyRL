/**
 * AbstractObject class
 * Represents an abstract object on the map.
 * Every map object is an instance of such an object, and this is important!
 * 
 * @return
 */

function AbstractObject()
{
	this.show         = '.';
	this.color        = 'gray';
	this.id           = 0;
	
	this.x            = 0;
	this.y            = 0;
	this.z            = 0;

	this.afterMove = function (o)
	{
		return true;
	}
	
	this.afterNPCMove = function (o)
	{
		return true;
	}

	this.draw = function(seen)
	{
		if(seen == SEEN_NO)
			return '';
		
		if(seen == SEEN_FOG)
			return '<span class="foggy">?</span>';
		
		return '<div style="color: ' + this.color + ';" class="t" xyz="' + this.x + ',' + this.y + '">' + this.show + '</div>';
	};
	
	this.getDescription = function()
	{
		return lang('object.' + this.id + '.description.0');
	};
	
	this.getTitle = function()
	{
		return lang('object.' + this.id + '.title');
	};
	
	this.getType = function()
	{
		return (this.hp !== undefined)?KEY_ENEMY:KEY_OBJECT;
	};
	
	this.init = function()
	{
		
	};
	
	this.initAfterPlacement = function()
	{
		
	};
	
	this.isInvisible = function()
	{
		return false;
	};
	
	this.onHover = function()
	{
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

	this.onNPCMove = function(o)
	{
		return '';
	};
	
	
}
