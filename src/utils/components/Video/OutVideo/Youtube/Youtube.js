import TweenMax from "gsap/TweenMax"

export default {
	name: 'Youtube',
	data () {
		return {
			'videoId': this.link || null,
			'youtubeCallbackName': 'onYouTubeIframeAPIReady',
			'youtubeExistsFlag':   '$isYoutubeFrameAPIReady'
		}
	},
	
	props: {
		link: {
			type: String,
			required: true
		},
		image:{
			required: true
		}
	},
	
	computed: {
		youtubeVideoID(){
			var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
			var match = this.link.match(regExp);
			return (match&&match[7].length==11)? match[7] : false;
		},

		thumb(){
			let res;
			if (this.image) {
				res = this.image
			}else{
				res = 'http://img.youtube.com/vi/' + this.youtubeVideoID + '/0.jpg'
			}
			
			return res
		}
	},
	
	mounted: function () {
		this.$nextTick(function () {
		
			if(!this.hasYoutubeFrameAPI()){
				this.injectYoutubeFrameAPI();
			}
			
			this.whenYoutubeAPIReady().then(
				() => {
					const player = this.$refs.player;
					player.id = 'player-' + Math.floor(Math.random()*1024) + Date.now() + Math.floor(Math.random()*1024);
					this.YTPLayer = new YT.Player(player.id, {
						height: '100%',
						width: '100%',
						videoId: this.youtubeVideoID,
						events: {
							'onReady': this.onPlayerReady
						}
					});        
				},
				error => console.error(error)
			);
			
		})
	},
	
	methods: {
		onPlayerReady: function() {
			TweenMax.to(this.$refs.thumb, .4, {
				alpha: 0
			})
		},

		whenYoutubeAPIReady: function(){
			const existsFlag = this.youtubeExistsFlag;
			return new Promise(function(resolve, reject){
				let elapsed = 0;
				let intervalHandle;
				let checker = function(){
					elapsed += 48;
					if(!!window[existsFlag]){
						clearTimeout(intervalHandle);
						resolve();
					}
					else{
						if(elapsed <= 15000){
							intervalHandle = setTimeout(checker, 48);
						}
						else{
							reject("timeout");
						}
					}
				}; 
				setTimeout(checker,48);
			});
		},
		
		hasYoutubeFrameAPI: function(){
			if(!this.hasYTFrame){
        		this.hasYTFrame = !!(document.getElementsByClassName('.yt-frame-api').length);
    		}
    		return this.hasYTFrame;
		},
		
		injectYoutubeFrameAPI: function(){
			const youtubeExistsFlag   = this.youtubeExistsFlag;
    		const youtubeCallbackName = this.youtubeCallbackName;
    		
			window[this.youtubeCallbackName] = window[this.youtubeCallbackName] || function() {
				window[youtubeExistsFlag] = true;
				window[youtubeCallbackName] = null;
				delete window[youtubeCallbackName];
			}
			
			var tag       = document.createElement('script');
			var first     = document.getElementsByTagName('script')[0];
			tag.src       = "https://www.youtube.com/iframe_api";
			tag.className = "yt-frame-api";
			first.parentNode.insertBefore(tag, first);
		}
	}
}