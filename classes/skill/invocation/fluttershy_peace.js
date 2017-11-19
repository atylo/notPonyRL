function TSkillFluttershyPeace()
{
	ExtClass.call(this, {AbstractSkill: null});
	
	this.audio = 'audio/skill-pray.mp3';
	this.cost     = 10;
	this.one_time = true;
	
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
					if(World.map.objects[y][x][z].getType() == KEY_ENEMY && World.map.objects[y][x][z].hasAbility(TRAIT_BEAST))
						World.map.objects[y][x][z].addEffect(EFFECT_PEACEFUL);
		
		World.menu.need_draw = 1;
		World.draw();
		
		return false;
	};
}

addSkill(new TSkillFluttershyPeace(), SKILL_FLUTTERSHY_PEACE);