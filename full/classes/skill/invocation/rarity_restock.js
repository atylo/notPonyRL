function TSkillRarityRestock()
{
	ExtClass.call(this, {AbstractSkill: null});
	
	this.audio = 'audio/skill-pray.mp3';
	this.cost     = 2;
	this.add_cost = 2;
	
	this.onClick = function()
	{
		if(World.player.piety < this.getCost() || World.player.getGod().sacrifices.length == 0)
		{
			World.chooseSkill(SKILL_ATTACK);
			return false;
		}
		
		World.player.piety -= this.getCost();
		World.player.incFlag(FLAG_SKILL, this.id);
		World.queue.add(lang('skills.use.' + this.id));
		World.raiseEvent(LOG_INVOKE, false, false, false, this.id);
		
		World.shop.restore(World.player.getGod().sacrifices.pop());
			
		World.menu.need_draw = 1;
		World.menu.draw();
		World.queue.draw();
		
		return false;
	};
};

addSkill(new TSkillRarityRestock(), SKILL_RARITY_RESTOCK);