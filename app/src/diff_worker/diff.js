import { diffChars } from "diff";
import he from "he";

addEventListener( "message", async event => {
	var orig = event.data.orig;
	var modif = event.data.modif;
	var mode = event.data.mode;

	const différences = diffChars(orig, modif);

	var résultat_ins = "";
	var résultat_del = "";

	différences.forEach((différence) => {
		const texte_encodé = he.encode(différence.value);

		if (différence.added) {
			résultat_ins += `<span class="diff différent ins ${mode ? " enabled" : ""}">${texte_encodé}</span>`;
		} else if (différence.removed) {
			résultat_del += `<span class="diff différent del ${mode ? " enabled" : ""}">${texte_encodé}</span>`;
		} else {
			résultat_ins += texte_encodé;
			résultat_del += texte_encodé;
		}
	});

	postMessage( {
		résultat_attendu: résultat_ins.replaceAll(
			"\n",
			`<span class="diff visuel ${mode ? " enabled" : ""}">↵\n</span>`,
		),
		résultat_observé: résultat_del.replaceAll(
			"\n",
			`<span class="diff visuel ${mode ? " enabled" : ""}">↵\n</span>`,
		),
	} );

});
