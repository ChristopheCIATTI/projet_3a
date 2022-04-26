const BaseDAO = require('./basedao')

module.exports = class invoiceDAO extends BaseDAO {
    constructor(db) {
        super(db)
    }

    getProjectIdByName(project) {
        return new Promise((resolve, reject) => {
            this.db.query("SELECT id FROM `project_manager` WHERE name = ?", [project], (err, rows, fields) => {
                if (err) {
                    return reject(err);
                }
                resolve(rows);
            })    
        })
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

    getUserIdByEmail(email) {
        return new Promise((resolve, reject) => {
            this.db.query("SELECT id FROM `user` WHERE email_address = ?", [email], (err, rows, fields) => {
                if (err) {
                    return reject(err);
                }
                resolve(rows);
            })    
        })
    }

    getProjectIdByUserId(user_id) {
        return new Promise((resolve, reject) => {
            this.db.query("SELECT id FROM `project_manager` WHERE user_id = ?", [user_id], (err, rows, fields) => {
                if (err) {
                    return reject(err);
                }
                resolve(rows);
            })    
        })
    }

    getUserIdFromProject() {
        return new Promise((resolve, reject) => {
            this.db.query("SELECT user_id FROM `project_manager` WHERE id = ?", [id], (err, rows, fields) => {
                if (err) {
                    return reject(err);
                }
                resolve(rows);
            })    
        })
    }

    getInvoiceByUserId(user_id) {
        return new Promise((resolve, reject) => {
            this.db.query("SELECT * FROM `invoice` WHERE user_id = ?",
            [user_id], (err, rows, fields) => {
                if (err) {
                    return reject(err);
                }
                resolve(rows);
            })    
        })
    }

    getInvoiceById(id) {
        return new Promise((resolve, reject) => {
            this.db.query("SELECT * FROM `invoice` WHERE id = ?",
            [id], (err, rows, fields) => {
                if (err) {
                    return reject(err);
                }
                resolve(rows);
            })    
        })
    }

    getInvoiceRowByInvoiceId(id) {
        return new Promise((resolve, reject) => {
            this.db.query("SELECT * FROM `invoicerow` WHERE invoice_id = ?",
            [id], (err, rows, fields) => {
                if (err) {
                    return reject(err);
                }
                resolve(rows);
            })    
        })
    }

    getAllProject(user_id) {
        return new Promise((resolve, reject) => {
            this.db.query("SELECT * FROM `project_manager` WHERE user_id = ?",
            [user_id], (err, rows, fields) => {
                if (err) {
                    return reject(err);
                }
                resolve(rows);
            })    
        })
    }

    getInvoiceByProjectId(project_id) {
        return new Promise((resolve, reject) => {
            this.db.query("SELECT * FROM `invoice` WHERE id = ?",
            [project_id], (err, rows, fields) => {
                if (err) {
                    return reject(err);
                }
                resolve(rows);
            })    
        })
    }

    getProjectNameByInvoiceId(id) {
        return new Promise((resolve, reject) => {
            this.db.query("SELECT name FROM `project_manager` WHERE id = ?",
            [id], (err, rows, fields) => {
                if (err) {
                    return reject(err);
                }
                resolve(rows);
            })    
        })
    }
    

    insertInvoice(invoice, id, user_id) {
        return new Promise((resolve, reject) => {
            this.db.query("INSERT INTO invoice (project_id, status, edit_date, limit_pay, effective_pay, notes, user_id) VALUES (?, ?, ?, ?, ?, ?, ?)", 
            [id, invoice.status, invoice.dateEdition, invoice.dateLimit, invoice.datePay, invoice.notes, user_id])
        })
    }

    insertInvoiceRow(id, invoiceRow) {
        return new Promise((resolve, reject) => {	
            this.db.query("INSERT INTO invoicerow (libelle, unit_price, quantity, invoice_id) VALUES (?, ?, ?, ?)", 
            [invoiceRow.libelle, invoiceRow.prix_unitaire, invoiceRow.quantite, id])
        })
    }

    updateInvoice(invoice) {
        return new Promise((resolve, reject) => {
            this.db.query("UPDATE invoice SET status = ?, edit_date = ?, limit_pay = ?, effective_pay = ?, notes = ? WHERE id = ?",
            [invoice.status, invoice.edit_date, invoice.limit_pay, invoice.effective_pay, invoice.notes, invoice.id])
        })
    }

    deleteInvoice(id) {
        return new Promise((resolve, reject) => {
            this.db.query("DELETE FROM invoice WHERE id = ?", [id])
        })
    }

    deleteRow(id) {
        console.log(id)
        /*return new Promise((resolve, reject) => {
            this.db.query("DELETE FROM invoice WHERE id = ?", [id])
        })*/
    }
}
