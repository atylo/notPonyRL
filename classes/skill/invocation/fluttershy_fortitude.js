function TSkillFluttershyFortitude()
{
	ExtClass.call(this, {AbstractSkill: null});
	
	this.audio = 'audio/skill-pray.mp3';
	this.cost     = 4;
	this.add_cost = 4;
	
	this.onClick = function()
	{
		if(World.player.piety < this.getCost() || World.player.mp == 0)
		{
			World.chooseSkill(SKILL_ATTACK);
			return false;
		}
						
		World.player.piety -= this.getCost();
		World.player.incFlag(FLAG_SKILL, this.id);
		World.queue.add(lang('skills.use.' + this.id));
		World.raiseEvent(LOG_INVOKE, false, false, false, this.id);

		World.raiseEvent(LOG_MOD_CHANGE, MOD_HP_BASE, World.player, World.player.mp, lang('skills.' + this.id + '.title'))
		World.player.hp     += World.player.mp;
		World.player.mp      = 0;
		
		World.player.addEffect(EFFECT_MANA_DRAIN);

		World.menu.need_draw = 1;
		World.draw();
		
		return false;
	};
}

addSkill(new TSkillFluttershyFortitude(), SKILL_FLUTTERSHY_FORTITUDE);