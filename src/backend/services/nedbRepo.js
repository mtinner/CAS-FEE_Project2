'use strict';
let Datastore = require('nedb'),
    Promise = require('promise');

let shoppingListService = (function (entityName) {
    let store = new Datastore({ filename: entityName + '.db', autoload: true });

    return {
        get: get,
        add: add,
        update: update,
        remove: remove
    };

    function get(id) {
        return new Promise(resolve => {
            if (id) {
                store.findOne({ _id: id }, (err, doc) => {
                    resolve(moveId(doc));
                });
            } else {
                store.find({}, (err, docs) => {
                    docs.forEach(doc => {
                        moveId(doc);
                    });
                    resolve(docs);
                });
            }
        });
    }

    function add(newDoc) {
        return new Promise(resolve => {
            store.insert(
                Object.assign(newDoc, { _id: newDoc.id }, { id: undefined }),
                (err, doc) => {
                    resolve(moveId(doc));
                }
            );
        });
    }

    function update(id, newDoc) {
        return new Promise(resolve => {
            store.update(
                Object.assign(newDoc, { _id: newDoc.id }, { id: undefined }),
                (err, doc) => {
                    resolve(moveId(doc));
                }
            );
        });
    }

    function remove(id) {
        return get(id).then(doc => {
            if (!doc) {
                throw new Error(entityName + ' not found');
            }
            return new Promise(resolve => {
                store.remove({ _id: id }, () => {
                    resolve(doc);
                });
            });
        });
    }

    function moveId(doc) {
        doc.id = doc._id;
        delete doc._id;
        return doc;
    }
});

module.exports = shoppingListService;