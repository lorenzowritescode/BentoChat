/**
 * Created by lp1813 on 28/05/15.
 */
'use strict';

var $ = require('jQuery');

module.exports.get = function (path, callback, context) {
    $.get(path, function (result) {
        if (context !== null)
            callback.call(context, result);
        else
            callback(result);
    });
};

module.exports.post = function(path, body, callback, context) {
    $.post(path, body, function(result) {
        if (context !== null)
            callback.call(context, result);
        else
            callback(result);
    });
};

module.exports.put = function(path, body, callback, context) {
    $.ajax({
        method: "PUT",
        url: path,
        data: body
    }).done(function (data) {
        if (callback !== null)
            callback.apply(context, data);
        else
            callback(data);
    });
};
