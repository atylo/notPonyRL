function TFieldBarn2()
{
	ExtClass.call(this, {TFieldBarn: null});
	this.id = FIELD_BARN_2;
	this.fieldFile = 'barn2.html';
}

TConfig.objects[KEY_FIELD][FIELD_BARN_2] = new TFieldBarn2();
addField(FIELD_BARN_2    , REWARD_HUNTMASTER , TYPE_LEVEL);


