const bcrypt = require('bcrypt')
const UserDAO = require('../datamodel/userdao')
const User = require('../datamodel/user')

module.exports = class UserService {
    constructor(db) {
        this.dao = new UserDAO(db)
    }
}
