var r = require('rethinkdb'),
    assert = require('assert'),
    logdebug = require('debug')('rdb:debug'),
    logerror = require('debug')('rdb:error');


// #### Connection details

// RethinkDB database settings. Defaults can be overridden using environment variables.
var dbConfig = {
  host: process.env.RDB_HOST || 'localhost',
  port: parseInt(process.env.RDB_PORT) || 28015,
  db  : process.env.RDB_DB || 'bentodb',
  tables: {
    'messages': 'id',
    'cache': 'cid',
    'users': 'email',
    'groups': 'name',
    'todos': 'id',
    'wiki': 'id',
    'wikicoms': 'id'
  }
};

/**
 * Connect to RethinkDB instance and perform a basic database setup:
 *
 * - create the `RDB_DB` database (defaults to `chat`)
 * - create tables `messages`, `cache`, `users` in this database
 */
module.exports.setup = function() {
  r.connect({host: dbConfig.host, port: dbConfig.port }, function (err, connection) {
    assert.ok(err === null, err);
    r.dbCreate(dbConfig.db).run(connection, function(err, result) {
      if(err) {
        logdebug("[DEBUG] RethinkDB database '%s' already exists (%s:%s)\n%s", dbConfig.db, err.name, err.msg, err.message);
      }
      else {
        logdebug("[INFO ] RethinkDB database '%s' created", dbConfig.db);
      }

      for(var tbl in dbConfig.tables) {
        (function (tableName) {
          r.db(dbConfig.db).tableCreate(tableName, {primaryKey: dbConfig.tables[tbl]}).run(connection, function(err, result) {
            if(err) {
              logdebug("[DEBUG] RethinkDB table '%s' already exists (%s:%s)\n%s", tableName, err.name, err.msg, err.message);
            }
            else {
              logdebug("[INFO ] RethinkDB table '%s' created", tableName);
            }
          });
        })(tbl);
      }
    });
  });
};


module.exports.findUserByEmail = function (email, callback) {
  onConnect(function (err, connection) {
    r.db(dbConfig.db).table('users').get(email)
        .run(connection, function(err, user) {
            if (err) {
                callback(err, null);
            } else if (!user) {
                callback (new Error('No user found.'), null);
            } else {
                callback(null, user);
            }
        })
    })
}

/**
 * Every user document is assigned a unique id when created. Retrieving
 * a document by its id can be done using the
 * [`get`](http://www.rethinkdb.com/api/javascript/get/) function.
 *
 * RethinkDB will use the primary key index to fetch the result.
 *
 * @param {String} userId 
 *    The ID of the user to be retrieved.
 *
 * @param {Function} callback
 *    callback invoked after collecting all the results 
 * 
 * @returns {Object} the user if found, `null` otherwise
 */
module.exports.findUserById = function (userId, callback) {
  onConnect(function (err, connection) {
    r.db(dbConfig['db']).table('users').get(userId).run(connection, function(err, result) {
      if(err) {
        logerror("[ERROR][%s][findUserById] %s:%s\n%s", connection['_id'], err.name, err.msg, err.message);
        callback(null, null);
      }
      else {
        callback(null, result);
      }
      connection.close();
    });    
  });
};

/**
 *  Data retriever methods
 */
module.exports.findMessages = function (max_results, callback) {
  onConnect(function (err, connection) {
    r.db(dbConfig['db']).table('messages').orderBy('timestamp').limit(max_results).run(connection,
        function (err, cursor) {
            retrieve(err, cursor, connection, callback);
        });
  });
};

module.exports.getTodos = function (callback) {
  onConnect(function (err, connection) {
    r.db(dbConfig['db']).table('todos').run(connection, function (err, cursor) {
        retrieve(err, cursor, connection, callback);
    });
  });
};

module.exports.getWikiPosts = function (callback) {
  onConnect(function (err, connection) {
    r.db(dbConfig['db']).table('wiki').orderBy({index: r.desc('timestamp')})
      .run(connection, function (err, cursor) {
        retrieve(err, cursor, connection, callback);
    });
  });
};

module.exports.getWikiComments = function (callback) {
  onConnect(function (err, connection) {
    r.db(dbConfig['db']).table('wikicoms').orderBy({index: r.desc('timestamp')})
      .run(connection, function (err, cursor) {
        retrieve(err, cursor, connection, callback);
    });
  });
};

module.exports.findGroupMembers =  function (groupName, callback) {
    onConnect(function (err, connection) {
        r.db(dbConfig['db']).table('users').filter(function(user) {
            return user('group_list').contains(groupName)
        }).without('hash').run(connection, function (err, cursor) {
            retrieve(err, cursor, connection, callback);
        });
    });
};

