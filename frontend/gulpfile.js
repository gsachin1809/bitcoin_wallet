'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var minify = require('gulp-minify-css');
var rename = require('gulp-rename');
var clean = require('gulp-clean');
var concat   =   require('gulp-concat');
var uglify   =   require('gulp-uglify');
var ngAnnotate   =   require('gulp-ng-annotate');
var templateCache = require('gulp-angular-templatecache');
// require('savaari_build');

gulp.task('sass',['clean'] ,function () {
  return gulp.src('./sass/app.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('../assets/css/'));
});

gulp.task('sass_minify', ['sass'],function () {
  return gulp.src('../assets/css/**/*.css')
    .pipe(minify({keepBreaks: false}))
    .pipe(rename({
            suffix: '.min'
        }))
    .pipe(gulp.dest('../assets/css/'));
});

gulp.task('clean',function(){
    return gulp.src('../assets/css/*.css')
    .pipe(clean({force: true}));
});

gulp.task('sass:watch', function () {
  gulp.watch('./sass/**/*.scss', ['sass_minify']);
});


//Building the app and config

var bundle_app_config_array   =   [
  './js/app.js',
  './js/config.js'
];
gulp.task('app_config_ng_annotate',function(done){
  return gulp.src(bundle_app_config_array).
  pipe(ngAnnotate({single_qoutes:true}))
  .pipe(gulp.dest('./temp/'));
});

gulp.task('make-bundel-app-config',['app_config_ng_annotate'],function(){
  return gulp.src([
    './temp/app.js',
    './temp/config.js'
  ])
  .pipe(concat('app.js'))
  .pipe(gulp.dest('../assets/app/'));
});

gulp.task('make-app_config-minify',['make-bundel-app-config'],function(){
  return gulp.src('../assets/app/app.js')
  .pipe(uglify())
  .pipe(rename({
          suffix: '.min'
      }))
  .pipe(gulp.dest('../assets/app/'));
});

gulp.task('make_build_app_config',['make-app_config-minify'],function(){
  return gulp.src([
    './temp/app.js',
    './temp/config.js'
  ])
  .pipe(clean({force: true}));
});

//Building the controller

var bundle_controller_array   =   [
  './js/controllers/**/*.js',
];

gulp.task('controller_ng_annotate',function(done){
  return gulp.src(bundle_controller_array).
  pipe(ngAnnotate({single_qoutes:true}))
  .pipe(gulp.dest('./temp/controllers'));
});

gulp.task('make-bundel-controller',['controller_ng_annotate'],function(){
  return gulp.src([
    './temp/controllers/**.js'
  ])
  .pipe(concat('controllers.js'))
  .pipe(gulp.dest('../assets/app/'));
});

gulp.task('make-controller-minify',['make-bundel-controller'],function(){
  return gulp.src('../assets/app/controllers.js')
  .pipe(uglify())
  .pipe(rename({
          suffix: '.min'
      }))
  .pipe(gulp.dest('../assets/app/'));
});

gulp.task('make_build_controller',['make-controller-minify'],function(){
  return gulp.src([
    './temp/controllers/**.js'
  ])
  .pipe(clean({force: true}));
});

//Building the Services
var bundle_service_array   =   [
  './js/services/**/*.js',
];

gulp.task('service_ng_annotate',function(done){
  return gulp.src(bundle_service_array).
  pipe(ngAnnotate({single_qoutes:true}))
  .pipe(gulp.dest('./temp/services'));
});

gulp.task('make-bundel-service',['service_ng_annotate'],function(){
  return gulp.src([
    './temp/services/**/*.js'
  ])
  .pipe(concat('services.js'))
  .pipe(gulp.dest('../assets/app/'));
});

gulp.task('make-service-minify',['make-bundel-service'],function(){
  return gulp.src('../assets/app/services.js')
  .pipe(uglify())
  .pipe(rename({
          suffix: '.min'
      }))
  .pipe(gulp.dest('../assets/app/'));
});

gulp.task('make_build_service',['make-service-minify'],function(){
  return gulp.src([
    './temp/services/**/*.js'
  ])
  .pipe(clean({force: true}));
});

//Building the Directives
var bundle_directive_array   =   [
  './js/directives/**/*.js',
];

gulp.task('directive_ng_annotate',function(done){
  return gulp.src(bundle_directive_array).
  pipe(ngAnnotate({single_qoutes:true}))
  .pipe(gulp.dest('./temp/directives'));
});

gulp.task('make-bundel-directive',['directive_ng_annotate'],function(){
  return gulp.src([
    './temp/directives/**/*.js'
  ])
  .pipe(concat('directives.js'))
  .pipe(gulp.dest('../assets/app/'));
});

gulp.task('make-directive-minify',['make-bundel-directive'],function(){
  return gulp.src('../assets/app/directives.js')
  .pipe(uglify())
  .pipe(rename({
          suffix: '.min'
      }))
  .pipe(gulp.dest('../assets/app/'));
});

gulp.task('make_build_directive',['make-directive-minify'],function(){
  return gulp.src([
    './temp/directives/**/*.js'
  ])
  .pipe(clean({force: true}));
});

//Building the Filters
var bundle_filter_array   =   [
  './js/filters/**/*.js',
];

gulp.task('filter_ng_annotate',function(done){
  return gulp.src(bundle_filter_array).
  pipe(ngAnnotate({single_qoutes:true}))
  .pipe(gulp.dest('./temp/filters'));
});

gulp.task('make-bundel-filter',['filter_ng_annotate'],function(){
  return gulp.src([
    './temp/filters/**/*.js'
  ])
  .pipe(concat('filters.js'))
  .pipe(gulp.dest('../assets/app/'));
});

gulp.task('make-filter-minify',['make-bundel-filter'],function(){
  return gulp.src('../public/app/filters.js')
  .pipe(uglify())
  .pipe(rename({
          suffix: '.min'
      }))
  .pipe(gulp.dest('../assets/app/'));
});

gulp.task('make_build_filter',['make-filter-minify'],function(){
  return gulp.src([
    './temp/filters/**/*.js'
  ])
  .pipe(clean({force: true}));
});

//Building for Template

gulp.task('templatecache', function(done){
  gulp.src('./templates/**/*.html')
  .pipe(templateCache({
    standalone:true,
    module:'pms.templates'
  }))
  .pipe(gulp.dest('../assets/app/'))
  .on('end', done);
});

gulp.task('watch', function () {
  gulp.watch(bundle_app_config_array, ['make_build_app_config']);
  gulp.watch(bundle_controller_array, ['make_build_controller']);
  gulp.watch(bundle_directive_array, ['make_build_directive']);
  gulp.watch(bundle_service_array, ['make_build_service']);
  gulp.watch(bundle_filter_array, ['make_build_filter']);
  gulp.watch(['./templates/**/*.html'], ['templatecache']);
  gulp.watch('./sass/**/*.scss', ['sass_minify']);
});
