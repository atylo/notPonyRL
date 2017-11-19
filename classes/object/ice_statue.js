function TObjectIceStatue()
{
	ExtClass.call(this, {AbstractObject: null});

	this.show         = '@';
	this.color        = 'cyan';
	this.id           = OBJECT_ICE_STATUE;
	this._race        = RACE_ALICORN;
	this.z            = 1;

	this.getDescription = function()
	{
		var race_str = lang('race.' + this._race + '.title');
		return lang('object.' + this.id + '.description.0', {r: race_str.toLowerCase()});
	};

	this.onMove = function()
	{
		return false;
	};
}

TConfig.objects[KEY_OBJECT][OBJECT_ICE_STATUE] = new TObjectIceStatue();
