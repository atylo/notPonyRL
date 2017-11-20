/**
 * AbstractNPC class
 * Represents an abstract object on the map.
 * Every map object is an instance of such an object, and this is important!
 * 
 * @return
 */

function TNPCDiamondDog()
{
	ExtClass.call(this, {AbstractNPC: null});

	this.show        = 'D';
	this.color       = 'darkgreen';
	
			// level multipliers
	this.hp_mult     = 0.9;
	this.att_mult    = 1.1;
	
	this.preInit = function()
	{
		World.raiseEvent(LOG_MOD_CHANGE, MOD_ARMOR, this, 3, lang('npc.' + this.id + '.title'));
	}
}


addNPC(new TNPCDiamondDog(),NPC_DIAMOND_DOG);
