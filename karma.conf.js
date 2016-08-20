module.exports = function (config) {
    config.set({

        browsers: ['PhantomJS'],
        files: [
            {pattern: './src/backend/**/*spec.js', watched: false}
        ],
        frameworks: ['browserify', 'jasmine'],
        preprocessors: {
            './src/backend/**/*spec.js': ['browserify']
        },
        browserify: {},
        exclude: []

    });
};