module.exports = function(req, res, next) {
  const body = req.body;
  console.log(body);

  //TODO : Mettre à jours le body de la réponse selon la doc de l'API
  if (req.method === "POST" && req.path==="/tentative") {
    res.json({
      résultats: [
        {
          résultat: "true",
          sortie_erreur: "",
          sortie_observée: "itération 0\n",
          feedback: "Bravo!"
        },
        {
          résultat: "false",
          sortie_erreur: ":(",
          sortie_observée: "",
          feedback: "Non!"
        },
        {
          résultat: "true",
          sortie_erreur: ":(",
          sortie_observée: "",
          feedback: "Non!"
        }
      ],
      feedback: "Feedback dependant du prof"
    });
  } 
  else if (req.method === "POST" && req.path==="/retroaction"){

    res.json({
      included: [{
        type1: "Résultat",
        id1: "0",
        attributes1: {
          résultat: "true",
          sortie_erreur: "",
          sortie_observée: "itération 0\n",
          feedback: "Bravo!"
        },
        type2: "Résultat",
        id2: "1",
        attributes2: {
          résultat: "false",
          sortie_erreur: "x is not defined int the current context",
          sortie_observée: "",
          feedback: "Mmmm... il va falloir redéfinir la variable pour que ce soit un INT"
        }
      }]
    });
  }
  else {
    next();
  }
}
