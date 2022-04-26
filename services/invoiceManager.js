const bcrypt = require('bcrypt')
const InvoiceManagerDAO = require('../datamodel/invoiceManagerDao')
const CustomerManager = require('../datamodel/invoiceManager')

module.exports = class InvoiceManagerService {
    constructor(db) {
        this.dao = new InvoiceManagerDAO(db)
    }
}
