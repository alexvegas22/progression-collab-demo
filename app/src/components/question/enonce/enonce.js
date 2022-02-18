import parseMD from "@/util/parse";

export default {
	name: "Enonce",
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
	methods: {
		cacher() {

			var element = document.getElementById("hh").innerHTML;
			if (element == "Modifier ✎") {

				document.getElementById("hh").innerHTML = "Visualiser 👁";
			} else {
				document.getElementById("hh").innerHTML = "Modifier ✎";
			}

		}
	},
	data() {
		

		return {
		  text: this.$store.state.question.énoncé,
		  count: 0,
		  shown: true,

		  toolbar: {
			  documentation: {
				  title: 'Documentation Markdown',
				  icon: 'v-md-icon-tip',
				  action() {
					window.open('https://www.markdownguide.org/cheat-sheet', '_blank');
				  }
			  }
		  }
		}; 
	  },

};
