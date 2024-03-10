const gulp = require('gulp');
// browser reload
const server = require('gulp-server-livereload');

const autoprefixer = require('gulp-autoprefixer');
const clean = require('gulp-clean');
// built-in node.js module
const fileSystem = require('fs');

// js
const webpack = require('webpack-stream');
const babel = require('gulp-babel');


// live server
gulp.task('startServer', function() {
    gulp.src('./docs')
        .pipe(server({
            livereload: true,
            defaultFile: 'index.html',
            open: true,
        }));
});




// clean dist folder, if it exists
gulp.task('clean', (done)=>{
    if (fileSystem.existsSync('./docs')) {
        return gulp.src('./docs', {read:false})
        .pipe(clean({
            force: true
        }))
    }
    done();
});

// html copy
gulp.task('html', () => {
    return gulp
        .src('./src/**/*.html', {base: './src'})        
        .pipe(gulp.dest('./docs'))
});

// css copy
gulp.task('css', ()=> {
    return gulp
        .src('./src/**/*.css', {base: './src'})
        .pipe(autoprefixer())
        .pipe(gulp.dest('./docs'))
});

// js
gulp.task('js', function() {
    return gulp
        // if we have several entry pages, add them to config
        .src('./src/**/*.mjs')
        // install <--- npm i -D @babel/core @babel/preset-env --->
        .pipe(babel({
            presets: ['@babel/env']
        }))
        // give path to webpack.config
        .pipe(webpack(require('./webpack.config.js')))
        .pipe(gulp.dest('./docs'))
});

// watcher
gulp.task('watch', ()=>{
    gulp.watch('./src/**/*.css', gulp.parallel('css'));
    gulp.watch('./src/**/*.html', gulp.parallel('html'));
    gulp.watch('./src/**/*.mjs', gulp.parallel('js'));
});


gulp.task('default', gulp.series(
    'clean',
    gulp.parallel(
        'html', 
        'css',
        'js'
    ),
    gulp.parallel('watch', 'startServer')
))