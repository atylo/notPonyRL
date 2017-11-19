/**
 * AbstractTerrain class
 * Represents an abstract terrain class object.
 * 
 * @return
 */

function AbstractTerrain()
{
	this.show        = '.';	
	this.passable    = true;
	this.see_through = true;
	this.color       = "#FFFFFF"
	
	this.ColorLuminance = function(hex, lum) 
	{
	// validate hex string
		hex = String(hex).replace(/[^0-9a-f]/gi, '');
		if (hex.length < 6) 
		{
			hex = hex[0]+hex[0]+hex[1]+hex[1]+hex[2]+hex[2];
		}
			lum = lum || 0;
			// convert to decimal and change luminosity
			var rgb = "#", c, i;
		for (var i = 0; i < 3; i++) 
		{
			c = parseInt(hex.substr(i*2,2), 16);
			c = Math.round(Math.min(Math.max(0, c + (c * lum)), 255)).toString(16);
			rgb += ("00"+c).substr(c.length);
		}
		return rgb;
	}
	
	this.draw = function(seen, mode)
	{
		var output = '';
		if(seen == SEEN_YES || seen == SEEN_VISITED)
			output = '<SPAN style = "color:'+ this.color +';">' + this.show + '</SPAN>';
		else if(seen == SEEN_FOG)
		{
			var col = this.ColorLuminance(this.color,-0.6);
			output = '<SPAN style = "color:'+ col +';">' + this.show + '</SPAN>';
		}
		else
			output = '<SPAN class="' + TConfig.fogClass + mode + '"></SPAN>';

		return output;
	};
	
	this.getTitle = function()
	{
		return lang('terrain.' + this.id);
	};
	
	this.onMove = function()
	{
		return false;
	};
	
		// all basic onReveal functional is defined in
		// TMap object
	this.onReveal = function()
	{
		return false;
	};
}
