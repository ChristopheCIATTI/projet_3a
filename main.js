//const mysql =  require('mysql2/promise')
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

const db = mysql.createConnection({
    host: 'localhost',
    port: '3306',
    user: 'root',
    database : 'esimed_projet3a_cms_blog'
});

db.connect(function(err) {
    if (err) throw err;
    console.log("Connecté à la base de données MySQL!");
  });


//const UserAccountService = require("./services/useraccount")
//const userAccountService = new UserAccountService(db)
const UserService = require("./services/user")
const userService = new UserService(db)
const ArticleService = require("./services/article")
const articleService = new ArticleService(db)


//const jwt = require('./jwt')(userAccountService, userService)

//require('./api/useraccount')(app, userAccountService, jwt)
require("./api/article")(app, articleService /*, jwt*/)
require("./api/user")(app, userService /*, jwt*/)
require('./datamodel/seeder')( 
    articleService,
    userService
    )
    .then(app.listen(3333))

