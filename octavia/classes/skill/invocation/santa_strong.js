function TSkillSantaStrong()
{
	ExtClass.call(this, {AbstractSkill: null});
	
	this.audio = 'audio/skill-pray.mp3';
	this.cost  = 5;
	
	this.getCost = function()
	{
		var c = this.cost;
		if(World.player.hasFlag(FLAG_SKILL, this.id))
			c += World.player.hasFlag(FLAG_SKILL, this.id)*3;
		
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
		
		World.player.addEffect(EFFECT_POISON);
		World.player.addEffect(EFFECT_MANA_DRAIN);
		World.raiseEvent(LOG_MOD_CHANGE, MOD_HP_MULT, World.player, 0.05, lang('skills.' + this.id + '.title'));
		World.player.mp       = 0;
		
		World.menu.need_draw = 1;
		World.menu.draw();
		World.queue.draw();
		
		return false;
	};
}

addSkill(new TSkillSantaStrong(), SKILL_SANTA_STRONG);