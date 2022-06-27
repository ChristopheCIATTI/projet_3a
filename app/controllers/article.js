class ArticleController extends BaseController {
    constructor() {
        super()

        this.model = new Model()
        this.articleSlug = localStorage.getItem("articleSlug")
        this.lastInputEdited = Node

        if(this.articleSlug == null || this.articleSlug == undefined) {
            console.error("Internal error")
            return
        }

        this.article = this.getArticle()
        Promise.all([this.article])
            .then((value) => {
                this.displayArticle(); 
                this.editInput(); 
                /*this.edit()*/
                this.dataEdit()
                this.deleteArticleButton()
            })

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
        //const author = JSON.parse(localStorage.getItem("author"))

        $("#articleTitle").innerHTML = article.title
        $("#articleSumary").innerHTML = article.summary
        $("#article-author-firstName").innerHTML = article.firstname
        $("#article-author-middleName").innerHTML = article.middleName
        $("#article-author-lastName").innerHTML = article.lastName
        $("#articlePublishDate").innerHTML += this.jsonDateToString(article.published_at)
        $("#articleArticleUpdateDate").innerHTML = (article.updated_at != null || article.updated_at != "undefined") ? `Article mis à jour le : ${this.jsonDateToString(article.updated_at)}` : "" 
        $("#articlePublish").innerHTML += article.published == 1 ? "Article publié" : "Article pas publié" 
        $("#articleContent").innerHTML = article.content
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

    makeFieldEditable(elem, _input, objtext, id, originValue, content=false) {
        this.lastInputEdited = elem.id
        const input = _input
        const elemOrigin = elem

        elem.addEventListener("click", function() {
            if(!content) {
                elem.innerHTML = objtext.string1 + elem.innerText + "<br />" + objtext.string2
                elem.insertAdjacentHTML('beforeend', input)
    
            }

            if(content) {
                elem.insertAdjacentHTML('beforeend', input)
                const innerdiv = elem.getElementsByTagName("div")[0].innerText = content
            } 
            //else {elem.innerHTML = objtext.string1 + elem.innerText + "<br />" + objtext.string2}
            //document.getElementById("validateEdit").removeAttribute("hidden");
        }, {once : true})

        elem.addEventListener("keydown", async function(event) {
            if(event.key === "Enter") {
                if(!$("#"+id+"").value || $("#"+id+"").value === "") {
                    if(!$("#"+id+"").innerText ||$("#"+id+"").innerText === "") {
                        //call popup
                        console.log("input vide")
                        return
                    }
                }
                if($("#"+id+"").value) {elem.innerHTML = $("#"+id+"").value} 
                else {if($("#"+id+"").innerText) {elem.innerHTML = $("#"+id+"").innerText}}
                const fieldUpdated = {
                    "value" : elem.innerHTML,
                    "field" : elem.id,
                    "slug" : this.articleSlug
                }
                const edit = await this.model.updateArticle(fieldUpdated)
            }

            if(event.key === "Escape") {
                console.log(originValue)
                elem.innerHTML = originValue
                return
            } 
        }.bind(this), false)
    }

    makeFieldEditableContent(elem, _input, objtext, id, originValue, content=false) {
        this.lastInputEdited = elem.id
        const input = _input
        const elemOrigin = elem

        elem.addEventListener("click", function() {
            if(!content) {
                elem.innerHTML = objtext.string1 + elem.innerText + "<br />" + objtext.string2
                elem.insertAdjacentHTML('beforeend', input)
    
            }

            if(content) {
                elem.insertAdjacentHTML('beforeend', input)
                //const innerdiv = elem.getElementsByTagName("div")[0].innerText = content
            } 
            //else {elem.innerHTML = objtext.string1 + elem.innerText + "<br />" + objtext.string2}
            //document.getElementById("validateEdit").removeAttribute("hidden");
        }, {once : true})

        elem.addEventListener("input", function(event) {
            const value = elem.textContent
            let v = this.wordCount(value)

            document.getElementById("words_counted").hidden = false
            document.getElementById("chars_counted").hidden = false
            document.getElementById("articleContentLength").hidden = false
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

        elem.addEventListener("keydown", async function(event) {
            if(event.key === "Enter") {
                const articleContent = document.getElementById("articleContent")
                console.log(articleContent.innerHTML)
                if(!articleContent.innerHTML || articleContent.innerHTML === "") {
                    console.log("input vide")
                    return
                }

                /*if($("#"+id+"").value) {elem.innerHTML = $("#"+id+"").value} 
                else {if($("#"+id+"").innerText) {elem.innerHTML = $("#"+id+"").innerText}}*/
                const fieldUpdated = {
                    "value" : articleContent.innerHTML,
                    "field" : elem.id,
                    "slug" : this.articleSlug
                }
                const edit = await this.model.updateArticle(fieldUpdated)
            }

            if(event.key === "Escape") {
                console.log(originValue)
                elem.innerHTML = originValue
                return
            } 
        }.bind(this), false)
    }

    makeFieldEditableRadio(elem, _input, id, originValue) {
        this.lastInputEdited = elem.id
        console.log("id radio : " + this.lastInputEdited)
        const input = _input
        elem.addEventListener("click", function() {
            //elem.innerHTML = objtext.string1 + elem.innerText + "<br />" + objtext.string2
            elem.insertAdjacentHTML('beforeend', input)
            //document.getElementById("validateEdit").removeAttribute("hidden");
        }, {once : true})

        elem.addEventListener("keydown", async function(event) {
            let  radios = document.getElementsByName('articleStatus');
            console.log(radios)
            let fieldValue
            if(event.key === "Enter") {
                for(let i=0, length=radios.length; i<length; i++) {
                    if(radios[i].checked) {
                        console.log(radios[i] + " : is checked")
                        console.log(radios[i])
                        const updateValue =  radios[i].value
                        console.log(updateValue)
                        elem.innerHTML = "statut publication: " + radios[i].value
                        fieldValue = updateValue
                    }
                }
                console.log("console.log(fieldValue)")
                console.log(fieldValue)
                if(fieldValue == "publié") {
                    fieldValue = 1
                }
                else {
                    fieldValue = 0
                }
                const fieldUpdated = {
                    "value" : fieldValue,
                    "field" : elem.id,
                    "slug" : this.articleSlug
                }
                const edit = await this.model.updateArticle(fieldUpdated)
            }

            if(event.key === "Escape") {
                console.log("originValue")
                console.log(originValue)
                elem.innerHTML = `statut publication :  ${originValue}`
            }
        }.bind(this), false)
    }

    editInput() {
        if(! localStorage.getItem("author")) {return}
        const author = JSON.parse(localStorage.getItem("author"))
        const firstname = sessionStorage.getItem("firstname")
            
        if(firstname !== author.firstname) {
            console.log(`firstname : ${firstname}, author.firstname : ${author.firstname}`)
            return}


        console.log("firstname : " + firstname)
        console.log("author.firstname : " + author.firstname)

        const editTitle = document.getElementById("articleTitle")
        //"'+ ui.text +'" value=${editTitle.innerText}
        //const inputTitle = `<input id="editTitle" value="'+editTitle.innerText+'" type="text" class="validate" required autofocus="true"></input>`
        const inputTitle = '<input id="editTitle" value="'+editTitle.innerText+'" type="text" class="validate" required autofocus="true"></input>'
        const titleText = {"string1" : "Titre original : ", "string2" : "Editer Titre : "}
        this.makeFieldEditable(editTitle, inputTitle, titleText, "editTitle", editTitle.innerText)

        const editSumary = document.getElementById("articleSumary")
        //const inputSummary = `<input id="ediSumary" value=${editSumary.innerText} type="text" class="validate" required autofocus="true"></input>`
        const inputSummary = '<input id="ediSumary" value="'+editSumary.innerText+'" type="text" class="validate" required autofocus="true"></input>'
        const summaryText = {"string1" : "article sommaire : ", "string2" : "Editer sommaire : "}
        this.makeFieldEditable(editSumary, inputSummary, summaryText, "ediSumary", editSumary.innerText)

        //this.makeFieldEditable(editTitle, inputTitle, titleText, "editTitle")
        const editStatus = document.getElementById("articlePublish")
        const inputStatus = `<fieldset>
            <legend id ="editPublish">Changer le status de publication</legend>
            <form>
                <input type="radio" id="id1" name="articleStatus" value="Non publié">
                <label for="id1">Non publié</label>
                <input type="radio" id="id2" name="articleStatus" value="publié">
                <label for="id2">Publié</label>
            </form>`
    
        this.makeFieldEditableRadio(editStatus, inputStatus, "editPublish", editStatus.innerText)

        document.getElementById("richTextHide").hidden = false
        const editContent = document.getElementById("articleContent")
        editContent.setAttribute("contenteditable", "true");
        //const inputContent = `<input id="ediContent" value=${editContent.innerText} type="textarea" class="validate" required autofocus="true"></input>`
        const inputContent = `<div contenteditable id="ediContent" class="validate" required autofocus="true"></div>`
        const contentText = {"string1" : "", "string2" : "Editer le contenu : "}
        this.makeFieldEditableContent(editContent, inputContent, contentText, "ediContent", editContent.innerText, editContent.innerText)
    
        document.getElementById("deletediv").hidden = false;
    
    }

    dataEdit() {
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
    deleteArticleButton() {
        document.getElementById("deleteButton")
        .addEventListener("click", function(event) {
            const article = JSON.parse(localStorage.getItem("article"))
            const confirmation = confirm("voulez vous supprimer l'article ?")

                if(confirmation) {
                    console.log(`article`)
                    console.log(article)
                    const r = await this.model.deleteArticle(article)
                }
                return
        }.bind(this))
    }
    */

    deleteArticleButton() {
        document.getElementById("deleteButton")
        .addEventListener("click", async function(event) {
            const confirmation = confirm("voulez vous supprimer l'article ?")
            if(confirmation) {
                const article = JSON.parse(localStorage.getItem("article"))
                localStorage.removeItem('article');
                const r = await this.model.deleteArticle(article)
            }
        }.bind(this))
    }
}

window.articleController = new ArticleController()
