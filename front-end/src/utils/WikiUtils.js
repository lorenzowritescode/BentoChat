/**
 * Created by evenoli on 28/05/2015.
 */
'use strict';

function Post(text) {
    return {
        body: text,
        author: "Madame 'Rollin with da bitches' Hooch",
        timeStamp: Date.now(),
        id: Date.now()
    };
}

module.exports = {
    Post: Post
};