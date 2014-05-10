
/*jslint browser: true, devel: true, bitwise: true, eqeq: true, evil: true, plusplus: true, regexp: true, white: true, indent: 4, maxerr: 1000, maxlen: 500 */
/*jshint white:false smarttabs:true multistr:true evil:true asi:true immed:true browser:true devel:true maxerr:1000 */

var XXX = 
{
	IDCounter: 0,
	
	instances: {},
	
	voidInstances: [],
	
	cache: {},
	
	debug: {},
	
	eventListeners: {},
	
	dispatchEventToListeners: function (type, argument)
	{
		if (this.eventListeners[type])
		{
			for (var i = 0, iEnd = this.eventListeners[type].length; i < iEnd; ++i)
			{
				(this.eventListeners[type][i])(argument);
			}
		}
	},
	
	addEventListener: function (type, eventListener)
	{
		if (!this.eventListeners[type])
		{
			this.eventListeners[type] = [];
		}
		
		this.eventListeners[type].push(eventListener);
	},
	
	/*
	
	http://www.kevlindev.com/tutorials/javascript/inheritance/index.htm
	
	extend class:
		However, we simply invoke the super constructor via "call".
		This calls the base class constructor as if it were a method of the first parameter, "this".
		The remaining parameters are passed in as arguments to the function being invoked.
		So, in this case, the base class constructor, Person, will perform any processing on "first" and "last" and the Employee constructor will handle "id".
		
		function childClass (arguments)
		{
			// Parent constructor
			childClass.parentConstructor.call(this, arguments);
			
			// Parent method
			childClass.parent.method.call(this, arguments);
		}
	
		XXX.extendClass(parentClass, childClass);
	
		childClass.prototype.method - function ()
		{
		};
	*/
	
	extendClass: function (parentClass, childClass)
	{
		function extendClass ()
		{
		}
		
		extendClass.prototype = parentClass.prototype;
		
		childClass.prototype = new extendClass();
		childClass.prototype.constructor = childClass;
		childClass.parentConstructor = parentClass;
		childClass.parent = parentClass.prototype;
	},
	
	// http://stackoverflow.com/questions/359788/how-to-execute-a-javascript-function-when-i-have-its-name-as-a-string
	
	callFunction: function (functionName, context /*, args */)
	{
		var args = Array.prototype.slice.call(arguments).splice(2);
		var namespaces = functionName.split(".");
		var func = namespaces.pop();
		var result = false;
		
		if (!context)
		{
			context = window;
		}
		
		for (var i = 0, iEnd = namespaces.length; i < iEnd; i++)
		{
			context = context[namespaces[i]];
		}
		
		result = context[func].apply(this, args);
		
		return result; 
	},
	
	createID: function ()
	{
		return 'XXX_ID_' + (++this.IDCounter);
	},
	
	canLaunch: function ()
	{
		this.dispatchEventToListeners('launch');
	}
};
