function TSkillWhine()
{
	ExtClass.call(this, {AbstractSkill: null});
	
	this.audio = 'audio/skill-spell-2.mp3';
	this.cost  = 7;
	
	this.onClick = function()
	{
		if(World.player.mp < this.cost || World.player.hasEffect(EFFECT_WHINE))
		{
			World.chooseSkill(SKILL_ATTACK);
			return false;
		}
		
		World.turns++;
		World.raiseEvent(LOG_TURN_PASSED, false, false, false, World.turns);
		World.player.mp -= this.cost;
		World.queue.add(lang('skills.use.' + this.id));
		World.raiseEvent(LOG_CAST, false, false, false, this.id);
		
		World.player.effects.push(EFFECT_WHINE);
		World.menu.need_draw = 1;
		World.menu.draw();
		
		return false;
	};
}

addSkill(new TSkillWhine(),SKILL_WHINE)
