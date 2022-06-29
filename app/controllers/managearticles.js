class ManageArticlesController extends BaseController {
    constructor() {
        super()
        this.model = new Model()
        this.articleSlug = null
        this.offset = 0
        this.getAllMyArticles()
        //this.displayArticles()
    }

    async getAllMyArticles() {
        const articles = await this.model.getAllMyArticles()
        const _article = JSON.stringify(articles)
        localStorage.setItem("myarticles", _article)
        this.offset = 10
        if(articles) {this.displayArticles()}
    }

    displayArticles() {
        const articles = JSON.parse(localStorage.getItem("myarticles"))
        if(articles === null || articles.length === 0 || articles === undefined) {return}
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
            //content += "menu modifier supprimer"
            content += `<span data-index-modifier="modifier-${i}">modifier</span>`
            content += " "
            content += `<span data-index-delete="delete-${i}"'>supprimer</span>`
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

            document.querySelector(`[data-index-modifier="modifier-${i}"]`)
            .addEventListener("click", 
            function() {
                this.articleSlug = articles[i].slug;
                if(localStorage.getItem("articleSlug")) {localStorage.removeItem("articleSlug")}
                localStorage.setItem("articleSlug", this.articleSlug)
                return navigate("article");
            }, 
            false)
            
            //data-index-delete="delete-0"
            document.querySelector(`[data-index-delete="delete-${i}"]`)
            .addEventListener("click", async function() {
                const confirmation = confirm("voulez vous supprimer l'article ?")

                if(confirmation) {
                    console.log(`article ${i}`)
                    console.log(articles[i])
                    const r = await this.model.deleteArticle(articles[i])
                }

                return
            }.bind(this))
        }
    }

    display5moreArticle() {
        const articles = JSON.parse(localStorage.getItem("myarticles"))
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
            
            content += "<div>"
            //content += "menu modifier supprimer"
            content += `<span data-index-modifier="modifier-${i}">modifier</span>`
            content += " "
            content += `<span data-index-delete="delete-${i}"'>supprimer</span>`
            content += "</div>"
        }
        $("#articleContainer").innerHTML += content

        for(let i in articles) {
            console.log("add event listenenr loop : " + i)
            document.getElementById(`card-${i}`)
            .addEventListener("click", 
                function() {
                    this.articleSlug = articles[i].slug;
                    if(localStorage.getItem("articleSlug")) {localStorage.removeItem("articleSlug")}
                    localStorage.setItem("articleSlug", this.articleSlug)
                    return navigate("article");
                }, 
                false)

            document.querySelector(`[data-index-modifier="modifier-${i}"]`)
            .addEventListener("click", 
            function() {
                this.articleSlug = articles[i].slug;
                if(localStorage.getItem("articleSlug")) {localStorage.removeItem("articleSlug")}
                localStorage.setItem("articleSlug", this.articleSlug)
                return navigate("article");
            }, 
            false)
            
            //data-index-delete="delete-0"
            document.querySelector(`[data-index-delete="delete-${i}"]`)
            .addEventListener("click", async function() {
                const confirmation = confirm("voulez vous supprimer l'article ?")

                if(confirmation) {
                    console.log(`article ${i}`)
                    console.log(articles[i])
                    const r = await this.model.deleteArticle(articles[i])
                }

                return
            }.bind(this))
        }
    }

    async more() {
        console.log("more")
        console.log("console.log(this.offset)")
        console.log(this.offset)

        const article = JSON.parse(localStorage.getItem("myarticles"))

        //const fiveMoreArticles = 
        const fiveMoreArticles = await this.model.get5moreMyArticles(this.offset)
        console.log(fiveMoreArticles)
        console.log(fiveMoreArticles.length)

        if(fiveMoreArticles.length > 0) {
            console.log("console.log(fiveMoreArticles[i])")
            for(let i in fiveMoreArticles) {
                console.log(fiveMoreArticles[i])
                article.push(fiveMoreArticles[i])
            }
        }
        
        localStorage.setItem("myarticles", JSON.stringify(article))
        this.display5moreArticle()
        this.offset += 5
    }



}

window.manageArticlesController = new ManageArticlesController()
