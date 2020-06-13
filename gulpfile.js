const gulp = require('gulp');

async function mytask() {
	console.log('Привет, я таск!');
};

exports.mytask = mytask;


gulp.task('default', gulp.series(
	mytask
));