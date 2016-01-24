// Declarar variables con los plugins que hemos descargado
var gulp = require('gulp');
var webserver = require('gulp-webserver');
var stylus = require('gulp-stylus');
var nib = require('nib');
var minifyCSS = require('gulp-minify-css');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var uglify = require('gulp-uglify');

// Variable de configuracion
var config = {
	styles: {
		main: './src/styles/main.styl',
		watch: './src/styles/**/*.styl',
		output: './build/css' 
	},
	html: {
		watch: './build/*.html'
	},
	scripts: {
		main: './src/scripts/main.js',
		watch: './src/scripts/**/*js',
		output: './build/js'
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

gulp.task('build:js', function(){
	return browserify(config.scripts.main)
		.bundle()
		.pipe(source('bundle.js'))
		.pipe(buffer())
		.pipe(uglify())
		.pipe(gulp.dest(config.scripts.output));
});

gulp.task('build', ['build:css', 'build:js']);

// Vigilante de los cambios
gulp.task('watch', function(){
	gulp.watch(config.styles.watch, ['build:css']);
	gulp.watch(config.html.watch, ['build']);
	gulp.watch(config.scripts.watch, ['build:js']);
})

// Tarea por defecto e indicando en array las tareas que se ejecuten
gulp.task('default', ['server', 'watch', 'build']);

