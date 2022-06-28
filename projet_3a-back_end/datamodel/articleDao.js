const { rejects } = require('assert')
const { reject } = require('bcrypt/promises')
const { resolve } = require('path')
const { off } = require('process')
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
            this.db.query("SELECT * from article WHERE author_id = ? ORDER BY updated_at DESC LIMIT 10", [author_id], (err, rows, fields) => {
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

    get10LastArticle() {
        return new Promise((resolve, reject) => {
            //SELECT * FROM `article` ORDER BY `article`.`updated_at` ASC 
            this.db.query("SELECT * from article WHERE published = 1 ORDER BY updated_at  DESC LIMIT 10", (err, rows, fields) => { 
                if(err) {
                    return reject(err);
                }
                resolve(rows);
            })
        })
    }

    // issue: https://github.com/mscdex/node-mariasql/issues/166
    get5moreArticles(offset) {
        return new Promise((resolve, reject) => {
            //this.db.query('SELECT * from article WHERE published = 1 ORDER BY updated_at  DESC LIMIT ?,5 ',
            this.db.query("SELECT * from article WHERE published = 1 ORDER BY updated_at  DESC LIMIT "+offset+",5" /*,
            [offset]*/,
            (err, rows, fields) => {
                if(err) {
                    return reject(err);
                }
                resolve(rows);
            })
        })
    }

    //this.db.query("SELECT * from article WHERE author_id = ? ORDER BY updated_at DESC LIMIT 10"
    getArticleByAuthor5More(id, offset) {
        console.log("inner dao")
        console.log("id : " + id)
        console.log("offset : " + offset)
        console.log("request")
        console.log("SELECT * from article WHERE author_id = "+id+" ORDER BY updated_at  DESC LIMIT "+offset+",5")
        return new Promise((resolve, reject) => {
            this.db.query("SELECT * from article WHERE author_id = "+id+" ORDER BY updated_at  DESC LIMIT "+offset+",5",
            (err, rows, fields) => {
                if(err) {
                    return reject(err);
                }
                resolve(rows);
            })
        })
    }
    
    insertArticle(article) {
        console.log("dao inster check content")
        console.log(article.content)
        return new Promise((resolve, reject) => {
            this.db.query("INSERT INTO article \
                (author_id, title, meta_title, slug, summary, published, created_at, updated_at, content) \
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
                [article.author_id, 
                article.title, 
                article.meta_title,
                article.slug, 
                article.summary, 
                article.published, 
                article.created_at,
                article.updated_at,
                article.content],
                (err, rows, fields) => {
                    if (err) {
                        return reject(err);
                    }
                    resolve(rows);
                }
            )
        })
    }
    
    updateArtcile() {}

    updateField(value, field, slug) {

        if(field === "title") {
            console.log("title detect")
            //console.log("at updateField(value, field, slug + log data given)")
            console.log("value : " + value)
            console.log("field : " + field)
            console.log("slug : " + slug)
        } else {console.log("other field : " + field); console.log("value : " + value); console.log("slug : " + slug)}

        console.log("UPDATE article SET article.??=? WHERE article.slug = ?")

        return new Promise((resolve, reject) => {
            this.db.query("UPDATE article SET article.??=? WHERE article.slug = ?",
            [field, value, slug],
            (err, rows, fields) => {
                if (err) {
                    return reject(err);
                }
                resolve(rows);
            })
        })
    }
   
    updateFieldUpdate_atBySlug(value, slug) {
        return new Promise((resolve, reject) => {
            this.db.query("UPDATE article SET article.updated_at=? WHERE article.slug = ?",
            [value, slug],
            (err, rows, fields) => {
                if (err) {return reject(err)}
                rows = rows
                resolve(rows);
            })
        })
    }

    updatePublished_atBySlug(value, slug) {
        return new Promise((resolve, reject) => {
            this.db.query("UPDATE article SET article.published_at=? WHERE article.slug = ?",
            [value, slug],
            (err, rows, fields) => {
                if (err) {
                    return reject(err)
                }
                rows = rows
                resolve(rows);
            })    
        })
    }

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

    deleteArticleBySlug(slug) {
        return new Promise((resolve, reject) => {
            this.db.query("DELETE FROM article WHERE slug = ?",
            [slug])
        })
    }
}
