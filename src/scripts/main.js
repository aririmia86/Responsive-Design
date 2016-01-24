// Funcion autoejecutable. Se lanzara cuando se cargue 
// la pagina
(function (){

	var loadCSS = require('./lib/loadCSS');
	var onScroll = require('./lib/onScroll');
	
	// Se lanza cuando el DOM esta completamente cargado
	document.addEventListener('DOMContentLoaded', onDOMLoad);

	// Devuelve solo el primer elemento aunque haya mas
	var headerElem = document.querySelector('.header');

	headerElem.addEventListener('scroll', onScroll);



	function onDOMLoad () {
		var btnMenu = document.getElementById('btnMenu');
		var navbarMenu = document.getElementById('navbarMenu');
		btnMenu.addEventListener('click', onclickMenu);

		// Carga de lazy CSS
		loadCSS('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.5.0/css/font-awesome.min.css');

		// Carga de lazy Font
		loadCSS('https://fonts.googleapis.com/css?family=Montserrat|Lato');
		

		function onclickMenu(){
			navbarMenu.classList.toggle('header-menu-list--show');
		}

		
	}
	
}());