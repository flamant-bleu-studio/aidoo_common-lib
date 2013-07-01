
$(document).ready(function(){
	$(".fancybox").fancybox({
		'scrolling'		: 'auto',
		'width'			: '8',
		'height'		: '10',
		'titleShow'		: false,
		'autoScale'		: true,
		'type'			: 'iframe'
	});

	var datas = new Array(); // All datas
	var temp_id = null; // temp_id pour edition
	var temp  = new Array(); // temp data
	var increment = 0; // ID unique pour les pub

	/** Limited DATE **/
	$("#limited_date").toggle($("#limited").attr('checked'));

	$("#limited").on("click", function(){
		$("#limited_date").toggle($(this).attr('checked'));
	});
	
	jsonLoad(); // Load un json
	/** Fonction qui load le contenue d'un json **/
	function jsonLoad()
	{
		if(typeof datasPubEdit !== "undefined") // Si le json existe (voir .tpl)
		{
			datas = jQuery.parseJSON($("#datas").val());
			
			if (datas == null)
				datas = new Array();
			
			var i = 0;
			$("#pub_manage img.pubs_pub").each(function(){ // Boucle sur toutes les miniatures
				i++;
			});
			increment = i;
			
			/** Appel des functions **/
			generateJson();
		}
	}
	
	/** Définit une taille max pour l'aperçu de l'image upload **/
	$("#image_preview").css("max-width", "120px");
	
	/** Type de page **/
	$("#link_type-0").attr('checked', true);
	showLinkType(0);
	
	function showLinkType(i)
	{
		if(i == 1)
		{
			$("#page_link_internal").hide();
			$("#page_link_external").show();
		}
		else if (i == 0)
		{
			$("#page_link_internal").show();
			$("#page_link_external").hide();
		}
	}
	
	$("#link_type-0").change(function(){
		showLinkType(0);
	});
	$("#link_type-1").change(function(){
		showLinkType(1);
	});

	/** Ajouter du texte sur une image **/
	$("#addtext").attr('checked', false); // Par défaut, checkbox not checked
	$("#addtext_text").hide();			  // On cache le tinymce

	$("#addtext").live("change", function(){
		var temp_check = $(this).attr('checked');
		if( temp_check )
		{
			$("#addtext_text").show();
			tinyMCE.execCommand('mceAddControl', false, "text");
		}
		else
		{
			tinyMCE.execCommand('mceRemoveControl', false, "text");
			$("#addtext_text").hide();
		}
	});
	
	/** Suppresion de toutes les pubs **/
	$('#pub_del').click(function(e) {
		e.preventDefault(); // Permet de ne pas revenir en haut de page
		datas = new Array();
		$('#pub_manage div.pub').each(function(){
			$(this).remove();
		});
		generateJson();
	});
	
	/** Suppresion d'une pub **/
	$("a.pub_delete").live("click", function(e) {
		e.preventDefault(); // Permet de ne pas revenir en haut de page
		var selector_pub = $(this).siblings("img.pubs_pub"); 
		var id = $(selector_pub).attr("rel"); 
		
		delete datas[id]; 
		
		$(this).parent().remove(); 
		generateJson(); // Génération du nouveau Json
	});

	/** Génération du tableau json **/
	function generateJson()
	{
		$("#datas").attr("value", json_encode(datas));
	}

	/** Fonction de nétoyage du formulaire pour editer une pub **/
	function clearFormEdit()
	{
		$("#image").val("");
		imageCancelImage();
		$("#window").attr('checked', false);
		$("#external_page").val("");
		$("#link_type-0").attr('checked', true);
		$("select option:selected").attr("selected", "");
		showLinkType(0);
		$("#addtext").attr('checked', false);
		tinyMCE.execCommand('mceRemoveControl', false, "text");
		$("#text").val("");
		$("#addtext_text").hide();
		$("#weight").val("");
	}

	/** Close fancybox **/
	$("#cancel_pub").live("click", function(){
		$.fancybox.close();
		return false;
	});
	
	/** Event lors de l'envoit d'une image **/
	$("#image").bind("image_set", function(e, params){
		if( params.custom )
		{
			temp["path_thumb"] = params.custom.thumbnail_url;
		    temp["height"] = params.custom.height;
			temp["width"] = params.custom.width;
			temp["theight"] = params.custom.theight;
			temp["twidth"] = params.custom.twidth;
		}
	});

	/** Ajout ou modifciation d'une pub **/
	$("#pub_add, #pub_manage .pubs_pub").live("click", function(e){
		if ( $(this).attr("rel") ) // Vrai si edition d'une image
			temp_id = $(this).attr("rel"); // Récupération de l'id à éditer

		if( temp_id != null) // Edition, on charge les données dans le formulaire
		{
			$("#image").attr("value", datas[temp_id]["image_path"]);
			$("#image_preview").attr("src", datas[temp_id]["image_path_thumb"]);
			$("#imageSelectImg").css("display", "inline");
			if(datas[temp_id]["external_page"] != "")
				$("#external_page").attr("value", datas[temp_id]["external_page"]);
			if( datas[temp_id]["page_link"] != "" )
			{
				$("option").each(function(){
					if($(this).val() == datas[temp_id]["page_link"])
						$(this).attr("selected", "selected");
				})
			}
			if( ( datas[temp_id]["link_type"] == 1 ) && ( datas[temp_id]["link_type"] != "" ) )
			{
				$("#link_type-1").attr('checked', true);
				$("#link_type-0").attr('checked', false);
				showLinkType(1);
			}
			else
			{
				$("#link_type-1").attr('checked', false);
				$("#link_type-0").attr('checked', true);
			}
			if( (datas[temp_id]["window"]) && (datas[temp_id]["window"] != "") )
				$("#window").attr('checked', true);
			else
				$("#window").attr('checked', false);
			$("#weight").attr("value", datas[temp_id]["weight"]);
			
			if( datas[temp_id]["addtext"] && (datas[temp_id]["addtext"] != "") )
			{
				$("#addtext").attr('checked', true);
				$("#addtext_text").show();
			}
			else
			{
				$("#addtext").attr('checked', false);
				$("#addtext_text").hide();
			}
		}
		
		// Configuration de la fancybox
		$.fancybox({
			'width'			: 760,
			'height'		: 600,
			'autoScale'		: false,
			'autoDimensions': false,
			'scrolling'		: 'yes',
			'titleShow'		: false,
			'onComplete'	: function(){
				$('.form_reclame').validationEngine('hide');
				if( temp_id != null) { if( datas[temp_id]["addtext"]) {  tinyMCE.execCommand('mceAddControl', false, "text"); $('#text').val(datas[temp_id]["text"]); } };
			},
			'onCleanup' : function(){
				$('#formAdvert').validationEngine('hide');
				$("#valid_image").unbind();
				$("#cancel_image").unbind();
				temp_id = null; // ID d'édition remis à null
				clearFormEdit(); // Appel de la fonction permettant de vider les champs du formulaire
				temp = new Array(); // Vide le tableau temporaire
			},
			'type'			: 'inline',
			'href' 			: '#edit_pub'
		});
		return false;
	});

	/** Valid form in fancybox **/
	$("#valid_pub").live("click", function(){

		if ( $("#formAdvert").validationEngine('validate') )
		{
			if( temp_id != null )
			{
				var id = temp_id; // ID de l'édition
			}
			else
			{
				increment++
				var id = increment; // Nouvel id unique
				datas[id] = new Array();
			}

			// Enregistrement des données
			if( datas[id]["image_path"] != $("#image").val())
			{
				datas[id]["image_path"] 			= $("#image").val();
				datas[id]["image_path_thumb"] 		= temp["path_thumb"];
				datas[id]["image_width"] 			= temp["width"];
				datas[id]["image_height"] 			= temp["height"];
				datas[id]["image_thumb_width"] 		= temp["twidth"];
				datas[id]["image_thumb_height"] 	= temp["theight"];
			}
			datas[id]["window"]			= ($("#window").attr("checked") != null) ? $("#window").attr("checked") : "";
			datas[id]["link_type"] 		= ($("input[name='link_type']:checked").val() != null) ? $("input[name='link_type']:checked").val() : "";
			datas[id]["external_page"] 	= ($("#external_page").val() != null) ? $("#external_page").val() : "";
			datas[id]["page_link"] 		= ($("select option:selected").val() != null) ? $("select option:selected").val() : "";
			datas[id]["weight"]			= ($("#weight").val() != null) ? $("#weight").val() : "";
			datas[id]["addtext"] 		= ($("#addtext").attr("checked") != null) ? $("#addtext").attr("checked") : "";
			
			if( datas[id]["addtext"] && (datas[id]["addtext"] != "") )
				datas[id]["text"] = encodeURIComponent(tinyMCE.activeEditor.getContent());
			else
				datas[id]["text"] = "";

			if( temp_id == null )
			{
				// Ajout de la nouvelle pub dans le html
				$("#pub_manage").append("<div class='pub'><a href='#' class='pub_delete'></a><img class='pubs_pub absolute' width='100' height='80' rel='"+id+"' src='"+datas[id]["image_path_thumb"]+"'/></div>");
			}
			
			generateJson();
			$.fancybox.close();
		}
		
		return false;
	});

	/** Fonction permettant de générer un tableau JSON. /!\ Trouvé sur internet ! **/
	/* http://www.perkiset.org/forum/javascript/json_encoder_for_javascript-t1094.0.html */
	function json_encode(inVal) { return _json_encode(inVal).join(''); }
	function _json_encode(inVal, out)
	  {
	    out = out || new Array();
	    var undef; // undefined
	    switch (typeof inVal)
	      {
	        case 'object':
	          if (!inVal)
	            {
	              out.push('null');
	            }
	          else
	            {
	              if (inVal.constructor == Array)
	                {
	                  // Need to make a decision... if theres any associative
	                  // elements of the array then I will block the whole
	                  // thing as an object {} otherwise, I'll block it
	                  // as a  normal array []
	                  var testVal = inVal.length;
	                  var compVal = 0;
	                  for (var key in inVal)
	                    {
	                      if (inVal.hasOwnProperty(key))
	                        {
	                          compVal++;
	                        }
	                    }
	                  if (testVal != compVal)
	                    {
	                      // Associative
	                      out.push('{');
	                      i = 0;
	                      for (var key in inVal)
	                        {
	                          if (inVal.hasOwnProperty(key))
	                            {
	                              if (i++ > 0) out.push(',\n');
	                              out.push('"');
	                              out.push(key);
	                              out.push('":');
	                              _json_encode(inVal[key], out);
	                            }
	                        }
	                      out.push('}');
	                    }
	                  else
	                    {
	                      // Standard array...
	                      out.push('[');
	                      for (var i = 0; i < inVal.length; ++i)
	                        {
	                          if (inVal.hasOwnProperty(i))
	                            {
	                              if (i > 0) out.push(',\n');
	                              _json_encode(inVal[i], out);
	                            }
	                        }
	                      out.push(']');
	                    }

	                }
	              else
	                {
	                  if (typeof inVal.toString != 'undefined')
	                    {
	                      out.push('{');
	                      var first = true;
	                      for (var i in inVal)
	                        {
	                          if (inVal.hasOwnProperty(i))
	                            {
	                              var curr = out.length; // Record position to allow undo when arg[i] is undefined.
	                              if (!first) out.push(',\n');
	                              _json_encode(i, out);
	                              out.push(':');                   
	                              _json_encode(inVal[i], out);
	                              if (out[out.length - 1] == undef)
	                                {
	                                  out.splice(curr, out.length - curr);
	                                }
	                              else
	                                {
	                                  first = false;
	                                }
	                            }
	                        }
	                      out.push('}');
	                    }
	                }
	            }
	          return out;

	        case 'unknown':
	        case 'undefined':
	        case 'function':
	          out.push(undef);
	          return out;

	        case 'string':
	          out.push('"');
	          out.push(inVal.replace(/(["\\])/g, '\$1').replace(/\r/g, '').replace(/\n/g, '\n'));
	          out.push('"');
	          return out;
	       
	        default:
	          out.push(String(inVal));
	          return out;
	      }
	  }
	
});