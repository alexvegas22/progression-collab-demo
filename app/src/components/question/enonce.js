import parseMD from "@/util/parse";

export default {
	name: "Enonce",
	props: ["question"],
	computed: {
		enonce() {
			return parseMD(this.question.énoncé);
		}
	}
};
