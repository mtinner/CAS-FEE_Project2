module.exports = function (gulp, data, util, taskName) {

    var exec = require('child_process').exec;

    gulp.task(taskName + ':Prod', function (cb) {
        exec('"node_modules/.bin/rollup" -c rollup-config.js', function (err, stdout, stderr) {
            console.log(stdout);
            console.log(stderr);
            cb(err);
        });
    });
};
