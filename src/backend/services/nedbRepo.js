'use strict';
let Datastore = require('nedb');

let shoppingListService = (function (entityName) {
    let store = new Datastore({ filename: entityName + '.db', autoload: true });

    return {
        get: get,
        add: add,
        update: update,
        remove: remove
    };

    function get(id, callback) {
        if (id) {
            store.findOne({ _id: id }, (err, doc) => {
                doc.id = doc._id;
                callback(doc);
            });
        } else {
            store.find({}, (err, docs) => {
                docs.forEach(doc => {
                    doc.id = doc._id;
                    delete doc._id;
                });
                callback(docs);
            });
        }
    }

    function add(newDoc, callback) {
        store.insert(
            Object.assign(newDoc, { _id: newDoc.id }, { id: undefined }),
            (err, doc) => {
                doc.id = doc._id;
                delete doc._id;
                callback(doc);
            }
        );
    }

    function update(id, newDoc, callback) {
        let oldDoc;
        if (id) {
            oldDoc = get(id);
        }
        if (!newDoc) {
            throw new Error('no new ' + entityName);
        }
        else if (newDoc && !oldDoc) {
            return add(newDoc);
        }
        store.update(
            Object.assign(oldDoc, newDoc, { id: undefined }),
            (err, doc) => {
                doc.id = doc._id;
                delete doc._id;
                callback(doc);
            }
        );
    }

    function remove(id, callback) {
        get(id, doc => {
            if (!doc) {
                throw new Error(entityName + ' not found');
            }
            store.remove({ _id: id }, () => {
                delete doc._id;
                callback(doc);
            });
        });
    }
});

module.exports = shoppingListService;