$(document).ready(function() {
	
	var selector_langSwitcher = $('.langSwitcher');
	
	/*
	 * Afficher / Cacher les flags des autres langues
	 */
	$(document).click(function(event) {
		if ( $(event.target).parent().hasClass('langSwitcher') )
			$(event.target).parent().find('.others').toggle();
		else
			$(this).find('.others').hide();
	});
	
	/*
	 * Séléction d'une nouvelle langue
	 */
	selector_langSwitcher.find(".others").on('click', 'img', function(event) {
		$(this).parent().toggle(); 												// Cache les flags des autres langues
		
		var activeImage = selector_langSwitcher.find('img.langActive');			// Récupération du flag courant
		
		var others 		= selector_langSwitcher.find('.others');
		
		var newLangImg 		= $(this).attr('src');								// Récupération du flag de la langue choisi
		
		var currentLangId 	= activeImage.attr('realid');						// Récupération de l'id de la langue courante
		var newLangId 		= $(this).attr('realid');							// Récupération de l'id de la langue choisi
		
		var validationEngineError = false;										// Variable qui passera à true si une erreur est trouvé
		
		var form = $(this).parents('form');										// Récupération du form en cours d'édition
		
		/*
		 * Validation des éléments traduisibles un par un
		 */
		form.find('.element_lang_' + currentLangId).each(function(index, element) {
			if ($('#' + $(element).attr('id')).validationEngine('validate'))	// /!\ Return 'false' if valid and 'true' if not valid !
				validationEngineError = true;
		});
		
		/*
		 * Si pas d'erreur de validation de la langue courante, on change la langue courante par celle choisi 
		 */
		if( validationEngineError === false ) {
			
			activeImage.attr('src', newLangImg);	// Change le flag de l'image courante
			activeImage.attr('realid', newLangId);	// Change le realid de l'image courante
			
			others.find('img[realid="' + currentLangId + '"]').removeClass('current'); // Supprime la classe current
			others.find('img[realid="' + newLangId + '"]').addClass('current');		 // Ajoute la classe currente
			
			form.find('div.lang_' + currentLangId).hide();	// Cache les éléments de la langue courante
			form.find('div.lang_' + newLangId).show();		// Affiche les éléments de la langue choisi
		}
		else
			form.validationEngine('validate');	// Permet de faire recadrer l'écran de l'utilisateur au niveau des erreurs
	});
	
});