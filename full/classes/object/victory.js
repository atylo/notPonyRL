function TVictoryTile()
{
	ExtClass.call(this, {AbstractObject: null});

	this.show         = 'V';
	this.color        = 'DeepSkyBlue';
	this.id           = OBJECT_VICTORY;
	this.z            = 1;
	
	this.init = function(s)
	{
		this.victoryDescription = s;
	};
	
	this.onHover = function()
	{
				// standing on that object already?
		if(World.player.x == this.x && World.player.y == this.y)
			return false;		
		
		World.queue.addAlert(lang('object.' + this.id + '.action.0',{'d': this.getDescription(), 'f': lang('object.' + this.id + '.description.0')}));
		World.queue.drawAlerts();
		return true;
	};
	
	this.onLook = function()
	{
		World.queue.addAlert(lang('object.' + this.id + '.action.0',{'d': this.getDescription(), 'f': lang('object.' + this.id + '.description.0')}));
		return true;
	};
	
	this.onMove = function()
	{
		World.queue.add(lang(lang('object.' + this.id + '.action.0',{'d': this.victoryDescription, 'f': lang('object.' + this.id + '.action.1')})));
		World.raiseEvent(LOG_ACTIVATE, KEY_OBJECT, this.id, false, false);
		World.changeGameState(STATE_SPLASH_SCREEN, [ENDING_GOOD, World.getHandler().isValidForAchievements]);
		return true;
	};
}

TConfig.objects[KEY_OBJECT][OBJECT_VICTORY] = new TVictoryTile();