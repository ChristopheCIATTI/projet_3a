class CreateArticleController extends BaseController {
    constructor() {
        super(false)
        this.init()
    }

    init() {
        document.getElementById("formTitle")
        const content = document.getElementById("content")
        content.setAttribute("class", "createArtcileBackground")
        console.log(content)

    }
}

window.createarticleController = new CreateArticleController()