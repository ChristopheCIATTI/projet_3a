const BaseDAO = require('./basedao')

module.exports= class CustomerManagerDAO extends BaseDAO {
    constructor(db) {
        super(db)
    }

    getIdByEmail(email) {
        return new Promise((resolve, reject) => {
            this.db.query("SELECT id FROM user WHERE email_address = ? ", [email], (err, rows, fields) => {
                if (err) {
                    return reject(err);
                }
                resolve(rows);
            })    
        })
    }

    getAllCustomer(id) {
        return new Promise((resolve, reject) => {
            this.db.query("SELECT * FROM customer WHERE user_id = ?", [id], (err, rows, fields) => {
                if (err) {
                    return reject(err);
                }
                resolve(rows);
            })    
        })
    }

    getAllBusiness(id) {
        return new Promise((resolve, reject) => {
            this.db.query("SELECT * FROM `business` WHERE user_id = ?", [id], (err, rows, fields) => {
                if (err) {
                    return reject(err);
                }
                resolve(rows);
            })    
        })
    }

    getCustomerById(id) {
        return new Promise((resolve, reject) => {
            this.db.query("SELECT * FROM `customer` WHERE id = ?", [id], (err, rows, fields) => {
                if (err) {
                    return reject(err);
                }
                resolve(rows);
            })    
        })
    }

    getBusinessById(id) {
        return new Promise((resolve, reject) => {
            this.db.query("SELECT * FROM `business` WHERE id = ?", [id], (err, rows, fields) => {
                if (err) {
                    return reject(err);
                }
                resolve(rows);
            })    
        })
    }

    getNameCustomer(id) {
        return new Promise((resolve, reject) => {
            this.db.query("SELECT name FROM `customer` WHERE user_id = ?", [id], (err, rows, fields) => {
                if (err) {
                    return reject(err);
                }
                resolve(rows);
            })    
        })
    }

    getNameBusiness(id) {
        return new Promise((resolve, reject) => {
            this.db.query("SELECT name FROM `business` WHERE user_id = ?", [id], (err, rows, fields) => {
                if (err) {
                    return reject(err);
                }
                resolve(rows);
            })    
        })
    }

    getClientFromProjectByClientId(id) {
        return new Promise((resolve, reject) => {
            this.db.query("SELECT * FROM `project_manager` WHERE client_id = ?", [id], (err, rows, fields) => {
                if (err) {
                    return reject(err);
                }
                resolve(rows);
            })    
        })
    }

    getProjectById(id) {
        return new Promise((resolve, reject) => {
            this.db.query("SELECT * FROM `project_manager` WHERE id = ?",
            [id], (err, rows, fields) => {
                if (err) {
                    return reject(err);
                }
                resolve(rows);
            })    
        })
    }

    insertCustomer(customer, id) {
        return new Promise((resolve, reject) => {
            this.db.query("INSERT INTO customer (name, user_id, email, phone_number, postal_address) VALUES (?, ?, ?, ?, ?)",
            [customer.name, id, customer.email, customer.numero, customer.adresse])
        })
    }

    insertBusiness(business, id) {
        return new Promise((resolve, reject) => {
            this.db.query("INSERT INTO business (user_id, name, contact_name, email, phone_number, postal_address) VALUES (?, ?, ?, ?, ?, ?)",
            [id, business.name, business.contactName, business.email, business.numero, business.adresse])
        })
    }

    updateCustomer(customer) {
        return new  Promise((resolve, reject) => {
            this.db.query("UPDATE customer SET name = ?, email = ?, phone_number = ?, postal_address = ? WHERE id = ?",
            [customer.name, customer.email, customer.phone_number, customer.postal_address, customer.id])
        })
    }

    updateBusiness(business) {
        return new  Promise((resolve, reject) => {
            this.db.query("UPDATE business SET name = ?, contact_name = ?, email = ?, phone_number = ?, postal_address = ? WHERE id = ?",
            [business.name, business.contact_name, business.email, business.phone_number, business.postal_address, business.id])
        })
    }

    deleteCustomer(id) {
        return new Promise((resolve, reject) => {
            this.db.query("DELETE FROM customer WHERE id = ?", [id])
        })
    }

    deleteBusiness(id) {
        return new Promise((resolve, reject) => {
            this.db.query("DELETE FROM business WHERE id = ?", [id])
        })
    }

    searchCustomer(query, user_id) {
        console.log("line 104: " + query)
        console.log("line 105: " + user_id)
        return new Promise((resolve, reject) => {
            this.db.query(
            "SELECT * FROM customer WHERE ? IN (customer.name, customer.email, customer.phone_number, customer.postal_address) AND user_id = ?",
            [query, user_id], (err, rows, fields) => {
                if (err) {
                    return reject(err)
                }
                resolve(rows)
            })
        })
    }

    searchBusiness(query, user_id) {
        console.log("line 104: " + query)
        console.log("line 105: " + user_id)
        return new Promise((resolve, reject) => {
            this.db.query(
            "SELECT * FROM business WHERE ? IN (business.name, business.email, business.phone_number, business.postal_address) AND user_id = ?",
            [query, user_id], (err, rows, fields) => {
                if (err) {
                    return reject(err)
                }
                resolve(rows)
            })
        })
    }
}
