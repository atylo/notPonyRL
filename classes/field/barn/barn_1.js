function TFieldBarn1()
{
	ExtClass.call(this, {TFieldBarn: null});
	this.id = FIELD_BARN_1;
	this.fieldFile = 'barn1.html';
}

TConfig.objects[KEY_FIELD][FIELD_BARN_1] = new TFieldBarn1();
addField(FIELD_BARN_1    , REWARD_HUNTMASTER , TYPE_LEVEL);


