var XXX_URI =
{
	globalDomain: '',
	
	staticURIPathPrefix: '',
	apiURIPathPrefix: '',
	wwwURIPathPrefix: '',
	
	wwwProtocolPrefix: '',
	
	composeRouteURI: function (route)
	{
		var result = '';
		
		result += this.wwwProtocolPrefix;
		result += this.wwwURIPathPrefix;
		result += route;
		
		return result;
	}
};