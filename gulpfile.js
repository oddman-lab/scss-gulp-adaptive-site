const gulp = require('gulp');
const sass = require('gulp-sass');
const path = require('path');
const browserSync = require('browser-sync').create();
// Пути директорий
const dirBuild = 'build';
const dirApp = 'app';
const dirSource = 'source';

const paths = {
	build: {
		html: path.join(dirBuild),
		css: path.join(dirBuild, 'css'),
		// js: path.join(dirBuild, 'js'),
		// fonts: path.join(dirBuild, dirSource, 'fonts'),
		// img: path.join(dirBuild, dirSource, 'img')
	},
	app: {
		html: path.join(dirApp, 'pages', '*.html'),
		style: path.join(dirApp, dirSource, 'scss', 'main.scss')
	}
}
// app/source/scss/main.scss
gulp.task('sass', function() {
	return gulp.src(paths.app.style)
	.pipe(sass())
	.pipe(gulp.dest(paths.build.css))
	.pipe(browserSync.reload({stream: true}))
})
// следим за html
gulp.task('html', function() {
	return gulp.src('app/pages/*.html')
	.pipe(gulp.dest(paths.build.html))
	.pipe(browserSync.reload({stream: true}))
});

// следим за build и релоадим браузером
gulp.task('server', function() { // Создаем таск browser-sync
	browserSync.init({ // Выполняем browserSync
		server: { // Определяем параметры сервера
			baseDir: 'build' // Директория для сервера - app
		},
		notify: false // Отключаем уведомления
	});
});
	
gulp.task('watch', function() {
	gulp.watch('app/source/**/*.scss', gulp.parallel('sass')); 
	gulp.watch('app/pages/*.html', gulp.parallel('html'));
});
gulp.task('default', gulp.parallel('sass', 'html','server', 'watch'));