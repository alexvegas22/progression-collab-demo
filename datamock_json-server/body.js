const jsonServer = require("json-server");
const server = jsonServer.create();
const router = jsonServer.router("resultats.json");
const middlewares = jsonServer.defaults();

server.use(jsonServer.bodyParser);
server.use(middlewares);


// Custom middleware to access POST methids.
// Can be customized for other HTTP method as well.
server.use((req, res, next) => {
  console.log("POST request listener");
  const body = req.body;
  console.log(body);
  if (req.method === "POST" && req.path==="/tentative") {
    // If the method is a POST echo back the name from request body
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
            résultat: "false",
            sortie_erreur: ":(",
            sortie_observée: "",
            feedback: "Non!"
          }
        ],
        feedback: "Feddback dependant du prof"
      });
  }else{
    //Not a post request. Let db.json handle it
    next();
  }
});

server.use(router);

server.listen(3000, () => {
  console.log("JSON Server is running");
});