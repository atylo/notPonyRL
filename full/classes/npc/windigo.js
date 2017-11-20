/**
 * AbstractNPC class
 * Represents an abstract object on the map.
 * Every map object is an instance of such an object, and this is important!
 * 
 * @return
 */

function TNPCWindigo()
{
	ExtClass.call(this, {AbstractNPC: null});

	this.show        = 'w';
	this.color       = 'purple';
	
			// level multipliers
	this.hp_mult     = 1.0;
	this.att_mult    = 1.0;

	this.preInit = function()
	{
		World.raiseEvent(LOG_MOD_CHANGE, MOD_RESIST, this, 6, lang('npc.' + this.id + '.title'));
	}
	this.abilities   = [TRAIT_BLOODLESS];
}


addNPC(new TNPCWindigo(), NPC_WINDIGO);