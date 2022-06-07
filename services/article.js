const ArticleDAO = require("../datamodel/articleDao")
const Article = require("../datamodel/article")
const UserDAO = require("../datamodel/userdao")

module.exports = class ArticleService {
    constructor(db) {
        this.dao = new ArticleDAO(db)
        this.userDao = new UserDAO(db)
    }
}
