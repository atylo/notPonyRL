/**
 * This class deals solely with player data.
 * It means
 *  - resolving achievements
 *  - saving player data
 *  - loading player data
 *  - storing options
 *  
 *  All interface is processed in handlers/menu class.
 */

	function TWrapper()
	{
		this.achievements         = [];
		this.heroes               = [];
		this.victories            = [];
		this.options              = [];

		this.achievementProgress  = [];
		this.possibleAchievements = [];
		
		this.addAchievement = function(f)
		{
			if(this.achievements[f] == 1)
				return false;
			
			if(TConfig.data[KEY_ACHIEVEMENT][f] == undefined)
				return false;
			
			var title = lang('achievements.' + f + '.title');
			this.achievements[f] = 1;
			
			notification(lang('event.achievement',{'d': title}));
			this.save(false);

			return true;
		};
		
		this.addAchievementProgress = function(f, c)
		{
			if(this.achievementProgress[f] == undefined)
				this.achievementProgress[f] = 0;
			
			this.achievementProgress[f] += c;
		}
		
		this.addHero = function(ending, score, achievements)
		{
			var hero = [];
			hero[HERO_NAME]         = World.player._name;
			hero[HERO_RACE]         = World.player._race;
			hero[HERO_CLASS]        = World.player._class;
			hero[HERO_SCORE]        = score*1.0;
			hero[HERO_LOCATION]     = World.fieldID;
			hero[HERO_TURNS]        = World.turns;
			hero[HERO_LEVEL]        = World.player.level;
			hero[HERO_ACHIEVEMENTS] = achievements;
			hero[HERO_LAST_MSG]     = World.queue.html;
			hero[HERO_GENDER]       = World.player._gender;
			hero[HERO_ENDING]       = ending;
				
			var today = new Date();
			var dd = today.getDate();
			var mm = today.getMonth()+1; //January is 0!

			var yyyy = today.getFullYear();
			if(dd<10) dd = '0' + dd;  
			if(mm<10) mm = '0' + mm; 
			today = mm + '/' + dd + '/' + yyyy;
			
			hero[HERO_DT]           = today;

			if(this.heroes.length > 59)
				this.heroes = this.heroes.slice(0, 59);

			this.heroes.push(hero);
			this.heroes = this.heroes.sort(function(a, b){
					if(a[HERO_SCORE] > b[HERO_SCORE]) return -1;
					if(a[HERO_SCORE] < b[HERO_SCORE]) return 1;
					return 0;
				})
			
			this.save(false);
		};
		
		this.addPossibleAchievement = function(f)
		{
			if(this.achievements[f] == 1)
				return false;
			
			if(TConfig.data[KEY_ACHIEVEMENT][f] == undefined)
				return false;
			
			for(var i in this.possibleAchievements)
				if(this.possibleAchievements[i] == f)
					return false;
			
			this.possibleAchievements.push(f);
			return true;
		};
		
		this.addVictory = function(_race, _class, _field)
		{
			if(this.victories[_field] == undefined || !(this.victories[_field] instanceof Array))
				this.victories[_field] = [];
			if(this.victories[_field][_class] == undefined || !(this.victories[_field][_class] instanceof Array))
				this.victories[_field][_class] = [];
			if(this.victories[_field][_class][_race] == undefined || !(this.victories[_field][_class][_race] instanceof Array))
				this.victories[_field][_class][_race] = 0;
			this.victories[_field][_class][_race]++;
			
			this.save(false);
		};
		
		this.fromEncryptedString = function(str)
		{
			var a = CryptoJS.Rabbit.decrypt(str, TConfig.pwd);
			var s = eval("(" + a.toString(CryptoJS.enc.Utf8) + ")");
			if(!(s instanceof Array))
			{
				notification(lang('storage.bad_string'));
				return false;
			}
			
			this.achievements = (s[0] != undefined)?s[0]:[];
			this.heroes       = (s[1] != undefined)?((s[1] instanceof Array)?s[1]:this.heroes):[];
			this.victories    = (s[2] != undefined)?((s[2] instanceof Array)?s[2]:this.victories):[];
			this.options      = (s[3] != undefined)?s[3]:[];
			
			World.getHandler(STATE_MENU).showOptions();
			World.draw();
			notification(lang('storage.loaded'));
			this.save(false);
			
			return true;
		};
		
		this.getOption = function (n)
		{
			return (this.options[n] != undefined)?this.options[n]:false;
		};
				
		this.load = function()
		{
			var webStorageSupported = ('localStorage' in window) && window['localStorage'] !== null;  
			
			if(!webStorageSupported)
			{
				notification(lang('storage.no_support'));
			}
			else
			{
				var s = localStorage.getItem('ponyrl_achievements');
				var d = localStorage.getItem('ponyrl_heroes6');
				var w = localStorage.getItem('ponyrl_wins');
				var o = localStorage.getItem('ponyrl_options');
				
				if(s) this.achievements = eval("[" + s + "]");
				if(d) this.heroes       = JSON.parse(d);
				if(w) this.victories    = JSON.parse(w);
				if(o) this.options      = JSON.parse(o);
				
				TConfig.handlers[STATE_MENU].showOptions();
				
				if(s || d || w || o)
					notification(lang('storage.loaded'));
				else
					notification(lang('storage.not_loaded'));
			}
		};
		
		this.loadFromString = function()
		{
			var s = prompt(lang('options.code_load'), '');
			this.fromEncryptedString(s);
		};
		
		this.resolvePossibleAchievements = function(add)
		{
			var res = [];
			
			if(add)
			{
				for(var i in this.possibleAchievements)
					if(this.addAchievement(this.possibleAchievements[i]))
						res.push(this.possibleAchievements[i]);
				
				for(var i in this.achievementProgress)
					if(this.achievementProgress[i] >= 1)
						if(this.addAchievement(i))
							res.push(i);
			}
			
			this.possibleAchievements = [];
			this.achievementProgress  = [];
			
			return res;
		};

		this.save = function(n)
		{
			var webStorageSupported = ('localStorage' in window) && window['localStorage'] !== null;
			if(webStorageSupported)
			{
				if(n)
					notification(lang('storage.saved'));
				localStorage.setItem('ponyrl_achievements' , this.achievements);
				localStorage.setItem('ponyrl_heroes6'      , JSON.stringify(this.heroes));
				localStorage.setItem('ponyrl_wins'         , JSON.stringify(this.victories));
				localStorage.setItem('ponyrl_options'      , JSON.stringify(this.options));
			}
		};
		
		this.saveToString = function()
		{
			prompt(lang('options.code_save'), this.toEncryptedString());
		};
				
		this.toEncryptedString = function()
		{
			var a = [this.achievements, this.heroes, this.victories, this.options];	
			if(!this.getOption(OPTION_EXT_SAVE))
				a[1] = false;
			
			return CryptoJS.Rabbit.encrypt(JSON.stringify(a), TConfig.pwd);
		};
	}