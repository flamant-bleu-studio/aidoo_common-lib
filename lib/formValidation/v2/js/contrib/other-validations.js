/*
 This file contains validations that are too specific to be part of the core
 Please reference the file AFTER the translation file or the rules will be overwritten
 Use at your own risk. We can't provide support for most of the validations
*/
(function($){
	if($.validationEngineLanguage == undefined || $.validationEngineLanguage.allRules == undefined )
		alert("Please include other-validations.js AFTER the translation file");
	else {
		$.validationEngineLanguage.allRules["postcode"] = {
		        "regex": /^((0[1-9])|([1-8][0-9])|(9[0-8])|(2A)|(2B))[0-9]{3}$/,
				"alertText": "* Code postal erroné"
		};
		$.validationEngineLanguage.allRules["colorHexa"] = {
		        "regex": /^(([0-9a-fA-F]{3})||([0-9a-fA-F]{6}))$/,
				"alertText": "* Code couleur hexadecimal incorect"
		};
		$.validationEngineLanguage.allRules["phoneHaiti"] = {
		        "regex": /^([0-9]{2}(-|\s){0,1}){3}[0-9]{2}$/,
				"alertText": "* Numéro de téléphone haïtien incorect"
		};
	}
})(jQuery);
