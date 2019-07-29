export default {
	name: 'Vimeo',
	data () {
		return {
			'videoId': this.link || null
		}
	},
	
	props: {
		link: {
			type: String,
			required: true
		}
	},
	

	mounted: function () {
		this.$nextTick(function () {
		
			if(!this.hasVimeoFrameAPI()){
				this.injectVimeoFrameAPI();
			}
			
			setTimeout(function () {
				this.addVimeoVideo()
			}.bind(this), 100)
		})
	},
	
	methods: {
		addVimeoVideo: function(){
			 var options = {
		        url: this.link
		    };
		    var player = new Vimeo.Player('made-in-ny', options);
		    
		},
		
		hasVimeoFrameAPI: function(){
			if(!this.hasVimeoFrame){
        		this.hasVimeoFrame = !!(document.getElementsByClassName('.vimeo-frame-api').length);
    		}
    		return this.hasVimeoFrame;
		},
		
		injectVimeoFrameAPI: function(){
			var tag       = document.createElement('script');
			var first     = document.getElementsByTagName('script')[0];
			tag.src       = "https://player.vimeo.com/api/player.js";
			tag.className = "vimeo-frame-api";
			first.parentNode.insertBefore(tag, first);
		}
	}
}