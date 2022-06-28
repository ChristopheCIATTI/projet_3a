const { promise, reject } = require('bcrypt/promises');
const { response } = require('express');
const mysql = require('mysql2');
const { resolve } = require('path');

module.exports = function() {

console.log("check database")

const db = mysql.createConnection({
    host: 'localhost',
    port: '3306',
    user: 'root'
},function(error){if(error){throw error}})


db.connect(function(err) {
    if (err) throw err;
});
/*
const checkIfDbExist = async function() {
    return new Promise((resolve, reject) => {
        db.query("USE esimed_projet3a_cms_blog_test", (err, rows, fields) => {
            if(err) {
                return reject(err);
            }
            rows = rows
            resolve(rows);
        })
    })
    .then(() => console.log("then time"))
    .then(reject => console.log("reject time"))
}
*/

const checkIfDbExist = function() {
    try {
        db.query("USE esimed_projet3a_cms_blog_test", (err, rows, fields) => {
            if(err) {
                console.log("if error")
                db.query("CREATE DATABASE esimed_projet3a_cms_blog_test")
                db.query("USE esimed_projet3a_cms_blog_test")
                setTimeout(() => {process.exit()}, 1500)
                return
                //return (err);
            }
            rows = rows
            resolve("resolved")
        })
    }
    catch(e) {console.log("catch erroe muysql");   console.log(e)}
}
//checkIfDbExist.then(() => console.log("then time"))

checkIfDbExist()
setTimeout(() => {db.end; return}, 1500)

}