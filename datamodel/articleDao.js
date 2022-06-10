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
