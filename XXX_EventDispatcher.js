
// TODO is it really necessary or doest the XXX_DOM_NativeEventDispatcher already deploy something similar

XXX_EventDispatcher = function ()
{
	this.eventListeners = {};
	this.nativeEvent = false;
};

XXX_EventDispatcher.prototype.automaticallyPropagateEventTo = function (type, ancestor)
{
	this.addEventListener(type, function ()
	{
		ancestor.dispatchEventToListeners(type); 
	});
};

XXX_EventDispatcher.prototype.dispatchEventToListeners = function (type, argument)
{	
	if (this.eventListeners[type])
	{
		for (var i = 0, iEnd = this.eventListeners[type].length; i < iEnd; ++i)
		{
			(this.eventListeners[type][i])(argument);
		}
	}
};

XXX_EventDispatcher.prototype.addEventListener = function (type, eventListener)
{
	if (!this.eventListeners[type])
	{
		this.eventListeners[type] = [];
	}
	
	this.eventListeners[type].push(eventListener);
};

XXX_EventDispatcher.prototype.setNativeEvent = function (nativeEvent)
{
	this.nativeEvent = nativeEvent;
};

XXX_EventDispatcher.prototype.clearNativeEvent = function ()
{
	this.nativeEvent = false;
};