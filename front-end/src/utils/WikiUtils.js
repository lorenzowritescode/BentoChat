/**
 * Created by evenoli on 28/05/2015.
 */
'use strict';

function Post(title, text) {
    return {
        title: title,
        body: text,
        author: "Madame Hooch",
        timeStamp: Date.now(),
        id: Date.now()
    };
}

module.exports = {
    Post: Post
};
