const bcrypt = require('bcrypt')
const UserAccountDAO = require('../datamodel/useraccountdao')
const UserAcoount = require('../datamodel/useraccount')

module.exports = class UserAccountService {
    constructor(db) {
        this.dao = new UserAccountDAO(db)
    }

    insert(displayname, login, password) {
        return this.dao.insert(new UserAcoount(displayname, login, this.hashPassword(password)))
    }

    async validatePassword(login, password) {
        const user = await this.dao.getByLogin(login)
        return this.comparePassword(password, user.challenge)
    }

    comparePassword(password, hash) {
        return bcrypt.compareSync(password, hash)
    }

    hashPassword(password) {
        return bcrypt.hashSync(password, 10)
    }
}