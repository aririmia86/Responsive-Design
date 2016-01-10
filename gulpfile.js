// Declarar variables con los plugins que hemos descargado
var gulp = require('gulp');
var webserver = require('gulp-webserver');
var stylus = require('gulp-stylus');
var nib = require('nib');
var minifyCSS = require('gulp-minify-css');

// Variable de configuracion
var config = {
	styles: {
		main: './src/styles/main.styl',
		watch: './src/styles/**/*.styl',
		output: './build/css' 
	},
	html: {
		watch: './build/*.html'
	}
}

// Creacion del servidor
gulp.task('server', function(){
	// Directorio fuente donde leer
	gulp.src('./build')
		.pipe(webserver({
			host: '0.0.0.0',
			port: 8080,
			livereload: true
		}));
});

gulp.task('build:css', function(){
	gulp.src(config.styles.main)
		.pipe(stylus({
			use: nib(),
			'include css': true
		}))
		.pipe(minifyCSS())
		.pipe(gulp.dest(config.styles.output));
});

gulp.task('build', ['build:css']);

// Vigilante de los cambios
gulp.task('watch', function(){
	gulp.watch(config.styles.watch, ['build:css']);
	gulp.watch(config.html.watch, ['build']);
})

// Tarea por defecto e indicando en array las tareas que se ejecuten
gulp.task('default', ['server', 'watch', 'build']);

