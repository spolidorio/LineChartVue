export default {
	data () {
		return {
			startX: null,
			startY: null,
			endX: null,
			endY: null,
			treshold: 100,
			direction: null
		}
	},

	mounted(){
		
	},

	methods: {
		handleTouch: function (start, end) {
			var xDist = this.endX - this.startX;
			var yDist = this.endY - this.startY;
			if(this.endX - this.startX < 0){
				this.direction = this.cbL();
			}else{
				this.direction = this.cbR();
			}
		},

		cbL: function () {
			return 'left'
		},

		cbR: function () {
			return 'right'
		}
	}
}
