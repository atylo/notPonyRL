function TSkillTwilightBasics()
{
	ExtClass.call(this, {AbstractSkill: null});
	
	this.audio = 'audio/skill-pray.mp3';
	this.cost     = 5;
	this.one_time = true;
	
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
		
		World.player.addSkill(SKILL_MISSILE);
			
		World.menu.need_draw = 1;
		World.menu.draw();
		World.queue.draw();
		
		return false;
	};
};

addSkill(new TSkillTwilightBasics(), SKILL_TWILIGHT_BASICS);