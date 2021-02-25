module.exports = function(req, res, next) {
  const body = req.body;
  console.log(body);

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
          résultat: "true",
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
  } else {
    next();
  }
}
