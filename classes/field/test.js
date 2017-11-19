function TFieldTest()
{
	ExtClass.call(this, {CustomField: null});
	
	this.fieldFile = 'test.html';
	
	this.customInit = function()
	{
		World.player.init(RACE_PONY, CLASS_WARRIOR);
		World.player._name    = lang('field.barn.playerName'); 		
		World.player.hp_mult  = 0;
		World.player.att_mult = 0;

		World.player.addSkill(SKILL_BLINK);
		World.player.mp_add = 100;
		World.player.mp = 100;

		World.player.color    = 'red';

		World.player.hp_add   = 250;
		World.player.att_add  = 1;

		World.player.level    = 10;
		World.player.gp       = 0;

		World.player.refresh();
		
		for(var x = 0; x < World.map.sizeX; x++)
			for(var y = 0; y < World.map.sizeY; y++)
				World.map.seen[y][x] = SEEN_VISITED;
	};

	this.getCustomObjects = function(c)
	{
		if(c == '+') 
		{
			var s = new TNPCShadow();
			s.id = NPC_SHADOW;
			s.init(2);
			return s;
		}
		if(c == '^') 
		{
			var s = new TObjectTrapPit();
			return s;
		}
		return false;
	};
		
	this.gameEnd = function(res)
	{
		if(res != ENDING_BAD)
			return 10;	
		
		return 0;
	}
}

TConfig.objects[KEY_FIELD][FIELD_TEST] = new TFieldTest();
addField(FIELD_TEST     , REWARD_NONE     , TYPE_LEVEL);
