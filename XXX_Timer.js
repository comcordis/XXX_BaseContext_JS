var XXX_Timer =
{
	startDelay: function (delay, callback, callbackArguments)
	{
		return setTimeout(callback, delay, callbackArguments);
	},
	
	cancelDelay: function (delayID)
	{
		clearTimeout(delayID);
	},
	
	startInterval: function (interval, callback, callbackArguments)
	{
		return setInterval(callback, interval, callbackArguments);
	},
	
	stopInterval: function (intervalID)
	{
		clearInterval(intervalID);
	}
};