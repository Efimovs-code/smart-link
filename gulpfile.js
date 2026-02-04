import pkg from 'gulp';
const { src, dest, watch, parallel } = pkg;

import gulpSass from 'gulp-sass';
import * as dartSass from 'sass';
const scss = gulpSass(dartSass);

import browserSync from 'browser-sync';
import autoprefixer from 'gulp-autoprefixer';
import cleanCss from 'gulp-clean-css';
import uglify from 'gulp-uglify';
import concat from 'gulp-concat';

const bs = browserSync.create();


export function styles() {
  return src('app/scss/main.scss')
    .pipe(scss({ outputStyle: 'compressed' }))
    .pipe(concat('main.min.css'))
    .pipe(autoprefixer({ overrideBrowserslist: ['last 10 versions'], grid: true }))
    .pipe(cleanCss())
    .pipe(dest('docs/css'))
    .pipe(bs.stream());
}


export function scripts() {
  return src('app/scss/main.js')
    .pipe(concat('main.min.js'))
    .pipe(uglify())
    .pipe(dest('docs/js'))
    .pipe(bs.stream());
}


export function browsersync() {
  bs.init({
    server: { baseDir: 'docs/' }
  });
}


export function watching() {
  watch(['app/scss/**/*.scss'], styles);
  watch(['app/scss/**/*.js'], scripts);
  watch(['docs/*.html']).on('change', bs.reload);
}


export default parallel(styles, scripts, browsersync, watching);