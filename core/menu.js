	function TMenu()
	{
		this.enemy = false;
		
		this.message = function(str)
		{
			this.draw();
			jQuery(TConfig.messageID).html(str);
		};
		
		this.change = function()
		{
			this.need_draw = true;
		};
		
		this.draw = function()
		{
			jQuery("#turn-div", o).html((World.turns + 1));
			
			if(!this.need_draw)
				return false;
			
			this.need_draw = false;
			
			var p = World.player;
			var o = jQuery(TConfig.charmenuID);
			
			var skills = '';
			for(var i in p._skills)
				skills = skills + showSkill(p._skills[i], (p._skills[i] === p.active_skill));
			
			var god_skills = p.getGod().getSkills();
			for(i in god_skills)
				skills = skills + showSkill(god_skills[i], (god_skills[i] === p.active_skill));
				
			jQuery("#skills", o).html(skills);
			
					// health
			var mhp = p.getMaxHP(true);

			jQuery("#hp span", o).html(p.hp + '/' + mhp[0]);
			jQuery("#hp span", o).prop('title', mhp[1]);
			jQuery("#hp div.bar_fill", o).css('width',Math.floor(p.hp/mhp[0]*100) + '%');
			
					// mana
			var mmp = p.getMaxMP(true);
			jQuery("#mp span", o).html(p.mp + '/' + mmp[0]);
			jQuery("#mp span", o).prop('title', mmp[1]);
			if(p.getMaxMP() > 0)
				jQuery("#mp div.bar_fill", o).css('width',Math.floor(p.mp/mmp[0]*100) + '%');
			else
				jQuery("#mp div.bar_fill", o).css('width','0%');
			
					// basic info
			jQuery("#name-div", o).html(p._name);
			jQuery("#race-div", o).html(lang('race.' + p._race + '.title'));
			jQuery("#class-div", o).html(lang('class.' + p._class + '.title'));
			jQuery("#religion-div", o).html(lang('religion.class.' + p._religion));
			jQuery("#level-div", o).html(toRoman(p.level));
			jQuery("#piety-div", o).html(p.piety);
			jQuery("#xp-div", o).html(p.exp);
			jQuery("#need-div", o).html(p.getNecessaryExp());
			
			jQuery("#player-class-img").attr('src', 'images/classes/' + p._class + '.png');
			jQuery("#player-race-img").attr('src', 'images/races/' + p._race + '.png');
			
			jQuery("#field-div", o).attr('title', lang('field.' + World.fieldID + '.title'));
			
			jQuery("#gp-div", o).html(p.gp);
			jQuery("#att-div", o).html(p.getAttack());
			
			var str = showAbilities(p.getPhysDef(true), p.getMagDef(true), p.corruption, p.weakness, p.lifesteal, p.abilities, p.effects);
			str = str + p.getClass().getAbilities();
			str = str + p.getRace().getAbilities();
			str = str + p.getGod().getAbilities();
			
			jQuery("#message", o).html(str);
			
			if(this.enemy && this.enemy.hp > 0)
			{
				var skill = TConfig.skills[World.player.active_skill];
				skill.onHover(World.map.objects[this.enemy.y][this.enemy.x][this.enemy.z], KEY_ENEMY);
			}
			
			return true;
		};
		
		this.hideEnemy = function()
		{
			jQuery("#hp div.substr").css('width','0');
			jQuery("#mp div.substr").css('width','0');
			jQuery("#enemy-holder").hide();
			jQuery("#enemy-message").hide();
			
			this.enemy = false;
		};
		
		this.showEnemy = function(e, res)
		{
			if(!e)
				return false;
			
			this.enemy = e;
			
			if(res[BATTLE_LIFE_ENEMY] === undefined)  res[BATTLE_LIFE_ENEMY] = 0;
			if(res[BATTLE_LIFE_PLAYER] === undefined) res[BATTLE_LIFE_PLAYER] = 0;
			
			jQuery("#enemy-holder").show();
			jQuery("#enemy-message").show();
			
			jQuery("#enemy-name").html(e.getTitle());
			jQuery("#enemy-level").html(toRoman(e.level));
			
			jQuery("#e-gp-div").html(e.gp);
			
			var att = e.getAttack(true);
			
			jQuery("#e-att-div").html(att[0]);
			jQuery("#e-att-div").prop('title', att[1]);
			
			var o   = jQuery(TConfig.charmenuID);
			var str = '';
			
			var mhp = e.getMaxHP(true);
			
			jQuery("#e-hp span").html(e.hp + '/' + mhp[0]);
			jQuery("#e-hp div.bar_fill", o).css('width',Math.floor(e.hp/mhp[0]*100) + '%');
			jQuery("#e-hp span", o).prop('title', mhp[1]);
			
			if (e.getMaxMP() > 0)
			{
				var mmp = e.getMaxMP(true);
				
				jQuery("#e-mp").show();
				jQuery("#e-mp span").html(e.mp + '/' + mmp[0]);
				jQuery("#e-mp span", o).prop('title', mmp[1]);	
				jQuery("#e-mp div.bar_fill", o).css('width',Math.floor(e.mp/mmp[0]*100) + '%');
			}
			else
			{
				jQuery("#e-mp").hide();
			}

			if(res !== undefined && res[BATTLE_INFLICTED] !== undefined)
			{
				minus = max(min(res[BATTLE_INFLICTED] - res[BATTLE_LIFE_ENEMY], e.hp), 0);
				jQuery("#e-hp div.substr", o).css('width',Math.floor(minus/e.hp*100) + '%');
			}
			if(res !== undefined && res[BATTLE_RECEIVED] !== undefined)
			{
				minus = max(min(res[BATTLE_RECEIVED] - res[BATTLE_LIFE_PLAYER], World.player.hp), 0);
				jQuery("#hp div.substr", o).css('width',Math.floor(minus/World.player.hp*100) + '%');
			}
						
			str = str + showAbilities(e.getPhysDef(true), e.getMagDef(true), e.corruption, e.weakness, e.lifesteal, e.abilities, e.effects);
						
			jQuery("#enemy-message").html(str);
			
			return true;
		};
		
		this.showSubstr = function(i, d, id)
		{
			var o = jQuery(TConfig.charmenuID);
			
			if(i > d)  i = d;
			if(i < 0)  i = 0;
			if(d === 0)
				var w = 0;
			else
				var w = Math.floor(i/d*100);
			
			jQuery("#" + id + " div.bar_fill div", o).css('width', w + '%');
		};
	}