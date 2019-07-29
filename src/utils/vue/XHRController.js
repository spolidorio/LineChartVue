import {EventBus} from '../events/bus.js';
import Detections from '../vue/Detections.js';

const axios = require('axios');

export default {
    data() {
        return {
            url: 'http://localhost:1337',
            response: null,
            locationResponse: null,
            loading: null,
            locationError: false,
            mapKey: 'stFW5Ty9ACN0zDTLj2ZhjSAPxhXdvWAH'
        }
    },

    mounted() {
        
    },

    methods: {
        updateCandles: function (cityOrSate, charge = 'exgovernadores') {
            let result;
            switch (charge) {
                case 'Governador':
                    result = 'governadores'
                    break;
                case 'Prefeito':
                    result = 'prefeitos'
                    break;
                case 'Ex-Governador':
                    result = 'exgovernadores'
                    break;
                default:
                    break;
            }

            EventBus.$emit('call-candles', this.response)

            let finalUrl = this.url + '/' + result + '/' + cityOrSate

            axios
                .get(finalUrl)
                .then(response => {
                    this.response = response.data
                    EventBus.$emit('update-candles', this.response)
                })
                .catch(error => {
                    this.error = true
                    EventBus.$emit('error-candles', this.response)
                })
                .finally(() => EventBus.$emit('end-update-candles', this.response))
        },

        getLocation: function (lat, long) {
            let finalUrl = 'http://open.mapquestapi.com/geocoding/v1/reverse?key=' + this.mapKey + 
                            '&location=' + lat + ',' + long;
            axios
                .get(finalUrl)
                .then(response => {
                    this.locationResponse = response.data
                })
                .catch(error => {
                    this.locationError = true
                })
                .finally(() => this.loading = false)
        }
    }
}