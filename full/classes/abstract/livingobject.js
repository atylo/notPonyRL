/**
 * AbstractObject class
 * Represents an abstract object on the map.
 * Every map object is an instance of such an object, and this is important!
 * 
 * @return
 */

function AbstractLivingObject()
{
	ExtClass.call(this, {AbstractObject: null});
	
	this.is_player = false;

	this.abilities  = [];
	this.effects    = [];
	this._religion  = RELIGION_NONE;

	this.z      = 0;
	
		// last movement direction
	this.dx = 0;
	this.dy = 0;

		// Dynamic traits
	this.hp     = 0;
	this.mp     = 0;
	this.gp     = 0;
	this.level  = 1;
	this.exp    = 0;


		// Common bonuses
	this.mods     = [];
	
	this.hp_add   = 0;
	this.att_add  = 0;
	this.mp_add   = 0;
	
	this.hp_mult  = 1;
	this.att_mult = 1;
	this.mp_mult  = 0;
	
	this.hp_regen_mult = 1;
	this.mp_regen_mult = 1;
	
					// different numerical effects
		// corruption effect = +2.5% att, -5% hp. Integrity reverses.
	this.corruption = 0;
		// lifesteal effect = +5% health lifestealed
	this.lifesteal = 0;
		// weakness effect = -1 and -5% to attack power.
	this.weakness = 0;
	
		// Defence = 5% for each 1.
	this.phys_def = 0;
	this.mag_def  = 0;
	
		// battle message
	this.battle_mode = [BATTLE_REGULAR];
	

	this.addCorruption = function(value)
	{
			// corruption-integrity sign changes 
		if (this.corruption > 0 && value < 0 && -value > this.corruption) 
		{
			World.raiseEvent(LOG_MOD_CHANGE, MOD_ATTACK_MULT, this, -this.corruption*0.025, lang('abilities.' + TRAIT_CORRUPTION));
			World.raiseEvent(LOG_MOD_CHANGE, MOD_HP_MULT, this, this.corruption*0.05 , lang('abilities.' + TRAIT_CORRUPTION));
			World.raiseEvent(LOG_MOD_CHANGE, MOD_ATTACK_MULT, this, (value + this.corruption)*0.025, lang('abilities.' + TRAIT_INTEGRITY));
			World.raiseEvent(LOG_MOD_CHANGE, MOD_HP_MULT, this, -(value + this.corruption)*0.05 , lang('abilities.' + TRAIT_INTEGRITY));
		}
		else if (this.corruption < 0 && value > 0 && value > -this.corruption)
		{
			World.raiseEvent(LOG_MOD_CHANGE, MOD_ATTACK_MULT, this, -this.corruption*0.025, lang('abilities.' + TRAIT_INTEGRITY));
			World.raiseEvent(LOG_MOD_CHANGE, MOD_HP_MULT, this, this.corruption*0.05 , lang('abilities.' + TRAIT_INTEGRITY));
			World.raiseEvent(LOG_MOD_CHANGE, MOD_ATTACK_MULT, this, (value + this.corruption)*0.025, lang('abilities.' + TRAIT_CORRUPTION));
			World.raiseEvent(LOG_MOD_CHANGE, MOD_HP_MULT, this, -(value + this.corruption)*0.05 , lang('abilities.' + TRAIT_CORRUPTION));
		}
		else if (value > 0)
		{
			World.raiseEvent(LOG_MOD_CHANGE, MOD_ATTACK_MULT, this, value*0.025, lang('abilities.' + TRAIT_CORRUPTION));
			World.raiseEvent(LOG_MOD_CHANGE, MOD_HP_MULT, this, -value*0.05 , lang('abilities.' + TRAIT_CORRUPTION));
		}
		else 
		{
			World.raiseEvent(LOG_MOD_CHANGE, MOD_ATTACK_MULT, this, value*0.025, lang('abilities.' + TRAIT_INTEGRITY));
			World.raiseEvent(LOG_MOD_CHANGE, MOD_HP_MULT, this, -value*0.05 , lang('abilities.' + TRAIT_INTEGRITY));
		}
		
		this.corruption += value;

		if(this.is_player)
		{
			World.raiseEvent(LOG_STATE, false, TRAIT_CORRUPTION, false, value);	
			if(this.corruption >= 10 + Math.floor(this.level/5) && this.corruption < 12 + Math.floor(this.level/5))
				World.queue.add(lang('event.corrupted.almost'));
			if(this.corruption >= 12 + Math.floor(this.level/5))
			{
				World.queue.add(lang('event.corrupted.end'));
				World.changeGameState(STATE_SPLASH_SCREEN, [ENDING_CORRUPTION, World.getHandler().isValidForAchievements]);	
			}
		}
		
		return true;
	};
	
	this.addAbility = function(ability)
	{
		if(this.hasAbility(ability))
			return false;
		
		this.abilities.push(ability);
		return true;
	}
	
	
	this.addEffect = function(effect)
	{
		if(this.hasEffect(effect))
			return false;
		
		this.effects.push(effect);
		return true;
	};	
	
	this.addWeakness = function(value)
	{
		if(value < 0 && value < -1*this.weakness)
			value = -1*this.weakness;
		
		this.weakness += value;
		
		World.raiseEvent(LOG_MOD_CHANGE, MOD_ATTACK_MULT, this, -value*0.05, lang('abilities.' + TRAIT_WEAKNESS));
		World.raiseEvent(LOG_MOD_CHANGE, MOD_ATTACK_BASE, this, -value, lang('abilities.' + TRAIT_WEAKNESS));
		
		if(this.is_player)
			World.raiseEvent(LOG_STATE, false, TRAIT_WEAKEN, false, value);	
			
		return true;
	};
	
	
	this.applyAttackEffects = function(npc)
	{
		if(npc.hasAbility(TRAIT_CHAMPION))
			return false;
		
		var res = this.attackEffects();
		for(var i in res)
			if(!npc.hasEffect(res[i]))
			{
				npc.effects.push(res[i]);
				if(npc.is_player)
					World.raiseEvent(LOG_STATE, KEY_ENEMY, res[i], this.level, 1);
				
				if(res[i] === EFFECT_MANA_DRAIN)
					npc.mp = 0;
				if(res[i] === EFFECT_CURSED)
					npc.removeEffect(EFFECT_DEATH_WARD);
			}
		
		if(this.hasAbility(TRAIT_WEAKEN) && npc.getAttack() > 0)
			npc.addWeakness(1);
		
		if(this.hasAbility(TRAIT_SCARY) && npc.getAttack() > 0)
			npc.addEffect(EFFECT_SCARED);
		
		return true;
	};
	
	this.applyModChange = function(e)
	{
		if (e[EVENT_TYPE] !== LOG_MOD_CHANGE)
			return false;
			
		var t = e[EVENT_TARGET_TYPE];
		var cause =  parseTitle(e[EVENT_TAG]);

		if (this.mods[t] === undefined)
			this.mods[t] = [];

		var found = false;

		for (var i = 0; i < this.mods[t].length; i++)
		{
			if (this.mods[t][i][1] == cause)
			{
				this.mods[t][i][0] += e[EVENT_TARGET_LVL];
				found = true;
				if (this.mods[t][i][0] == 0)
					this.mods[t].splice(i,1);
				break;
			}
		}
		
		if (!found)
			this.mods[t].push([e[EVENT_TARGET_LVL],cause]);
			
		if (t === MOD_HP_BASE || t === MOD_HP_MULT)
			if (this.hp > this.getMaxHP())
				this.hp = this.getMaxHP();
		
		if (t === MOD_MP_BASE || t === MOD_MP_MULT)
			if (this.mp > this.getMaxMP())
				this.mp = this.getMaxMP();
	};
	
	this.attackEffects = function()
	{
		var res = [];
		
		if(this.hasAbility(TRAIT_MANA_DRAIN)) res.push(EFFECT_MANA_DRAIN);
		if(this.hasAbility(TRAIT_CURSED))     res.push(EFFECT_CURSED);
		if(this.hasAbility(TRAIT_POISON) || this.hasEffect(EFFECT_WHINE))
			res.push(EFFECT_POISON);
		
		return res;
	};
	
	this.getAttack = function(need_details)
	{
		var base  = this.getAttackBase();
		var descr = '';
		
		if(need_details === undefined) need_details = false;
		
				// multiplier
		var data = {};
		data.effects    = [];
		data.details    = need_details;
		data.multiplier = 100;
		data.postfix    = '%';
		
		if(this.hasAbility(TRAIT_BERSERK) && this.hp > 0)
		{
			var maxHp = this.getMaxHP();
			data.effects.push([Math.floor((maxHp - this.hp)/maxHp), parseTitle(lang("abilities." + TRAIT_BERSERK))]);
		}
		
		if(this.hasEffect(EFFECT_EMPOWER))
			data.effects.push([0.3, parseTitle(lang("abilities." + EFFECT_EMPOWER))]);
		
		if(this.hasEffect(EFFECT_SCARED))
			data.effects.push([-0.2, parseTitle(lang("abilities." + EFFECT_SCARED))]);

		if(this.hasAbility(TRAIT_CHAMPION))
			data.effects.push([0.02*this.level, parseTitle(lang("abilities." + TRAIT_CHAMPION))]);

		if(this.is_player && this.hasFlag(FLAG_SPECIAL, TRAIT_FLANKING))
			data.effects.push([0.05*this.hasFlag(FLAG_SPECIAL, TRAIT_FLANKING), parseTitle(lang("abilities." + TRAIT_FLANKING))]);

		var mult_data  = this.getStatDetals(MOD_ATTACK_MULT, data);
		var mult       = mult_data[0]/100 + 1;
		var mult_descr = mult_data[1];
		
				// addition!
		data.effects    = [];
		data.details    = need_details;				
		data.multiplier = 1;
		data.postfix    = '';
				
		var add_data  = this.getStatDetals(MOD_ATTACK_BASE, data);	
		var add       = add_data[0];
		var add_descr = add_data[1];
		
				// final calculations
		var sum = Math.floor(Math.floor(base*mult)+add);
		if(sum < 0)
			sum = 0;
		
				// description
		if(need_details)
		{
			descr  = lang('skills.' + SKILL_ATTACK + '.title');
			descr += lang('skills.' + SKILL_ATTACK, {'b': base});
			
			if(mult_descr !== '')
				descr += lang('attr.multiplier', {'r': mult*100, 'm': mult_descr});
			if(add_descr !== '')
				descr += lang(((add >= 0)?'attr.bonus':'attr.penalty'), {'r': add, 'm': add_descr});
			
			if(sum !== base)
				descr += lang('attr.total', {'r': sum});
		}
		
		return (need_details)?[sum, descr]:sum;
	};
	
	this.getAttackBase = function()
	{
		var l = this.level;
		var b = 0;
		if(!this.is_player)
		{
			b = Math.floor(((l*l)/1.5 + l + 2.5)*this.att_mult + this.att_add);
			if(l === 2)
				b -= 1;
		}
		else
			b = Math.floor((l*l*0.25 + l*5)*this.att_mult + this.att_add);
		
		return b;
	};

	this.getBattleMessage = function()
	{
		if(this.is_player)
		{	
			var strikeString = "";
			var tempArr = [BATTLE_REGULAR];
			
			if (World.player.hasBattleMode(BATTLE_RAINBOW))
				tempArr.push(BATTLE_RAINBOW);
			if (World.player.hasBattleMode(BATTLE_SICKLE))
				tempArr.push(BATTLE_SICKLE);
			if (World.player.hasBattleMode(BATTLE_NET))
				tempArr.push(BATTLE_NET);
				
			strikeString = lang('battle.strike.' + tempArr[World.seedRandom.mt_rand(0, tempArr.length-1)]);
			
			if (World.player.hasBattleMode(BATTLE_NAKED))
				tempArr.push(BATTLE_NAKED);
			
			for (var i = 1; i<tempArr.length; i++)
				strikeString = strikeString + lang('battle.effect.' + tempArr[i]);
			
			return strikeString;
		};
		
		return lang('npc.' + this.id + '.combat');
	};
	
	this.getHit = function(att, is_magical)
	{
		var defPercent = (is_magical)?this.getMagDef():this.getPhysDef();
		return Math.floor(att*(100 - defPercent)/100);
	};
	
	this.getMagDef = function(need_details)
	{
		if(need_details === undefined)
			need_details = false;
		
		var data = {
				effects    : [],
				postfix    : '%',
				multiplier : 5,
				details    : need_details
			};
		
		if(this.hasEffect(EFFECT_STONESKIN))
			data.effects.push([3, parseTitle(lang("abilities." + EFFECT_STONESKIN))]);
		if(this.is_player && this.hasFlag(FLAG_SPECIAL, TRAIT_CAMOUFLAGE))
			data.effects.push([0.4*this.hasFlag(FLAG_SPECIAL, TRAIT_CAMOUFLAGE), parseTitle(lang("abilities." + TRAIT_CAMOUFLAGE))]);
		
		var s = this.getStatDetals(MOD_RESIST, data);
		var val  = s[0];
		var desc = s[1];
		
		if(this.hasEffect(EFFECT_CURSED) && s[0] > 0)
		{
			desc += lang('effect.bad', {'v': -s[0], 't': parseTitle(lang("abilities." + EFFECT_CURSED))});
			val  = 0;
		}
		
		if (val > 80)
			val = 80;

		if(val !== s[0])
			desc += lang('attr.total', {'r': val});
		
		return (need_details)?[val, desc]:val;
	};
	
	this.getMaxHP = function(need_details)
	{
		var base  = this.getMaxHPBase();
		var descr = '';
		
		if(need_details === undefined) need_details = false;
		
				// multiplier
		var data = {};
		data.effects    = [];
		data.details    = need_details;
		data.multiplier = 100;
		data.postfix    = '%';

		if(this.hasAbility(TRAIT_CHAMPION))
			data.effects.push([0.035*this.level, parseTitle(lang("abilities." + TRAIT_CHAMPION))]);
		
		var mult_data  = this.getStatDetals(MOD_HP_MULT, data);
		var mult       = mult_data[0]/100 + 1;
		var mult_descr = mult_data[1];
		
				// addition!
		data.effects    = [];
		data.details    = need_details;				
		data.multiplier = 1;
		data.postfix    = '';
				
		var add_data  = this.getStatDetals(MOD_HP_BASE, data);	
		var add       = add_data[0];
		var add_descr = add_data[1];
		
				// final calculations
		var sum = Math.floor(Math.floor(base*mult)+add);
		if(sum < 1)
			sum = 1;
		
				// description
		if(need_details)
		{
			data.effects = [];
			if(this.hasAbility(TRAIT_REGENERATE))
				data.effects.push([1, parseTitle(lang("abilities." + TRAIT_REGENERATE))]);
			
			data.details    = need_details;				
			data.multiplier = 100;
			data.postfix    = '%';
			
			var regen_data  = this.getStatDetals(MOD_HP_REGEN, data);
			var regen       = regen_data[0]/100 + 1;
			var regen_descr = regen_data[1];
			
			descr = lang('attr.' + ATTR_HP, {'b': base});
			
			if(mult_descr !== '')
				descr += lang('attr.multiplier', {'r': mult*100, 'm': mult_descr})
			if(add_descr !== '')
				descr += lang(((add >= 0)?'attr.bonus':'attr.penalty'), {'r': add, 'm': add_descr})
			if(base !== sum)
				descr += lang('attr.total', {'r': sum});
			if(regen_descr !== '')
				descr += lang('attr.regen', {'r': regen*100, 'm': regen_descr})
		}
		
		return (need_details)?[sum, descr]:sum;
	};
	
	this.getMaxHPBase = function()
	{
		var l = this.level;
		var l = this.level;
		var b = 0;
		if(!this.is_player)
		{
			b = Math.floor(((l*l*4)/3 + l*4.5 + 0.5)*this.hp_mult + this.hp_add);
			if(l === 2)
				b -= 1;
		}
		else
			b = Math.floor(((l*l*2)/3 + l*10)*this.hp_mult + this.hp_add);
		
		return b;		
	};
	
	this.getMaxMP = function(need_details)
	{
		var base  = this.getMaxMPBase();
		var descr = '';
		
		if(need_details === undefined) need_details = false;
		
				// multiplier
		var data = {};
		data.effects    = [];
		data.details    = need_details;
		data.multiplier = 100;
		data.postfix    = '%';

		if(this.hasAbility(TRAIT_CHAMPION))
			data.effects.push([0.035*this.level, parseTitle(lang("abilities." + TRAIT_CHAMPION))]);
		
		var mult_data  = this.getStatDetals(MOD_MP_MULT, data);
		var mult       = mult_data[0]/100 + 1;
		var mult_descr = mult_data[1];
		
				// addition!
		data.effects    = [];
		data.details    = need_details;				
		data.multiplier = 1;
		data.postfix    = '';
				
		var add_data  = this.getStatDetals(MOD_MP_BASE, data);	
		var add       = add_data[0];
		var add_descr = add_data[1];
		
				// final calculations
		var sum = Math.floor(Math.floor(base*mult)+add);
		if(sum < 0)
			sum = 0;
		
				// description
		if(need_details)
		{
			data.effects = [];
			if(this.hasAbility(TRAIT_REGENERATE))
				data.effects.push([1, parseTitle(lang("abilities." + TRAIT_REGENERATE))]);
			
			data.details    = need_details;				
			data.multiplier = 100;
			data.postfix    = '%';
			
			var regen_data  = this.getStatDetals(MOD_MP_REGEN, data);
			var regen       = regen_data[0]/100 + 1;
			var regen_descr = regen_data[1];
			
			descr = lang('attr.' + ATTR_MP, {'b': base});
			
			if(mult_descr !== '')
				descr += lang('attr.multiplier', {'r': mult*100, 'm': mult_descr})
			if(add_descr !== '')
				descr += lang(((add >= 0)?'attr.bonus':'attr.penalty'), {'r': add, 'm': add_descr})
			if(base !== sum)
				descr += lang('attr.total', {'r': sum});			
			if(regen_descr !== '')
				descr += lang('attr.regen', {'r': regen*100, 'm': regen_descr})
		}
		
		return (need_details)?[sum, descr]:sum;		
	};
	
	this.getMaxMPBase = function()
	{
		return Math.floor(10*this.mp_mult + this.mp_add);
	}
		
	this.hasAbility = function(ability)
	{
		for(var i in this.abilities)
			if(this.abilities[i] == ability)
				return true;
		
		return false;
	}
	
	this.hasAbilityLevel = function(ability)
	{
		var times = 0
		for(var i in this.abilities)
		{
			if(this.abilities[i] == ability)
				times ++;
		}		
		return times;
	}
	
	this.hasEffect = function(effect)
	{
		for(var i in this.effects)
			if(this.effects[i] == effect)
				return true;
		
		return false;
	}
	
	this.heal = function(num, msg)
	{
		if(this.hp >= this.getMaxHP())
			return false;

		this.hp += num;
		if(this.hp > this.getMaxHP())
			this.hp = this.getMaxHP();
			
		if(msg)             World.queue.add(msg);
		if(this.is_player)  World.menu.need_draw = 1;
		
		return true;
	};
	
	this.getMod = function(type, cause)
	{
		if (this.mods[type] === undefined)
			return false;
			
		cause = parseTitle(cause);

		for (var i = 0; i < this.mods[type].length; i++)
			if (this.mods[type][i][1] === cause)
				return this.mods[type][i][0];
		
		return false;
	};
	
	this.getPhysDef = function(need_details)
	{
		if(need_details === undefined)
			need_details = false;
		
		var data = {};
		data.effects    = [];
		data.postfix    = '%';
		data.multiplier = 5;
		data.details    = need_details;
		
		if(this.hasEffect(EFFECT_STONESKIN))
			data.effects.push([3, parseTitle(lang("abilities." + EFFECT_STONESKIN))]);
		if(this.is_player && this.hasFlag(FLAG_SPECIAL, TRAIT_CAMOUFLAGE))
			data.effects.push([0.4*this.hasFlag(FLAG_SPECIAL, TRAIT_CAMOUFLAGE), parseTitle(lang("abilities." + TRAIT_CAMOUFLAGE))]);
		
		var s = this.getStatDetals(MOD_ARMOR, data);
		var val  = s[0];
		var desc = s[1];
		
		if(this.hasEffect(EFFECT_CURSED) && s[0] > 0)
		{
			desc += lang('effect.bad', {'v': -s[0], 't': parseTitle(lang("abilities." + EFFECT_CURSED))});
			val  = 0;
		}
		
		if (val > 80)
			val = 80;
		
		if(val !== s[0])
			desc += lang('attr.total', {'r': val});		
		
		return (need_details)?[val, desc]:val;
	};
	
	this.getStatDetals = function(stat, data)
	{
		var valueStr = '';
		var value    = 0;
		var res      = [];
		
		var baseData = {
				multiplier  : 1,
				postfix     : '',
				effects     : [],
				details     : false
			};
			
		for(var i in baseData)
			if(data[i] === undefined)
				data[i] = baseData[i];
		
		if (this.mods[stat] !== undefined)
			for (var i in this.mods[stat])
				res.push([this.mods[stat][i][0], this.mods[stat][i][1]]);
		
		if(data.effects !== undefined)
			for(var i in data.effects)
				res.push(data.effects[i]);
			
		for(var i in res)
		{
			var val   = Math.floor(res[i][0]*data.multiplier);
			var title = res[i][1];
			
			value    += val;
			
			if(data.details)
			{
				var key = (val > 0)?'attr.good':'attr.bad';			
				val = val + data.postfix;
			
				valueStr += lang(key, {'v': val, 't': title});
			}
		}
		
		return [value, valueStr];
	};	
	
	this.regen = function(res)
	{
	
		var hp_mult = this.hp_regen_mult;
		var mp_mult = this.mp_regen_mult;
	
		if (this.mods[MOD_HP_REGEN] !== undefined)
			for (var i = 0; i < this.mods[MOD_HP_REGEN].length; i++)
				hp_mult += this.mods[MOD_HP_REGEN][i][0];
				
		if (this.mods[MOD_MP_REGEN] !== undefined)
			for (var i = 0; i < this.mods[MOD_MP_REGEN].length; i++)
				mp_mult += this.mods[MOD_MP_REGEN][i][0];
				
		var hp_value = (res[MODE_HP] + res[MODE_ALL])*hp_mult;
		var mp_value = (res[MODE_MP] + res[MODE_ALL])*mp_mult;
		
		
		if(this.hp < this.getMaxHP() && !this.hasEffect(EFFECT_POISON))
		{
			if(this.hasAbility(TRAIT_REGENERATE) == 1)
				hp_value *= 2;
			this.heal(Math.floor(hp_value*this.level));
		}
		
		if(this.mp < this.getMaxMP() && !this.hasEffect(EFFECT_MANA_DRAIN))
			this.restore(Math.floor(mp_value));
		
		return true;
	};	
	
	this.removeAbility = function(ability)
	{
		if(!this.hasAbility(ability))
			return false;
		
		for(var i in this.abilities)
			if(this.abilities[i] == ability)
			{
				this.abilities.splice(i,1)
				break;
			}

		return true;
	};
		
	this.removeEffect = function(effect)
	{
		if(!this.hasEffect(effect))
			return false;
		
		var s = [];
		for(var i in this.effects)
			if(this.effects[i] != effect)
				s.push(this.effects[i]);
		
		this.effects = s;
		return true;
	};
	
	this.restore = function(num, msg)
	{
		if(this.mp >= this.getMaxMP())
			return false;
		
		if(num == 0)
			return false;
		
				// stubborn trait
		if(this.is_player && this._class == CLASS_WARRIOR)
			num = Math.floor(num + 1)/2;
		
		this.mp += num;
		if(this.mp > this.getMaxMP())
			this.mp = this.getMaxMP();

		if(msg)            World.queue.add(lang('event.restore',{'m': msg}));
		if(this.is_player) World.menu.need_draw = 1;
		
		return true;
	};	
}
