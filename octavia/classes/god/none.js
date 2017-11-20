function TGodNone()
{
	ExtClass.call(this, {AbstractGod: null});
	
	this.color = 'white';
}

addGod(new TGodNone(), RELIGION_NONE);