exports.modules = (function () {

    var heroes = element(by.css('e2e-id="dashboard-title"'));

    return {
        getNumbersOfHeroes: function () {
            return heroes.length
        },
        browse: 'http://localhost:9000/'
    }

})();
