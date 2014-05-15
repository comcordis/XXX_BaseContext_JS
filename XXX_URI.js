var XXX_URI =
{
	globalDomain: '',
	
	staticURIPathPrefix: '',
	apiURIPathPrefix: '',
	wwwURIPathPrefix: '',
	currentURIPathPrefix: '',
	
	additionalRoutePrefix: '',
	
	currentHTTPServerProtocolPrefix: '',
	
	composeRouteURI: function (route, subExecutionEnvironment, avoidAdditionalRoutePrefix, httpServerProtocolPrefix)
	{
		var result = '';
				
		if (!httpServerProtocolPrefix)
		{
			httpServerProtocolPrefix = 'current';
		}
		
		switch (httpServerProtocolPrefix)
		{
			case 'current':
				result += this.currentHTTPServerProtocolPrefix;
				break;
			case 'http':
				result += 'http://';
				break;
			case 'https':
				result += 'https://';
				break;
			default:
				result += httpServerProtocolPrefix;
				break;
		}
		
		switch (subExecutionEnvironment)
		{
			case 'static':
				result += this.staticURIPathPrefix;
				break;
			case 'api':
				result += this.apiURIPathPrefix;
				break;
			case 'www':
				result += this.wwwURIPathPrefix;
				break;
			case 'current':
			default:
				result += this.currentURIPathPrefix;
				break;
		}
		
		if (this.additionalRoutePrefix != '' && !avoidAdditionalRoutePrefix)
		{
			result += this.additionalRoutePrefix;
		}
		
		if (XXX_Type.isArray(route))
		{
			result += XXX_Array.joinValuesToString(route, '/');
		}
		else
		{
			result += route;
		}
		
		return result;
	}
};