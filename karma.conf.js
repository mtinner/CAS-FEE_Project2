module.exports = function(config) {
    config.set({
        browsers: ['Chrome'],
        frameworks: ['jasmine', 'browserify'],
        files: [
            { pattern: './src/frontend/**/*spec.ts', watched: true }
        ],
        preprocessors: {
            '**/*.ts': ['typescript'],
            '**/*.js': ['browserify']
        },
        typescriptPreprocessor: {
            // options passed to the typescript compiler 
            options: { project: './tsconfig.json' },
            // transforming the filenames 
            transformPath: function(path) {
                return path.replace(/\.ts$/, '.js');
            }
        },
        exclude: []
    });
};