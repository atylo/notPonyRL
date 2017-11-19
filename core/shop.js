	function TShop()
	{
		var player    = '';
		var state     = STATE_MENU;
		var need_draw = false;

		this.addItem = function(item)
		{
			item.init();
			this.items.push(item);
		};

		this.draw = function()
		{
			if(!this.need_draw)
				return false;
			
			var html = '';
			for(var i in this.items)
				html = html + this.items[i].draw(i);
			
			jQuery(TConfig.shopID).html(html);
		};
		
		this.init = function()
		{
			
			var levels = new Array();
			levels[1] = new Array();
			levels[3] = new Array();
			levels[5] = new Array();
			levels[7] = new Array();
			levels[9] = new Array();

			var done    = [];
			var j       = 0;
			var scrolls = 2;
			if(World.player._class == CLASS_TRICKSTER)
				scrolls += 2;
			
			for(var i in TConfig.objects[KEY_ITEM])
			{
				var item = TConfig.objects[KEY_ITEM][i];
				if(item.achievement && World.getHandler().achievements[item.achievement] == undefined)
					continue;
				
				for(var j in item.levels)
				{
					levels[item.levels[j]].push(i);
					done[i] = item.max_count;
				}
			}
			
			this.items = new Array();
			var quote  = {'1': 4, '3': 4, '5': 3, '7': 2, '9': 1};
			
			for(var i in quote)
			{
				var lv      = levels[i];
				var potions = 1;
				if(World.player._class == CLASS_TRICKSTER)
					potions += 2;
				
				var res     = [];
				for(var j in lv)
				{
					if(done[lv[j]] < 1)
						continue;
					if(scrolls < 1 && TConfig.objects[KEY_ITEM][lv[j]].subtype == ITEM_SUBTYPE_SKILL)
						continue;
					if(World.field.isItemBanned(lv[j]) == true)
						continue;
						
					res.push(lv[j]);
				}
				
				for(var j = 0; j < quote[i]; j++)
					if(res.length > 0)
					{
						shuffle(res);
						
						done[res[res.length - 1]]--;
						
						if(TConfig.objects[KEY_ITEM][res[res.length - 1]].subtype == ITEM_SUBTYPE_CONSUMABLE)
						{
							if(potions <= 0)
								shuffle(res);
							potions--;
						}
						
						if(TConfig.objects[KEY_ITEM][res[res.length - 1]].subtype == ITEM_SUBTYPE_SKILL)
							scrolls--;
						
						var item = jQuery.extend({}, true, TConfig.objects[KEY_ITEM][res[res.length - 1]]);
						item.level = i;
						this.addItem(item);
						res = res.slice(0, res.length - 1);
					}
			}
			
			this.need_draw = true;
			this.draw();
		};
		
		this.purchuase = function(id)
		{
			if(this.items[id] == undefined || this.items[id].state != ITEM_STATE_SHOP)
				return false;
				
			if (World.getHandler(STATE_GAME).isActive)	
				if (World.wrapper.getOption(OPTION_TOUCH_CONTROLS))
					if (World.getHandler(STATE_GAME).isTargetMode)
					{
						jQuery('#move_target').removeClass('active');
						World.getHandler(STATE_GAME).isTargetMode = false;
					}
					else
						return false;
			
			if(World.player.gp < this.items[id].cost)
			{
				World.queue.add(lang('shop.nomoney'));
				World.queue.draw();
				return false;
			}
			
			World.player.gp      -= this.items[id].cost;
			this.items[id].state  = ITEM_STATE_BOUGHT;
			this.items[id].onPurchuase();
			this.need_draw        = true;
			World.menu.need_draw  = true;
			World.action(0,0, ACTION_PASS);
			
			World.raiseEvent(LOG_BUY, KEY_ITEM, this.items[id].id, id, this.items[id].cost);
		};
		
		this.restore = function(id)
		{
			
			if(this.items[id] == undefined)
				return false;
				
			this.items[id].state = ITEM_STATE_SHOP;
			this.need_draw       = true;
			World.menu.need_draw = true;
			World.action(0, 0, ACTION_PASS);
			return true;
		}
		
		this.sacrifice = function(id)
		{
			if(this.items[id] == undefined)
				return false;
				
			if (World.getHandler(STATE_GAME).isActive)		
				if (World.wrapper.getOption(OPTION_TOUCH_CONTROLS))
					if (World.getHandler(STATE_GAME).isTargetMode)
					{
						jQuery('#move_target').removeClass('active');
						World.getHandler(STATE_GAME).isTargetMode = false;
					}
					else
						return false;
					
				
			if (this.items[id].canSacrifice())
			{
				this.items[id].onSacrifice();
				this.items[id].state = ITEM_STATE_DESTROYED;
				this.need_draw       = true;
				World.menu.need_draw = true;
				
				// In this place id is passed as 4th parameter as a "place in shop array" of the item. 
				World.raiseEvent(LOG_SACRIFICE, KEY_ITEM, this.items[id].id, id, this.items[id].cost);		
				World.action(0, 0, ACTION_PASS);
				return true;
			}
			return false;
		};
		
		this.use = function(id)
		{
			if(this.items[id] == undefined || this.items[id].state != ITEM_STATE_BOUGHT)
				return false;
			
			if (World.getHandler(STATE_GAME).isActive)
				if (World.wrapper.getOption(OPTION_TOUCH_CONTROLS))
					if (World.getHandler(STATE_GAME).isTargetMode)
					{
						jQuery('#move_target').removeClass('active');
						World.getHandler(STATE_GAME).isTargetMode = false;
					}
					else
						return false;
				
			
					// удалось использовать - тогда raiseEvent
			if(this.items[id].onUse())
				World.raiseEvent(LOG_USE, KEY_ITEM, this.items[id].id, id, this.items[id].cost);	
			
			this.need_draw       = true;
			World.menu.need_draw = 1;
			World.action(0, 0, ACTION_PASS);
			
			return true;
		};
	}