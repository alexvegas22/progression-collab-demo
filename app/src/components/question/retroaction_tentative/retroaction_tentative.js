import parseMD from "@/util/parse";

export default {
	name: "RetroactionTentative",
	computed: {
		retroactionTentative() {
			let tentative = this.$store.state.retroactionTentative;
			
			return tentative ?
				   new Proxy(tentative, {
					   get: function( obj, prop ){
						   return prop == 'feedback' ? parseMD(obj[prop]) : obj[prop]; 
					   }
				   })
		  :
				   null;
		},
		msgReponseApi() {
			return this.$store.state.msgAPIEnvoiTentative;
		},
		tentativeEnCoursDeSoumission() {
			return this.$store.state.envoiTentativeEnCours;
		}
	}
};
