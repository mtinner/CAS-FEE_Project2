'use strict';
let Datastore = require('nedb'),
    Promise = require('promise');

class NedbRepo {
    constructor(filename) {
        this.store = new Datastore({filename: `@@location${filename}.db`, autoload: true});
    }

    get(obj) {
        obj = this.moveIdDb(obj);
        return new Promise(resolve => {
            if (obj) {
                this.store.findOne(obj, (err, doc) => resolve(this.moveIdEntity(doc)));
            } else {
                return null;
            }
        });
    }

    getAll(obj) {
        return new Promise(resolve =>
            this.store.find(obj, (err, docs) => {
                docs.forEach(doc => this.moveIdEntity(doc));
                resolve(docs);
            })
        );
    }

    add(newDoc) {
        newDoc = this.moveIdDb(newDoc);
        return new Promise(resolve =>
            this.store.insert(
                newDoc,
                (err, doc) => resolve(this.moveIdEntity(doc))
            )
        );
    }

    update(id, oldDoc, newDoc) {
        Object.assign(oldDoc, newDoc);

        return new Promise(resolve => {
            this.store.update(
                {_id: id},
                this.moveIdDb(oldDoc),
                {returnUpdatedDocs: true},
                (err, numAffected, affectedDocuments) =>
                    resolve(this.moveIdEntity(affectedDocuments))
            );
        });
    }

    remove(id) {
        return this.get({_id: id}).then(doc => {
            if (!doc) throw new Error('share not found');
            return new Promise(resolve => {
                this.store.remove({_id: id}, () => resolve(doc));
            });
        });
    }

    moveIdEntity(doc) {
        if (!doc) return null;
        doc.id = doc._id;
        delete doc._id;
        return doc;
    }

    moveIdDb(doc) {
        if (doc.id) {
            Object.assign(doc, {_id: doc.id});
            delete doc.id;
        }
        return doc;
    }

    // removeIf(production)
    // just for clean Testsetup
    deleteAll() {
        return new Promise(resolve =>
            this.store.remove({}, {multi: true}, (err, numRemoved) => resolve(err, numRemoved))
        );
    }

    // endRemoveIf(production)
}

module.exports = NedbRepo;