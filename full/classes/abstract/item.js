/**
 * AbstractNPC class
 * Represents an abstract object on the map.
 * Every map object is an instance of such an object, and this is important!
 * 
 * @return
 */

function AbstractItem()
{
	this.cost        = 0;	
	this.id          = 0;
	this.can_be_used = false;
	this.levels      = [];
	this.achievement = 0;
	this.type        = ITEM_TYPE_COMMON;
	this.subtype     = ITEM_SUBTYPE_UNDEFINED;
	
	this.state       = ITEM_STATE_SHOP;
	this.level       = 20;
	this.max_count   = 1;
	
	this.canSacrifice = function()
	{
		if (World.player._religion != RELIGION_NONE && this.state == ITEM_STATE_BOUGHT)
			return true;
		return false;
	};
	
	this.draw = function(id)
	{
		var actions = '';
		
		var title   = this.getTitle();
		if(this.level > World.player.level)
			title = '???';
		else
		{
			if(this.state == ITEM_STATE_SHOP)
			{
				title   = title + " (" + this.cost + "$)";
				if (World.getHandler(STATE_GAME).isActive)
					actions = '<span class="action" title="' + lang('shop.buy', {'t': title}) + '" onClick="World.shop.purchuase(' + id + ')">B</span>';
				else
					actions = '<span class="action" title="' + lang('shop.buy', {'t': title}) + '" onClick="">B</span>';
			}
		}

		if(this.state == ITEM_STATE_BOUGHT && this.can_be_used)
			if (World.getHandler(STATE_GAME).isActive)
				actions = actions + '<span class="action" title="' + lang('shop.use', {'t': title}) + '" onClick="World.shop.use(' + id + ')">U</span>';
			else
				actions = actions + '<span class="action" title="' + lang('shop.use', {'t': title}) + '" onClick="">U</span>';
		
		if(this.canSacrifice())
		{
			var piety = World.player.getGod().getPietyByItem(this.id, this.cost);
			if (World.getHandler(STATE_GAME).isActive)
				actions = actions + '<span class="action" title="' + lang('shop.sacrifice', {'t': title, 'p': piety}) + '" onClick="World.shop.sacrifice(' + id + ')">S</span>';
			else
				actions = actions + '<span class="action" title="' + lang('shop.sacrifice', {'t': title, 'p': piety}) + '" onClick="">S</span>';
		}
		
		if(this.state == ITEM_STATE_DESTROYED)
			title = "<s>" + title + "</s>";		
		
		if(this.level <= World.player.level)
		{
			var str = '';
			if(this.subtype != ITEM_SUBTYPE_UNDEFINED)
				str = lang('shop.subtype',{'t': lang('item.subtype.' + this.subtype), 'n': this.getTitle()});
			if(this.achievement != REWARD_NONE)
				str = str + lang('shop.achievement',{'t': lang('achievements.' + this.achievement + '.title')});
			str = str + this.getDescription();
			
			if(str)
				str = 'title="' + str.replace(/"/g, "'")  + '"';
		}		
		
		return '<div ' + str + ' class="btn"><span class="title ' + TConfig.itemTypeClass + this.type + '">' + title + "</span>" + actions + '</div>';
	};
	
	this.getDescription = function()
	{
		return lang('items.' + this.id + '.description');
	};
		
	this.getTitle = function()
	{
		return lang('items.' + this.id + '.title');
	};	
	
	this.init = function()
	{
		
	};
	
	this.onPurchuase = function()
	{
		
	};
	
	this.onSacrifice = function()
	{
		
	};
	
	this.onUse = function()
	{
		return false;
	};
}
