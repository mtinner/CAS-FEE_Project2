module.exports = (function () {

    var heroes = element.all(by.css('[e2e-class|="hero-box"]'));
    var heroNames = element.all(by.css('[e2e-class="hero-names"]'));
    var title = element(by.css('[e2e-id="dashboard-title"]'));

    return {
        heroNames: function () {
            return heroNames;
        },
        heroes: function () {
            return heroes;
        },
        title: function () {
            return title;
        },
        getUrl: function () {
            return 'http://localhost:9001/';
        }
    }
})();
