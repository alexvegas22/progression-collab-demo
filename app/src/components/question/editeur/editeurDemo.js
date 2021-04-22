import ace from "ace-builds";
require("ace-builds/webpack-resolver");

export default class EditeurDemo {
	constructor() {
		this.editeur = null;
	}

	initEditeur(id, langage) {
		this.editeur = ace.edit(id);

		this.editeur.setTheme("ace/theme/" + "ambiance");
		this.editeur.getSession().setMode("ace/mode/" + langage);
	}

	changerCode(code) {
		this.editeur.setValue(code, 1);
	}

	changerThème(thème) {
		this.editeur.setTheme("ace/theme/" + thème);
	}

	changerLangage(langage) {
		this.editeur.getSession().setMode("ace/mode/" + langage);
	}
}
