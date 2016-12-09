module.exports = function(gulp, data, util, taskName) {
    var Server = require('karma').Server,
        path = require('path');

    gulp.task(taskName + ':Frontend', function(done) {
        new Server({
            configFile: path.join(__dirname, '/../', 'karma.conf.js')
        }, done).start();
    });
};
