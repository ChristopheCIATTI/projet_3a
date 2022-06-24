const mysql = require('mysql2')

console.log("check database")

const db = mysql.createConnection({
    host: 'localhost',
    port: '3306',
    user: 'root'
},function(error){if(error){throw error}})


db.connect(function(err) {
    if (err) throw err;
});

db.query("USE esimed_projet3a_cms_blog_test")

const checkDBTableUser = function() {
    try {
        new Promise((resolve, reject) => {
            db.query("SHOW TABLES LIKE 'user'", (err, rows, fields) => {
                if(err) {
                    return reject(err);
                }
                resolve(rows);
            })
        })
        .then(response => console.log(response))
        .then(response => {
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

                db.query("ALTER TABLE `user` MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=76;")
                db.query("COMMIT;")
            }
        })
    }
    catch(e) {console.log(e)}
}

const checkDBTableArticle = function() {
    try {
        new Promise((resolve, reject) => {
            db.query("SHOW TABLES LIKE 'article'", (err, rows, fields) => {
                if(err) {
                    return reject(err);
                }
                resolve(rows);
            })
        })
        .then(response => console.log(response))
        .then(response => {
            if(response === [] || response === undefined || response === null || response.length === 0) {
                console.log("Table article not found")
                console.log("Create Table article")
               db.query(" \
                    CREATE TABLE `article` ( \
                    `id` int(11) NOT NULL, \
                    `author_id` int(11) DEFAULT NULL, \
                    `parent_id` int(11) DEFAULT NULL, \
                    `title` int(11) NOT NULL, \
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
            }
        })
    }
    catch(e) {console.log(e)}
}

checkDBTableUser()
checkDBTableArticle()

