function TSkillRarityArmor()
{
	ExtClass.call(this, {AbstractSkill: null});
	
	this.audio = 'audio/skill-pray.mp3';
	this.cost     = 5;
	this.add_cost = 2;
	
	this.onClick = function()
	{
		if(World.player.piety < this.getCost() || World.player.gp < this.getCost())
		{
			World.chooseSkill(SKILL_ATTACK);
			return false;
		}
		
		World.player.piety -= this.getCost();
		World.player.gp    -= this.getCost();
		World.player.incFlag(FLAG_SKILL, this.id);
		
		World.queue.add(lang('skills.use.' + this.id));
		World.raiseEvent(LOG_INVOKE, false, false, false, this.id);
		
		World.raiseEvent(LOG_MOD_CHANGE, MOD_ARMOR, World.player, 1, lang('skills.' + this.id + '.title'));
			
		World.menu.need_draw = 1;
		World.menu.draw();
		World.queue.draw();
		
		return false;
	};
};

addSkill(new TSkillRarityArmor(), SKILL_RARITY_ARMOR);