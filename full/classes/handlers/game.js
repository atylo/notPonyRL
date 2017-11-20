	function THandlerGame()
	{
		this.isActive               = false;
		this.keybindings            = false;
		this.achievements           = [];
		this.isValidForAchievements = true;
		this.isTargetMode           = false;

		this.ambient                = 'audio/ambient-game.mp3';
				
		this.action = function(e)
		{
			if(!World.getHandler(STATE_GAME).isActive)
				return false;
			
			var mode = e.data.mode;
			var src  = (mode == ACTION_MOUSE)?e.currentTarget:e.currentTarget.parentNode;
			var xy   = src.attributes.getNamedItem("xyz");
			var c    = xy.nodeValue.split(',');
			
			if(mode == ACTION_MOUSE &&  World.wrapper.getOption(OPTION_TOUCH_CONTROLS))
			{
				if (World.getHandler(STATE_GAME).isTargetMode)
				{
					jQuery('#move_target').removeClass('active');
					World.getHandler(STATE_GAME).isTargetMode = false;	
				}
				else
					mode = ACTION_HOVER;
			}
			
			if(mode == ACTION_HOVER)
				World.hover(c[0], c[1]);
			if(mode == ACTION_MOUSEOUT)
				World.queue.drawAlerts();
			if(mode == ACTION_MOUSE)
				World.action(c[0], c[1], ACTION_MOUSE);
			
			return true;
		};		
		
		this.draw = function()
		{
			var r = World.map.show();
			jQuery(TConfig.mapID).html(r);
			
			World.queue.draw();
			World.menu.draw();
			World.shop.draw();
		};
		
		this.setKeybindings = function()
		{
			jQuery(document).on('mouseover' , '.t',{mode: ACTION_HOVER}, World.getHandler(STATE_GAME).action);
			jQuery(document).on('mouseout'  , '.t',{mode: ACTION_MOUSEOUT}, World.getHandler(STATE_GAME).action);
			jQuery(document).on('click'     , '.m',{mode: ACTION_MOUSE}, World.getHandler(STATE_GAME).action);
			
			if(World.getHandler(STATE_GAME).keybindings)
				return false;
			
			World.getHandler(STATE_GAME).keybindings = true;
				
			jQuery(document).keydown(function(e){
					if(!World.getHandler(STATE_GAME).isActive)
						return true;
						
					switch(e.which)
					{
						case 36:
						case 81:
						case 103:
						case 89:
							World.keyAction(-1, -1, ACTION_MOVE);
							e.preventDefault();
							break;
							
						case 33:
						case 69:
						case 105:
						case 85:
							World.keyAction(1, -1, ACTION_MOVE);
							e.preventDefault();
							break;
							
						case 35:
						case 90:
						case 97:
						case 66:
							World.keyAction(-1, 1, ACTION_MOVE);
							e.preventDefault();
							break;	
							
						case 34:
						case 67:
						case 99:
						case 78:
							World.keyAction(1, 1, ACTION_MOVE);
							e.preventDefault();
							break;
							
						case 38:
						case 87:
						case 104:
						case 75:
							World.keyAction( 0,-1, ACTION_MOVE);
							e.preventDefault();
							break;
						case 40:
						case 83:
						case 98:
						case 74:
							World.keyAction( 0, 1, ACTION_MOVE);
							e.preventDefault();
							break;
						case 37:
						case 65:
						case 100:
						case 72:
							World.keyAction(-1, 0, ACTION_MOVE);
							e.preventDefault();
							break;
						case 39:
						case 68:
						case 102:
						case 76:
							World.keyAction( 1, 0, ACTION_MOVE);
							e.preventDefault();
							break;
						case 32:
						case 12:
						case 101:
							World.keyAction( 0, 0, ACTION_LOOK);
							e.preventDefault();
							break;
					}
								
				});
				
			return true;
		};		
		
		this.touchKey = function (code)
		{
			if (code == 32)
			{
				if (this.isTargetMode == false)
				{
					jQuery('#move_target').addClass('active');
					this.isTargetMode = true;
				}
				else 
				{
					jQuery('#move_target').removeClass('active');
					this.isTargetMode = false;
				}
				return true;
			}
			
			var e = $.Event("keydown", { which: code});
			jQuery("body").trigger(e);
			
			return true;
		}
		
		this.startObserving = function(data)
		{
			World.getHandler(STATE_GAME).isActive = true;
			World.getHandler(STATE_GAME).setKeybindings();
			
				// if achievements and seed are passed - its a replay
			if (data["a"] != undefined && data["s"] != undefined)
			{
				World.getHandler(STATE_GAME).isValidForAchievements = false;
				World.getHandler(STATE_GAME).achievements = data['a'];
				World.seedRandom.initSeed(data['s']);
			}
			else	
			{
				World.getHandler(STATE_GAME).isValidForAchievements = true;
				World.getHandler(STATE_GAME).achievements = World.wrapper.achievements;
				World.seedRandom.initRandSeed();
			}

			World.turns  = 0;
			World.player = new TPlayer();
			
			if (data['f'] != FIELD_TUTORIAL)
				World.player.init(data['r'], data['c']);
			
			var seed_str = 'P ' + World.seedRandom.getCurrentSeed() + '\n';
			
			if (data["n"] != undefined && data["o"] != undefined)
			{
				World.player._name = data['n'];
				World.player.color = data['o'];
			}
			
			jQuery(TConfig.menuID).hide();
			jQuery(TConfig.gameID).show();
			jQuery(TConfig.splashID).hide();
		
			switch(data['f'])
			{
				case FIELD_EVERFREE: this.ambient = 'audio/ambient-everfree.mp3'; break;
				default:
					this.ambient = 'audio/ambient-game.mp3'; break;
			}
	
			World.fieldID = data['f'];
			World.field   = World.getObject(data['f'], KEY_FIELD);
			
			World.shop.init();
			seed_str = seed_str + 'S ' + World.seedRandom.getCurrentSeed() + '\n';
			World.field.init();
			seed_str = seed_str + 'F ' + World.seedRandom.getCurrentSeed() + '\n';
			World.queue.init();
			seed_str = seed_str + 'Q ' + World.seedRandom.getCurrentSeed() + '\n';
			World.menu.change();
			seed_str = seed_str + 'M ' + World.seedRandom.getCurrentSeed() + '\n';
			World.events.clear();
			seed_str = seed_str + 'E ' + World.seedRandom.getCurrentSeed() + '\n';
			
			data['seed'] = seed_str;

			var reg_arr = [];
			reg_arr[-1] = 100;
			reg_arr[-2] = 100;
			reg_arr[-3] = 100;
			World.regen(reg_arr);

			World.replay.clear();
			World.replay.init(data);
			
			
			if (World.wrapper.getOption(OPTION_TOUCH_CONTROLS))
				jQuery('#touch_controls_holder').show();
			else 
				jQuery('#touch_controls_holder').hide();
			
			if (data["x"] != undefined)
				if (data["x"] != World.seedRandom.getCurrentSeed())
				{
					notification(lang('error.seed_mismatch'));
					//console.log("Resulting seed after map creation:" + World.seedRandom.getCurrentSeed() + ". Mismatch = " + (data["x"]-World.seedRandom.getCurrentSeed()) + ", Decoded array of data in line below.");
					//console.log(World.replay.blocks)
						// Attempt to salvage the game despite something obviously missing
					World.seedRandom.initSeed(data["x"]);
				}
			
			World.raiseEvent(LOG_GAME_START, KEY_FIELD, World.field, false, false);
			
			return true;
		};
		
		this.stopObserving = function(data)
		{
			jQuery(document).off('mouseover' , '.t', World.getHandler(STATE_GAME).action);
			jQuery(document).off('mouseout'  , '.t', World.getHandler(STATE_GAME).action);
			jQuery(document).off('click'     , '.m', World.getHandler(STATE_GAME).action);
			
			World.getHandler(STATE_GAME).isActive = false;
		};		
	}
	
	TConfig.handlers[STATE_GAME] = new THandlerGame();