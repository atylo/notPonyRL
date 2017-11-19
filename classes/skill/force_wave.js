function TSkillForceWave()
{
	ExtClass.call(this, {AbstractSkill: null});
	
	this.audio = 'audio/skill-spell-2.mp3';
	this.cost  = 6;
	this.range = 1;
			
	this.getFullStrength = function()
	{
		var strength = this.getStrength();
		var num      = 0;
		
		for(var y = World.player.y - 1; y <= World.player.y + 1; y++)
			for(var x = World.player.x - 1; x <= World.player.x + 1; x++)
				if(World.map.objects[y] != undefined && World.map.objects[y][x] != undefined && World.map.objects[y][x].length > 0)
					for(var z in World.map.objects[y][x])
						if(World.map.objects[y][x][z].getType() == KEY_ENEMY)
						{
							num += 1;
							break;
						}
			
		strength = strength*num;
		
		return strength;
	}
	
	this.getStrength = function()
	{
		return Math.floor(World.player.level*2);
	}
	
	this.onClick = function()
	{
		if(World.player.mp < this.cost || this.getStrength() == 0)
		{
			World.chooseSkill(SKILL_ATTACK);
			return false;
		}
		
		World.turns++;
		World.raiseEvent(LOG_TURN_PASSED, false, false, false, World.turns);
		World.player.mp -= this.cost;
		World.queue.add(lang('skills.use.' + SKILL_FORCE_WAVE));

		
		var str = this.getFullStrength();
		
		for(var y = World.player.y - this.range; y <= World.player.y + this.range; y++)
			for(var x = World.player.x - this.range; x <= World.player.x + this.range; x++)
				if(World.map.objects[y] != undefined && World.map.objects[y][x] != undefined && World.map.objects[y][x].length > 0)
					for(var z in World.map.objects[y][x])
						if(World.map.objects[y][x][z].getType() == KEY_ENEMY)
						{
							World.raiseEvent(LOG_CAST, false, World.map.objects[y][x][z], World.map.objects[y][x][z].level, this.id);
							if(World.map.objects[y][x][z].hasEffect(EFFECT_PEACEFUL)) 
								World.map.objects[y][x][z].removeEffect(EFFECT_PEACEFUL); 
		
							var r      = World.map.objects[y][x][z].getHit(str, true);
							
							World.map.objects[y][x][z].hp      -= r;
							World.raiseEvent(LOG_MOD_CHANGE, MOD_HP_MULT, World.map.objects[y][x][z], -0.05, lang('skills.' + this.id + '.title'));

							if(World.map.objects[y][x][z].hp > World.map.objects[y][x][z].getMaxHP())
								World.map.objects[y][x][z].hp = World.map.objects[y][x][z].getMaxHP();

							var res = [];
							res[BATTLE_INFLICTED] = r;
							res[BATTLE_RECEIVED]  = 0;

							World.menu.need_draw = 1;

							if(World.map.objects[y][x][z].hp <= 0 && World.map.objects[y][x][z].hasEffect(EFFECT_DEATH_WARD)) 
							{
								World.map.objects[y][x][z].hp = 1;
								
								World.map.objects[y][x][z].removeEffect(EFFECT_DEATH_WARD);
							}

							if(res[BATTLE_INFLICTED] > 0)
							{
								var t = lang('skills.use.hit.' + SKILL_FORCE_WAVE, {'n': World.map.objects[y][x][z].getTitle()});
								World.queue.add(lang('battle.hit', {'d': r,'m': t}));
							}
							
							if(World.map.objects[y][x][z].hp <= 0)
							{
								World.map.invalidate(x, y);
								World.map.objects[y][x][z].onDeath(true);
							}
						}
		
		World.queue.draw();
		World.draw();
		
		return false;
	};
	
	this.onHover = function(object, object_type)
	{
		if(object_type != KEY_ENEMY)
			return false;

		var r      = object.getHit(this.getFullStrength(), true);
		
		var res = [];
		res[BATTLE_INFLICTED] = r;
		res[BATTLE_RECEIVED]  = 0;
		res[BATTLE_RESULT]    = false;
		
		World.menu.showEnemy(object, res);
		
		var str = object.getDescription();
		if(res[BATTLE_RESULT])
			str += lang('br') + res[BATTLE_RESULT];
			
		World.queue.addAlert(str);
		World.queue.drawAlerts();

		return true;
	};
}

addSkill(new TSkillForceWave(), SKILL_FORCE_WAVE);