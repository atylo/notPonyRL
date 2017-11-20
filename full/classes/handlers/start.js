	function THandlerStart()
	{
		this.startObserving = function(data)
		{
		};
		
		this.stopObserving = function(data)
		{
		};		
	}
	
	TConfig.handlers[STATE_START] = new THandlerStart();