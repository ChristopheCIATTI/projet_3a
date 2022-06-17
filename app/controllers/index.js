class IndexController extends BaseController {
    constructor() {
        super()
        this.articleSlug = null
        this.model = new Model()

        let tokenStatus
        tokenStatus = this.checkToken()  
        this.ifLogged(tokenStatus)

        this.offset = 0
        this.articleNumber = 0
        this.getLast10ArticlesPublish()
        this.displayArticles()


    }

    async checkToken() {
        if(sessionStorage.getItem("token") && sessionStorage.getItem("token") != undefined) {
            const token = sessionStorage.getItem("token")
            let checkToken = await this.model.checkToken(token)
            console.log(checkToken)
            
            if(checkToken.status === 401) {
                this.logout()
                console.log("401 : logged again")
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

    async getLast10ArticlesPublish() {
        const articles = await this.model.getLast10ArticlesPublish()
        const _article = JSON.stringify(articles)
        localStorage.setItem("articlepublished", _article)
        this.offset = 10
    }
    
    displayArticles() {
        const articles = JSON.parse(localStorage.getItem("articlepublished"))
        const articlesAvailable = articles.length
        this.articleNumber = articlesAvailable

        $("#indexArticleNumber").innerHTML += "<span id='spanArticleNumber'>" + articles.length + "</span>"

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

    display5moreArticle() {
        const articles = JSON.parse(localStorage.getItem("articlepublished"))
        const articlesAvailable = articles.length

        let content = ""
        let newArticleNumber = 0
        for(let i = this.offset; i < articlesAvailable; i++) {
            newArticleNumber++
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

        /*
        const previousArticleNumber = document.getElementById("spanArticleNumber").innerText
        if((parseInt(previousArticleNumber) + parseInt(newArticleNumber)) <= articlesAvailable) {
            $("#spanArticleNumber").innerHTML = (parseInt(previousArticleNumber) + parseInt(newArticleNumber))
        }*/
        
        $("#articleContainer").innerHTML += content

        for(/*let i = ++this.offset; i < articlesAvailable; i++*/let i in articles) {
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

    async more() {
        console.log("more")
        console.log("console.log(this.offset)")
        console.log(this.offset)

        const article = JSON.parse(localStorage.getItem("articlepublished"))

        //const fiveMoreArticles = 
        const fiveMoreArticles = await this.model.get5moreArticles(this.offset)
        console.log(fiveMoreArticles)
        console.log(fiveMoreArticles.length)

        if(fiveMoreArticles.length > 0) {
            console.log("console.log(fiveMoreArticles[i])")
            for(let i in fiveMoreArticles) {
                console.log(fiveMoreArticles[i])
                article.push(fiveMoreArticles[i])
            }
        }
        

        localStorage.setItem("articlepublished", JSON.stringify(article))
        this.display5moreArticle()
        
        this.offset += 5
    }
    
}

window.indexController = new IndexController()
