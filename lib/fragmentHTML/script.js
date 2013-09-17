$(document).ready(function() {   
	
	// Cache par défaut (page affichée de base)
	var default_url = window.location.toString();
	var cache = {};
	cache[default_url] = $('.content-core-defaut'); 
	
	var type; // variable de type d'affichage
	var animate; // variable pour gérer les animations
	
	$('#content').on('click', '.fragment', function(e){
		// Récupération des variables du HREF
		type = $(this).data('type');
		animate = $(this).data('animate');
		noscroll = $(this).data('noscroll');
		
		if (type == 'fancybox'){
			// Chargement de la Fancybox avec la requete ajax accompagné du format html pour retirer le layout
			$.fancybox({
				'href' : $(this).attr('href')+'?format=frag',
				'type' : 'iframe'
			});			
		}
		else if (type == 'content'){
			if (typeof history.pushState != 'undefined') { 
				history.pushState(null, '', $(this).attr('href'));
				loadFrag();
			} else {
				return $(this).attr('href');
			}
		}
		
		window.onpopstate = function() {
			$( '#content' ).children( ':visible' ).hide(animate, { direction: "left" }, 300);
			var url = window.location.toString()
			
			if ( cache[ url ] ) {
				cache[ url ].show(animate, { direction: "left" }, 300);
			}
	    };
	    
		return false;
	});
	
	function loadFrag(){
		var height = $( '#content' ).children( ':visible' ).height();
		var width = $( '#content' ).children( ':visible' ).width();
		var url = window.location.toString();
			
		if (noscroll != 1)
			$('html, body').animate({scrollTop: $("#content").offset().top}, 'slow');
		
		$( '#content' ).append('<div style=height:'+height+'px;width:'+width+'px;text-align:center;margin-top:30px;" id="loader"><img src="'+commonLibUrl+'/lib/fragmentHTML/loader.gif" /></div>');
		
		if (animate){
			$( '#content' ).children( ':visible' ).hide(animate, { direction: "left" }, 300, function(){		$('#loader').show();		});
		} else {
			$( '#content' ).children( ':visible' ).hide();
			$('#loader').show();
		}
		
		if ( cache[ url ] ) {
			if (animate){
				cache[ url ].show(animate, { direction: "right"}, 300, function(){ $('#loader').remove(); });
			} else {
				cache[ url ].show();
				$('#loader').remove();
			}
		} else {		
			cache[ url ] = $( '<div class="content-core"/>' )
			.appendTo( '#content' )
			.load(url, 
					{'format' : 'html'},
					function(){
						$('#loader').remove();
						$(this).show(animate, { direction: "right" }, 300);
					});
		}
	}
});