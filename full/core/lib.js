	function addAchievement(id)
	{
		TConfig.data[KEY_ACHIEVEMENT][id] = new Array();
		return true;
	}

	function addChangelog(id, title, date, text)
	{
		TConfig.changelog[id] = new Array();

		TConfig.changelog[id][CHANGELOG_ID]    = id;
		TConfig.changelog[id][CHANGELOG_TEXT]  = text;
		TConfig.changelog[id][CHANGELOG_TITLE] = title;
		TConfig.changelog[id][CHANGELOG_DATE]  = date;

		TConfig.version = id;

		return true;
	}
	
	function addClass(id, r)
	{
		TConfig.data[KEY_CLASS][id] = new Array();
		TConfig.data[KEY_CLASS][id][KEY_REWARD]      = r;
		
		return true;
	}
	
	function addGod(o, id)
	{
		o.id = id;
		TConfig.objects[KEY_GOD][id] = o;
	}
	
	function addField(id, r, t)
	{
		TConfig.data[KEY_FIELD][id] = new Array();
		TConfig.data[KEY_FIELD][id][KEY_REWARD]      = r;
		TConfig.data[KEY_FIELD][id][KEY_TYPE]        = t;
		return true;
	}
	
	function addItem(o, id)
	{
		o.id = id;
		TConfig.objects[KEY_ITEM][id] = o;
	}
	
	function addLang(id, r)
	{
		TConfig.data[KEY_LANG][id] = r;
	}
	
	function addNPC(o, id)
	{
		o.id = id;
		TConfig.objects[KEY_ENEMY][id] = o;
	}

	function addRace(id, r)
	{
		TConfig.data[KEY_RACE][id] = new Array();
		TConfig.data[KEY_RACE][id][KEY_REWARD]      = r;
		
		return true;
	}	
	
	function addSkill(o, id)
	{
		o.id = id;
		TConfig.skills[id] = o;
	}

	function localize(id)
	{
		if(TConfig.data[KEY_LANGUAGE][id] === undefined)
			return false;
		
		TConfig.data[KEY_LANGUAGE][LANGUAGE_TECH]();
		TConfig.data[KEY_LANGUAGE][id]();
		
		jQuery(".flag").removeClass('active');
		jQuery("#flag_" + id).addClass('active');

		jQuery("span.language").each(function(){
				var str = jQuery(this).attr('id').replace(/_/g,'.');
				jQuery(this).html(lang(str));
			});
		
		World.draw();
		
		return true;
	}
	
	function showAbilities(phys_def, magic_def, corruption, weakness, lifesteal, abilities, traits)
	{
		var str = '';
		if(phys_def[0] !== 0)
			str = str + showAbility(TRAIT_PHYS_DEF, phys_def[0], 0, phys_def[1]);
		if(magic_def[0] !== 0)
			str = str + showAbility(TRAIT_MAG_DEF, magic_def[0], 0, magic_def[1]);
		if(corruption > 0)
			str = str + showAbility(TRAIT_CORRUPTION, corruption, 2, '');
		if(corruption < 0)
			str = str + showAbility(TRAIT_INTEGRITY, -corruption, 2, '');
		if(lifesteal > 0)
			str = str + showAbility(TRAIT_LIFESTEAL, lifesteal, 2, '');
		if(weakness > 0)
			str = str + showAbility(TRAIT_WEAKNESS, weakness, 2, '');
		
			// group and show duplicate abilities correctly
		var tempList = [];
		for (var i = 0; i<abilities.length; i++)
			tempList[i] = abilities[i];
	
		for (var i = 0; i<abilities.length; i++)
		{
			var times = 0;		
			for(var j = i; j<abilities.length; j++)
			{
				if(abilities[i] == abilities[j])
				{
					times++;	
					if (times > 1)
						tempList[j] = 0;
				}
			}
			if (tempList[i] != 0)
				str = str + showAbility(tempList[i], times, 0, '');
		}
		
		
		if(traits.length > 0)
			for(var i in traits)
				str = str + showAbility(traits[i], 0, 1, '');
		
		return str;
	}
	
	function showAbility(ability, level, type, description)
	{
		var img_url = lang('abilities.img.' + ability);
		var color   = (type === 0 || type === 2)?'black':'violet';
		var dir     = (type === 0 || type === 2)?'feats':'conditions';
		
		if((ability === TRAIT_PHYS_DEF || ability === TRAIT_MAG_DEF) && (level < 0))
			color = 'red';
		if(ability === TRAIT_BOMB)
			color = 'red';
		if(ability === TRAIT_CAMOUFLAGE || ability === TRAIT_FLANKING)
			color = 'violet';
		
		var r = (level > 1)?(' ' + toRoman(level)):'';
		var t = lang('abilities.' + ability, {'t': level, 'c1': level*5, 'c2': level*2.5, 'r': r});
		if(description)
			t = t + description;
		
		t = t.replace(/'/g,"&quot;");
		
		return "<IMG src='images/" + dir + "/" + img_url + "' title='" + t + "' style='border: 1px solid " + color + ";'>";			
	}
	
	function showChapter(c)
	{
		jQuery(".chapter").hide();
		jQuery("#" + c + "Part").show();
	}
	
	function showSkill(skill, is_active)
	{
		var img_url = lang('skills.img.' + skill);
		var style   = (is_active)?'border: 1px solid silver;':'border: 1px solid black;';
		
		if(skill === SKILL_ATTACK && World.player.hasAbility(TRAIT_MAGICAL_ATTACK))
			img_url = lang('skills.img.magic.' + skill);
		
		var t = TConfig.skills[skill].getDescription();
		t = t.replace(/'/g,"&quot;");
		
		return "<IMG onClick='World.chooseSkill(" + skill + ");' title='" + t + "' src='images/skills/" + img_url + "' style='" + style + "'>";
	}
	
	function toRoman(num)
	{
		if (!+num)
			return false;

		var digits = String(+num).split("");
		var key = ["","C","CC","CCC","CD","D","DC","DCC","DCCC","CM",
				   "","X","XX","XXX","XL","L","LX","LXX","LXXX","XC",
				   "","I","II","III","IV","V","VI","VII","VIII","IX"];
		var roman = "";
		var i = 3;

		while (i--)
			roman = (key[+digits.pop() + (i * 10)] || "") + roman;
		return Array(+digits.join("") + 1).join("M") + roman;		
	}