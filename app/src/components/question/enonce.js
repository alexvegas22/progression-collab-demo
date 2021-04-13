import parseMD from "@/util/parse";

export default {
	name: "Enonce",
	props: ["titre", "enonce"],
	computed: {
		formatageMarkdown() {
			return parseMD(this.enonce);
		},
	},
};
