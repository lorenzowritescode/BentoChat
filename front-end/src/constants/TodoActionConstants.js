/**
 * Created by sambudd on 28/05/2015.
 */
var keyMirror = require('keymirror');

module.exports = {
  ActionTypes: keyMirror ({
      CREATE_TODO: null,
      COMPLETE_TODO: null,
      FETCH_TODOS: null,
      ARCHIVE_TODO: null
  })
};
