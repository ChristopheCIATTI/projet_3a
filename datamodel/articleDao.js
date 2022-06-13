const { rejects } = require('assert')
const { resolve } = require('path')
const BaseDAO = require('./basedao')

module.exports = class ArticleDAO extends BaseDAO {
    constructor(db) {
        super(db)
    }

    //Request baby

    getAllArticle() {
        return new Promise((resolve, reject) => {
            this.db.query("SELECT * from article", (err, rows, fields) => {
                if(err) {
                    return reject(err);
                }
                resolve(rows);
            })
        })
    }

    getNumberArticles() {
        return new Promise((resolve, reject) => {
            this.db.query("SELECT COUNT(*) as articleNumber FROM `article` ", (err, rows, fields) => {
                if(err) {
                    return reject(err);
                }
                resolve(rows);
            })
        })
    }

    getArticleById(id) {
        return new Promise((resolve, reject) => {
            this.db.query("SELECT * from article WHERE id = ?", [id], (err, rows, fields) => {
                if(err) {
                    return reject(err);
                }
                resolve(rows);
            })
        })
    }

    getArticleByAuthor(author_id) {
        return new Promise((resolve, reject) => {
            this.db.query("SELECT * from article WHERE author_id = ?", [author_id], (err, rows, fields) => {
                if(err) {
                    return reject(err);
                }
                resolve(rows);
            })
        })
    }

    getArticleByAuthorAndId(author_id, id) {
        return new Promise((resolve, reject) => {
            this.db.query("SELECT * from article WHERE author_id = ? AND id = ?", [author_id, id], (err, rows, fields) => {
                if(err) {
                    return reject(err);
                }
                resolve(rows);
            })
        })
    }

    getArticleByTitle(title) {
        return new Promise((resolve, reject) => {
            this.db.query("SELECT * from article WHERE title = ?", [title], (err, rows, fields) => {
                if(err) {
                    return reject(err);
                }
                resolve(rows);
            })
        })
    }

    getArticleByTitleAndAuthor(title, author_id) {
        return new Promise((resolve, reject) => {
            this.db.query("SELECT * from article WHERE title = ? AND author_id", [title, author_id], (err, rows, fields) => {
                if(err) {
                    return reject(err);
                }
                resolve(rows);
            })
        })
    }

    getArticleBySlug(slug) {
        return new Promise((resolve, reject) => {
            this.db.query("SELECT * from article WHERE slug = ?", [slug], (err, rows, fields) => {
                if(err) {
                    return reject(err);
                }
                resolve(rows);
            })
        })
    }

    getArticleBySlugAndAuthor(slug, author_id) {
        return new Promise((resolve, reject) => {
            this.db.query("SELECT * from article WHERE slug = ? AND author_id", [slug, author_id], (err, rows, fields) => {
                if(err) {
                    return reject(err);
                }
                resolve(rows);
            })
        })
    }

    /*
    getAuthorNameByAuthorId(authorId) {
        return new Promise((resolve, reject) => {
            this.db.query("SELECT firstname, middleName, ")

            //firstname
            //middleName
            //lastName
        })
    }
    */
    // Not working ...
    /*
    getAllArticlesPublished(published) {
        console.log("arg : " + published)
        return new Promise((resolve, reject) => {
            this.db.query("SELECT * FROM `article` WHERE article.published = ?;",
            [1])
        })
    }
    */
    //SELECT * FROM `article` WHERE article.published = true 
    
    insertArticle(article) {
        return new Promise((resolve, reject) => {
            this.db.query("INSERT INTO article \
                (author_id, title, meta_title, slug, summary, published, created_at, content) \
                VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
                [article.author_id, 
                article.title, 
                article.meta_title,
                article.slug, 
                article.summary, 
                article.published, 
                article.created_at,
                article.content]
            )
        })
    }
    
    updateArtcile() {}

    updateField(value, field, slug) {
        console.log(value)
        console.log(field)
        console.log(slug)

        return new Promise((resolve, reject) => {
            //this.db.query("UPDATE article SET article.?=? WHERE article.slug = ?",
            this.db.query(`UPDATE article SET "${field}"="${value}" WHERE "slug"="${slug}"`,
            (err, rows, fields) => {
                if (err) {
                    return reject(err)
                }
                rows = rows
                resolve(rows);
            })
        })
    }
   // http://dev.mysql.com/doc/refman/5.0/en/identifiers.html
    //rant select,insert,update,delete on `astpp-eth01`.* to 'portal'@'localhost' identified by 'Ab7g12Xh35' with grant option;
    //UPDATE `article` SET `title` = 'test' WHERE `article`.`id` = 6; 
//`SELECT * FROM ${route_name} INNER JOIN users ON ${route_name_join} = users.id;`;
    /*
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

    */

    deleteAllArticle() {
        return new Promise((resolve, reject) => {
            this.db.query("DELETE FROM article")
        })
    }

    deleteArticleById(id) {
        return new Promise((resolve, reject) => {
            this.db.query("DELETE FROM article WHERE id = ?", [id])
        })
    }

    deleteArticleByAuthor(author_id) {
        return new Promise((resolve, reject) => {
            this.db.query("DELETE FROM article WHERE author_id = ?", [author_id])
        }) 
    }

    deleteArticleByAuhorAndId(author_id, id) {
        return new Promise((resolve, reject) => {
            this.db.query("DELETE FROM article WHERE author_id = ? AND id = ?",
            [author_id, id])
        })
    }

    
}
