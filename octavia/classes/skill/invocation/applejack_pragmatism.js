function TSkillApplejackPragmatism()
{
	ExtClass.call(this, {AbstractSkill: null});
	
	this.audio = 'audio/skill-pray.mp3';
	this.cost     = 3;
	this.add_cost = 3;
	
	this.onClick = function()
	{
		if(World.player.piety < this.getCost() || World.player.mp < 2)
		{
			World.chooseSkill(SKILL_ATTACK);
			return false;
		}
						
		World.player.piety -= this.getCost();
		World.player.incFlag(FLAG_SKILL, this.id);
		World.queue.add(lang('skills.use.' + this.id));
		World.raiseEvent(LOG_INVOKE, false, false, false, this.id);

		World.player.gp     += Math.floor(World.player.mp/2);
		World.player.mp      = World.player.mp%2;

		World.menu.need_draw = 1;
		World.draw();
		
		return false;
	};
}

addSkill(new TSkillApplejackPragmatism(), SKILL_APPLEJACK_PRAGMATISM);