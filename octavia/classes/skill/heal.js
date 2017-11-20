function TSkillHeal()
{
	ExtClass.call(this, {AbstractSkill: null});
	
	this.audio = 'audio/skill-spell-3.mp3';
	this.cost  = 8;
	
	this.getStrength = function()
	{
		var strength         = Math.floor(World.player.level*2.5);
		if(World.player._class == CLASS_HEALER)
			strength = Math.floor(strength*1.25);
		
		return strength;
	}
	
	this.onClick = function()
	{
		if(World.player.mp < this.cost || World.player.hp == World.player.getMaxHP())
		{
			World.chooseSkill(SKILL_ATTACK);
			return false;
		}
						
		World.player.mp -= this.cost;
		if(World.player._class == CLASS_HEALER)
			World.queue.add(lang('skills.use.pro.' + this.id));
		else
			World.queue.add(lang('skills.use.' + this.id));
		World.raiseEvent(LOG_CAST, false, false, false, this.id);
		
		var s = this.getStrength();
		World.player.heal(s);

		World.draw();
		
		return false;
	};
}
addSkill(new TSkillHeal(),SKILL_HEAL);