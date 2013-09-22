var XXX_URI =
{
	globalDomain: '',
	
	staticURIPathPrefix: '',
	apiURIPathPrefix: '',
	wwwURIPathPrefix: '',
	currentURIPathPrefix: '',
	
	additionalRoutePrefix: '',
	
	currentHTTPServerProtocolPrefix: '',
	
	composeRouteURI: function (route, subExecutionEnvironment, avoidAdditionalRoutePrefix)
	{
		var result = '';
		
		result += this.currentHTTPServerProtocolPrefix;
		
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
		
		if (this.additionalRoutePrefix != '' && !this.avoidAdditionalRoutePrefix)
		{
			$result += this.additionalRoutePrefix;
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