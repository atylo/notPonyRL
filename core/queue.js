	function TQueue()
	{
		this.events   = new Array();
		this.alerts   = new Array();
		this.html     = '';
		this.a_html   = '';
		
		this.add = function(t)
		{
			this.events.push(t);
		};
		
		this.addAlert = function(t)
		{
			this.alerts.push(t);
		};

		this.clear = function()
		{
			this.events   = new Array();
		};
		
		this.clearAlerts = function()
		{
			this.alerts = new Array();
		};
		
		this.draw = function()
		{
			msg_clear();
			this.html = '';
			for(var i in this.events)
				this.html = this.html + msg(this.events[i]);
			this.clear();
			
			this.drawAlerts();	
		};
		
		this.drawAlerts = function()
		{
			alert_clear();
			this.a_html = '';
			for(var i in this.alerts)
				this.a_html = this.a_html + alert(this.alerts[i]);		
			
			this.clearAlerts();
		}
		
		this.init = function()
		{
			this.clear();
		};
	}