class CreateArticleController extends BaseController {
    constructor() {
        super(false)
        this.init()
        this.model = new Model()

        this.words = null
        this.characters = null

        this.dataEdit()
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
        
        let textarea = document.getElementById("articleContent")
        textarea.addEventListener("input", function(event) {
            const value = textarea.textContent
            let v = this.wordCount(value)
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
            content : $("#articleContent").innerHTML,
            published : $("#articlePublished").value,
            email : sessionStorage.getItem("email")
        }

        /* check again if all fied are filled */
        let error = 0
        /*
        for(let i in article) {
            if((article[i] === undefined || article[i] === null) && article[i].length == 0) {
                popUp.popUpDisplay("Le champs : " + article[i] + " est vide");
                error += 1
                return
            }
        }*/

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
            console.log("carticle content")
            console.log($("#articleContent"))
            console.log($("#articleContent").innerHTML)
            articleInserted = await this.model.insertArticle(article)
        }
    }

    dataEdit() {
        console.log("dataEdit()")

        /*
        [].forEach.call(document.querySelectorAll("[data-edit]"), function(btn) {
  btn.addEventListener("click", edit, false);
});

        */
        
        document.querySelectorAll("[data-edit]").forEach(btn =>
            btn.addEventListener("click", edit)
        );
      
        function edit(ev) {
            ev.preventDefault();
            const cmd_val = this.getAttribute("data-edit").split(":");
            document.execCommand(cmd_val[0], false, cmd_val[1]);
        }
    }

    /*
    document.querySelectorAll("[data-edit]").forEach(btn =>
  			btn.addEventListener("click", edit)
		);

		function edit(event) {
			event.preventDefault();
			var cmd_val = this.dataset.edit.split(":");
			document.execCommand(cmd_val[0], false, cmd_val[1]);
		}
        */
}

window.createarticleController = new CreateArticleController()