function TFieldBarn4()
{
	ExtClass.call(this, {TFieldBarn: null});
	this.id = FIELD_BARN_4;
	this.fieldFile = 'barn4.html';
}

TConfig.objects[KEY_FIELD][FIELD_BARN_4] = new TFieldBarn4();
addField(FIELD_BARN_4    , REWARD_HUNTMASTER, TYPE_LEVEL);


