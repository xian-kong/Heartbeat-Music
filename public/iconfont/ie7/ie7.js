/* To avoid CSS expressions while still supporting IE 7 and IE 6, use this script */
/* The script tag referencing this file must be placed before the ending body tag. */

/* Use conditional comments in order to target IE 7 and older:
	<!--[if lt IE 8]><!-->
	<script src="ie7/ie7.js"></script>
	<!--<![endif]-->
*/

(function() {
	function addIcon(el, entity) {
		var html = el.innerHTML;
		el.innerHTML = '<span style="font-family: \'iconfont\'">' + entity + '</span>' + html;
	}
	var icons = {
		'icon-shoucang': '&#xe619;',
		'icon-jia': '&#xe652;',
		'icon-bofang': '&#xe615;',
		'icon-mute': '&#xe504;',
		'icon-qiatong-suijibofang': '&#xe685;',
		'icon-danquxunhuan': '&#xe62a;',
		'icon-pinglun': '&#xe60c;',
		'icon-shunxubofang-': '&#xe662;',
		'icon-ziyuan': '&#xe602;',
		'icon-xiazai': '&#xe67c;',
		'icon-xinaixin': '&#xe60d;',
		'icon-shengyin': '&#xe67e;',
		'icon-xunhuanbofang': '&#xe726;',
		'icon-xinaixin1': '&#xe60a;',
		'icon-icon2': '&#xe694;',
		'icon-xiayiqu': '&#xe61c;',
		'icon-icon226': '&#xe506;',
		'icon-shangyiqu1': '&#xe51f;',
		'icon-bofang-': '&#xe603;',
		'icon-zanting-': '&#xe604;',
		'0': 0
		},
		els = document.getElementsByTagName('*'),
		i, c, el;
	for (i = 0; ; i += 1) {
		el = els[i];
		if(!el) {
			break;
		}
		c = el.className;
		c = c.match(/icon-[^\s'"]+/);
		if (c && icons[c[0]]) {
			addIcon(el, icons[c[0]]);
		}
	}
}());
