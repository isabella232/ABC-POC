// see: http://support.chartbeat.com/docs/

var _sf_async_config = _sf_async_config || {};
if (window.performance) { window._sf_startpt = performance.timing.navigationStart; }

/** CONFIGURATION START **/
_sf_async_config.uid = 48671;
_sf_async_config.domain = 'abc.net.au'
_sf_async_config.useCanonical = true;
_sf_async_config.sections = abcContentProfile;
_sf_async_config.authors = '';
/** CONFIGURATION END **/

(function() {
	function loadChartbeat() {
		window._sf_endpt = (new Date()).getTime();
		var e = document.createElement('script');
		e.setAttribute('type', 'text/javascript');
		e.setAttribute('src', '//static.chartbeat.com/js/chartbeat.js');
		document.body.appendChild(e);
	}
	if (window.addEventListener) {
		window.addEventListener('load', loadChartbeat, false); // ignore old browsers
	}
})();
