jQuery.ajaxCMS = function(params){
	var defaults = {
		cache : false,
		type : 'POST',
		dataType: 'json',
		error : function(results){},
		statusCode401: function() {
			alert('Error during authentication, reload the page please')
		}
	};
	
	var data_default = {
		'ajax_apiKey' : ajax_apiKey,
		'format' : 'json'
	}
	
	var params =  $.extend(defaults, params);
	
	if (params.url === undefined){
		alert("You need to declare at least 'url'.");
		return false;
	}
	
	if (params.datas !== undefined)
		var datas = jQuery.extend(data_default, params.datas);
	else
		var datas = data_default;
	
	$.ajax({
		statusCode: {
			401: params.statusCode401
		},
		type: params.type,
		url: baseUrl+'/api'+params.url,
		dataType : params.dataType,
		cache : params.cache,
		data: datas,
		success : params.success,
		error: params.error
	});
};