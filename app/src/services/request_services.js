import axios from "axios";

axios.defaults.withCredentials = true;

function conf(query, creds, config) {
	let conf = {
		params: query,
		...config
	};

	if(creds){
		if (typeof creds === "string"){
			conf.headers = { Authorization: "Bearer " + creds };
		}
		else if (creds.identifiant && "password" in creds ){
			conf.headers = { Authorization: "Basic " + btoa(`${creds.identifiant}:${creds.password}:${creds.domaine??""}`) };
		}
		else if (creds.identifiant && creds.key_name){
			conf.headers = { Authorization: "Key " + btoa(`${creds.identifiant}:${creds.key_name}`) };
		}
	}

	return conf;
}

async function getData(url, query = null, creds = null, config = null) {
	return (await axios.get(url, conf(query, creds, config))).data;
}

async function postData(url, query = null, data = null, creds = null, config = null) {
	return (await axios.post(url, data, conf(query, creds, config))).data;
}

async function putData(url, query = null, data = null, creds = null, config = null) {
	return (await axios.put(url, data, conf(query, creds, config))).data;
}

async function patchData(url, query = null, data = null, creds = null, config = null) {
	return (await axios.patch(url, data, conf(query, creds, config))).data;
}

export { getData, postData, putData, patchData };
