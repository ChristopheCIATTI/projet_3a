class ArticleController extends BaseFormController {
    constructor() {
        super()

        this.model = new Model()
        this.articleSlug = localStorage.getItem("articleSlug")

        if(this.articleSlug == null || this.articleSlug == undefined) {
            console.error("Internal error")
            return
        }

        /*
        let tokenStatus
        tokenStatus = this.checkToken()  
        //this.ifLogged(tokenStatus)
        console.log(tokenStatus)
        */
        
        this.article = this.getArticle()
        Promise.all([this.article])
            .then((value) => {this.displayArticle(); this.editArticle()})
        

        this.tokenStatus 
        Promise.all([this.checkToken()]).then((value) => console.log(value))
        
    }

    async checkToken() {
        if(sessionStorage.getItem("token") && sessionStorage.getItem("token") != undefined) {
            const token = sessionStorage.getItem("token")
            let checkToken = await this.model.checkToken(token)
            console.log(checkToken)
            
            if(checkToken.status === 401) {
                this.logout()
                console("401 : logged again")
                //return Promise.resolve(false);
                this.tokenStatus = false
                return this.tokenStatus
            }

            if(checkToken.status === 200) {
                console.log("200 : logged")
                //return Promise.resolve(true);
                this.tokenStatus = true
                return this.tokenStatus
            }
            
        }

        if(!sessionStorage.getItem("token") || sessionStorage.getItem("token") == undefined) {
            //this.tokenStatus = false
            return false
        }
    }

    async getArticle() {
        const article = await this.model.getArticleBySlug(this.articleSlug)

        const _article = JSON.stringify(article[0][0])
        const author = JSON.stringify(article[1][0])

        localStorage.setItem("article", _article)
        localStorage.setItem("author", author)
    }

    async displayArticle() {
        const article = JSON.parse(localStorage.getItem("article"))
        const author = JSON.parse(localStorage.getItem("author"))
     
        $("#articleTitle").innerHTML = article.title
        $("#articleSumary").innerHTML = article.summary
        $("#article-author-firstName").innerHTML = author.firstname
        $("#article-author-middleName").innerHTML = author.middleName
        $("#article-author-lastName").innerHTML = author.lastName
        $("#article-publish").innerHTML += article.published == 1 ? "Article publié" : "Article pas publié" 

        $("#article-date").innerHTML = article.published_at
        $("#article-update").innerHTML = article.updated_at
        $("#articleContent").innerHTML = article.content
    }

    editArticle() {
        const author = JSON.parse(localStorage.getItem("author"))
        const firstname = sessionStorage.getItem("firstname")

        if(firstname === author.firstname) {
            console.log("author ok")
            $("#editArticle").innerHTML += "<button>Edit</button>"
            $("#removeArticle").innerHTML += "<button>Supprimer</button>"
        }
        else {return}

        const edit = document.getElementById("editArticle")
        edit.addEventListener("click", function() {
            
            //const articleForm = document.getElementById("articlePage")
            //articleForm.innerHTML = `<form id="articlePage" class="createArticleBox"></form>  
            //<form id="createArtcileForm" class="createArticleBox">


            console.log("console.log(articleTitle.nodeType)")
            const articleTitle = document.getElementById("articleTitle")
            console.log(articleTitle.nodeName)

            const inputTitle = `<input id="articleTitle" placeholder="Titre de l'article" type="text" class="validate" required></input>`

            //articleTitle.replaceWith(inputTitle)
            articleTitle.innerHTML = inputTitle
        }, false)
    }
}

window.articleController = new ArticleController()
