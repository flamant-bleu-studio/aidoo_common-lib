/*
 * jQuery Mobile Framework : plugin to provide a date and time picker.
 * Copyright (c) JTSage
 * CC 3.0 Attribution.  May be relicensed without permission/notifcation.
 * https://github.com/jtsage/jquery-mobile-datebox
 *
 * Translation by: Unknown
 *
 */

jQuery.extend(jQuery.mobile.datebox.prototype.options.lang, {
	'fr': {
		setDateButtonLabel: "Date Fixée",
		setTimeButtonLabel: "Régler l'heure",
		setDurationButtonLabel: "Régler la durée",
		calTodayButtonLabel: "Aller à aujourd'hui",
		titleDateDialogLabel: "Choisir la Date",
		titleTimeDialogLabel: "Choisir le temps",
		daysOfWeek: ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"],
		daysOfWeekShort: ["D", "L", "M", "M", "J", "V", "S"],
		monthsOfYear: ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"],
		monthsOfYearShort: ["Janv", "Févr", "Mars", "Avril", "Mai", "Juin", "Juil", "Août", "Sept", "Oct", "Nov", "Déc"],
		durationLabel: ["Jours", "Heures", "Minutes", "Secondes"],
		durationDays: ["Jour", "Jours"],
		tooltip: "Ouvrir le sélecteur de date",
		nextMonth: "Suivant",
		prevMonth: "Précédent",
		timeFormat: 24,
		headerFormat: '%A, %-d %B, %Y',
		dateFieldOrder: ['d','m','y'],
		timeFieldOrder: ['h', 'i', 'a'],
		slideFieldOrder: ['y', 'm', 'd'],
		dateFormat: "%d/%m/%Y",
		useArabicIndic: false,
		isRTL: false,
		calStartDay: 0,
		clearButton: "Claire",
		durationOrder: ['d', 'h', 'i', 's'],
		meridiem: ["AM", "PM"],
		timeOutput: "%k:%M",
		durationFormat: "%Dd %DA, %Dl:%DM:%DS"
	}
});
jQuery.extend(jQuery.mobile.datebox.prototype.options, {
	useLang: 'fr'
});

