function TSkillTalismanWarrior()
{
	ExtClass.call(this, {AbstractSkill: null});
	
	this.audio = 'audio/skill-spell-enchant.mp3';
	this.cost     = 15;
	this.xpCost   = 5;
	this.gpCost   = 15;
	this.one_time = true;
	
	this.getDescription = function()
	{
		var d = lang('skills.' + this.id, {'c': this.getCost(), 'x': this.getExpCost()});
		return lang('skills.description', {'d': d, 'n': this.getTitle()});
	};
			
	this.getExpCost = function()
	{
		return this.xpCost*(World.player.hasFlag(FLAG_RACE, RACE_ZEBRA) + 1);
	};			
		
	this.onClick = function()
	{
		if(World.player.gp < this.gpCost || World.player.exp < this.getExpCost())
		{
			World.chooseSkill(SKILL_ATTACK);
			return false;
		}
		
		World.turns += 2;
		World.raiseEvent(LOG_TURN_PASSED, false, false, false, World.turns);
		World.raiseEvent(LOG_TURN_PASSED, false, false, false, World.turns);
		World.player.receiveGold(-1*this.gpCost);
		World.player.receiveExp(-1*this.getExpCost());
		
		World.player.incFlag(FLAG_RACE, RACE_ZEBRA);
		World.player.incFlag(FLAG_SKILL, this.id);
		World.player.removeSkill(this.id);
		
		World.queue.add(lang('skills.use.' + this.id));
		World.raiseEvent(LOG_CAST, false, false, false, this.id);
		
		World.raiseEvent(LOG_MOD_CHANGE, MOD_MP_BASE, World.player, -3, lang('skills.' + this.id + '.title'));
		if(World.player.mp > World.player.getMaxMP())
			World.player.mp = World.player.getMaxMP();
			
		World.raiseEvent(LOG_MOD_CHANGE, MOD_RESIST, World.player, -3, lang('skills.' + this.id + '.title'));
		World.raiseEvent(LOG_MOD_CHANGE, MOD_ATTACK_MULT, World.player, 0.1, lang('skills.' + this.id + '.title'));
		World.player.abilities.push(TRAIT_FIRST_STRIKE);
		
		World.menu.need_draw = 1;
		World.menu.draw();
		
		return false;
	};
}

addSkill(new TSkillTalismanWarrior(),SKILL_TALISMAN_WARRIOR);
