exports.config = {
    seleniumAddress: 'http://localhost:4444/wd/hub',
    specs: ['suites/todo-spec.js'],
    useAllAngular2AppRoots: true
};