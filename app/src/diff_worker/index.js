const worker = new Worker(new URL("./diff.js", import.meta.url), {type: "module"});

const send = message => worker.postMessage( {
	orig: message.orig,
	modif: message.modif,
	mode: message.mode
} );

export default {
	worker,
	send
};
