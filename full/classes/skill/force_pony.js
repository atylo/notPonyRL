function TSkillForcePony()
{
	ExtClass.call(this, {AbstractSkill: null});
	
	this.cost  = 0;
	this.range = 1;
	
	this.onApply = function(object, object_type)
	{
		var dx = World.player.x - object.x;
		var dy = World.player.y - object.y;

		if(object_type != KEY_ENEMY)
		{
			if(Math.abs(dx) + Math.abs(dy) == 2)
			{
				World.queue.add(lang('skills.failBig.' + this.id));
				return true;
			}
			return false;
		}
		
		if(Math.abs(dx) + Math.abs(dy) == 2)
		{
			World.queue.add(lang('skills.failDifficult.' + this.id));
			return false;
		}
		
		if(!object.move(object.x - dx,object.y - dy))
		{
			World.queue.add(lang('skills.failNoSpace.' + this.id));
			return false;
		}
		
		World.player.hp--;
		World.raiseEvent(LOG_CAST, object_type, object, object.level, this.id);		
		
		if(World.player.hp <= 0)
		{
			World.queue.add(lang('skills.use.' + this.id + '.exhaust'));
			World.player.die();
		}
		
		World.menu.need_draw = 1;
		World.menu.draw();
		
		World.queue.add(lang('skills.use.' + this.id, {'n': object.getTitle().toLowerCase()}));
		return true;
	};
	
	this.onClick = function()
	{
		return true;
	};
	
	this.onHover = function(object, object_type)
	{
		if(object_type != KEY_ENEMY)
			return false;

		World.menu.showEnemy(object, []);

		return true;
	};
	
	return true;
}

addSkill(new TSkillForcePony(),SKILL_FORCE_PONY);