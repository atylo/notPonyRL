function TSkillMagicMissile()
{
	ExtClass.call(this, {AbstractSkill: null});
	
	this.audio = 'audio/skill-spell-3.mp3';
	this.cost  = 7;
	
	this.getStrength = function()
	{
		var strength         = Math.floor(World.player.level*4.5);
		if(World.player.hasAbility(TRAIT_MAGICAL_ATTACK))
			strength = Math.floor(strength*1.2);
		
		return strength;
	}
	
	this.onApply = function(object, object_type)
	{
		if(object_type != KEY_ENEMY)
			return false;
		
		if(World.player.mp < this.cost)
		{
			World.chooseSkill(SKILL_ATTACK);
			return false;
		}
		
		World.player.mp -= this.cost;
		World.raiseEvent(LOG_CAST, object_type, object, object.level, this.id);		
		
		if(object.hasEffect(EFFECT_PEACEFUL)) 
			object.removeEffect(EFFECT_PEACEFUL); 
		
		var r      = object.getHit(this.getStrength(), true);
		object.hp -= r;
		
		var res = [];
		res[BATTLE_INFLICTED] = r;
		res[BATTLE_RECEIVED]  = 0;

		World.menu.need_draw = 1;
		
		if(object.hp <= 0 && object.hasEffect(EFFECT_DEATH_WARD)) 
		{
			object.hp = 1;
			object.removeEffect(EFFECT_DEATH_WARD);
		}
		
		if(res[BATTLE_INFLICTED] > 0)
			World.queue.add(lang('battle.hit', {'d': r,'m': lang('skills.use.' + SKILL_MISSILE)}));
		
		if(object.hp <= 0)
			object.onDeath(true);
		else
			World.menu.showEnemy(object, res);

		if(World.player.mp < this.cost)
			World.chooseSkill(SKILL_ATTACK);
		
		return true;
	};
	
	this.onClick = function()
	{
		if(World.player.mp < this.cost)
			return false;
		
		return true;
	};
	
	this.onHover = function(object, object_type)
	{
		if(object_type != KEY_ENEMY)
			return false;

		var r      = object.getHit(this.getStrength(), true);
		
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

addSkill(new TSkillMagicMissile(),SKILL_MISSILE);