export const zones = {
	désactiverHorsTodo(doc, couleur_fond="#000000") {
		const commentaire = doc.getMode()?.lineComment?.replace(/[\\"'\/\*\?\$\^\&\`]/g, "\\$&")?.replace(/\u0000/g, "\\0") ?? "\0"; // eslint-disable-line no-useless-escape,no-control-regex

		for (let i = 0; i < doc.lineCount(); i++) {
			doc.removeLineClass(i, "gutter", "gutter-non-editable");
			doc.removeLineClass(i, "background", "ligne-non-editable");
		}

		const regex_plus_todo = `()(?=(${commentaire})?\\+TODO)`;
		const regex_moins_todo = `(?<=(${commentaire})?-TODO)()`;

		let premierTodoPlus = doc.getValue().match(regex_plus_todo);
		let premierTodoMoins = doc.getValue().match(regex_moins_todo);

		// Pas de balises, on laisse tout modifiable
		if (premierTodoPlus == null && premierTodoMoins == null) return;

		var posDébut = null;
		var posFin = null;
		var matchDébut = null;
		var matchFin = null;
		
		// S'il n'y a pas de +TODO ou s'il est après le premier -TODO,
		// la première zone non-éditable commence là
		if ( premierTodoMoins["index"] > 0 && (premierTodoPlus == null || premierTodoPlus["index"] > premierTodoMoins["index"] ) ) {
			posDébut = premierTodoMoins["index"];
			matchDébut = premierTodoMoins;
		}
		else{
			posDébut = 0;
		}

		while ( posDébut != null ) {
			matchFin = doc.getValue().substring(posDébut).match(regex_plus_todo);
			posFin = matchFin ? matchFin.index+posDébut : null;

			if (posFin == null) {
				posFin = doc.getValue().length;
			}

			let ligneDébut = doc.posFromIndex(posDébut);
			let ligneFin = doc.posFromIndex(posFin);

			//Rend immuable
			doc.markText(
				ligneDébut,
				ligneFin,
				{ atomic: true, readOnly: true, inclusiveLeft: false, inclusiveRight: false, selectLeft: false, selectRight: false },
			);

			for (let i = ligneDébut.line; i <= ligneFin.line; i++) {
				doc.addLineClass(i, "gutter", "gutter-non-editable");
				doc.addLineClass(i, "background", "ligne-non-editable");
			}

			matchDébut = doc.getValue().substring(posFin).match(regex_moins_todo);
			posDébut = matchDébut ? matchDébut.index+posFin : null;

			// TODO en ligne
			if (ligneFin.line == doc.posFromIndex(posDébut).line){
				doc.markText(
					{ line: ligneFin.line, ch: ligneFin.ch+5 },
					doc.posFromIndex(posDébut-5),
					{ 
						css: `background: ${couleur_fond}`,
						className: "edit-box",
						inclusiveRight: true,
						inclusiveLeft: true,
						selectRight: false,
						selectLeft: false,
						clearWhenEmpty: false,
						startStyle: "edit-box-left",
						endStyle: "edit-box-right",
					}
				);
			}
		}

		//Rend invisible les +TODO
		for(const todo of doc.getValue().matchAll( RegExp("\\+TODO.*?(?:-TODO|$)", "gm") )) {
			if(todo[0].indexOf("-TODO") == -1) {
				const line = doc.posFromIndex( todo.index ).line;
				doc.markText(
					{line: line - 1, sticky: "after" },
					{line: line, sticky: "after" },
					{ collapsed: true, readOnly: true, selectRight: false },
				);
			}
			else {
				//Zone éditable sur une ligne
				doc.markText(
					doc.posFromIndex(todo.index),
					doc.posFromIndex(todo.index+5),
					{ collapsed: true, readOnly: true, inclusiveLeft: false, inclusiveRight: false, selectRight: true, selectLeft: false },
				);
			}
		}

		//Rend invisible les -TODO
		for(const todo of doc.getValue().matchAll( RegExp("(?:\\+TODO)?.*?-TODO", "g") )) {
			if(todo[0].indexOf("+TODO") == -1) {
				const line = doc.posFromIndex( todo.index ).line;
				doc.markText(
					{line: line-1, sticky: "after"},
					{line: line, sticky: "after"},
					{ collapsed: true, readOnly: true, selectRight: false },
				);
			}
			else {
				//Zone éditable sur une ligne
				doc.markText(
					doc.posFromIndex(todo.index+todo[0].length-5),
					doc.posFromIndex(todo.index+todo[0].length),
					{ collapsed: true, readOnly: true, inclusiveLeft: false, inclusiveRight: false, selectRight: false, selectLeft: true },
				);
			}
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
