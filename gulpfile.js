var gulp = require('gulp'),
    requireDir = require('require-dir');

requireDir('./gulp/tasks', {recurse: true});

// Default build for development
gulp.task('default', function() {
    console.log('"gulp dev" - Default all in one build package with webserver and watchers.');
    console.log('List of "cleaning" tasks: clean');
    console.log('List of "building" tasks: build, sass, js, json, vendor');
    console.log('List of "files injecting" tasks: inject');
    console.log('List of "watching" tasks: watch, watch-js, watch-json, watch-sass');
    console.log('List of "webserver" tasks: sync');
});