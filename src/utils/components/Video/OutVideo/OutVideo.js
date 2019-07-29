import Youtube from './Youtube/Youtube.vue'
import Vimeo from './Vimeo/Vimeo.vue'

export default {
	components: {
    	Youtube,
    	Vimeo
    },
	name: 'OutVideo',
	data () {
		return {
			config: "asd"
		}
	},
	
	props: {
		link: {
			type: String,
			required: true
		},
		thumb: {
			required: true
		}
	},
	
	mounted: function () {
		this.$nextTick(function () {
			
		})
	},
	
	methods: {

	}
}