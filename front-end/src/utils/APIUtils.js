/**
 * Created by lp1813 on 28/05/15.
 */
'use strict';

var request = require('reqwest');

class AjaxRequest {
    constructor(method) {
        this._method = method;
    }

    body (body) {
        this._body = body;
        return this;
    }

    path (path) {
        this._path = path;
        return this;
    }

    callback (callback) {
        this._callback = callback;
        return this;
    }

    context (obj_context) {
        this._context = obj_context;
        return this;
    }

    invokeCallback (resp) {
        if (this._context !== null && typeof this._context !== 'undefined')
            this._callback.apply(this._context, resp);
        else
            this._callback(resp);
    }

    run () {
        var thisReq = this;

        var options = {
            url: thisReq._path,
            method: thisReq._method,
            data: thisReq._body,
            success: thisReq.invokeCallback.bind(thisReq),
            error: function (err) {
                console.err(err.message, err.stack);
            }
        };

        request(options);
    }
}

module.exports.get = function (path, callback, context) {
    new AjaxRequest('get')
        .path(path)
        .callback(callback)
        .context(context)
        .run();
};

module.exports.post = function(path, body, callback, context) {
    new AjaxRequest('post')
        .path(path)
        .body(body)
        .callback(callback)
        .context(context)
        .run();
};

module.exports.put = function(path, body, callback, context) {
    new AjaxRequest('put')
        .path(path)
        .body(body)
        .callback(callback)
        .context(context)
        .run();
};
