function TSkillRarityTouch()
{
	ExtClass.call(this, {AbstractSkill: null});
	
	this.audio = 'audio/skill-pray.mp3';
	this.cost     = 5;
	this.add_cost = 0;
	
	
	this.onClick = function()
	{
		if(World.player.piety < this.getCost() || World.player.hasEffect(EFFECT_WHINE))
		{
			World.chooseSkill(SKILL_ATTACK);
			return false;
		}
		
		World.player.piety -= this.getCost();
		World.player.incFlag(FLAG_SKILL, this.id);
		World.queue.add(lang('skills.use.' + this.id));
		World.raiseEvent(LOG_INVOKE, false, false, false, this.id);
		
		World.player.effects.push(EFFECT_WHINE);
		
		World.menu.need_draw = 1;
		World.menu.draw();
		World.queue.draw();
		
		return false;
	};
}

addSkill(new TSkillRarityTouch(), SKILL_RARITY_TOUCH);