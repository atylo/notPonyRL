function TSkillHoard()
{
	ExtClass.call(this, {AbstractSkill: null});
	
	this.audio = 'audio/skill-spell-3.mp3';
	this.cost  = 0;

	this.getStrength = function()
	{
		return Math.floor(World.player.gp / 2 + 0.5);
	};

	this.onClick = function()
	{
		var f         = World.player.hasFlag(FLAG_SPECIAL, SKILL_HOARD) * 1;
		var old_stage = this.getCurrentStage(f);

		console.log(old_stage);
		f += this.getStrength();

		World.player.gp -= this.getStrength();
		World.player.setFlag(FLAG_SPECIAL, SKILL_HOARD, f);
		var new_stage = this.getCurrentStage(f);

		if(new_stage > old_stage)
		{
			if(new_stage%2)
				World.raiseEvent(LOG_MOD_CHANGE, MOD_RESIST, World.player,1, lang('abilities.' + TRAIT_HOARD));
			else
				World.raiseEvent(LOG_MOD_CHANGE, MOD_ARMOR,  World.player,1, lang('abilities.' + TRAIT_HOARD));
		}

		World.menu.need_draw = 1;
		World.draw();

		return false;
	};

	this.getCurrentStage = function(n)
	{
		var i = 0;
		while(n >= 0)
		{
			n -= 2*(i + 1);
			i++;
		}

		return i;
	};

	this.getNextStage = function(n)
	{
		var s = this.getCurrentStage(n);
		var t = 0;
		for(var i = 0; i < s; i++)
			t += 2*(i + 1);

		if(t == 0)
			t += 2*(i + 2);

		return t;
	};

	this.getDescription = function()
	{
		var data = {};

		data.c = this.getStrength();
		data.f = World.player.hasFlag(FLAG_SPECIAL, SKILL_HOARD);

		var d = lang('skills.' + this.id, data);
		return lang('skills.description', {'d': d, 'n': this.getTitle()});
	};
}
addSkill(new TSkillHoard(),SKILL_HOARD);