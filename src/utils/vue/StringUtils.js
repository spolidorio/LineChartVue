export default {
    data() {
        return {
            substitionDict: []
        }
    },

    mounted() {
        this._initDict();
    },

    methods: {
        replaceSpecialCharacters(p_string) {
            let char;
            for (char in this.substitionDict) {
                let pattern = new RegExp(char, "g")
                p_string = p_string.replace(pattern, this.substitionDict[char])
            };

            return p_string
        },

        _initDict(){
            this.substitionDict["ã"] = "a"
            this.substitionDict["á"] = "a"
            this.substitionDict["â"] = "a"
            this.substitionDict["ä"] = "a"
            this.substitionDict["à"] = "a"

            this.substitionDict["é"] = "e"
            this.substitionDict["ê"] = "e"
            this.substitionDict["ë"] = "e"
            this.substitionDict["è"] = "e"

            this.substitionDict["í"] = "i"
            this.substitionDict["î"] = "i"
            this.substitionDict["ï"] = "i"
            this.substitionDict["ì"] = "i"

            this.substitionDict["õ"] = "o"
            this.substitionDict["ó"] = "o"
            this.substitionDict["ô"] = "o"
            this.substitionDict["ö"] = "o"
            this.substitionDict["ò"] = "o"

            this.substitionDict["ú"] = "u"
            this.substitionDict["û"] = "u"
            this.substitionDict["ü"] = "u"
            this.substitionDict["ù"] = "u"

            this.substitionDict["ç"] = "c"

            this.substitionDict["ñ"] = "n"
            
            let char;
            for (char in this.substitionDict) {
                this.substitionDict[char.toUpperCase()] = String(this.substitionDict[char]).toUpperCase()
            };
        }
    }   
}
