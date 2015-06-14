/**
 * Created by sambudd on 28/05/2015.
 */
'use strict';

function Todo(author, title, text, due) {
    return {
        author: author,
        text: text,
        title: title,
        status: "pending",
        due: due
    };
}

module.exports = {
    Todo: Todo
};
