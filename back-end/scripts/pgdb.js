const pgp = require('pg-promise')({
        promiseLib: require('when')
    }),
    connString = "postgres://lp1813@localhost:5432/bentodb"
    db = pgp(connString),
    queries = require('./queries');

let users = queries.users,
    chat = queries.chat,
    todos = queries.todos,
    wiki = queries.wiki,
    users_groups = queries.users_groups;

function findUserByEmail (email) {
    const query = users
        .select(users.star())
        .from(users)
        .where(users.email.equals(email))
        .toQuery();

    return db.one(query.text, query.values);
}

function findUserById (id) {
    const query = users
        .select(users.star())
        .from(users)
        .where(users.id.equals(id))
        .toQuery();

    return db.one(query.text, query.values);
}

function findMessages () {
    const query = chat
        .select(chat.star())
        .from(chat)
        .toQuery();

    return db.many(query.text, query.values);
}

function getTodos () {
    const query = todos
        .select(todos.star())
        .from(todos)
        .toQuery();

    return db.many(query.text, query.values);
}

function getWikiPosts () {
    const query = wiki
        .select(wiki.star())
        .from(wiki)
        .toQuery();

    return db.many(query.text, query.values);
}

function findGroupMembers (group_id) {
    return db.many(
        "SELECT users.id " +
        "FROM users_groups JOIN users ON users.id = users_groups.user_id " +
        "WHERE users_groups.group_id = $1",
        group_id
    );
}

function handle (func) {
    return function (arg, callback) {
        func(arg)
            .then(function (data) {
                callback(null, data);
            }).otherwise(function (err) {
                callback(err, null);
            });
    };
}

module.exports = {
    findUserByEmail: handle(findUserByEmail),
    findUserById: handle(findUserById),
    findMessages: handle(findMessages),
    getTodos: handle(getTodos),
    getWikiPosts: handle(getWikiPosts),
    findGroupMembers: handle(findGroupMembers)
};