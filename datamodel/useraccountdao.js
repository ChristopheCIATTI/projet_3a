const BaseDAO = require('./basedao')

module.exports = class UserAccountDAO extends BaseDAO {
    constructor(db) {
        super(db, "users")
    }

    insert(users) {
        return new Promise((resolve, reject) =>
            this.db.query("INSERT INTO users(displayname,login,challenge) VALUES ($1,$2,$3)",
            [users.displayName, users.login, users.challenge])
                .then(res => resolve(res.rows))
                .catch(e => reject(e)))
    }

    getByLogin(login) {
        return new Promise((resolve, reject) =>
            this.db.query("SELECT * FROM users WHERE login=$1", [login])
                .then(res => {
                    resolve(res.rows[0])
                })
                .catch(e => {
                    reject(e)
                }))
    }

    getId(login) {
        return new Promise((resolve, reject) => {
            this.db.query("SELECT id FROM users WHERE login=$1", [login])
                .then(res => {
                    resolve(res.rows[0])
                })
                .catch(e => {
                    console.log(e)
                    reject(e)
                })
        })
    }
}
