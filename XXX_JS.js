var XXX_JS =
{
	hasConsole: false,
	
	debug: false,
	
	timezoneOffset: 0,
	normalTimezoneOffset: 0,
	daylightSavingTimeTimezoneOffset: 0,
	
	elements: {},
	
	notifications:
	{
		errors: [],
		exceptions: []
	},
	
	ruler: '################################################################',
	
	initialize: function ()
	{
		// GMT+2 = -120 for getTimezoneOffset()
		var tempDate = new Date()
		this.timezoneOffset = tempDate.getTimezoneOffset() * 60 * -1;
		
		this.normalTimezoneOffset = this.timezoneOffset;
		this.daylightSavingTimeTimezoneOffset = this.timezoneOffset;
		
		var fourMonthsMillisecondOffset = (31 * 4 * 86400 * 1000);
		
		var tempDate2 = new Date(tempDate.getTime() + fourMonthsMillisecondOffset);
		var tempDate2TimezoneOffset = tempDate2.getTimezoneOffset() * 60 * -1;
		
		var tempDate3 = new Date(tempDate.getTime() - fourMonthsMillisecondOffset);
		var tempDate3TimezoneOffset = tempDate3.getTimezoneOffset() * 60 * -1;
		
		if (tempDate2TimezoneOffset != this.normalTimezoneOffset)
		{
			if (tempDate2TimezoneOffset > this.normalTimezoneOffset)
			{
				this.daylightSavingTimeTimezoneOffset = tempDate2TimezoneOffset;
			}
			else
			{
				this.daylightSavingTimeTimezoneOffset = this.normalTimezoneOffset;
				this.normalTimezoneOffset = tempDate2TimezoneOffset;
			}
		}
		else if (tempDate3TimezoneOffset != this.normalTimezoneOffset)
		{
			if (tempDate3TimezoneOffset > this.normalTimezoneOffset)
			{
				this.daylightSavingTimeTimezoneOffset = tempDate3TimezoneOffset;
			}
			else
			{
				this.daylightSavingTimeTimezoneOffset = this.normalTimezoneOffset;
				this.normalTimezoneOffset = tempDate3TimezoneOffset;
			}
		}
		
		if (window)
		{
			window.onerror = function (errorMessage, errorFile, errorLine)
			{
				XXX_JS.errorNotification(0, errorMessage, errorFile, errorLine);
				
				// Suppress native error alerts
				return true;
			};
			
			if ((console && console.log) || (window && window.console && window.console.log))
			{
				this.hasConsole = true;
			}
		}
		
		var debugOutput = document.getElementById('debugOutput');
		
		if (debugOutput)
		{
			debugOutput.innerHTML += this.ruler + "\r\n";
			debugOutput.innerHTML += 'JS errors' + "\r\n";
			
			this.elements.debugOutput = debugOutput;
		}
	},
	
	errorNotification: function (errorCode, errorMessage, errorFile, errorLine)
	{
		errorMessage = ('' + errorMessage);
		errorMessage = errorMessage.replace('<', '&lt;').replace('>', '&gt;');
		
		var error =
		{
			code: errorCode,
			message: errorMessage,
			file: errorFile,
			line: errorLine
		};
		
		this.notifications.errors.push(error);
		
		var errorOutput = 'JS:';
		errorOutput += ' [Code: ' + error.code + ']';
		
		var tempDate = new Date();
		errorOutput += ' (Timestamp: ' + tempDate.getMilliseconds() + ')' + "\r\n"; 
		
		errorOutput += error.message + "\r\n";
		if (error.file)
		{
			errorOutput += 'File: ' + error.file + "\r\n";
		}
		if (error.line)
		{
			errorOutput += 'Line: ' + error.line + "\r\n";
		}
		
		if (this.elements.debugOutput)
		{
			if (XXX_DOM)
			{
				this.elements.debugOutput.innerHTML += this.ruler + "\r\n" + errorOutput;
				var parent = XXX_DOM.getParent(this.elements.debugOutput);
				
				if (parent)
				{
					parent.scrollTop = parent.scrollHeight;
				}
			}
		}
		else
		{
			if (error.code == 0)
			{
				if (this.hasConsole)
				{
					console.log(errorOutput);
				}
				
				alert(errorOutput);
			}
		}
	}
};

XXX_DOM_Ready.addEventListener(function ()
{
	XXX_JS.initialize();
});