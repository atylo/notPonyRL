function TSkillTwilightLeak()
{
	ExtClass.call(this, {AbstractSkill: null});
	
	this.audio = 'audio/skill-pray.mp3';
	this.cost     = 5;
	this.add_cost = 5;
	
	
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
		
		for(var y in World.map.objects)
			for(var x in World.map.objects[y])
				for(var z in World.map.objects[y][x])
					if(World.map.objects[y][x][z].getType() == KEY_ENEMY)
						World.raiseEvent(LOG_MOD_CHANGE, MOD_RESIST, World.map.objects[y][x][z], -1, lang('skills.' + this.id + '.title'));
		
		World.menu.need_draw = 1;
		World.menu.draw();
		World.queue.draw();
		
		return false;
	};
}

addSkill(new TSkillTwilightLeak(), SKILL_TWILIGHT_LEAK);