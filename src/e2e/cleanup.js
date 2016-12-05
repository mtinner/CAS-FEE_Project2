var request = require('request');

module.exports = (function () {

    return {
        cleanupDb: function () {

            return new Promise(resolve =>
                request.del('http://localhost:8080/api/clean', (err, resp) => {
                    resolve(resp);
                })
            );
        }
    }
})();
