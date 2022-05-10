import axios from "axios";

async function getData(url, query = null, token = null) {
	let config = {
		url: url,
		params: query,
	};

	if(token) {
	    config.headers = { Authorization: "Bearer " + token};
	}

	const réponse = await axios.request(config);
	return réponse.data;
}

async function postData(url, query = null, data = null, token = null) {
	let config = {
		url: url,
		method: "post",
		params: query,
		data: data,
	};

	if(token) {
	    config.headers = { Authorization: "Bearer " + token};
	}

	const réponse = await axios.request(config);
	return réponse.data;
}

export { getData, postData };
