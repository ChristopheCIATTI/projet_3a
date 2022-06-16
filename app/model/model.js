class Model {
    constructor() {
        this.articleApi = new ArticleAPI()
        this.userApi = new UserAPI()
    }

    getArticleBySlug(slug) {
        return this.articleApi.getArticleBySlug(slug)
    }

    getAllArticles() {
        return this.articleApi.getAllArticles()
    }

    getLast10ArticlesPublish() {
        return this.articleApi.getLast10ArticlesPublish()
    }

    getAllArticlesPublished() {
        return this.articleApi.getAllArticlesPublished(true)
    }

    getAllUserArticle() {
        return this.articleApi.getAllUserArticle()
    }

    getNumberArticles() {
        return this.articleApi.getNumberArticles()
    }

    getAllMyArticles() {
        return this.articleApi.getAllMyArticles()
    }

    get5moreArticles(offset) {
        return this.articleApi.get5moreArticles(offset)
    }

    insertUser(formValue) {
        return this.userApi.insertUser(formValue)
    }

    login(user) {
        return this.userApi.login(user)
    }

    checkToken(token) {
        return this.userApi.checkToken(token)
    }

    getUserInfo(email) {
        return this.userApi.getUserInfo(email)
    }

    getAuthorNameById(auhorId) {
        return this.userApi.getAuthorNameById(auhorId)
    }

    insertArticle(article) {
        return this.articleApi.insertArticle(article)
    }

    updateArticle(value) {
        return this.articleApi.updateArticle(value)
    }
}
