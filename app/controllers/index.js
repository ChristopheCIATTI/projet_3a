class IndexController extends BaseController {
    constructor() {
        super()
        this.model = new Model()
        const tokenStatus = this.checkToken()
        this.ifLogged(tokenStatus)
        //this.checkToken()
        this.displayArticles()
    }

    checkToken() {
        console.log("checkToken")
        if(sessionStorage.getItem("token") && sessionStorage.getItem("token") != undefined) {
            const token = sessionStorage.getItem("token")
            const checkToken = await this.model.checkToken(token)
            console.log(checkToken)
        }
    }

    async displayArticles() {

        //articleNumber
        const displayArticleNumber = document.querySelector("#articleNumber")
        
        try {
            const articles = await this.model.getAllArticles()
            let articlesnumber = await this.model.getNumberArticles()
            articlesnumber = JSON.parse(JSON.stringify(articlesnumber)) 
            //console.log(obj.articleNumber)

            displayArticleNumber.innerHTML += articlesnumber.articleNumber
        }
        catch (e) {
            console.log(e)
            this.displayServiceError()
        }
    }
}

window.indexController = new IndexController()
