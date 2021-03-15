module.exports = function(req, res, next) {
  //TODO : Mettre à jours le body de la réponse selon la doc de l'API
  if (req.method === "POST" && req.path==="/tentative") {
    res.json({
      data: {
        type: "Tentative",
        id: 44,
        attributes: {
          tests_réussis: 1,
          feedback: "Sers-toi d'un for pour itérer"
        },
        included: [{
          type: "Résultat",
          id: 0,
          attributes: {
            résultat: "true",
            sortie_erreur: "",
            sortie_observée: "itération 0\n",
            feedback: "Bravo!"
          }
        },
          {
            type: "Résultat",
            id: 1,
            attributes: {
              résultat: "false",
              sortie_erreur: "x is not defined int the current context",
              sortie_observée: "",
              feedback: "Mmmm... il va falloir réessayer"
            }
          }
        ]
      }
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
