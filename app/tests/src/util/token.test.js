import tokenEstValide from "@/util/token.js";

test("test étant donné un token avec une date dexpiration de 0 lorsquon vérifie ce token on obtient true", () => {
	const token =
		"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6InV0aWxpc2F0ZXVyX2xhbWJkYSIsImN1cnJlbnQiOjE2NTE3NzE0MTUsImV4cGlyZWQiOjAsInJlc3NvdXJjZXMiOiJbe1widXJsXCI6XCIuKlwiLFwibWV0aG9kXCI6XCIuKlwifV0iLCJ2ZXJzaW9uIjoxfQ.5tStI9jt1y7fsy_qbGKlQ5cWNlgeuvgIZ8l5HHujewI";
	expect(tokenEstValide(token)).toBeTruthy();
});

test("test étant donné un token avec une date dexpiration dans 1 seconde lorsquon vérifie ce token on obtient true", () => {
	const signer = require("jwt-encode");
	const secret = "secret";
	const tempsCourant = Math.round(Date.now() / 1000);
	const data = {
		username: "utilisateur_lambda",
		current: tempsCourant,
		expired: tempsCourant + 1,
		ressources: '[{"url":".*","method":".*"}]',
		version: 1,
	};
	const token = signer(data, secret);
    expect(tokenEstValide(token, 0)).toBeTruthy();
});

test("test étant donné un token avec une date dexpiration dans 1 seconde et un délai de 1 seconde lorsquon vérifie ce token on obtient false", () => {
	const signer = require("jwt-encode");
	const secret = "secret";
	const tempsCourant = Math.round(Date.now() / 1000);
	const data = {
		username: "utilisateur_lambda",
		current: tempsCourant,
		expired: tempsCourant + 1,
		ressources: '[{"url":".*","method":".*"}]',
		version: 1,
	};
	const token = signer(data, secret);
    expect(tokenEstValide(token, 1)).toBeFalsy();
});

test("test étant donné un token avec une date dexpiration il y a 1 seconde lorsquon vérifie ce token on obtient false", () => {
    const signer = require("jwt-encode");
	const secret = "secret";
	const tempsCourant = Math.round(Date.now() / 1000);
	const data = {
		username: "utilisateur_lambda",
		current: tempsCourant,
		expired: tempsCourant - 1,
		ressources: '[{"url":".*","method":".*"}]',
		version: 1,
	};
	const token = signer(data, secret);
    expect(tokenEstValide(token, 0)).toBeFalsy();
});

test("test étant donné un token null lorsquon vérifie ce token on obtien false", () => {
    expect(tokenEstValide(null, 0)).toBeFalsy();
});

test("test étant donné un token qui na pas de date dexpiration lorsquon vérifie ce token on obtient false", () => {
    const signer = require("jwt-encode");
	const secret = "secret";
	const tempsCourant = Math.round(Date.now() / 1000);
	const data = {
		username: "utilisateur_lambda",
		current: tempsCourant,
		expired: null,
		ressources: '[{"url":".*","method":".*"}]',
		version: 1,
	};
	const token = signer(data, secret);

    expect(tokenEstValide(token, 0)).toBeFalsy();
});
