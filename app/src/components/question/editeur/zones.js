export const zones = {
	désactiverHorsTodo(doc) {
		for (let i = 0; i < doc.lineCount(); i++) {
			if (doc.getLine(i).match("[+-]TODO")) {
				//Cache la ligne +TODO
				doc.markText(
					{ line: i - 1, sticky: "after" },
					{ line: i, sticky: "after" },
					{ collapsed: true, selectRight: false },
				);
			}
			else {
				doc.removeLineClass(i, "gutter", "gutter-non-editable");
				doc.removeLineClass(i, "background", "ligne-non-editable");
			}
		}

		let premierTodoPlus = doc.getValue().indexOf("+TODO");
		let premierTodoMoins = doc.getValue().indexOf("-TODO");

		// Pas de balises, on laisse tout modifiable
		if (premierTodoPlus == -1 && premierTodoMoins == -1) return;

		var posDébut = 0;
		var posFin = 0;

		// S'il n'y a pas de +TODO ou s'il est après le premier -TODO,
		// la première zone non-éditable commence là
		if ( premierTodoMoins > 0 && (premierTodoPlus == -1 || premierTodoPlus > premierTodoMoins ) ) {
			posDébut = premierTodoMoins;
		}

		while (posDébut > -1) {
			posFin = doc.getValue().indexOf("+TODO", posDébut);
			if (posFin == -1) {
				posFin = doc.getValue().length;
			}

			let ligneDébut = doc.posFromIndex(posDébut);
			let ligneFin = doc.posFromIndex(posFin);

			//Rend immuable
			if(ligneFin.line == doc.lineCount() -1){
				doc.markText(
					{ line: ligneDébut.line, ch: 0 },
					{ line: ligneFin.line },
					{ atomic: true, readOnly: true, inclusiveLeft: true, inclusiveRight: true },
				);
			}
			else{
				doc.markText(
					{ line: ligneDébut.line, ch: 0 },
					{ line: ligneFin.line + 1, ch: 0 },
					{ atomic: true, readOnly: true, inclusiveLeft: true, inclusiveRight: false },
				);
			}

			for (let i = ligneDébut.line; i <= ligneFin.line; i++) {
				doc.addLineClass(i, "gutter", "gutter-non-editable");
				doc.addLineClass(i, "background", "ligne-non-editable");
			}

			posDébut = doc.getValue().indexOf("-TODO", posFin);
				
		}
	},

	cacherHorsVisible(doc) {
		let premierVisiblePlus = doc.getValue().indexOf("+VISIBLE");
		let premierVisibleMoins = doc.getValue().indexOf("-VISIBLE");

		if (premierVisiblePlus == -1 && premierVisibleMoins == -1) return;
		
		var posDébut = 0;
		var posFin = 0;

		// S'il n'y a pas de +VISIBLE ou s'il est après le premier -VISIBLE,
		// la première zone non-éditable commence là
		if ( premierVisibleMoins > 0 && ( premierVisiblePlus == -1 || premierVisiblePlus > premierVisibleMoins ) ) {
			posDébut = premierVisibleMoins;
		}
		
		while (posDébut > -1) {
			posFin = doc.getValue().indexOf("+VISIBLE", posDébut);
			if (posFin == -1) {
				posFin = doc.getValue().length;
			}

			let ligneDébut = doc.posFromIndex(posDébut).line;
			let ligneFin = doc.posFromIndex(posFin).line;

			//Cache toute la section non visible
			doc.markText(
				{ line: ligneDébut - 1 },
				{ line: ligneFin },
				{
					collapsed: "true",
					atomic: true,
					selectRight: false,
				});

			//Remplace les lignes non visibles par des lignes vides.
			//Utile pour éviter que les lignes invisibles n'influencent l'indentation automatique.
			for(var i=ligneDébut; i<=ligneFin; i++){
				if (!doc.getLine(i).match("VISIBLE")){
					doc.replaceRange(
						"",
						{ line: i, ch: 0 },
						{ line: i }
					);
				}
			}

			posDébut = doc.getValue().indexOf("-VISIBLE", doc.indexFromPos({line:ligneFin, ch: 0}));
		}
	},
};
