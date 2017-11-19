function TSkillApplejackEvolution()
{
	ExtClass.call(this, {AbstractSkill: null});
	
	this.audio = 'audio/skill-pray.mp3';
	this.cost     = 5;
	this.add_cost = 5;
	
	this.onClick = function()
	{
		if(World.player.piety < this.getCost())
		{
			World.chooseSkill(SKILL_ATTACK);
			return false;
		}
						
		World.player.piety -= this.getCost();
		World.player.incFlag(FLAG_SKILL, this.id);
		World.raiseEvent(LOG_INVOKE, false, false, false, this.id);

		World.raiseEvent(LOG_MOD_CHANGE, MOD_HP_MULT, World.player, 0.05, lang('skills.' + this.id + '.title'));
		if(World.player.hp_mult > 1.5)
			World.queue.add(lang('skills.use.1.' + this.id));
		else
			World.queue.add(lang('skills.use.0.' + this.id));
		
		World.menu.need_draw = 1;
		World.draw();
		
		return false;
	};
}

addSkill(new TSkillApplejackEvolution(), SKILL_APPLEJACK_EVOLUTION);