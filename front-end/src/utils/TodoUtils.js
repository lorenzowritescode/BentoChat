/**
 * Created by sambudd on 28/05/2015.
 */
'use strict';

function Todo(author, title, text) {
    return {
        author: author,
        text: text,
        title: title,
        status: "pending"
    };
}

module.exports = {
    Todo: Todo
};
