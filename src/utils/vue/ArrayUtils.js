export default {
	data () {
		return {
			startX: null
		}
	},

	mounted(){
		
	},

	methods: {
		removeItem: function (p_array, p_item, p_clone=false) {
			var i, k, len, result, v;
			result = p_clone ? p_array.slice(0) : p_array;
			for (v = i = 0, len = result.length; i < len; v = ++i) {
				k = result[v];
				if (k === p_item) {
					result.splice(v, 1);
				}
			}

			return result;
		},

		removeItemByIndex: function (p_index, p_array, p_clone=false) {
			var result;
			result = p_clone ? p_array.slice(0) : p_array;
			result.splice(p_index, 1);
			return result;
		},

		removeDuplicateStrings: function (p_array) {
			return p_array.filter(function(el, pos, self) {
				return self.indexOf(el) === pos;
			});
		},

		hasItem: function (p_value, p_array) {
			return p_array.indexOf(p_value) > -1;
		},

		merge: function (p_arrayA, p_arrayB) {
			var i, j, result;
			i = 0;
			j = 0;

			result = [];

			while ((i < p_arrayA.length) || (j < p_arrayB.length)) {
				if (i < p_arrayA.length) {
					result.push(p_arrayA[i]);
					i++;
				}
				if (j < p_arrayB.length) {
					result.push(p_arrayB[j]);
					j++;
				}
			}
			return result;
			
		},

		randomIndex: function (p_array) {			
			var result = Math.floor(Math.random() * ((p_array.length -1) - 0 + 1)) + 0;
			return result
		},

		randomItem: function (p_array) {
			return p_array[this.randomIndex(p_array)]
		},

		shuffle: function (p_array, p_clone=false) {
			var i, item, j, len, random, result, temp;
			result = p_clone ? p_array.slice(0) : p_array;

			for (i = j = 0, len = result.length; j < len; i = ++j) {
				item = result[i];
				random = Math.floor(Math.random() * result.length);
				temp = result[i];
				result[i] = result[random];
				result[random] = temp;
			}

			return result;
		},

		move: function (p_array, p_oldIndex, p_newIndex, p_clone=false) {
			var k, result;
			result = p_clone ? p_array.slice(0) : p_array;

			if (p_newIndex >= result.length) {
				k = new_index - result.length;
				while ((k--) + 1) {
					result.push(void 0);
				}
			}

			result.splice(p_newIndex, 0, result.splice(p_oldIndex, 1)[0]);
			return result;
		},

		fromMiddleToEnd: function () {
			var first, last, len, merged, midLen;
			len = p_array.length;
			midLen = Math.floor(len * 0.5);
			first = p_array.slice(midLen, len);
			last = p_array.slice(0, midLen).reverse();
			merged = this.merge(first, last);
			return merged;
		},

		fromEndToMiddle: function () {
			return this.fromMiddleToEnd(p_array).reverse();
		},

		lastIndexOf: function (p_array, p_value) {
			var i, index, total;
			i = 0;
			total = p_array.length;
			index = -1;
			while (i !== total) {
				if (p_array[i] === p_value) {
					index = i;
					i++;
				}
			}

			return index;
		}
	}
}
