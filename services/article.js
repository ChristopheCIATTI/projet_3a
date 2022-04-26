const ArticleDAO = require("../datamodel/articleDao")
const Article = require("../datamodel/article")

module.exports = class ArticleService {
    constructor(db) {
        this.dao = new ArticleDAO(db)
    }
}
