const champs = new Map();

export const sauvegarde = {

    écrire(question) {
        var texte = "";
        champs.set("type","type: ");
        champs.set("niveau","niveau: ");
        champs.set("titre","titre: ");
        champs.set("description","description: ");
        champs.set("énoncé","énoncé: |\n");
        champs.set("ébauches","ébauches:\n");
        champs.set("rétroaction","rétroaction:\n");
        champs.set("tests","tests:");
        champs.set("auteur","auteur: ");
        champs.set("licence", "licence: ");

        var donnéesQuestion = new Map();
        donnéesQuestion.set("type","prog");
        donnéesQuestion.set("niveau",question.niveau);
        donnéesQuestion.set("titre",question.titre);
        donnéesQuestion.set("description",question.description);
        donnéesQuestion.set("énoncé", this.indenter(question.énoncé,":","':'"));
        donnéesQuestion.set("ébauches",question.ebauches);
        donnéesQuestion.set("rétroaction",this.formaterRétroactions(question.feedback_pos, question.feedback_neg, question.feedback_err));
        donnéesQuestion.set("tests",question.tests);
        donnéesQuestion.set("auteur",question.auteur);
        donnéesQuestion.set("licence",question.licence);
    
        const itemsDeQuestion = donnéesQuestion.keys();
    
        for (var item of itemsDeQuestion){
            if(donnéesQuestion.get(item) != null){
                if(item === "ébauches"){
                    texte += this.formaterÉbauche(item,question.ebauches);
                }else if(item === "tests"){
                    texte = this.formaterTests(texte,question);
                }else {
                    texte += champs.get(item) + donnéesQuestion.get(item) +"\n\n" ;
                }
            }
        }
        return texte;
    },

    formaterRétroactions(pos, neg, err) {
        return `    positive: ${pos}\n    négative: ${neg}\n    erreur: ${err}\n`;
    },

    formaterTests(chaîne,données){
        chaîne +="\nTests:\n";
        for(var test of données.tests){
            chaîne += "    - nom: "+test.nom +"\n      "+
                    "entrée: \n        "+this.indenter(test.entrée,"\n","\n        ")+"\n      "+
                    "sortie: |\n        "+this.indenter(test.sortie_attendue,"\n","\n        ")+"\n";
                }
        return chaîne + "\n";
    },

    formaterÉbauche(chaîne,ébauches){
        var texte = champs.get(chaîne)+ "\n    ";
        const tableauLangages = Object.keys(ébauches);
        for(var langage of tableauLangages){
            texte += langage+": |\n      "+this.indenter(ébauches[langage].code,"\n","\n      ")+"\n    ";
        }
        return texte + "\n";
    },
    
    indenter(chaîne,ancien, nouveau){
        return chaîne.replaceAll(ancien,nouveau);
    }
}