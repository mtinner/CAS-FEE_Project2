module.exports = function (config) {
    config.set({
        frameworks: ['jasmine'],
        files: [
            { pattern: './src/frontend/**/*spec.js', watched: false }
        ],
        preprocessors: {
            '**/*.ts': ['typescript']
        },
        transformPath: function (path) {
            return path.replace(/\.ts$/, '.js');
        },
        exclude: []

    });
};