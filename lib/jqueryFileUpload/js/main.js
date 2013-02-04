window.locale = {
    "fileupload": {
        "errors": {
            "maxFileSize": "File is too big",
            "minFileSize": "File is too small",
            "acceptFileTypes": "Filetype not allowed",
            "maxNumberOfFiles": "Max number of files exceeded",
            "uploadedBytes": "Uploaded bytes exceed file size",
            "emptyResult": "Empty file upload result"
        },
        "error": "Error",
        "start": "Start",
        "cancel": "Cancel",
        "destroy": "Delete"
    }
};

function runJqueryFilesUpload(namePlugin){
	
	var options = eval(namePlugin+"Opts");
	
	var form_element = $("#"+namePlugin).parents("#form_"+namePlugin);
	
	form_element.fileupload({
		fileInput: $("#"+namePlugin),
		formData: {name: namePlugin},
		url: baseUrl+"/ajax/admin_upload/upload",
		maxFileSize: 5000000,
        acceptFileTypes: eval("/(\\.|\\/)("+options.allowedExtensions+")$/i"),
        maxNumberOfFiles: options.maxNumberOfFiles,
        autoUpload: options.autoUpload,
        resizeMaxWidth: 1920,
        resizeMaxHeight: 1200,
        uploadTemplate: function (o) {
	        var rows = $();
	        $.each(o.files, function (index, file) {
	            var row = $('<tr class="template-upload fade">' +
	                '<td class="preview"><span class="fade"></span></td>' +
	                '<td class="name"></td>' +
	                '<td class="size"></td>' +
	                (file.error ? '<td class="error" colspan="2"></td>' :
	                        	'<td><div class="progress"><div class="bar" style="width:0%;"></div></div></td>' +
	                           	'<td class="start"><button class="btn btn-small btn-primary"><i class="icon-upload icon-white"></i><span>'+window.locale.fileupload.start+'</span></button></td>'
	                ) + '<td class="cancel"><button class="btn btn-small btn-warning"><i class="icon-ban-circle icon-white"></i><span>'+window.locale.fileupload.cancel+'</span></button></td></tr>');
	            row.find(".name").text(file.name);
	            row.find('.size').text(o.formatFileSize(file.size));
	            if (file.error) {
	                row.find(".error").text(
	                    locale.fileupload.errors[file.error] || file.error
	                );
	            }
	            rows = rows.add(row);
	        });
	        return rows;
	    },
    	downloadTemplate: function (o) {
	        var rows = $();
	        $.each(o.files, function (index, file) {
	            var row = $('<tr class="template-download fade" data-index="'+options.countItems+'">' +
	                (file.error ? '<td></td><td class="name"></td>' +
	                    '<td class="size"></td><td class="error" colspan="2"></td>' :
	                    '<td class="preview"></td>' +
	                    '<td class="name"><a></a></td>' +
	                    '<td class="size"></td><td colspan="2"></td>'
	                ) + '<td class="delete"><button type="button" class="btn btn-danger"><i class="icon-trash icon-white"></i><span>'+window.locale.fileupload.destroy+'</span></button> ' +
	                    '<input type="checkbox" name="delete" value="1"></td></tr>');
	            row.find('.size').text(o.formatFileSize(file.size));
	            if (file.error) {
	                row.find('.name').text(file.name);
	                row.find('.error').text(
	                    locale.fileupload.errors[file.error] || file.error
	                );
	            } else {
	                row.find('.name a').text(file.name);
	                if (file.thumbnail_url) {
	                    row.find('.preview').append('<a><img></a>')
	                        .find('img').prop('src', file.thumbnail_url);
	                    row.find('a').prop('rel', 'gallery');
	                }
	                row.find(".size").text(file.size);
	                row.find('a').prop('href', file.url).prop("rel", "img-group");
	                row.find('.delete button')
	                    .attr('data-type', file.delete_type)
	                    .attr('data-url', file.delete_url);
	            }
	            rows = rows.add(row);
	        });
	        return rows;
	    }
	}).bind("fileuploaddone", function (e, data) {
		options.countItems++;
		var hidden = $('<input id="'+namePlugin+'_'+options.countItems+'" type="hidden" name="'+namePlugin+'['+options.countItems+']" value="'+data.result[0].name+'" />');
		$("#"+namePlugin+"_hidden_data").append(hidden);
	}).bind("fileuploaddestroy", function (e, data) {
		$("#"+namePlugin+"_"+data.context[0].getAttribute('data-index')).remove();
	});

	form_element.data('fileupload')._adjustMaxNumberOfFiles(-options.countItems);
}
