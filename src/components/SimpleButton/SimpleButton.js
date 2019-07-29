import data from '../../assets/data/main.json'
import TweenMax from "gsap/TweenMax"
import SvgEl from "../../utils/components/SvgEl/SvgEl.vue";


export default {
	name: 'SimpleButton',
	components: {
		SvgEl
	},
	data () {
		return {
			invert: false
		}
	},
	
	props: {
		label: {
			type: String
		}
	},
	
	mounted: function () {
		
	},
	
	methods: {
		
	}
}