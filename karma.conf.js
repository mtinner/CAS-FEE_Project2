module.exports = function (config) {
    config.set({

        basePath: './',

        frameworks: ['browserify', 'jasmine'],

        files: [
            // paths loaded by Karma
            {pattern: 'node_modules/systemjs/dist/system.src.js', included: true, watched: true},
            {pattern: 'node_modules/rxjs/bundles/Rx.js', included: true, watched: true},
            {pattern: 'node_modules/systemjs/dist/system-polyfills.js', included: true, watched: true},


            // paths loaded via module imports
            {pattern: 'src/.spec/**/*.spec.js', included: true, watched: true}
        ],


        port: 9876,

        colors: true,
        logLevel: config.LOG_DEBUG,

        browsers: ['PhantomJS'],

        // Karma plugins loaded
        plugins: [
            'karma-browserify',
            'karma-jasmine',
            'karma-phantomjs-launcher'
        ],

        preprocessors: {
            'src/.spec/**/*spec.js': ['browserify']
        },

        browserify: {
            debug: true,
            transform: ['babelify']
        },

        singleRun: true
    })
};
