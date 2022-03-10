DELETE FROM reponse_prog WHERE username = "utilisateurTest";
DELETE FROM avancement WHERE username = "utilisateurTest";
DELETE FROM sauvegarde WHERE username = "utilisateurTest";
DELETE FROM cle WHERE username = "utilisateurTest";
DELETE FROM user WHERE username = "utilisateurTest";

INSERT INTO user VALUES (
  "utilisateurTest",
  "$2y$10$qD3JtAEO9xAsGevY2/04dewSxUTOIkI1KD8SxHg6mmQF7pNvV/zga", #utilisateurTest
  1,
  0
);

INSERT INTO cle VALUES (
  "utilisateurTest",
  "clé de test",
  "1234",
  1624593600,
  1624680000,
  1
);