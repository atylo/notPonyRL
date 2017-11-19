function TSkillBlink()
{
	ExtClass.call(this, {AbstractSkill: null});
	
	this.audio = 'audio/skill-spell.mp3';
	this.cost  = 1;
	
	this.onClick = function()
	{
		if(World.player.mp < this.cost)
		{
			World.chooseSkill(SKILL_ATTACK);
			return false;
		}
		
		World.turns++;
		World.raiseEvent(LOG_TURN_PASSED, false, false, false, World.turns);
		World.player.mp -= this.cost;
		World.queue.add(lang('skills.use.' + this.id));
		World.raiseEvent(LOG_CAST, false, false, false, this.id);
		
		var coords = World.map.getFreeCell();
		
		World.map.invalidate(World.player.x, World.player.y);
		
		World.player.x = coords[0];
		World.player.y = coords[1];
		
		var r = World.map.initFoV(World.player.x, World.player.y, World.player.sight, 1);
		World.player.explore(r);	
		
		for(var y = World.player.y - 1; y <= World.player.y + 1; y++)
			for(var x = World.player.x - 1; x <= World.player.x + 1; x++)
				if(World.map.objects[y] != undefined && World.map.objects[y][x] != undefined && World.map.objects[y][x].length > 0)
					for(var z in World.map.objects[y][x])
						if(World.map.objects[y][x][z].getType() == KEY_ENEMY)
						{
							World.raiseEvent(LOG_MOD_CHANGE, MOD_ATTACK_MULT, World.map.objects[y][x][z], -0.07, lang('items.' + this.id + '.title'));
							World.queue.add(lang('skills.use.hit.' + SKILL_BLINK, {'n': World.map.objects[y][x][z].getTitle()}));
						}
		
		World.draw();
		
		return false;
	};
}

addSkill(new TSkillBlink(),SKILL_BLINK);