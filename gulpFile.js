const gulp = require('gulp');

const del = require('del');
const util = require('gulp-util');
const chalk = require('chalk');
gulp.task('clean.dist.dev', (done) => {
    del('dist').then((paths) => {
        util.log(`Deleted ${chalk.yellow(paths && paths.join(', ') || '-')}`);
        done();
    });
});

const eslint = require('gulp-eslint');

gulp.task('lint:api', () => {
    return gulp.src('src/**/*.js')
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
});

gulp.task('lint:static', () => {
    return gulp.src('src/static-server.js')
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
});

const webpack = require('webpack');
gulp.task('compile:api', function (done) {
    var onBuild = function (done) {
        return function (err, stats) {
            if (err) {
                console.log('err ->', err);
            }
            else {
                console.log('stats ->', stats.toString());
            }
            if (done) {
                done();
            }
        };
    };
    webpack(require('./webpack.conf.js')).run(onBuild(done));
});

gulp.task('release:api', ['build:api', 'copy:api']);

gulp.task('build:api', ['lint:api', 'compile:api']);

gulp.task('build:static', ['lint:static'], () => {
    gulp.src('./src/static-server.js')
        .pipe(gulp.dest('./'));
});

gulp.task('default', ['clean.dist.dev', 'build:static', 'build:api']);