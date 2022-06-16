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

        /*
        let tokenStatus
        tokenStatus = this.checkToken()  
        //this.ifLogged(tokenStatus)
        console.log(tokenStatus)
        */
        
        this.article = this.getArticle()
        Promise.all([this.article])
            .then((value) => {
                this.displayArticle(); 
                this.editInput(); 
                /*this.edit()*/})

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
        $("#articlePublishDate").innerHTML += this.jsonDateToString(article.published_at)
        $("#articleArticleUpdateDate").innerHTML = (article.updated_at != null || article.updated_at != "undefined") ? `Article mis à jour le : ${this.jsonDateToString(article.updated_at)}` : "" 
        $("#articlePublish").innerHTML += article.published == 1 ? "Article publié" : "Article pas publié" 
        $("#articleContent").innerHTML = article.content
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
        const author = JSON.parse(localStorage.getItem("author"))
        const firstname = sessionStorage.getItem("firstname")
            
        if(firstname !== author.firstname) {
            console.log(`firstname : ${firstname}, author.firstname : ${author.firstname}`)
            return}

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

        const editContent = document.getElementById("articleContent")
        //const inputContent = `<input id="ediContent" value=${editContent.innerText} type="textarea" class="validate" required autofocus="true"></input>`
        const inputContent = `<div contenteditable id="ediContent" class="validate" required autofocus="true"></div>`
        const contentText = {"string1" : "", "string2" : "Editer le contenu : "}
        this.makeFieldEditable(editContent, inputContent, contentText, "ediContent", editContent.innerText, editContent.innerText)
    }
}

window.articleController = new ArticleController()
