var gulp = require('gulp');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var ts = require('gulp-typescript');
var clean = require('gulp-clean');
var runSequence = require('run-sequence');
var browserSync = require('browser-sync').create();

gulp.task('sass', function(){
  return gulp.src('src/**/*.scss')
    .pipe(sass()) // Using gulp-sass
		.pipe(concat('styles-concat.css'))
    .pipe(gulp.dest('dist/styles'))
		.pipe(browserSync.reload({
			stream: true
		}))
});

gulp.task('html-copy', function() {
	return gulp.src('src/**/*.html')
		.pipe(gulp.dest('dist'))
		.pipe(browserSync.reload({
			stream: true
		}))
});

gulp.task('ts-copy', function() {
	return gulp.src('src/**/*.ts')
		.pipe(ts({
			noImplicitAny: true,
			out: 'scripts-concat.js'
		}))
		.pipe(gulp.dest('dist/scripts'))
		// .pipe(browserSync.reload({
		// 	stream: true
		// }))
});

gulp.task('bower-copy', function () {
	return gulp.src('bower_components/**/*')
		.pipe(gulp.dest('dist/bower_components'));
});

gulp.task('browserSync', function() {
	browserSync.init({
		server: {
			baseDir: 'dist'
		}
	});
});

gulp.task('clean', function (){
	return gulp.src('dist/*')
		.pipe(clean());
});

gulp.task('build-fresh', function () {
	runSequence('clean', 'sass', 'html-copy', 'ts-copy', 'bower-copy', 'watch');
});

gulp.task('watch', ['browserSync', 'sass', 'html-copy', 'ts-copy'], function() {
	gulp.watch('src/**/*.scss', ['sass']);
	gulp.watch('src/**/*.html', ['html-copy']);
	gulp.watch('src/**/*.ts', ['ts-copy']);
});
