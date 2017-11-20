	function THandlerMenu()
	{
		this.isActive  = false;
		
		this.chosenClass = 0;
		this.chosenRace  = 0;
		this.chosenField = 0;

		this.ambient     = 'audio/ambient-menu.mp3';

			// caching pages
		this.pages = false;
		this.page  = 0;
		
		this.canChoose = function(f)
		{
			if(f[KEY_REWARD] == undefined)
				return false;
				
			return (f[KEY_REWARD] == REWARD_NONE ||	World.wrapper.achievements[f[KEY_REWARD]] == 1);
		};

		this.changelog = function()
		{
			var html = '';
			for(var i in TConfig.changelog)
			{
				var log = TConfig.changelog[i];
				var str = '<b>' + log[CHANGELOG_ID] + ' ';
				if(log[CHANGELOG_TITLE])
					str = str + log[CHANGELOG_TITLE] + ' ';
				if(log[CHANGELOG_DATE])
					str = str + '(' + log[CHANGELOG_DATE] + ')';
				str = str + '</b><br />' + log[CHANGELOG_TEXT] + '<br />';
				html = str + html;
			}

			jQuery("#changelog").html(html);
		}
		
		this.changeOptions = function()
		{
			World.wrapper.options[OPTION_HERO_NAME]       = jQuery("#options_" + OPTION_HERO_NAME + "_input").val();
			World.wrapper.options[OPTION_EXT_LOGS]        = jQuery("#options_" + OPTION_EXT_LOGS + "_input").prop('checked');
			World.wrapper.options[OPTION_EXT_SAVE]        = jQuery("#options_" + OPTION_EXT_SAVE + "_input").prop('checked');
			World.wrapper.options[OPTION_TOUCH_CONTROLS]  = jQuery("#options_" + OPTION_TOUCH_CONTROLS + "_input").prop('checked');
			World.wrapper.options[OPTION_SOUND]           = jQuery(".sound").hasClass('on');

			if(World.getHandler().ambient)
				World.audio(AUDIO_AMBIENT, World.getHandler().ambient, {loop: true});

			return true;
		};
		
		this.checkGameStart = function()
		{
			if(!this.chosenClass || !this.chosenRace || !this.chosenField)
				return false;
				
			var data = new Array();
			data['r'] = this.chosenRace;
			data['c'] = this.chosenClass;
			data['f'] = this.chosenField;
			
			World.changeGameState(STATE_GAME, data);
			return true;
		};		
		
		this.chooseClass = function(id)
		{
			if(this.chooseItem(id, KEY_CLASS))
			{
				this.chosenClass = id;
				this.showWins(0);
				this.checkGameStart();
				return true;
			}
			
			return false;
		};
		
		this.chooseField = function(id)
		{
			if(this.chooseItem(id, KEY_FIELD))
			{
				this.chosenField = id;
				this.checkGameStart();
				return true;
			}
			
			return false;
		};
				
		this.chooseItem = function(id, item_type)
		{
			var obj = TConfig.data[item_type][id];
			
			if(obj == undefined || (obj[KEY_REWARD] != REWARD_NONE && World.wrapper.achievements[obj[KEY_REWARD]] != 1))
				return false;
			
			jQuery(".btn_" + item_type).removeClass('active');
			jQuery("#" + id + '_' + item_type).addClass('active');
			
			return true;
		};	
				
		this.chooseRace = function(id)
		{
			if(this.chooseItem(id, KEY_RACE))
			{
				this.chosenRace = id;
				this.checkGameStart();
				return true;
			}
			
			return false;
		};

		this.draw = function()
		{
			jQuery(TConfig.menuID + " .class_holder").html('');
			jQuery(TConfig.menuID + " .race_holder").html('');
			jQuery(TConfig.menuID + " .field_holder").html('');
			jQuery(TConfig.menuID + " .achievement_holder").html('');
			
			for(var i in TConfig.data[KEY_CLASS])
			{
				var obj = TConfig.data[KEY_CLASS][i];	
				var s = this.showButton(obj, 'World.getHandler().chooseClass(' + i + ')', i, KEY_CLASS);
				jQuery(TConfig.menuID + " .class_holder").html(jQuery(TConfig.menuID + " .class_holder").html() + s);
			}	
				
			for(var i in TConfig.data[KEY_RACE])
			{
				var obj = TConfig.data[KEY_RACE][i];	
				var s = this.showButton(obj, 'World.getHandler().chooseRace(' + i + ')', i, KEY_RACE);
				jQuery(TConfig.menuID + " .race_holder").html(jQuery(TConfig.menuID + " .race_holder").html() + s);
			}	

			var pages = this.getTerrainPages();
			for (var i in pages[this.page])
			{
				var obj = TConfig.data[KEY_FIELD][pages[this.page][i]];
				var s   = this.showButton(obj, 'World.getHandler().chooseField(' + pages[this.page][i] + ')', pages[this.page][i], KEY_FIELD);
				jQuery(TConfig.menuID + " .field_holder").html(jQuery(TConfig.menuID + " .field_holder").html() + s);
			}
			
			for(var i in TConfig.data[KEY_ACHIEVEMENT])	
			{
				var done = (World.wrapper.achievements[i] != undefined && World.wrapper.achievements[i]); 
				var s = this.showAchievement(i, done);
				jQuery(TConfig.menuID + " .achievement_holder").html(jQuery(TConfig.menuID + " .achievement_holder").html() + s);
			}		
			
			if(!this.chosenClass)
				this.chooseClass(CLASS_WIZARD);
			else
				this.chooseClass(this.chosenClass);
			
			if(!this.chosenRace)
				this.chooseRace(RACE_PONY);
			else
				this.chooseRace(this.chosenRace);

			if (this.page <= 0)
				jQuery("#btn_back").addClass('inactive');
			else
				jQuery("#btn_back").removeClass('inactive');
				
			if (this.page >= this.pages.length - 1)
				jQuery("#btn_next").addClass('inactive');
			else
				jQuery("#btn_next").removeClass('inactive');			
		};
		
		this.getTerrainPages = function()
		{
			var fields = [];
			var quests = [];
			var pages  = [];
			var curr   = 0;
			
			if(this.pages != false)
				return this.pages;
			
			for(i in TConfig.objects[KEY_FIELD])
			{
				if(TConfig.objects[KEY_FIELD][i].isCustom())
					quests.push([lang('field.' + i + '.title'), i]);
				else
					fields.push(i);
			}
			
			for(i in fields)
			{
				if(pages[curr] == undefined)
					pages[curr] = [];
				pages[curr].push(fields[i]);
				
				if(pages[curr].length == PAGE_SIZE)
					curr++;
			}
			
			if(pages[curr] != undefined)
				curr++;
			
			quests.sort();
			
			for(i in quests)
			{
				if(pages[curr] == undefined)
					pages[curr] = [];
				pages[curr].push(quests[i][1]);
				
				if(pages[curr].length == PAGE_SIZE)
					curr++;
			}
			
			this.pages = pages;

			return pages;
		};		
		
		this.hallOfFame = function()
		{
			var html  = '';
			var count = 0;
			if(!World.wrapper.heroes || World.wrapper.heroes.length == 0)
				html = lang('hall.no_heroes');
			else
			{
				for(var i in World.wrapper.heroes)
				{
					var hero = World.wrapper.heroes[i];
					
					count++;
					
					var data  = [];
					data['n'] = hero[HERO_NAME];
					data['c'] = (TConfig.data[KEY_CLASS][hero[HERO_CLASS]] != undefined)?lang('class.' + hero[HERO_CLASS] + '.title'):"???";
					data['r'] = (TConfig.data[KEY_RACE][hero[HERO_RACE]] != undefined)?lang('race.' + hero[HERO_RACE] + '.title'):"???";
					data['d'] = hero[HERO_DT];
					data['l'] = hero[HERO_LEVEL];
					data['q'] = count;
					
					var subdata  = [];
					subdata['t'] = hero[HERO_TURNS];
					subdata['s'] = hero[HERO_SCORE];
					subdata['f'] = (TConfig.data[KEY_FIELD][hero[HERO_LOCATION]] != undefined)?lang('field.' + hero[HERO_LOCATION] + '.title').toLowerCase():"???";
					data['e'] = lang('hall.ending.' + hero[HERO_ENDING] + '.' + hero[HERO_GENDER], subdata);
					
					if(hero[HERO_ACHIEVEMENTS].length == 0)
					{
						data['a'] = '';
					}
					else
					{
						var str   = [];
						for(var i in hero[HERO_ACHIEVEMENTS])
							if(TConfig.data[KEY_ACHIEVEMENT][hero[HERO_ACHIEVEMENTS][i]] != undefined)
								str.push(lang('achievements.' + hero[HERO_ACHIEVEMENTS][i] + '.title'));
						data['a'] = lang('br') + lang('hall.achievements.' + hero[HERO_GENDER], {a: str.join(', ')});
					}
					
					data['msg'] = hero[HERO_LAST_MSG];
					html = html + lang('hall.hero', data);
				}
			}	
			
			jQuery("#hallText").html(html);			
		};		
				
		this.pageTurn = function(direction)
		{
			var pages = this.getTerrainPages();
			if(pages[this.page + direction] == undefined)
				return false;

			this.page += direction;

			this.draw();
			return true;
		};		
		
		this.showAchievement = function(id, done)
		{
			var res = [];
			
			for (var i = 1; i < TConfig.data[KEY_RACE].length; i++)
				if (TConfig.data[KEY_RACE][i] != undefined)
					if (TConfig.data[KEY_RACE][i][KEY_REWARD] == id)
						res.push([lang('key.' + KEY_RACE + '.title'), lang('race.' + i + '.title')]);
			
			for (var i = 1; i < TConfig.data[KEY_CLASS].length; i++)
				if (TConfig.data[KEY_CLASS][i] != undefined)
					if (TConfig.data[KEY_CLASS][i][KEY_REWARD] == id)
						res.push([lang('key.' + KEY_CLASS + '.title'), lang('class.' + i + '.title')]);
			
			for (var i = 1; i < TConfig.data[KEY_FIELD].length; i++)
				if (TConfig.data[KEY_FIELD][i] != undefined)
					if (TConfig.data[KEY_FIELD][i][1] == id)
						res.push([lang('key.' + KEY_FIELD + '.title'), lang('field.' + i + '.title')]);
						aStr += '<br /> - ' + lang('key.' + KEY_FIELD + '.title') + ': ' + lang('field.' + i + '.title');
						
						
			for (var i = 1; i < TConfig.objects[KEY_ITEM].length; i++)
				if (TConfig.objects[KEY_ITEM][i] != undefined)
					if (TConfig.objects[KEY_ITEM][i].achievement == id)
						res.push([lang('key.' + KEY_ITEM + '.title'), (done?lang('items.' + i + '.title'):"???")]);
						
			for (var i = 1; i < TConfig.objects[KEY_GOD].length; i++)
				if (TConfig.objects[KEY_GOD][i] != undefined)
					if (TConfig.objects[KEY_GOD][i].achievement == id)
						res.push([lang('key.' + KEY_GOD + '.title'), (done?lang('religion.' + i + '.title'):"???")]);

			var aStr = lang('br') + lang('achievements.' + id + '.description');
			for(i in res)
				aStr += lang('wrap.achievement_reward', {'t': res[i][0], 'd': res[i][1]});
			
			var on_hover  = lang('wrap.title', {'n': lang('achievements.' + id + '.title')}) + lang('achievements.' + id + '.description') + aStr;
			var add_class = (done == 1)?'':'inactive';
			var obj_id    = 'ach_btn_' + id;
			
			on_hover = on_hover.replace(/'/g, "\\'");
			
			var img   = (!done)?(id + "d"):id;
			var cl    = (!done)?"closed":"open";
			
			var s = lang('wrap.achievement', {'c' : cl, 'title': lang('achievements.' + id + '.title'), 'img': img, 'descr': aStr});
			return s;
		};
		
		this.showButton = function(obj, handler, id, type)
		{
			var r = this.canChoose(obj);
			var custom_hover = '';
			var custom_out   = '';
			
			var title = 'class.' + id + '.title';
			if(type == KEY_FIELD) title = 'field.' + id + '.title';
			if(type == KEY_RACE)  title = 'race.' + id + '.title';
			var text  = 'class.' + id + '.description';
			if(type == KEY_FIELD) text = 'field.' + id + '.description';
			if(type == KEY_RACE)  text = 'race.' + id + '.description';

			if(r)
			{
				var add_class = '';
				var on_hover  = lang('wrap.title', {'n': lang(title)}) + lang(text);
				
				if(type == KEY_FIELD && obj[KEY_TYPE] == TYPE_QUEST)
					on_hover = lang('wrap.questmap') + on_hover;
				
				if(type == KEY_FIELD)
				{
					custom_hover = 'World.getHandler(STATE_MENU).showWins(' + id + ');';
					custom_out   = 'World.getHandler(STATE_MENU).showWins(0);';
				}
			}
			else
			{
				var add_class  = 'inactive';
				var on_hover   = lang('wrap.achievement.needed',{'name':lang('achievements.' + obj[KEY_REWARD] + '.title'),'description': lang('achievements.' + obj[KEY_REWARD] + '.text'),'item': lang(title)});
			}
			
			var obj_id    = id + '_' + type;
			var on_click  = handler;
			
			add_class = add_class + ' btn_' + type; 
			
			on_hover = on_hover.replace(/'/g, "\\'");
			
			return formButton(lang(title), on_click, on_hover, custom_hover, 'msg(\'\');' + custom_out,add_class, obj_id);
		};
		
		this.showOptions = function()
		{
			if(World.wrapper.options[OPTION_HERO_NAME] == undefined)
				World.wrapper.options[OPTION_HERO_NAME] = '';
			if(World.wrapper.options[OPTION_EXT_LOGS] == undefined)
				World.wrapper.options[OPTION_EXT_LOGS] = false;
			if(World.wrapper.options[OPTION_EXT_SAVE] == undefined)
				World.wrapper.options[OPTION_EXT_SAVE] = false;
			if(World.wrapper.options[OPTION_TOUCH_CONTROLS] == undefined)
				World.wrapper.options[OPTION_TOUCH_CONTROLS] = false;
			if(World.wrapper.options[OPTION_SOUND] == undefined)
				World.wrapper.options[OPTION_SOUND] = false;
			
			jQuery("#options_" + OPTION_HERO_NAME + "_input").val(World.wrapper.options[OPTION_HERO_NAME]);
			jQuery("#options_" + OPTION_EXT_LOGS + "_input").prop('checked', World.wrapper.options[OPTION_EXT_LOGS]);
			jQuery("#options_" + OPTION_EXT_SAVE + "_input").prop('checked', World.wrapper.options[OPTION_EXT_SAVE]);
			jQuery("#options_" + OPTION_TOUCH_CONTROLS + "_input").prop('checked', World.wrapper.options[OPTION_TOUCH_CONTROLS]);
			World.wrapper.options[OPTION_SOUND]?jQuery(".sound").addClass('on'):jQuery(".sound").removeClass('on');
			
			return true;
		};
	
		this.showWins = function(field_num)
		{
			jQuery(".btn_" + KEY_RACE).removeClass("victorious");
			if(!this.chosenClass || !field_num)
				return false;
			
			if(World.wrapper.victories[field_num] == undefined || World.wrapper.victories[field_num][this.chosenClass] == undefined)
				return false;
			
			for(i in World.wrapper.victories[field_num][this.chosenClass])
				if(World.wrapper.victories[field_num][this.chosenClass][i] != undefined)
					jQuery("#" + i + "_" + KEY_RACE).addClass("victorious");
			
			return true;
		};
				
		this.startObserving = function(data)
		{
			this.isActive = true;

			jQuery(TConfig.menuID).show();
			jQuery(TConfig.gameID).hide();
			jQuery(TConfig.splashID).hide();
			jQuery(TConfig.replayControlsID).hide();
			
			this.showOptions();
			this.chosenField = 0;
		};
		
		this.stopObserving = function(data)
		{
			this.isActive = false;
		};

		this.switchSound = function()
		{
			jQuery(".sound").toggleClass('on');
			this.changeOptions();
		};
	}

	TConfig.handlers[STATE_MENU] = new THandlerMenu();