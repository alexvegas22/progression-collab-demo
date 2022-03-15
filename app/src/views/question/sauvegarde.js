const champsMap = new Map();

export const sauvegarde = {

    écrire(questionMap,question) {
        var texte = "";
        champsMap.set("type","type: ");
        champsMap.set("niveau","niveau: ");
        champsMap.set("titre","titre: ");
        champsMap.set("description","description: ");
        champsMap.set("énoncé","énoncé: |\n");
        champsMap.set("ébauches","ébauches:\n");
        champsMap.set("rétroaction","rétroaction:\n");
        champsMap.set("tests","tests:");
        champsMap.set("auteur","auteur: ");
        champsMap.set("licence", "licence: ");
    
        const iterateur = questionMap.keys();
    
        for (var item of iterateur){
            if(questionMap.get(item) != null){
                if(item === "ébauches"){
                    texte = this.formaterÉbauche(texte,item,question);
                }else if(item === "tests"){
                    texte = this.formaterTests(texte,item,questionMap);
                }else {
                    texte += champsMap.get(item) + questionMap.get(item) +"\n\n" ;
                }
            }
        }
        return texte;
    },

    formaterÉnoncé(données) {
        var énoncéFormaté = données.replaceAll(":", "':'");
        return énoncéFormaté;
    },

    formaterRétroactions(pos, neg, err) {
        return "    positive: " + pos + "\n" + 
                "    négative: " + neg + "\n" + 
                "    erreur: " + err +"\n";
    },

    formaterTests(chaîne,element,données){
        chaîne +="\n"+ champsMap.get(element)+"\n";
        for(var i of données.get(element)){
            
            chaîne += "    - nom: "+i.nom +
                    "\n      entrée: \n        "+this.indenter(i.entrée)+
                    "\n      sortie: | \n        "+this.indenter(i.sortie_attendue)+
                    "\n";
                }
                
        return chaîne + "\n";
    },

    formaterÉbauche(chaîne,element,question){
        chaîne += champsMap.get(element)+ "\n    ";
                    var langages = Object.getOwnPropertyNames(question.ebauches).toString();
                    const tableauLangages = langages.split(",");
                    for(var langage of tableauLangages){
                        chaîne += langage+": |\n      "+question.ebauches[langage].code.replaceAll("\n","\n      ");
                        chaîne +="\n    ";
                    }
                    return chaîne + "\n";
    },

    créerHashMapQuestion(donnéesQuestion){
        var questionMap = new Map();
        questionMap.set("type","prog");
        questionMap.set("niveau",donnéesQuestion.niveau);
        questionMap.set("titre",donnéesQuestion.titre);
        questionMap.set("description",donnéesQuestion.description);
        questionMap.set("énoncé", this.formaterÉnoncé(donnéesQuestion.énoncé));
        questionMap.set("ébauches",donnéesQuestion.ebauches);
        questionMap.set("rétroaction",this.formaterRétroactions(donnéesQuestion.feedback_pos, donnéesQuestion.feedback_neg, donnéesQuestion.feedback_err));
        questionMap.set("tests",donnéesQuestion.tests);
        questionMap.set("auteur",donnéesQuestion.auteur);
        questionMap.set("licence",donnéesQuestion.licence);
        return questionMap;
    },

    indenter(chaîne){
        return chaîne.toString().replaceAll("\n","\n        ");
    }
}