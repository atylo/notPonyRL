function TSkillFrostIceborn()
{
	ExtClass.call(this, {AbstractSkill: null});
	
	this.audio = 'audio/skill-pray.mp3';
	this.cost  = 5;
	
	this.getCost = function()
	{
		var c = this.cost;
		if(World.player.hasFlag(FLAG_SKILL, this.id))
			c += World.player.hasFlag(FLAG_SKILL, this.id)*5;
		
		return c;
	}
	
	this.onClick = function()
	{
		if(World.player.piety < this.getCost())
		{
			World.chooseSkill(SKILL_ATTACK);
			return false;
		}
		
		World.player.piety -= this.getCost();
		World.player.incFlag(FLAG_SKILL, this.id);
		World.queue.add(lang('skills.use.' + this.id));
		World.raiseEvent(LOG_INVOKE, false, false, false, this.id);
		
		World.raiseEvent(LOG_MOD_CHANGE, MOD_RESIST, World.player, 1, lang('skills.' + this.id + '.title'));
		
		if(World.seedRandom.mt_rand(0,10) < World.player.hasFlag(FLAG_SKILL, this.id))
		{
			World.player.color = lang('skills.color.' + this.id);
			World.player._name = lang('skills.name.' + this.id);
		}
		
		World.menu.need_draw = 1;
		World.menu.draw();
		World.queue.draw();
		
		return false;
	};
}

addSkill(new TSkillFrostIceborn(), SKILL_FROST_ICEBORN);