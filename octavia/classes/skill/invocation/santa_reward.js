function TSkillSantaReward()
{
	ExtClass.call(this, {AbstractSkill: null});
	
	this.audio = 'audio/skill-pray.mp3';
	this.cost  = 10;
	
	this.onClick = function()
	{
		if(World.player.piety < this.getCost() || World.player.hasFlag(FLAG_SKILL, this.id))
		{
			World.chooseSkill(SKILL_ATTACK);
			return false;
		}
		
		World.player.piety -= this.getCost();
		World.player.incFlag(FLAG_SKILL, this.id);
		World.queue.add(lang('skills.use.' + this.id));
		World.raiseEvent(LOG_INVOKE, false, false, false, this.id);
		
		World.player.heal(1000);
		World.player.restore(1000);
		World.player.removeEffect(EFFECT_MANA_DRAIN);		
		World.player.removeEffect(EFFECT_CURSED);		
		World.player.removeEffect(EFFECT_POISON);	
						
		if(World.player.att_mult < 1)
			World.raiseEvent(LOG_MOD_CHANGE, MOD_ATTACK_MULT, World.player, 0.05, lang('skills.' + this.id + '.title'));
				
		World.menu.need_draw = 1;
		World.menu.draw();
		World.queue.draw();
		
		return false;
	};
}

addSkill(new TSkillSantaReward(), SKILL_SANTA_REWARD);