//Helper to refactor above methods
function retrieve (err,  cursor, connection, callback) {
  if(err) {
    logerror("[ERROR][%s] %s:%s\n%s", connection['_id'], err.name, err.msg, err.message);
    callback(null, []);
    connection.close();
  }
  else {
    cursor.toArray(function(err, results) {
      if(err) {
        logerror("[ERROR][%s][toArray] %s:%s\n%s", connection['_id'], err.name, err.msg, err.message);
        callback(null, []);
      }
      else {
        callback(null, results);
      }
      connection.close();
    });
  }
}

/*
 * changes state of todo
 * completed -> pending, and vice-versa
 */
module.exports.toggleTodo = function(id, callback) {
  onConnect(function (err, connection) {
    r.db(dbConfig['db']).table('todos').get(id).update(function(todo) {
      return r.branch(
          todo("status").eq("completed"),
          { status: "pending" },
          { status: "completed" }
      );
    }).run(connection, function(err, result) {
      if(err) {
        logerror("[ERROR][%s][updateTodo] %s:%s\n%s", connection['_id'], err.name, err.msg, err.message);
        callback(err);
      }

      callback(null, result);
    })
  })
};

module.exports.archiveTodo = function(id, callback) {
    onConnect(function (err, connection) {
        r.db(dbConfig['db']).table('todos').get(id).update(function(todo) {
            return r.branch(
                todo("status").eq("archived"),
                { status: "completed" },
                { status: "archived" } 
            );
        }).run(connection, function(err, result) {
            if(err) {
                logerror("[ERROR][%s][updateTodo %s:%s\n%s", connection['_id'], err.name, err.msg, err.message);
                callback(err);
            }

            callback(null, result);
        })
    })
};

module.exports.deleteTodo = function(id, callback) {
    onConnect(function (error, connection) {
        r.db(dbConfig['db']).table('todos').get(id).delete()
            .run(connection, function(err, result) {
                if(err) {
                    logerror("[ERROR][%s][deleteTodo] %s:%s\n%s", connection['_id'], err.name, err.msg, err.message);
                    callback(err);
                    return;
                }
                r.db(dbConfig['db']).table('wikicoms').filter({"postid": id}).delete()
                    .run(connection, function(err, result) {
                        if(err) {
                            logerror("[ERROR][%s][deleteTodoComments] %s:%s\n%s", connection['_id'], err.name, err.msg, err.message);
                            callback(err);
                            return;
                        }
                        callback(null, result);
                  });
            });
    })

};

module.exports.deletePost = function(id, callback) {
    onConnect(function (err, connection) {
        r.db(dbConfig['db']).table('wiki').get(id).delete()
            .run(connection, function(err, result) {
                if(err) {
                    logerror("[ERROR][%s][deletePost] %s:%s\n%s", connection['_id'], err.name, err.msg, err.message);
                    callback(err);
                    return;
                }
                r.db(dbConfig['db']).table('wikicoms').filter({"postid": id}).delete()
                    .run(connection, function(err, result) {
                        if(err) {
                            logerror("[ERROR][%s][deletePostComments] %s:%s\n%s", connection['_id'], err.name, err.msg, err.message);
                            callback(err);
                            return;
                        }
                        callback(null, result);
                    });
            });
    })
};

/**
 *  Data creation methods
 */
module.exports.saveMessage = function (msg, callback) {
    genericInsert(msg, 'messages', callback);
};

module.exports.saveTodo = function (todo, callback) {
    genericInsert(todo, 'todos', callback);
};

module.exports.saveWikiPost = function(post, callback) {
    genericInsert(post, 'wiki', callback);
};

module.exports.saveWikiComment = function (comment, callback) {
    genericInsert(comment, 'wikicoms', callback);
};

module.exports.createUser = function (account, callback) {
    genericInsert(account, 'users', callback);
};

function genericInsert (elem, tableName, callback) {
    onConnect(function (err, connection) {
        r.db(dbConfig['db']).table(tableName).insert(elem)
            .run(connection, function (err, result) {
                save(err, result, connection, callback);
            });
    });
}


//Helper to refactor above methods
function save(err, result, connection, callback) {
  if(err) {
    logerror("[ERROR][%s][save] %s:%s\n%s", connection['_id'], err.name, err.msg, err.message);
    callback(err);
  }
  else {
    if(result.inserted === 1 && result.errors === 0) {
      var new_id = result.generated_keys ? result.generated_keys[0] : null;
      callback(null, new_id);
    }
    else if (result.errors > 0) {
      callback(new Error('There was an error inserting the record in the database'), result);
    }
  }
  connection.close();
}

// #### Helper functions

/**
 * A wrapper function for the RethinkDB API `r.connect`
 * to keep the configuration details in a single function
 * and fail fast in case of a connection error.
 */ 
function onConnect(callback) {
  r.connect({host: dbConfig.host, port: dbConfig.port }, function(err, connection) {
    assert.ok(err === null, err);
    connection['_id'] = Math.floor(Math.random()*10001);
    callback(err, connection);
  });
}
