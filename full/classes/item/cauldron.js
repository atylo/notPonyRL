function TItemCauldron()
{
	ExtClass.call(this, {AbstractItem: null});
	
	this.cost          = 20;	
	this.achievement   = REWARD_STRIPED_ALCHEMIST;
	this.can_be_used   = true;
	
	this.levels        = [7];
	this.type          = ITEM_TYPE_COMMON;
	this.subtype       = ITEM_SUBTYPE_BOOST;
	this.max_count     = 1;
	
	this.attachedItem  = false;
	this.herbs         = [];
	this.recipes       = [];
	
	this.addHerb = function(herb)
	{
		if(this.attachedItem)
			return false;
		
		this.herbs.push(herb);
		this.herbs = this.sortRecipe(this.herbs);
		return true;
	};
	
	this.addRecipe = function(item, level, complexity)
	{
		var herbs   = [];
		var recipes = [];
		var done    = false;
		
		var possible = TConfig.possibleHerbs;
		
		while(!done)
		{
			herbs = [];			
			for(var i = 0; i < complexity; i++)
			{
				shuffle(possible);
				herbs.push(possible[0]);
			};
			
			herbs = this.sortRecipe(herbs);
			done  = (this.compareRecipe(herbs) === false);			
		};
		
		this.recipes.push([herbs, item, level]);
	};
		
	this.canSacrifice = function()
	{
		return false;
	};

	this.compareRecipe = function(r)
	{
		var same = true;
		
		r = this.sortRecipe(r);
		
		for(var i in this.recipes)
		{
			if(r.length !== this.recipes[i][0].length)
				continue;
			
			same = true;
			for(var j in r)
			{
				if(this.recipes[i][0][j] === undefined)
					same = false;
				if(this.recipes[i][0][j] !== r[j])
					same = false;
			}
			
			if(same)
				return i;
		}
		
		return false;
	};
	
	this.getDescription = function()
	{
		var str = lang('items.' + this.id + '.description');

		if(this.herbs.length > 0)
		{
			str = str + lang('items.' + this.id + '.herbs');
			for(var i in this.herbs)
				str = str + lang('items.' + this.id + '.herb.' + this.herbs[i]);
		}

		if(this.attachedItem)
		{
			str = str + lang('items.' + this.id + '.potion');
			str = str + this.attachedItem.getDescription();
		}
		else
		{
			var rstr = '';
			for(var i in this.recipes)
				if(this.recipes[i][2] <= World.player.level)
				{
					rstr = rstr + lang('items.' + this.id + '.recipe', {'i': lang('items.' + this.recipes[i][1] + '.title')});
					for(var j in this.recipes[i][0])
						rstr = rstr + lang('items.' + this.id + '.herb.' + this.recipes[i][0][j]);
				}
				
			if(rstr)
				str = str + lang('items.' + this.id + '.recipes') + rstr;
		}
		
		return str;
	};
		
	this.getTitle = function()
	{
		var str = lang('items.' + this.id + '.title');
		
		if(this.attachedItem)
			str = str + ' - ' + this.attachedItem.getTitle();
		
		return str;
	};	
	
	this.init = function()
	{
		var mod = (World.player._class === CLASS_ALCHEMIST)?1:0;
		
		this.recipes = [];
		
		this.addRecipe(ITEM_POTION_HEALTH   , 1, 5);
		this.addRecipe(ITEM_POTION_MANA     , 2, 2);
		this.addRecipe(ITEM_POTION_HEALTH   , 3, 3);
		this.addRecipe(ITEM_POTION_EXP      , 6 - mod, 3);
		
		this.addRecipe(ITEM_POTION_WONDER   , 7 - mod, 4 - mod);		
		this.addRecipe(ITEM_POTION_STRENGTH , 10 - mod, 4);		
		this.addRecipe(ITEM_POTION_ENDURANCE, 12 - mod*3, 4);
		
		this.addRecipe(ITEM_MUFFIN          , 15 - mod*10, 3);		
		
		this.attachedItem = false;
		this.herbs        = [];
	};
	
	this.onSacrifice = function()
	{
		return false;
	};	
	
	this.onUse = function()
	{
		if(!this.attachedItem)
		{
			if(this.herbs.length == 0)
			{
				World.queue.add(lang('items.' + this.id + '.use.empty'));
				return true;
			}

			var i = this.compareRecipe(this.herbs);
			this.herbs = [];	
			
			if(i === false)
			{
				World.queue.add(lang('items.' + this.id + '.use.fail'));
				return true;
			}
				
			if(this.recipes[i][2] > World.player.level)
				World.wrapper.addAchievementProgress(REWARD_PRESCIENCE, 0.5);
				
			World.wrapper.addAchievementProgress(REWARD_SPICY_HERBS, 0.1);
				
			var item   = jQuery.extend({}, true, TConfig.objects[KEY_ITEM][this.recipes[i][1]]);
			item.level = 1;
			item.state = ITEM_STATE_BOUGHT;
			this.attachedItem = item;
			this.recipes[i][2] = 0;
		}
		else
		{
			this.attachedItem.onUse();
			
			if(this.attachedItem.state == ITEM_STATE_DESTROYED)
				this.attachedItem = false;
		}
	};
	
	this.sortRecipe = function(r)
	{
		var s = [];
		for(var i in r)
		{
			if(s[r[i]] === undefined)
				s[r[i]] = 0;
			s[r[i]]++;
		}
		
		r = [];
		for(var i in s)
			for(var j = 0; j < s[i]; j++)
				r.push(i);
		return r;
	}
}

addItem(new TItemCauldron(), ITEM_CAULDRON);