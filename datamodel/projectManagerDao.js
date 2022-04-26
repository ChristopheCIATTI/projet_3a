const BaseDAO = require('./basedao')

module.exports = class projectManagerDAO extends BaseDAO {
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

    getCustomerIdByName(user_id) {
        return new Promise((resolve, reject) => {
            this.db.query("SELECT id FROM `customer` WHERE name = ?",
            [user_id], (err, rows, fields) => {
                if (err) {
                    return reject(err);
                }
                resolve(rows);
            })    
        })
    }

    getBusinessIdByName(user_id) {
        return new Promise((resolve, reject) => {
            this.db.query("SELECT id FROM `business` WHERE name = ?",
            [user_id], (err, rows, fields) => {
                if (err) {
                    return reject(err);
                }
                resolve(rows);
            })    
        })
    }

    getCustomerById(id) {
        return new Promise((resolve, reject) => {
            this.db.query("SELECT name FROM `customer` WHERE id = ?",
            [id], (err, rows, fields) => {
                if (err) {
                    return reject(err);
                }
                resolve(rows);
            })    
        })
    }

    getBusinessById(id) {
        return new Promise((resolve, reject) => {
            this.db.query("SELECT name FROM `business` WHERE id = ?",
            [id], (err, rows, fields) => {
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

    getProjectNameById(id) {
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

    insertProject(project, id) {
        return new Promise((resolve, reject) => {
            this.db.query("INSERT INTO project_manager (name, client_id, status, user_id) VALUES (?, ?, ?, ?)", 
            [project.name, id, project.status, project.user_id])
        })
    }

    updateProject(project) {
        return new Promise((resolve, reject) => {
            this.db.query("UPDATE project_manager SET name = ?, status = ? WHERE id = ?",
            [project.name, project.status, project.id])
        })
    }

    deleteProject(id) {
        return new Promise((resolve, reject) => {
            this.db.query("DELETE FROM project_manager WHERE id = ?", [id])
        })
    }
}
