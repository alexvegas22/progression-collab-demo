import parseMD from "@/util/parse";

export default {
	name: "Enonce",
	data(){
        return{
            énoncéEstOuvert:true
        }
    },
	computed: {
		état_réussi() {
			return this.$store.state.avancement.état == 2;
		},
		question() {
			return new Proxy(this.$store.state.question, {
				get: function (obj, prop) {
					return prop == "énoncé" ? parseMD(obj[prop]) : obj[prop];
				},
			});
		},
	},
	methods:{
		fermerÉnoncé(){
			this.énoncéEstOuvert=!this.énoncéEstOuvert;
		}
	}
};
