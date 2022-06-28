//const { resolve } = require('path/posix')
const { resolve } = require('path')
const BaseDAO = require('./basedao')

module.exports = class UserDAO extends BaseDAO {
    constructor(db) {
        super(db)
    }

    getAllUser() {
        return new Promise((resolve, reject) => {
            this.db.query("SELECT * FROM `user`", (err, rows, fields) => {
                if (err) {
                    return reject(err);
                }
                resolve(rows);
            })    
        })
    }

    getUserByEmail(email) {
        return new Promise((resolve, reject) => {
            this.db.query("SELECT user.firstname, user.middleName, user.lastName, user.mobile, user.email, user.registeredAt, user.lastLogin FROM user WHERE email = ? ", [email], (err, rows, fields) => {
                if (err) {
                    return reject(err);
                }
                resolve(rows);
            })    
        })
    }

    getUserById(id) {
        return new Promise((resolve, reject) => {
            this.db.query("SELECT * FROM user WHERE id = ? ", [id], (err, rows, fields) => {
                if (err) {
                    return reject(err);
                }
                resolve(rows);
            })    
        })
    }

    getUserNamePasswordByEmail(email) {
        return new Promise((resolve, reject) => {
            this.db.query("SELECT firstname, passwordHash FROM user WHERE email = ?", [email], (err, rows, fields) => {
                if (err) {
                    return reject(err);
                }
                rows = rows
                resolve(rows);
            })
        })
    }

    getUserEmailByEmail(email) {
        return new Promise((resolve, reject) => {
            this.db.query("SELECT email FROM user WHERE email = ?", [email], (err, rows, fields) => {
                if (err) {
                    return reject(err);
                }
                rows = rows
                resolve(rows);
            })
        })
    }

    getIdByEmail(email) {
        return new Promise((resolve, reject) => {
            this.db.query("SELECT id FROM user WHERE email = ? ", [email], (err, rows, fields) => {
                if (err) {
                    return reject(err);
                }
                resolve(rows);
            })    
        })
    }

    getAuthorNameByAuthorId(authorId) {
        return new Promise((resolve, reject) => {
            this.db.query("SELECT firstname, middleName, lastName FROM user WHERE id = ?", [authorId], (err, rows, fields) => {
                if (err) {
                    return reject(err);
                }
                resolve(rows);
            })
        })
    }
  
    updateLastLogin(lastLogin, email) {
        return new Promise((resolve, reject) => {
            this.db.query("UPDATE user SET user.lastLogin=? WHERE user.email=?", [lastLogin, email], (err, rows, fields) => {
                if (err) {
                    return reject(err)
                }
                rows = rows
                resolve(rows);
            })
        })
    }

    insertUser(user) {
        return new Promise((resolve, reject) => {
            this.db.query("INSERT INTO user (firstName, lastName, email, passwordHash, registeredAt) VALUES (?, ?, ?, ?, ?)", 
            [user.firstname, user.lastName, user.email, user.passwordHash, user.registeredAt], (err, rows, fields) => {
                if (err) {
                    return reject(err);
                }
                resolve(rows);
            })
        })
    }

    deleteUserByEmail(email) {
        return new Promise((resolve, reject) => {
            this.db.query("DELETE FROM user WHERE email = ?",
            [email])
        })
    }

    resetPassword(value) {
        return new Promise((resolve, reject) => {
            this.db.query("UPDATE user SET user.passwordHash = ? WHERE email = ?",
            [value.passwordHash, value.email], (err, rows, fields) => {
                if(err) {
                    return reject(err)
                }
                resolve(rows)
            })
        })
    }

    /*
    update(user, id) {
        return new  Promise((resolve, reject) => {
            this.db.query("UPDATE user SET first_name = ?, last_name = ?, email_address = ?, postal_address = ?, phone_number = ?, turnover = ?, company_charges = ? WHERE id = ?",
            [user.firstName, user.lastName, user.emailAddress, user.postalAddress, user.phoneNumber, user.turnover, user.companyCharges, id])
        })
    }
    */
}
/*
first_name 
last_name 
email_address 
postal_address 
phone_number 
turnover 
company_charges 
*/

/*
this.db.query("UPDATE list SET shop=$3, date=$4, archived=$5 WHERE user_id=$1 AND id=$2",
*/
/*
connection.query({sql: 'SELECT * FROM `books` WHERE `author` = ?',values: ['David']}, function (error, results, fields) {});
*/