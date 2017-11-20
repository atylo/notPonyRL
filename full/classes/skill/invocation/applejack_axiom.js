function TSkillApplejackAxiom()
{
	ExtClass.call(this, {AbstractSkill: null});
	
	this.audio = 'audio/skill-pray.mp3';
	this.cost     = 4;
	this.add_cost = 4;
	
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

			//bypasses the corruption >=3 limit and that's why does not use the addCorruption() function.
		World.player.addCorruption(-3);
		World.player.addWeakness(-1);
					
		World.menu.need_draw = 1;
		World.draw();
		
		return false;
	};
}

addSkill(new TSkillApplejackAxiom(), SKILL_APPLEJACK_AXIOM);