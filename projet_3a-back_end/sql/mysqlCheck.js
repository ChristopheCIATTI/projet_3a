//const { response } = require('express')
//const mysql = require('mysql2')

//const { spawn } = require('node:child_process');
//const ls = spawn('pwd');
//console.Console(ls)
/*
var exec = require('child_process').exec;
function execute(command, callback){
    exec(command, function(error, stdout, stderr){ callback(stdout); });
};
*/
/*
const dbTest = new Promise((resolve, reject) => {
    const db = mysql.createConnection({
        host: 'localhost',
        port: '3306',
        user: 'root'
    },function(error){if(error){throw error}})
  */  
    /*
    db.connect(function(err) {
        if (err) throw err;
      });
    */

    /*function checkdbblabla() {
        return new Promise((resolve, reject) => {
            db.query("select schema_name from information_schema.schemata where schema_name = 'esimed_projet3a_cms_blog'")
        })
    } */

    //await checkdbblabla().then(response => console.log(response))

    //db.query("show databases")
    
    //db.end();
//}) 
/*
async function ergfzr() {
    await checkdbblabla().then(response => console.log(response))
}
*/

//console.log("#1")
//console.log(mysql)
/*
const db = mysql.createConnection({
    host: 'localhost',
    port: '3306',
    user: 'root'
},function(error){if(error){throw error}})
*/
//console.log(db.query("select schema_name from information_schema.schemata where schema_name = 'esimed_projet3a_cms_blog'"))



/*
//process.exit();
Promise.all([dbTest]).then(()=>{
    console.log('All done.');
    //console.log(dbTest)
    ergfzr()
    //process.exit();
});
//CREATE DATABASE IF NOT EXISTS DBName;
*/