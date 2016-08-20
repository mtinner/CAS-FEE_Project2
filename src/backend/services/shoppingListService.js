'use strict';

const shoppingListService = (function () {
    let shoppingListGroupes = ['Alle', 'Früche/Gemüse', 'Fleisch', 'Food', 'Non Food'];

    return {
        getShoppingListGroupes: getShoppingListGroupes
    };

    function getShoppingListGroupes() {
        return shoppingListGroupes;
    }

    /*  function addNote(note) {
     var note = new Note(
     id++,
     new Date(note.dueDate),
     note.title,
     note.text,
     note.priority,
     note.done
     );
     notes.push(note);
     return note;
     }*/

    /*   function updateNote(id, newNote) {
     var oldNote = getNote(id);
     if (!newNote || !oldNote) {
     throw new Exception('new and old note expected');
     }
     return Object.assign(oldNote, newNote);
     }*/

})();

module.exports = shoppingListService;