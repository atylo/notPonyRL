function TSkillStare()
{
	ExtClass.call(this, {AbstractSkill: null});
	
	this.audio = 'audio/skill-spell-3.mp3';
	this.cost  = 12;

	
	this.onApply = function(object, object_type)
	{
		if(object_type != KEY_ENEMY)
			return false;
		
		World.chooseSkill(SKILL_ATTACK);
		
		if(World.player.mp < this.cost)
			return false;
		
		World.player.mp      -= this.cost;
		World.raiseEvent(LOG_CAST, object_type, object, object.level, this.id);		
		
		World.menu.need_draw  = 1;
		World.menu.draw();
		
		if(object.hasAbility(TRAIT_CHAMPION)) 
		{	
			World.queue.add(lang('skills.failChampion.' + this.id));
			return false;
		}
		
		if(object.hasAbility(TRAIT_BLOODLESS)) 
		{
			World.queue.add(lang('skills.failBloodless.' + this.id));
			return false;	
		}
		
		if(!object.hasEffect(EFFECT_PEACEFUL)) 
		{	
			object.addEffect(EFFECT_PEACEFUL); 
			World.queue.add(lang('skills.use.' + this.id));
			return true;
		}
		
		return false;
	};
	
	this.onClick = function()
	{
		if(World.player.mp < this.cost)
			return false;
		
		return true;
	};
}
addSkill(new TSkillStare(),SKILL_STARE);