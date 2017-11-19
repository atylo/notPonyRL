function TFieldBarn()
{
	ExtClass.call(this, {CustomField: null});
	
	this.fieldFile = 'barn1.html';
	
	this.customInit = function()
	{
		World.player.init(RACE_PONY, CLASS_FARMER);
		World.player._name    = lang('field.barn.playerName'); 		
		World.player._skills = [SKILL_FORCE_PONY];
		World.chooseSkill(SKILL_FORCE_PONY);
		World.player.hp_mult  = 0;
		World.player.color    = 'red';
		World.player.hp_add   = 256;
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
			var s = new TNPCHayPile();
			s.id = NPC_HAY_PILE;
			s.init(2);
			s.abilities.push(TRAIT_CHAMPION);
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
