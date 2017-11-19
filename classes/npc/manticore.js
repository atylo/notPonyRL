/**
 * AbstractNPC class
 * Represents an abstract object on the map.
 * Every map object is an instance of such an object, and this is important!
 * 
 * @return
 */

function TNPCManticore()
{
	ExtClass.call(this, {AbstractNPC: null});

	this.show        = 'M';
	this.color       = 'crimson';
	
		// level multipliers
	this.hp_mult     = 1.2;
	this.att_mult    = 1.0;

	this.abilities   = [TRAIT_FIRST_STRIKE, TRAIT_BEAST];
	
	this.preInit = function()
	{
		World.raiseEvent(LOG_MOD_CHANGE, MOD_ARMOR, this, 10, lang('npc.' + this.id + '.title'));
	}
}

addNPC(new TNPCManticore(), NPC_MANTICORE);