function TSkillSantaBells()
{
	ExtClass.call(this, {AbstractSkill: null});
	
	this.audio = 'audio/skill-pray.mp3';
	this.cost  = 15;
	
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
						World.map.objects[y][x][z].effects.push(EFFECT_POISON);
		
		World.menu.need_draw = 1;
		World.menu.draw();
		World.queue.draw();
		
		return false;
	};
}

addSkill(new TSkillSantaBells(), SKILL_SANTA_BELLS);