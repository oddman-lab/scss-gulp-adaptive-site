const gulp = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const path = require('path');
const cache = require('gulp-cache');
const imagemin = require('gulp-imagemin');
const jpegrecompress = require('imagemin-jpeg-recompress');
const pngquant = require('imagemin-pngquant');
const del = require('del');
const { getDefaultSettings } = require('http2');
const browserSync = require('browser-sync').create();

// Пути директорий
const dirBuild = 'build';
const dirApp = 'app';
const dirSource = 'source';

const paths = {
	build: {
		html: path.join(dirBuild),
		css: path.join(dirBuild, 'css'),
		fonts: path.join(dirBuild, 'fonts'),
		img: path.join(dirBuild, 'img'),
		// js: path.join(dirBuild, 'js'),
		
		
	},
	app: {
		html: path.join(dirApp, 'pages', '*.html'),
		style: path.join(dirApp, dirSource, 'scss', 'main.scss'),
		fonts: path.join(dirApp, dirSource, 'fonts', '*.*'),
		img: path.join(dirApp, dirSource, 'img', '**/*.*'),
	}
}

// app/source/scss/main.scss
gulp.task('sass', function() {
	return gulp.src(paths.app.style)
	.pipe(sass())
	.pipe(autoprefixer(['last 5 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
	.pipe(gulp.dest(paths.build.css))
	.pipe(browserSync.reload({stream: true}))
})

// следим за html
gulp.task('html', function() {
	return gulp.src(paths.app.html)
	.pipe(gulp.dest(paths.build.html))
	.pipe(browserSync.reload({stream: true}))
});

// собираем шрифты
gulp.task('fonts', function() {
	return gulp.src(paths.app.fonts)
	.pipe(gulp.dest(paths.build.fonts))
})

// Удаляем build перед сборкой
gulp.task('clean', function() {
	return del.sync(dirBuild); 
});

// Обработка изображений

gulp.task('images', function() {
	return gulp.src(paths.app.img)
	.pipe(cache(imagemin([
		imagemin.gifsicle({ interlaced: true }),
		jpegrecompress({
			progressive: true,
			max: 90,
			min: 80
		}),
		pngquant(),
		imagemin.svgo({ plugins: [{ removeViewBox: false }] })
	])))
	.pipe(gulp.dest(paths.build.img))
})

// следим за build и релоадим браузером
gulp.task('server', function() { 
	browserSync.init({ 
		server: { 
			baseDir: 'build' 
		},
		notify: false
	});
});
	
gulp.task('watch', function() {
	gulp.watch(paths.app.style, gulp.parallel('sass')); 
	gulp.watch(paths.app.html, gulp.parallel('html'));
	gulp.watch(paths.app.img, gulp.parallel('images'));
});
gulp.task('default', gulp.parallel('sass', 'html','server', 'watch'));