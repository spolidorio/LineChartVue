import data from '../../../assets/data/main.json'
import TweenMax from "gsap/TweenMax"

export default {
	name: 'SvgEl',
	data () {
		return {
			svgs: data.svgs,
			svg: null
		}
	},
	
	props: {
		id: {
			type: String
		}
	},
	
	mounted: function () {
		this.$nextTick(function () {
			this.parseSvg()
		})
	},
	
	methods: {
		parseSvg: function(){
			for (var obj in this.svgs) {
				if (this.svgs[obj].id == this.id) {
					this.svg = this.svgs[obj].str
					break
				}
			}
		},
		
	}
}