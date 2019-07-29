export default {
	data () {
		return {
			matched: null,
			ua: null,
			platform: null,
			version: null,
			vibrate: null,
			standalone: null,
			retina: null,
			name: null,
			versionArr: null,
			touch: null,
			tablet: null,
			mobile: null,
			desktop: null,
			os: null,
			cache: null,
			serviceWorker: null,
			canvas: null,
			webgl: null,
			orientation: null,
			matches: [
				{name: 'Opera', nick: /opera/i, test: /opera|opr/i, version: /(?:opera|opr)[\s\/](\d+(\.\d+)*)/i},
				{name: 'Windows Phone', nick: /WindowsPhone/i, test: /windows phone/i, version: /iemobile\/(\d+(\.\d+)*)/i},
				{name: 'Edge', nick: /edge|edgehtml/i, test: /edge|msapphost|edgehtml/i, version: /(?:edge|edgehtml)\/(\d+(\.\d+)*)/i},
				{name: 'Internet Explorer', nick: /explorer|internetexplorer|ie/i, test: /msie|trident/i, version: /(?:msie |rv:)(\d+(\.\d+)*)/i},
				{name: 'Chrome', nick: /Chrome/i, test: /chrome|crios|crmo/i, version: /(?:chrome|crios|crmo)\/(\d+(\.\d+)*)/i},
				{name: 'iPod', nick: /iPod/i, test: /ipod/i},
				{name: 'iPhone', nick: /iPhone/i, test: /iphone/i},
				{name: 'iPad', nick: /iPad/i, test: /ipad/i},
				{name: 'FirefoxOS', nick: /FirefoxOS|ffos/i, test: /\((mobile|tablet);[^\)]*rv:[\d\.]+\)firefox|iceweasel/i, version: /(?:firefox|iceweasel)[ \/](\d+(\.\d+)?)/i},
				{name: 'Firefox', nick: /Firefox|ff/i, test: /firefox|iceweasel/i, version: /(?:firefox|iceweasel)[ \/](\d+(\.\d+)?)/i},
				{name: 'Android', nick: /Android/i, test: /android/i},
				{name: 'BlackBerry', nick: /BlackBerry/i, test: /(blackberry)|(\bbb)|(rim\stablet)\d+/i, version: /blackberry[\d]+\/(\d+(\.\d+)?)/i},
				{name: 'WebOS', nick: /WebOS/i, test: /(web|hpw)os/i, version: /w(?:eb)?osbrowser\/(\d+(\.\d+)?)/i},
				{name: 'Safari', nick: /safari/i, test: /safari/i}
			]
		}
	},
	
	props:{
	},
	
	mounted(){
		this.ua = navigator.userAgent || ''
		this.platform = navigator.platform || ''
		this.version = this.getFirstMatch(/version\/(\d+(\.\d+)*)/i, this.ua)
		this.vibrate = (navigator.vibrate || navigator.webkitVibrate || navigator.mozVibrate || navigator.msVibrate)
		this.standalone = window.navigator.standalone || window.matchMedia('(display-mode : standalone)').matches
		this.retina = this.testRetinaDisplay()
		
		this.getBrowser()
		
		if (this.version){
			this.versionArr = []
		}else{
			this.version.split('.')
		}
		
		for (var k in this.versionArr) {
			var v = this.versionArr[k]
			this.versionArr[k] = Number(v)
		}
		
		this.touch = Boolean('ontouchstart' in window) || Boolean(navigator.maxTouchPoints > 0) || Boolean(navigator.msMaxTouchPoints > 0);
		this.tablet = /(ipad.*|tablet(?!\s+pc).*|(android.*?chrome((?!mobi).)*))$/i.test(this.ua)
		this.mobile = !this.tablet && Boolean(this.getFirstMatch(/(ipod|iphone|ipad)/i, this.ua) || /[^-]mobi/i.test(this.ua))
		this.desktop = !this.mobile && !this.tablet
		this.os = this.getOS()
		this.cache = this.serviceWorker = 'serviceWorker' in navigator;
		this.canvas = this.testCanvas()
		this.webgl = this.testWebGL()
		this.orientation = this.getOrientation()
	},
	
	methods: {
		getFirstMatch: function(re, val) {
			var m = val.match(re)
			return (m && m.length > 1 && m[1]) || null
		},
		
		testRetinaDisplay: function() {
			if (window.matchMedia){
				var mq = window.matchMedia('only screen and (min--moz-device-pixel-ratio: 1.3), only screen and (-o-min-device-pixel-ratio: 2.6/2), only screen and (-webkit-min-device-pixel-ratio: 1.3), only screen  and (min-device-pixel-ratio: 1.3), only screen and (min-resolution: 1.3dppx)')            
				return mq || mq.matches && window.devicePixelRatio > 1
			}
			return false
		},
		
		getBrowser: function() {
			for (var m in this.matches) {
				if (this.matches[m].test.test(this.ua)) {
					this.name = this.matches[m].name
					this.version = this.version || this.getFirstMatch(this.matches[m].version, this.ua)
					this.matched = this.matches[m]
					break
				}
			}
			
			return [this.name, this.version]
		},
		
		getOS: function() {
			var result = undefined
			switch (navigator.platform.toLowerCase()) {
				case 'iphone':
				case 'ipod':
				case 'ipad':
				case 'iphone simulator':
				case 'ipod simulator':
				case 'ipad simulator':
				case 'Pike v7.6 release 92':
				case 'Pike v7.8 release 517':
					result = 'ios'
					break;
				case 'macintosh':
				case 'macintel':
				case 'macppc':
				case 'mac68k':
					result = 'osx'
					break;
				case 'android':
					result = 'android'
					break;
				case 'os/2':
				case 'wince':
				case 'pocket pc':
				case 'windows':
					result = 'windows'
					break;
				case 'blackberry':
					result = 'blackberry'
					break;
			}
			
			if (/linux armv+(\d{1}l)/i.test(navigator.platform)) {
				result = 'android'
			}else if(/linux+\s?.*?$/im.test(navigator.platform)){
				result = 'linux'
			}else if(/win\d{2}/i.test(navigator.platform)){
				result = 'windows'
			}
			
			return result
		},
		
		testCanvas: function() {
			var err;
			try {
				return !!window.CanvasRenderingContext2D && Boolean(document.createElement("canvas").getContext('2d'));
			} catch (_error) {
				err = _error;
				return false;
			}
		},
		
		testWebGL: function() {
			var err;
			try {
				return !!window.WebGLRenderingContext && Boolean(document.createElement("canvas").getContext('webgl')) || Boolean(document.createElement("canvas").getContext('experimental-webgl'));
			} catch (_error) {
				err = _error;
				return false;
			}
		},
		
		getOrientation: function() {
			var ratio = screen.width / screen.height
			
			if (window.innerWidth > window.innerHeight && ratio > 1.3) {
				return 'landscape';
			} else {
				return 'portrait';
			}
		}
	}
}