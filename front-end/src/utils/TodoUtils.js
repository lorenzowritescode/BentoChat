/**
 * Created by sambudd on 28/05/2015.
 */
'use strict';

function Todo(author, text) {
    return {
        author: author,
        text: text,
        id: "td_" + Date.now()
    };
}

module.exports = {
    Todo: Todo
};
