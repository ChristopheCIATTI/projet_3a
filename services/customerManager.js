const bcrypt = require('bcrypt')
const CustomerManagerDAO = require('../datamodel/customerManagerDao')
const CustomerManager = require('../datamodel/customerManager')

module.exports = class CustomerManagerService {
    constructor(db) {
        this.dao = new CustomerManagerDAO(db)
    }
}
