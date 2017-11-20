function TSkillFluttershyRemedy()
{
	ExtClass.call(this, {AbstractSkill: null});
	
	this.audio = 'audio/skill-pray.mp3';
	this.cost     = 4;
	this.add_cost = 2;
	
	this.getStrength = function()
	{
		var strength         = Math.floor(World.player.getMaxHP()*0.5);
		if(World.player._class == CLASS_HEALER)
			strength = Math.floor(strength*1.1);
		
		return strength;
	}
	
	this.onClick = function()
	{
		if(World.player.piety < this.getCost() || World.player.hp >= this.getStrength())
		{
			World.chooseSkill(SKILL_ATTACK);
			return false;
		}
						
		World.player.piety -= this.getCost();
		World.player.incFlag(FLAG_SKILL, this.id);
		if(World.player._class == CLASS_HEALER)
			World.queue.add(lang('skills.use.pro.' + this.id));
		else
			World.queue.add(lang('skills.use.' + this.id));
		World.raiseEvent(LOG_INVOKE, false, false, false, this.id);

		if(World.player.corruption > 0)
			World.player.corruption--;
		if(World.player.weakness > 0)
			World.player.weakness--;

		World.player.hp = this.getStrength();
		
		World.menu.need_draw = 1;
		World.draw();
		
		return false;
	};
}

addSkill(new TSkillFluttershyRemedy(), SKILL_FLUTTERSHY_REMEDY);