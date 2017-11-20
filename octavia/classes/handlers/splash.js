	function THandlerSplash()
	{
		this.isActive  = false;
		
		this.draw = function()
		{
			return true;
		};
		
		this.formVictoryReport = function(params, score, achievements, is_replay)
		{
			var joiner   = lang('br') + lang('br');
			var p_params = {};

			p_params.t   = World.turns;
			p_params.l   = toRoman(World.player.level);
			p_params.s   = score;
			p_params.n   = World.player._name;
			p_params.r   = lang('race.' + World.player._race + '.title')
			p_params.c   = lang('class.' + World.player._class + '.title')
			p_params.att = World.player.getAttack();
			p_params.hp  = World.player.hp;
			p_params.ehp = World.player.getMaxHP();

			var custom = [];

			if(is_replay)
				custom.push(lang('ending.is_replay') + joiner);	

			custom.push(lang('ending.score', p_params) + joiner);
			custom.push(lang('ending.chars', p_params))

			if(World.player.piety >= 10)
				custom.push(lang('ending.pious'));
			if(World.player.corruption > 5)
				custom.push(lang('ending.corrupted'));
			if(World.player.getPhysDef() >= 25)
				custom.push(lang('ending.tough'));
			if(World.player.getMagDef() >= 25)
				custom.push(lang('ending.resistant'));
			if(World.player.gp < 5)
				custom.push(lang('ending.poor'));
			else
				custom.push(lang('ending.wealth', {gp: World.player.gp}));
			
			var header = lang('ending.header.' + World.fieldID + '.' + params);
			var descr  = lang('ending.text.' + World.fieldID + '.' + params);
			if(params == ENDING_CORRUPTION)
			{
				header = lang('ending.header.' + params);
				descr  = lang('ending.text.' + params);
			}
			
			var str = '';
			str += header + descr;
			str += joiner;
			str += lang('ending.timer', p_params);

			var ac_str = [];
			for(var i in achievements)
				if(TConfig.data[KEY_ACHIEVEMENT][achievements[i]] != undefined)
					ac_str.push(lang('achievements.' + achievements[i] + '.title'));
				
			if(ac_str.length > 0)
			{
				str += joiner;
				str += lang('ending.achievements', {a: ac_str.join(', ')});
			}

			if(custom.length > 0)
			{
				str += lang('br');
				str += custom.join(' ');
				str += joiner;
			}

			var items = [];
			for(var i in World.shop.items)
			{
				var item = World.shop.items[i];
				if(item.state == ITEM_STATE_BOUGHT)
					items.push(item.getTitle());
			}

			if(items.length > 1)
				str += lang('ending.items', {i: items.join(', ')}) + joiner;
			if(items.length == 1)
				str += lang('ending.item' , {i: items.join(', ')}) + joiner;

			str += lang('ending.last_messages');

			jQuery(TConfig.splashConsole).html(str);
			jQuery(TConfig.splashLog).html(World.queue.html);	

			str = World.events.log();

			jQuery(TConfig.splashTime).html(str);	
			
			var str = World.replay.toString();
			jQuery("#replay_save_code").html(str);
			jQuery("#replay_save_code").select();

			return true;
		};

		this.startObserving = function(data)
		{
			this.isActive = true;
			
			World.raiseEvent(LOG_END, false, false, false, false);
			
			World.queue.draw();
			World.menu.hideEnemy();
			
			jQuery(TConfig.menuID).hide();
			jQuery(TConfig.gameID).hide();
			jQuery(TConfig.splashID).show();
			
			var score = World.field.gameEnd(data[0]);
			var mult  = World.field.scoreMult;
			
			score = score + World.player.level * 50;
			score = score + World.player.gp;
			score = score + World.player.piety * 3;
			
			score = Math.floor((1000 - min(900, World.turns))/1000*score);
			
			if(World.wrapper.heroes.length > 49)
				World.wrapper.addAchievement(REWARD_LEGACY);
			
					// adding score for 
			if(data[0] == ENDING_GOOD)
			{
				score = score*2 + 200*max(1,10 - World.player.level);
				World.wrapper.addVictory(World.player._race, World.player._class, World.fieldID);
			}
			
			score = Math.floor(score*mult);
			
			if(World.player.last_hp < 5)
				World.wrapper.addPossibleAchievement(REWARD_LAST_PONY);
			if(World.player.piety > 40)
				World.wrapper.addPossibleAchievement(REWARD_HOLY_ONE);
			if(World.player.weakness >= 10)
				World.wrapper.addPossibleAchievement(REWARD_WEAKLING);

			var got_achievements = World.wrapper.resolvePossibleAchievements(data[0] != ENDING_CORRUPTION && data[0] != ENDING_BAD && data[1] == true && !World.field.isCustom());

			if(got_achievements.length > 0)
				score = Math.floor(score*(1 + 0.2*got_achievements.length));

			if(World.turns > 30 && World.player.level > 1 && data[1] == true)
				World.wrapper.addHero(data[0], score, got_achievements);

			if(data[0] == ENDING_GOOD)
			{
				if(got_achievements.length > 0) {
					this.ambient = 'audio/ambient-splash-good.mp3';
				}
				else
					this.ambient = 'audio/ambient-splash-ok.mp3';
			}
			else
				this.ambient = 'audio/ambient-splash-bad.mp3';

			this.formVictoryReport(data[0], score, got_achievements, !data[1]);
			World.wrapper.save(false);			
		};
		
		this.stopObserving = function(data)
		{
			this.isActive = false;
		};		
	}
	
	TConfig.handlers[STATE_SPLASH_SCREEN] = new THandlerSplash();