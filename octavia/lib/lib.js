		// probably should make another class
		// but it will slow the development
		// so STFU OOP
	
	function alert(s)
	{
		var str = '<div>' + s + '</div>';
		
		if(World.state == STATE_GAME || World.state == STATE_REPLAY)
			jQuery(TConfig.consoleAlertID).html(jQuery(TConfig.consoleAlertID).html() + str);
		
		return str;
	}

	function alert_clear()
	{
		if(World.state == STATE_GAME || World.state == STATE_REPLAY)
			jQuery(TConfig.consoleAlertID).html('');
	}	

	function extend(Child, Parent) 
	{
	    var F = function () { };
	    F.prototype = Parent.prototype;
	    var f = new F();
	    
	    for (var prop in Child.prototype) f[prop] = Child.prototype[prop];
	    Child.prototype = f;
	//    Child.prototype.super = Parent.prototype;
	}	
	
	function formButton(title, click, add_title, view, remove, add_class, id)
	{
		if(add_class == undefined) var add_class = '';
		if(remove    == undefined) var remove    = 'javascript:void;';
		if(view      == undefined) var view      = 'javascript:void;';
		if(click     == undefined) var click     = 'javascript:void;';
		if(id        == undefined) var id        = Math.random();
		
		if(add_title)
			add_title = 'title="' + add_title.replace(/"/g, "'") + '"';
		
		var str = '<div ' + add_title + ' id="' + id + '" class="' + TConfig.btnClass + ' ' + add_class + '" onMouseOut="' + remove + '" onClick="' + click + '" onMouseOver="' + view + '">' + title + '</div>';
		return str;
	}

	function formSmallButton(title, click, add_title, view, remove, add_class, id)
	{
		if(add_class == undefined) var add_class = '';
		if(remove    == undefined) var remove    = 'javascript:void;';
		if(view      == undefined) var view      = 'javascript:void;';
		if(click     == undefined) var click     = 'javascript:void;';
		if(id        == undefined) var id        = Math.random();
		
		if(add_title)
			add_title = 'title="' + add_title.replace(/"/g, "'") + '"';
		
		var str = '<div ' + add_title + ' id="' + id + '" class="' + TConfig.btnSmallClass + ' ' + add_class + '" onMouseOut="' + remove + '" onClick="' + click + '" onMouseOver="' + view + '">' + title + '</div>';
		return str;
	}

	function debug(s)
	{
		if(TConfig.debug)
			console.log(s);
	}
	
	var getRnd = function(max)
	{
	    return Math.floor(Math.random()*max);
	};	
	
	function lang(k, d)
	{
		var s = TConfig.data[KEY_LANG][k];
		
		if(s == undefined)
			s = k;
		
		if(d != undefined)
			for(var i in d)
				s = s.split('%' + i).join(d[i]);
		
		return s;
	}
	
	function max(a,b)
	{
		return (a > b)?a:b;
	}
	
	function min(a,b)
	{
		return (a < b)?a:b;
	}
	
	function mt_rand (min, max) 
	{
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}	
	
	function msg(s)
	{
		var str = '<div>' + s + '</div>';
		
		if(World.state == STATE_MENU)
			jQuery(TConfig.menuID + " .console").html(str);
		
		if(World.state == STATE_GAME || World.state == STATE_REPLAY)
			jQuery(TConfig.consoleID).html(jQuery(TConfig.consoleID).html() + str);
		
		return str;
	}

	function msg_clear()
	{
		if(World.state == STATE_MENU || World.state == STATE_REPLAY)
			jQuery(TConfig.menuID + " .console").html('');
		
		if(World.state == STATE_GAME || World.state == STATE_REPLAY)
			jQuery(TConfig.consoleID).html('');		
	}
	
	function notification(str)
	{
		jQuery("#alert").jGrowl(str, { life: 5000});
	}

	function ord (string) 
	{
		// http://kevin.vanzonneveld.net
		// +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
		// +   bugfixed by: Onno Marsman
		// +   improved by: Brett Zamir (http://brett-zamir.me)
		// +   input by: incidence
		// *     example 1: ord('K');
		// *     returns 1: 75
		// *     example 2: ord('\uD800\uDC00'); // surrogate pair to create a single Unicode character
		// *     returns 2: 65536
		var str = string + '',
		code = str.charCodeAt(0);
		if (0xD800 <= code && code <= 0xDBFF) 
		{ // High surrogate (could change last hex to 0xDB7F to treat high private surrogates as single characters)
			var hi = code;
			if (str.length === 1) 
			{
				return code; // This is just a high surrogate with no following low surrogate, so we return its value;
				// we could also throw an error as it is not a complete character, but someone may want to know
			}
			var low = str.charCodeAt(1);
			return ((hi - 0xD800) * 0x400) + (low - 0xDC00) + 0x10000;
		}
		if (0xDC00 <= code && code <= 0xDFFF) 
		{ // Low surrogate
			return code; // This is just a low surrogate with no preceding high surrogate, so we return its value;
			// we could also throw an error as it is not a complete character, but someone may want to know
		}
		return code;
	};

	function shuffle(a) 
	{
		var len = a.length;
		var i   = len;
		
		while (i--) 
		{
			if (typeof(World) !='undefined')
				var p = parseInt(World.seedRandom.rand()*len);
			else 
				var p = parseInt(Math.random()*len);
				var t = a[i];
				a[i]  = a[p];
				a[p]  = t;
		}
	}
	
	function sign(x)
	{
		if( +x === x ) 
		{ // check if a number was given
			return (x === 0) ? x : (x > 0) ? 1 : -1;
		}
		return NaN;
	}
	
	function parseTitle(string)
	{
		if (string.charAt(0) == "<")
		{
			var end1 = string.indexOf("<",string.indexOf("<")+1);
			var end2 = string.indexOf("%");
			var end = 0;
			
			if (end1 > 0 && end2 > 0)
				end = Math.min(end1, end2)
			else 
				end = end1+end2+1;
			
			string = string.substring(string.indexOf(">")+1,end);
		}
		return string;
	}