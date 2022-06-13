class CreateArticleController extends BaseController {
    constructor() {
        super(false)
        this.init()
        this.model = new Model()

        this.words = null
        this.characters = null
    }

    wordCount(value) {
        console.log("in wordCount function")
        var wom = value.match(/\S+/g);
        return {
            charactersNoSpace: value.replace(/\s+/g, '').length,
            characters:  value.length,
            words: wom ? wom.length : 0,
            lines: value.split(/\r*\n/).length
        }
    }

    init() {
        
        let textarea = document.getElementById("articleContent")
        textarea.addEventListener("input", function(event) {
            const value = textarea.value
            let v = this.wordCount(value)
            console.log(v.words)
            document.getElementById("words_counted").innerText = "Mots : " + v.words
            document.getElementById("chars_counted").innerText = "Character : " + v.characters
            this.words = v.words
            this.characters = v.characters

            if(this.words <= 5 && this.characters <= 50) {
                articleContentLength
                document.getElementById("articleContentLength").innerText = "Votre article est trop court pour l'instant"
            }
            else {
                document.getElementById("articleContentLength").innerText = "Vous pouvez poster l'article"
            }

        }.bind(this))
        
    }


    async registerArtcile() {
        const article = {
            title : $("#articleTitle").value,
            meta_title : $("#articleMeta").value,
            summary : $("#articleSummary").value,
            content : $("#articleContent").value,
            published : $("#articlePublished").value,
            email : sessionStorage.getItem("email")
        }

        console.log(article)

        console.log("this.words")
        console.log(this.words)
        console.log("this.characters")
        console.log(this.characters)

        /* check again if all fied are filled */
        let error = 0
        for(let i in article) {
            if((article[i] === undefined || article[i] === null) && article[i].length == 0) {
                popUp.popUpDisplay("Le champs : " + article[i] + " est vide");
                error += 1
                return
            }
        }

        if(this.words <= 5 && this.characters <= 50) {
            // error
            console.log("article trop court")
        }

        console.log(error)
        console.log(article)
        if(error === 0) {
            const articleJsoned = JSON.stringify(article)
            console.log(articleJsoned)
            sessionStorage.setItem("articleInProgress", articleJsoned)
            articleInserted = await this.model.insertArticle(article)
        }
    }
}

window.createarticleController = new CreateArticleController()