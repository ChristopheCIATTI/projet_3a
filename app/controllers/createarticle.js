class CreateArticleController extends BaseController {
    constructor() {
        super(false)
        this.init()
        this.model = new Model()
    }

    wordCount(value) {
        var wom = value.match(/\S+/g);
        return {
            charactersNoSpace: value.replace(/\s+/g, '').length,
            characters:  value.length,
            words: wom ? wom.length : 0,
            lines: value.split(/\r*\n/).length
        }
    }

    init() {
        /*
        let textarea = document.getElementById("articleContent")
        textarea.addEventListener("input", function() {
            let v = this.wordCount(this.value)
            console.log(v.words)
        })
        */
    }


    async registerArtcile() {
        console.log("ok")

        const article = {
            title : $("#articleTitle").value,
            meta_title : $("#articleMeta").value,
            summary : $("#articleSummary").value,
            content : $("#articleContent").value,
            published : $("#articlePublished").value,
            email : sessionStorage.getItem("email")
        }

        console.log(article)

        /* check again if all fied are filled */
        let error = 0
        for(let i in article) {
            if((article[i] === undefined || article[i] === null) && article[i].length == 0) {
                popUp.popUpDisplay("Le champs : " + article[i] + " est vide");
                error += 1
                return
            }
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