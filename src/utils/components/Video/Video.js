import { EventBus } from '../../events/bus.js';
import TweenMax from "gsap/TweenMax"
import OutVideo from '../OutVideo/OutVideo.vue'

export default {
	components:{
		OutVideo
	},
	name: 'VideoEl',
	data () {
		return {
			isOpen: false,
			section: null,
			sizes: null
		}
	},
	
	props:{
		idVideo: {
			type: String,
			required: true
		},
		thumb: {
			required: true
		}
	},
	
	mounted: function () {

	},
	
	methods: {

		
	}
}