class IndexController extends BaseController {
    constructor() {
        super()
        this.articleSlug = null
        this.model = new Model()

        let tokenStatus
        tokenStatus = this.checkToken()  
        this.ifLogged(tokenStatus)

        //const tokenStatus = this.checkToken()
        //this.ifLogged(tokenStatus)
        //this.checkToken()
        this.getAllArticlesPublished()
        this.displayArticles()
    }

    /*
    checkToken() {
        console.log("checkToken")
        if(sessionStorage.getItem("token") && sessionStorage.getItem("token") != undefined) {
            const token = sessionStorage.getItem("token")
            const checkToken = await this.model.checkToken(token)
            console.log(checkToken)
        }
    }
    */

    async checkToken() {
        if(sessionStorage.getItem("token") && sessionStorage.getItem("token") != undefined) {
            const token = sessionStorage.getItem("token")
            let checkToken = await this.model.checkToken(token)
            console.log(checkToken)
            
            if(checkToken.status === 401) {
                this.logout()
                console("401 : logged again")
                //this.tokenStatus = false
                //console.log(this.tokenStatus)
                //return false
                return Promise.resolve(false);
            }

            if(checkToken.status === 200) {
                console.log("200 : logged")
                //this.tokenStatus = true
                //console.log(this.tokenStatus)
                //return true
                return Promise.resolve(true);
            }
            
        }

        if(!sessionStorage.getItem("token") || sessionStorage.getItem("token") == undefined) {
            //this.tokenStatus = false
            return false
        }
    }

    async getAllArticlesPublished() {
        const articles = await this.model.getAllArticlesPublished(true)
        const _article = JSON.stringify(articles)
        localStorage.setItem("articlepublished", _article)
    }
    
    displayArticles() {
        const articles = JSON.parse(localStorage.getItem("articlepublished"))
        const articlesAvailable = articles.length

        $("#indexArticleNumber").innerHTML += articles.length

        let content = ""
        for(let i in articles) {
            if(articles[i].content.length >= 380) {
                articles[i].content = articles[i].content.slice(0, 380)
                console.log(articles[i].content)
            }

            content += `<div id='card-${i}' class='card'>`
            content += "<h2>" + articles[i].title + "</h2>"
            content += "<h5>" + articles[i].summary + ", " +  this.jsonDateToString(articles[i].created_at) + "</h5>"
            content += "<p>" + articles[i].content + "</p>"
            content += "</div>"
        }

        $("#articleContainer").innerHTML += content

        for(let i in articles) {
            document.getElementById(`card-${i}`)
            .addEventListener("click", 
                function() {
                    this.articleSlug = articles[i].slug;

                    if(localStorage.getItem("articleSlug")) {localStorage.removeItem("articleSlug")}

                    localStorage.setItem("articleSlug", this.articleSlug)
                    return navigate("article");
                }, 
                false)
        }
    }
    
}

window.indexController = new IndexController()
