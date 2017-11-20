function TSkillForce()
{
	ExtClass.call(this, {AbstractSkill: null});
	
	this.audio = 'audio/skill-spell.mp3';
	this.cost  = 4;
	this.range = 1;
	
	this.onApply = function(object, object_type)
	{
		if(object_type != KEY_ENEMY)
			return false;
			
		World.chooseSkill(SKILL_ATTACK);
		
		if(World.player.mp < this.cost)
			return false;
			
		World.player.mp -= this.cost;
		World.raiseEvent(LOG_CAST, object_type, object, object.level, this.id);		
		World.menu.need_draw = 1;
		World.menu.draw();
		
		if(object.hasAbility(TRAIT_CHAMPION))
		{
			World.queue.add(lang('skills.failChampion.' + this.id));
			return false;
		}
		
		var dx = World.player.x - object.x;
		var dy = World.player.y - object.y;
		
		if(!object.move(object.x - dx,object.y - dy))
		{
			World.queue.add(lang('skills.failNoSpace.' + this.id));
			return false;
		}
		
		World.queue.add(lang('skills.use.' + this.id));
		return true;
	};
	
	this.onClick = function()
	{
		if(World.player.mp < this.cost)
			return false;
			
		return true;
	};
	
	return true;
}

addSkill(new TSkillForce(),SKILL_FORCE);