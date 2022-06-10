class ManageArticlesController extends BaseController {
    constructor() {
        super()
        this.model = new Model()
        this.articleSlug = null
        this.getAllMyArticles()
        this.displayArticles()
    }

    async getAllMyArticles() {
        const articles = await this.model.getAllMyArticles()
        const _article = JSON.stringify(articles)
        console.log(_article)
        localStorage.setItem("myarticles", _article)
    }

    displayArticles() {

        const articles = JSON.parse(localStorage.getItem("myarticles"))
        const articlesAvailable = articles.length

        $("#indexArticleNumber").innerHTML += articles.length

        //vbar
        let content = ""
        for(let i in articles) {
            if(articles[i].content.length >= 380) {
                articles[i].content = articles[i].content.slice(0, 380)
            }

            content += `<div id='card-${i}' class='card'>`
            content += "<h2>" + articles[i].title + "</h2>"
            content += "<h5>" + articles[i].summary + ", " +  this.jsonDateToString(articles[i].created_at) + "</h5>"
            content += "<p>" + articles[i].content + "</p>"
            content += "</div>"
            
            content += "<div>"
            content += "menu modifier supprimer"
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

                    //
                    //console.log(window.articleController)

                    return navigate("article");
                }, 
                false)
        }

    }
}

window.manageArticlesController = new ManageArticlesController()
