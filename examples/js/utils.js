//show source
function showSource (tree, elem) {
	//clone options
	var options =JSON.parse(JSON.stringify(tree.options));
	//get rid of nowhere
	delete options.nodes.nowhere;
	console.log(options.nodes.nowhere);

	var source = JSON.stringify(options, null, 4).split("<").join("&lt").split(">").join("&gt");
	document.getElementById(elem).innerHTML = source;
}