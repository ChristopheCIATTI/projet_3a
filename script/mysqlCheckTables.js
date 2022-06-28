const { promise, reject } = require('bcrypt/promises');
const { response } = require('express');
const mysql = require('mysql2');
const { resolve } = require('path');

module.exports = function() {

console.log("check tables")

const db = mysql.createConnection({
    host: 'localhost',
    port: '3306',
    user: 'root'
},function(error){if(error){throw error}})


db.connect(function(err) {
    if (err) throw err;
});

db.query("USE esimed_projet3a_cms_blog_test")
/*
const checkDB = async function() {
    return new Promise((resolve, reject) => {
        try {
            checkDBInner = new Promise((resolve, reject) => {
                //USE esimed_projet3a_cms_blog_test
                //SHOW TABLES FROM esimed_projet3a_cms_blog_test
                db.query("USE esimed_projet3a_cms_blog_test", (err, rows, fields) => {
                    if(err) {
                        return reject(err);
                    }
                    rows = rows
                    resolve(rows);
                })                
            })
            checkDBInner.then(response => {
                if(response === [] || response === undefined || response === null || response.length === 0) {
                    console.log("DataBase not found")
                    console.log("Create DataBase")
                    db.query("CREATE DATABASE esimed_projet3a_cms_blog_test")
                    db.query("USE esimed_projet3a_cms_blog_test")
                }
            })
            resolve()
        }
        catch(e) {console.log(e); reject(e)}
    })
}
*/
const checkDBTableUser = async function() {
    return new Promise((resolve, reject) => {
    try {
        checkDBTableUserInner = new Promise((resolve, reject) => {
            db.query("SHOW TABLES LIKE 'user'", (err, rows, fields) => {
                if(err) {
                    return reject(err);
                }
                rows = rows
                resolve(rows);
            })
        })
        checkDBTableUserInner.then(response => {
            if(response === [] || response === undefined || response === null || response.length === 0) {
                console.log("Table user not found")
                console.log("Create Table user")
                db.query("\
                    CREATE TABLE `user` ( \
                        `id` int(11) NOT NULL, \
                        `firstname` varchar(50) DEFAULT NULL, \
                        `middleName` varchar(50) DEFAULT NULL, \
                        `lastName` varchar(50) DEFAULT NULL, \
                        `mobile` varchar(15) DEFAULT NULL, \
                        `email` varchar(50) NOT NULL, \
                        `passwordHash` varchar(255) NOT NULL, \
                        `registeredAt` datetime NOT NULL, \
                        `lastLogin` datetime DEFAULT NULL \
                        ) \
                ")
                
                db.query("ALTER TABLE `user` ADD PRIMARY KEY (`id`)")
                db.query("ALTER TABLE `user` ADD UNIQUE KEY (`email`)")
                db.query("ALTER TABLE `user` ADD UNIQUE KEY (`mobile`)")

                db.query("ALTER TABLE `user` MODIFY `id` int(11) NOT NULL AUTO_INCREMENT")
                db.query("COMMIT;")

                console.log("END Create Table user")
            }
            resolve()
        })
    }
    catch(e) {console.log(e); reject(e)}
    })
}

const checkDBTableArticle = async function() {
    return new Promise((resolve, reject) => {
    try {
        checkDBTableArticleInner = new Promise((resolve, reject) => {
            db.query("SHOW TABLES LIKE 'article'", (err, rows, fields) => {
                if(err) {
                    return reject(err);
                }
                rows = rows
                resolve(rows);
            })
        })
        checkDBTableArticleInner.then(response => {
            if(response === [] || response === undefined || response === null || response.length === 0) {
                console.log("Table article not found")
                console.log("Create Table article")
               db.query(" \
                    CREATE TABLE `article` ( \
                    `id` int(11) NOT NULL, \
                    `author_id` int(11) DEFAULT NULL, \
                    `parent_id` int(11) DEFAULT NULL, \
                    `title` text NOT NULL, \
                    `meta_title` text DEFAULT NULL, \
                    `slug` varchar(255) DEFAULT NULL, \
                    `summary` varchar(255) DEFAULT NULL, \
                    `published` tinyint(1) NOT NULL, \
                    `created_at` date NOT NULL, \
                    `updated_at` date NOT NULL, \
                    `published_at` date NOT NULL, \
                    `content` varchar(255) NOT NULL \
                    ) \
                ")
                
                db.query("ALTER TABLE `article` ADD PRIMARY KEY (`id`);")
                db.query("ALTER TABLE `article` MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;")
                db.query("COMMIT;")

                console.log("END Create Table article")
            }
            resolve()
        })
    }
    catch(e) {console.log(e); reject(e)}
    })
}
/*
Promise.all([checkDB]).then(() => {checkDBTableUser(); checkDBTableArticle();})
*/
checkDBTableUser();
checkDBTableArticle();

setTimeout(() => {db.end; return}, 2500)

}