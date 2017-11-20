function TObjectTree()
{
	ExtClass.call(this, {AbstractObject: null});

	this.show         = 'T';
	this.color        = 'green';
	this.id           = OBJECT_TREE;
	this.z            = 1;
	
	this.empowerEnemies = function()
	{
		for(var y in World.map.objects)
			for(var x in World.map.objects[y])
				for(var z in World.map.objects[y][x])
					if(World.map.objects[y][x][z].getType() == KEY_ENEMY && World.map.objects[y][x][z].hasAbility(TRAIT_FORESTER))
					{
						World.raiseEvent(LOG_MOD_CHANGE, MOD_HP_MULT, World.map.objects[y][x][z], 0.05, lang('object.' + this.id + '.title'));
						World.map.objects[y][x][z].hp += 5;
						if(World.map.objects[y][x][z].hp > World.map.objects[y][x][z].getMaxHP())
							World.map.objects[y][x][z].hp = World.map.objects[y][x][z].getMaxHP();
					}
	};
	
	this.init = function()
	{
		var color = ['green', 'lime', 'lightgreen', 'green', 'green'];
		this.color      = color[World.seedRandom.mt_rand(0, color.length - 1)]; 
	};
	
	this.onMove = function()
	{
		World.map.removeObject(this);
		World.field.trees_cut++;
		this.empowerEnemies();

		return false;
	};
	
	this.onNPCMove = function(o)
	{		
		World.map.removeObject(this);
		this.empowerEnemies();

		return false;
	};			
}

TConfig.objects[KEY_OBJECT][OBJECT_TREE] = new TObjectTree();
