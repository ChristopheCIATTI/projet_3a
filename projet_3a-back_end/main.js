const mysql =  require('mysql2')
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const cookieParser = require('cookie-parser')
const app = express()

app.use(bodyParser.urlencoded({ extended: false })) // URLEncoded form data
app.use(bodyParser.json()) // application/json
app.use(cors())
app.use(morgan('dev')); // toutes les requêtes HTTP dans le log du serveur
app.use(cookieParser())

/*
(require("./script/mysqlCheckDataBase"));
(require("./script/mysqlCheckTables"));

*/
//require("./script/mysqlCheckDataBase")()
//require("./script/mysqlCheckTables")()

//Promise.all([require("./script/mysqlCheckDataBase")()])
//.then(require("./script/mysqlCheckTables")())

const db = mysql.createConnection({
    host: 'localhost',
    port: '3306',
    user: 'root',
    database : 'esimed_projet3a_cms_blog_test'
},function(error){if(error){throw error}})


db.connect(function(err) {
  if (err) throw err;
  //console.log("Connected!");
});




console.log("Server is running")

const UserService = require("./services/user")
const userService = new UserService(db)

const ArticleService = require("./services/article")
const { promise } = require('bcrypt/promises')
const articleService = new ArticleService(db)

const jwt = require('./jwt')(userService, articleService)

require("./api/article")(app, articleService , jwt)
require("./api/user")(app, userService, jwt)
//require("./datamodel/mysqlCheck")(db)
require('./datamodel/seeder')( articleService, userService)
.then(app.listen(3333))

