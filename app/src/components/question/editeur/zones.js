export const zones = {
	désactiverHorsTodo(doc) {
		let posDébut = doc.getValue().indexOf("+TODO") > -1 ? 0 : doc.getValue().indexOf("-TODO", posFin);
		let posFin = 0;

		for (let i = 0; i < doc.lineCount(); i++) {
			if (doc.getLine(i).match("[+-]TODO")) {
				//Cache la ligne +TODO
				doc.markText(
					{ line: i - 1, sticky: "after" },
					{ line: i, sticky: "after" },
					{ collapsed: true, selectRight: false },
				);
			}
		}

		while (posDébut > -1) {
			posFin = doc.getValue().indexOf("+TODO", posDébut);
			if (posFin == -1) {
				posFin = doc.getValue().length;
			}

			let ligneDébut = doc.posFromIndex(posDébut);
			let ligneFin = doc.posFromIndex(posFin);

			//Rend immuable
			doc.markText(
				{ line: ligneDébut.line, ch: 0 },
				{ line: ligneFin.line + 1, ch: 0 },
				{ atomic: true, readOnly: true, inclusiveLeft: true, inclusiveRight: false },
			);

			for (let i = ligneDébut.line; i < ligneFin.line + 1; i++) {
				doc.addLineClass(i, "gutter", "gutter-non-editable");			
				doc.addLineClass(i, "background", "ligne-non-editable");
			}

			posDébut = doc.getValue().indexOf("-TODO", posFin);
				
			}
	},

	cacherHorsVisible(doc) {
		let posFin = 0;
		let posDébut = doc.getValue().indexOf("+VISIBLE") > -1 ? 0 : doc.getValue().indexOf("-VISIBLE", posFin);

		while (posDébut > -1) {
			posFin = doc.getValue().indexOf("+VISIBLE", posDébut);
			if (posFin == -1) {
				posFin = doc.getValue().length;
			}

			let ligneDébut = doc.posFromIndex(posDébut);
			let ligneFin = doc.posFromIndex(posFin);

			//Cache toute la section non visible
			doc.markText(
				{ line: ligneDébut.line - 1 },
				{ line: ligneFin.line },
				{
					collapsed: "true",
					atomic: true,
					selectRight: false,
			});

			//Remplace les lignes non visibles par des lignes vides.
			//Utile pour éviter que les lignes invisibles n'influencent l'indentation automatique.
			for(var i=ligneDébut.line; i<=ligneFin.line; i++)
				if (!doc.getLine(i).match("[+-](TODO|VISIBLE)"))
					doc.replaceRange("",
									 { line: i, ch: 0 },
									 { line: i } );

			posDébut = doc.getValue().indexOf("-VISIBLE", posFin);
		}
	},
};
