import {EventBus} from '../events/bus.js';
import TweenMax from "gsap/TweenMax"
import ScrollToPlugin from "gsap/ScrollToPlugin";
import Detections from '../vue/Detections.js';

export default {
	data () {
		return {
			scrollData: null
		}
	},

	mounted(){
		window.addEventListener('scroll', this.scroll)
		EventBus.$on('scrollTo', this.scrollToPage);
	},

	methods: {
		scroll: function (e) {
			this.scrollData = e;
		},

		scrollToPage: function(page, time=.4) {
			var completePage = page ? '.' + page : 0;
			TweenMax.to(window, time, {
				scrollTo: completePage,
				autoKill: true,
				ease: Quart.easeOut
			})
		},

		initSnap: function (page) {
			clearTimeout(this.time);
			this.time = setTimeout(function(){ 
				this.scrollTo(page);
			}.bind(this), 2 * 1000);
		},

		scrollTo: function (page) {
			this.scrollToPage(page);
		},
	}
}