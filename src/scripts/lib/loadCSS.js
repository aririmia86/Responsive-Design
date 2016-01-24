var loadCSS = function (url) {
	// Crear elemento en el DOM
	var elem = document.createElement('link');
	elem.rel = 'stylesheet';
	elem.href = url;
	document.head.appendChild(elem);
}

module.exports = loadCSS;