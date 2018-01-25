
function loadAlternatePromo() {
	jQuery(document).ready(function() {
		jQuery.ajax({
			url: "/homepage/2013/contentdata/wallace/promo.htm",
			dataType: "html",
			cache: true,
			success: function(data) {
				jQuery('#abcPromo').html(data);
				if (debug) { console.log('Loading fallback promo.'); }
			},
			error: function() { 
				if (debug) { console.log('Error loading fallback promo.'); }
			}
		});
	});
}

// Doubleclick

var googletag = googletag || {};
googletag.cmd = googletag.cmd || [];
(function() {
	var gads = document.createElement('script');
	gads.async = true;
	gads.type = 'text/javascript';
	var useSSL = 'https:' == document.location.protocol;
	gads.src = (useSSL ? 'https:' : 'http:') + '//www.googletagservices.com/tag/js/gpt.js';

	if (gads.addEventListener) {
		gads.addEventListener("error", loadAlternatePromo, false);
	} else if (gads.readyState) {
		// ie7, ie8
		gads.onreadystatechange = function () {
			// onreadystatechange returns loaded even if nothing loaded (!), so:
			if (this.readyState == 'loaded') {
				setTimeout(function() { 
					if (!googletag.pubads) { loadAlternatePromo(); }
				}, 1000);
			}
	   };
	}
	var node = document.getElementsByTagName('script')[0];
	node.parentNode.insertBefore(gads, node);
})();

// Adspot: Homepage_main_300x250
googletag.cmd.push(function() {
	googletag.defineSlot('/11738941/Homepage_main_300x250', [300, 250], 'abcPromo').addService(googletag.pubads());
	googletag.pubads().enableSingleRequest();
	googletag.enableServices();
});

// Shop Promo (no fallback)
googletag.cmd.push(function() {
	googletag.defineSlot('/8179753/abc_homepage_shop', [140, 250], 'shopPromo').addService(googletag.pubads());
	googletag.pubads().enableSingleRequest();
	googletag.enableServices();
});

