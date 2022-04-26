class Model {
    constructor() {
        this.articleApi = new ArticleAPI()
        this.userApi = new UserAPI()
    }

    getAllArticles() {
        return this.articleApi.getAllArticles()
    }

    getNumberArticles() {
        return this.articleApi.getNumberArticles()
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
}