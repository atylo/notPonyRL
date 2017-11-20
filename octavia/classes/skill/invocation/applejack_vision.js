function TSkillApplejackVision()
{
	ExtClass.call(this, {AbstractSkill: null});
	
	this.audio = 'audio/skill-pray.mp3';
	this.cost     = 10;
	this.one_time = true;
	
	this.canUse = function()
	{
		if(this.one_time && World.player.hasFlag(FLAG_SKILL, this.id))
			return false;
		if(World.player.level > 9)
			return false;
		
		return true;
	};	
	
	this.onClick = function()
	{
		if(World.player.piety < this.getCost() || World.player.level > 9)
		{
			World.chooseSkill(SKILL_ATTACK);
			return false;
		}
						
		World.player.piety -= this.getCost();
		World.player.incFlag(FLAG_SKILL, this.id);
		World.queue.add(lang('skills.use.' + this.id));
		World.raiseEvent(LOG_INVOKE, false, false, false, this.id);

		World.player.level += 1;
		
		World.menu.need_draw = 1;
		World.draw();
		
		return false;
	};
}

addSkill(new TSkillApplejackVision(), SKILL_APPLEJACK_VISION);