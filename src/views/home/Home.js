import LineChart from "../../components/LineChart/LineChart.vue";
import chart from "../../assets/data/chart.json";

export default {
	name: 'Home',
	components: {
		LineChart
	},
	mixins: [],
	data () {
		return {
			data: chart
		};
	},

	created: function () {
	},

	mounted: function () {
	},

	methods:{
	},

	watch:{
	}
}