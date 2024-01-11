import axios from "axios";

function conf(token, query, config) {
	let conf = {
		params: query,
		...config
	};

	if (token) {
		conf.headers = { Authorization: "Bearer " + token.jwt };
	}

	return conf;
}

async function getData(url, query = null, token = null, config = null) {
	return (await axios.get(url, conf(token, query, config))).data;
}

async function postData(url, query = null, data = null, token = null, config = null) {
	return (await axios.post(url, data, conf(token, query, config))).data;
}

async function putData(url, query = null, data = null, token = null, config = null) {
	return (await axios.put(url, data, conf(token, query, config))).data;
}

async function patchData(url, query = null, data = null, token = null, config = null) {
	return (await axios.patch(url, data, conf(token, query, config))).data;
}

export { getData, postData, putData, patchData };
