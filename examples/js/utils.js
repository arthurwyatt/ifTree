//show source
function showSource (tree, elem) {
	 var source = JSON.stringify(tree.options, null, 4).split("<").join("&lt").split(">").join("&gt");
	 document.getElementById(elem).innerHTML = source;
}