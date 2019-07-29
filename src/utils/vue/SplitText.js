export default {
	data () {
		return {
			currentClassName: null
		}
	},

	mounted(){
		
	},

	methods: {
		splitHTMLChars: function (target, opt = {}, className = 'split-chunk') {
			return this.splitHTML(target, className, opt, this.replaceChars)
		},

		splitHTML: function (target, className, opt, type) {
			var html = target.innerHTML

			this.currentClassName = className
			
			var replacedHTML = html.replace(/([^\<\>]*)?(\<[^\>]*\>)?/ig, type)
			target.innerHTML = replacedHTML

			var items = target.querySelectorAll('.' + className)
			var rItems = []
			var i = items.length

			while (i-- > 0) {
				rItems[i] = items[i]
			}
				
			return rItems
		},

		replaceChars: function (match, text, tag){
			var ret = ''
			if (text) {
				ret = text.replace(/(.)/g, '<span class="'+ this.currentClassName +'">$1</span>')
				ret = ret.replace(/(> <)/g, ">&nbsp;<")
				ret = "<div class='split-word'>" + ret
				ret = this.replaceAll(ret, '<span class="' + this.currentClassName + '">&nbsp;</span>', "</div>"+'<span class="' + this.currentClassName + '">&nbsp;</span>'+"<div class='split-word'>")
				ret = ret + "</div>"
			}

			if (tag){
				ret += tag
			}

			return ret
		},

		replaceAll: function (target, search, replacement) {
			return target.replace(new RegExp(search, 'g'), replacement)
		}
	}
}
