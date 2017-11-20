function TSkillFrostTouch()
{
	ExtClass.call(this, {AbstractSkill: null});
	
	this.audio = 'audio/skill-pray.mp3';
	this.cost  = 25;
	
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
		
		World.player.addEffect(EFFECT_MANA_DRAIN);
		World.raiseEvent(LOG_MOD_CHANGE, MOD_ATTACK_MULT, World.player, World.player.mp/100, lang('skills.' + this.id + '.title'));
		World.player.mp       = 0;
		
		World.menu.need_draw = 1;
		World.menu.draw();
		World.queue.draw();
		
		return false;
	};
}

addSkill(new TSkillFrostTouch(), SKILL_FROST_TOUCH);