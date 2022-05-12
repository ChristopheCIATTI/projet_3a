class CreateArticleController extends BaseController {
    constructor() {
        super(false)
        this.init()
        this.model = new Model()
    }

    init() {
        const content = document.getElementById("content")
        content.setAttribute("class", "createArtcileBackground")
    }

    async registerArtcile() {
        console.log("ok")

        const article = {
            title : $("#articleTitle").value,
            meta_title : $("#articleMeta").value,
            summary : $("#articleSummary").value,
            content : $("#articleContent").value,
            published : $("#articlePublished").value
        }

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
            articleInserted = await this.model.insertArticle(article)
        }
    }
}

window.createarticleController = new CreateArticleController()