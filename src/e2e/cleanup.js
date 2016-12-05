var fs = require('fs'),
    path = require("path");

module.exports = (function () {

    let dbFilenames = ['user.db', 'article.db', 'group.db'];

    return {

        removeDB: function () {
            dbFilenames.forEach(filename => {
                try {
                    fs.unlinkSync(path.join(__dirname, '../', '.tmpE2e', filename));
                }
                catch (err) {
                }
            });
        }
    }
})();
