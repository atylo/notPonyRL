function TFieldPyramid()
{
	ExtClass.call(this, {CustomField: null});
	this.id             = FIELD_PYRAMID;
	this.fieldFile      = 'pyramid.html';
	this.defaultTerrain = TERRAIN_SAND;
	
	this.scoreMult = 0.75;
	
				// REDEFINE THIS IN YOUR FIELD
	this.customInit = function()
	{
		this.spawnSign('A', lang('pyramid.signA'));
		this.spawnSign('B', lang('pyramid.signB'));
		this.spawnSign('C', lang('pyramid.signC'));
		this.spawnSign('D', lang('pyramid.signD'));
		this.spawnSign('E', lang('pyramid.signE'));
		this.spawnSign('F', lang('pyramid.signF'));
		this.spawnSign('G', lang('pyramid.signG'));
		this.spawnSign('H', lang('pyramid.signH'));
		this.spawnSign('J', lang('pyramid.signJ'));
		this.spawnSign('K', lang('pyramid.signK'));
		this.spawnSign('L', lang('pyramid.signL'));
		this.spawnSign('M', lang('pyramid.signM'));
		this.spawnSign('N', lang('pyramid.signN'));
		
		var mode = World.seedRandom.mt_rand(1,3);

		this.spawnSign('I', lang('pyramid.signI.' + mode));

		// mode = 1, answer = 3
		// mode = 2, answer = 4
		// mode = 3, answer = 1

		alpha = (mode == 3)?new TAncientPyramidAnswerPool():new TAncientPyramidDeathPool();
		beta  = new TAncientPyramidDeathPool();
		gamma = (mode == 1)?new TAncientPyramidAnswerPool():new TAncientPyramidDeathPool();
		delta = (mode == 2)?new TAncientPyramidAnswerPool():new TAncientPyramidDeathPool();
		
		this.placeBookmarkObject(alpha, 'O');
		this.placeBookmarkObject(beta , 'P');
		this.placeBookmarkObject(gamma, 'Q');
		this.placeBookmarkObject(delta, 'R');

		vicTile = new TVictoryTile();
		vicTile.init(lang('pyramid.victoryTile'));
		this.placeBookmarkObject(vicTile, 'Z');

		return true;
	};

				// REDEFINE THIS IN YOUR FIELD
	this.getCustomObjects = function(c)
	{
		return false;
	};
	
				// REDEFINE THIS IN YOUR FIELD
	this.getCustomTerrain = function(c)
	{
		if(c == '#') return TERRAIN_SANDSTONE;
		
		return false;
	};	
	
				// REDEFINE THIS IN YOUR FIELD
	this.getMobTable = function()
	{
		var mobs   = [];
		mobs[NPC_MANTICORE] = [0, 0,0,0,0,1,1,1,1,1,1]; 
		mobs[NPC_MUMMY]     = [0, 1,1,1,1,1,1,1,1,1,1]; 
		mobs[NPC_DUSTER]    = [0, 0,0,1,1,0,0,0,0,0,0]; 
		
		return mobs;
	};
	
	this.spawnSign = function(bookmark, description)
	{
		s = new TObjectSign();
		s.init(description);
		this.placeBookmarkObject(s, bookmark);
		
	};
	
	this.isItemBanned = function (itemCode)
	{
		if (itemCode == ITEM_SCROLL_BLINK)
			return true;
		
		return false;
	};
}

TConfig.objects[KEY_FIELD][FIELD_PYRAMID] = new TFieldPyramid();
addField(FIELD_PYRAMID   , REWARD_NONE     , TYPE_QUEST);

		// CUSTOM CLASSES

function TAncientPyramidDeathPool()
{
	ExtClass.call(this, {AbstractObject: null});
	this.show        = 'n';
	this.color       = 'cyan';
	this.onHover = function()
	{
		if (World.player.x == this.x && World.player.y == this.y)
			return false;
		World.queue.addAlert(lang('pyramid.poolText'));
		World.queue.drawAlerts();
		return true;
	};
	this.onLook = function()
	{
		World.queue.add(lang('pyramid.poolText'));
		return true;
	};
	this.onMove = function()
	{
		World.queue.add(lang('pyramid.poolWrong'));
		World.player.hp -= 578;
		World.player.die();
		return true;
	};
}

function TAncientPyramidAnswerPool()
{
	ExtClass.call(this, {AbstractObject: null});
	this.show        = 'n';
	this.color       = 'cyan';
	this.onHover = function()
	{
		if (World.player.x == this.x && World.player.y == this.y)
			return false;
		World.queue.addAlert(lang('pyramid.poolText'));
		World.queue.drawAlerts();
		return true;
	};
	this.onLook = function()
	{
		World.queue.add(this.description);
		return true;
	};
	this.onMove = function()
	{
		World.queue.add(lang('pyramid.poolRight'));
		World.map.removeObject(this);
		World.map.terrain[11][8] = TERRAIN_FLOOR;
		return true;
	};
}
