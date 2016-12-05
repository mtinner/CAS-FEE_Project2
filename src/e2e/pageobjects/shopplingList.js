module.exports = (function () {

    var firstAddInput = element.all(by.css('.icon--plus + input')).get(0);
    var firstChip = element.all(by.css('.chip > span')).get(0);
    var firstDeleteChip = element.all(by.className('icon--cross')).first();
    var chips = element.all(by.className('chip'));

    return {
        getUrl: () => 'http://localhost:8080/shopping-list',
        getFirstAddInput: () => firstAddInput,
        getFirstChip: () => firstChip,
        getFirstDeleteChip: () => firstDeleteChip,
        getChips: () => chips
    };
})();
