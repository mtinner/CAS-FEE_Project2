'use strict';
let Datastore = require('nedb'),
    Promise = require('promise');

class NedbRepo {
    constructor(filename) {
        this.store = new Datastore({filename: `${filename}.db`, autoload: true});
    }

    get(id) {
        return new Promise(resolve => {
            if (id) {
                this.store.findOne({_id: id}, (err, doc) => resolve(this.moveId(doc)));
            } else {
                this.store.find({}, (err, docs) => {
                    docs.forEach(doc => this.moveId(doc));
                    resolve(docs);
                });
            }
        });
    }

    add(newDoc) {
        return new Promise(resolve =>
            this.store.insert(
                Object.assign(newDoc, {_id: newDoc.id}, {id: undefined}),
                (err, doc) => resolve(this.moveId(doc))
            )
        );
    }

    updateOrInsert(id, newDoc) {
        return this.get(id).then(oldDoc => {
            if (oldDoc) {
                return this.update(id, oldDoc, newDoc);
            }
            return this.add(newDoc);
        });
    }

    find(obj) {
        return new Promise(resolve =>
            this.store.find(obj, (err, docs) => {
                docs.forEach(doc => this.moveId(doc));
                resolve(docs);
            })
        );
    }

    update(id, oldDoc, newDoc) {
        return new Promise(resolve => {
            this.store.update(
                Object.assign(oldDoc, newDoc, {_id: id}, {id: undefined}),
                (err, doc) => resolve(this.moveId(doc))
            );
        });
    }

    remove(id) {
        return this.get(id).then(doc => {
            if (!doc) throw new Error('casFee2 not found');
            return new Promise(resolve => {
                this.store.remove({_id: id}, () => resolve(doc));
            });
        });
    }

    moveId(doc) {
        if (!doc) return null;
        doc.id = doc._id;
        delete doc._id;
        return doc;
    }
}

module.exports = NedbRepo;