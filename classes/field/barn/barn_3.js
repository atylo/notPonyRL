function TFieldBarn3()
{
	ExtClass.call(this, {TFieldBarn: null});
	this.id = FIELD_BARN_3;
	this.fieldFile = 'barn3.html';
}

TConfig.objects[KEY_FIELD][FIELD_BARN_3] = new TFieldBarn3();
addField(FIELD_BARN_3    , REWARD_HUNTMASTER , TYPE_LEVEL);


