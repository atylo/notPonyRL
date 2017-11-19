	function THandlerReplay()
	{
		this.isActive               = false;
		this.replayTimer            = false;
		this.turns                  = 0;
		this.achievements           = [];
		this.isValidForAchievements = false;
		this.playSpeed              = 0;
		this.startInterval          = 400;
		this.ambient                = '';
		

		this.action = function(e)
		{
			if(!World.getHandler(STATE_REPLAY).isActive)
				return false;
			
			var mode = e.data.mode;
			var xy   = e.currentTarget.attributes.getNamedItem("xyz");
			var c    = xy.nodeValue.split(',');
			
			if(mode == "h")
				World.hover(c[0],c[1]);
			if(mode == "o")
				World.queue.drawAlerts();
			
			return true;
		};
		
		this.control = function(mode)
		{
			if(!World.getHandler(STATE_REPLAY).isActive)
				return false;
	
			switch (mode)
			{
				case REPLAY_CTRL_FIRST:
					World.getHandler(STATE_REPLAY).restart();
					break;
				
				case REPLAY_CTRL_BACK:
					return false;
	
				case REPLAY_CTRL_NEXT:
					World.getHandler(STATE_REPLAY).move();
					break;
				
				case REPLAY_CTRL_LAST:
					return false;
					
				case REPLAY_CTRL_STOP:
					World.getHandler(STATE_REPLAY).stopReplay();
					break;
					
				case REPLAY_CTRL_GO:
					World.getHandler(STATE_REPLAY).playSpeed++;
					World.getHandler(STATE_REPLAY).startReplay(World.getHandler(STATE_REPLAY).playSpeed);
					break;
			}	
			
			return true;
		};

		this.draw = function(data)
		{
			var r = World.map.show();
			jQuery(TConfig.mapID).html(r);
			
			World.queue.draw();
			World.menu.draw();
			World.shop.draw();
		};
		
		this.move = function()
		{
			World.getHandler(STATE_REPLAY).progressBar();
			
			var action = World.replay.blocks[REPLAY_ACTIONS][World.getHandler(STATE_REPLAY).turns];

			switch (action[0])
			{
				case LOG_CHOOSE_SKILL:
					World.chooseSkill(action[1]);
				break;

				case LOG_KEY_ACTION:
					if (World.player.x == action[1]%100 && World.player.y == Math.floor(action[1]/100))
						World.action(action[1]%100, Math.floor(action[1]/100), ACTION_LOOK);
					else
						World.action(action[1]%100, Math.floor(action[1]/100), ACTION_MOVE);
					break;
				
				case LOG_BUY:
					World.shop.purchuase(action[1]);
					break;	
					
				case LOG_USE:
					World.shop.use(action[1]);
					break;
				
				case LOG_SACRIFICE:
					World.shop.sacrifice(action[1]);
					break;
			}	
			
			World.getHandler(STATE_REPLAY).turns++;
			
			if (World.getHandler(STATE_REPLAY).turns > (World.replay.blocks[REPLAY_ACTIONS].length-1))
			{
				World.getHandler(STATE_REPLAY).stopReplay();
				return false;
			}
			return true;
		};		
		
		this.progressBar = function()
		{
			var progress = (World.getHandler(STATE_REPLAY).turns+1)*100/World.replay.blocks[REPLAY_ACTIONS].length;
			jQuery('#progress_bar').css('width', progress + "%");
			
			var str = (World.getHandler(STATE_REPLAY).turns+1) + "/" + (World.replay.blocks[REPLAY_ACTIONS].length);
			jQuery("#moves_counter").html(str);

			return true;
		};
		
		this.startObserving = function(data)
		{
			this.replayTimer            = false;
			this.playSpeed              = 0;
			this.turns                  = 0;
			
			this.progressBar();
			
			World.getHandler(STATE_REPLAY).savedData = data;
			World.getHandler(STATE_REPLAY).isActive = true;
			World.getHandler(STATE_REPLAY).achievements = data['a'];
			World.seedRandom.initSeed(data['s']);
			
			World.turns  = 0;
			World.player = new TPlayer();
			World.player.init(data['r'], data['c']);
			var seed_str = 'P ' + World.seedRandom.getCurrentSeed() + '\n';
			World.player._name = data['n'];
			World.player.color = data['o'];
			
			jQuery(TConfig.menuID).hide();
			jQuery(TConfig.gameID).show();
			jQuery(TConfig.replayControlsID).show();
			jQuery(TConfig.splashID).hide();
			
			World.fieldID = data['f'];
			World.field   = World.getObject(data['f'], KEY_FIELD);
			
			World.field.init();
			seed_str = seed_str + 'F ' + World.seedRandom.getCurrentSeed() + '\n';
			World.queue.init();
			seed_str = seed_str + 'Q ' + World.seedRandom.getCurrentSeed() + '\n';
			World.menu.change();
			seed_str = seed_str + 'M ' + World.seedRandom.getCurrentSeed() + '\n';
			World.shop.init();
			seed_str = seed_str + 'S ' + World.seedRandom.getCurrentSeed() + '\n';
			World.events.clear();
			seed_str = seed_str + 'E ' + World.seedRandom.getCurrentSeed() + '\n';
			
			console.log(seed_str);
			console.log(data['seed']);
			
			jQuery('#touch_controls_holder').hide();
			
			if (data['x'] != World.seedRandom.getCurrentSeed() || data['seed'] != seed_str)
			{
				notification(lang('error.seed_mismatch'));
				console.log('Replay seeds: ' + data['seed']);
				console.log('New seeds: ' + seed_str);
				//console.log("Resulting seed after map creation:" + World.seedRandom.getCurrentSeed() + ". Mismatch = " + (data["x"]-World.seedRandom.getCurrentSeed()) + ", Decoded array of data in line below.");
				//console.log(World.replay.blocks)
					// Attempt to salvage the game despite something obviously missing!
				World.seedRandom.initSeed(data["x"]);
			}
			
			jQuery(document).on('mouseover' , '.t',{mode: "h"}, World.getHandler(STATE_REPLAY).action);
			jQuery(document).on('mouseout'  , '.t',{mode: "o"}, World.getHandler(STATE_REPLAY).action);
			
			return true;
		};
		
		this.startReplay = function(playSpeed)
		{
			if (playSpeed < 1)
				return false;
				
			if (World.getHandler(STATE_REPLAY).replayTimer != undefined)
				clearTimeout(World.getHandler(STATE_REPLAY).replayTimer);
				
			var speed = this.startInterval/playSpeed;

			World.getHandler(STATE_REPLAY).replayTimer = setInterval(World.getHandler(STATE_REPLAY).move, speed);
			return true;
		};		
		
		this.stopObserving = function(data)
		{
			jQuery(document).off('mouseover' , '.t', World.getHandler(STATE_REPLAY).action);
			jQuery(document).off('mouseout'  , '.t', World.getHandler(STATE_REPLAY).action);
						
			World.getHandler(STATE_REPLAY).stopReplay();
			World.getHandler(STATE_REPLAY).isActive = false;
			return true;
		};
		
		this.stopReplay = function()
		{
			if (World.getHandler(STATE_REPLAY).replayTimer != undefined)
				clearTimeout(World.getHandler(STATE_REPLAY).replayTimer);
			World.getHandler(STATE_REPLAY).playSpeed = 0;
			return true;
		};
		
		this.restart = function()
		{
			World.getHandler(STATE_REPLAY).stopReplay();
			World.getHandler(STATE_REPLAY).startObserving(World.getHandler(STATE_REPLAY).savedData);
			World.getHandler(STATE_REPLAY).draw();
		}
	};
	
	TConfig.handlers[STATE_REPLAY] = new THandlerReplay();