class ArticleController extends BaseFormController {
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
        $("#articlePublish").innerHTML += article.published == 1 ? "Article publié" : "Article pas publié" 

        $("#article-date").innerHTML = article.published_at
        $("#article-update").innerHTML = article.updated_at
        $("#articleContent").innerHTML = article.content
    }

    /*
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
            const articleTitle = document.getElementById("articleTitle")

            const inputTitle = `<input id="articleTitle" placeholder="Titre de l'article" type="text" class="validate" required></input>`

            //articleTitle.replaceWith(inputTitle)
            articleTitle.innerHTML = inputTitle
        }, false)
    }*/

     /*
    edit(value, field) {
        console.log(value)
        console.log(field)

        /*
        aFunctionWithCallback(this.id, function(data) {
  console.log(this);
}.bind(this));
        


        update(async function update(this, value, field) {
            console.log(value)
            console.log(field)
            //const valueToUpdate = document.getElementById("articleTitle").innerText
            const fieldUpdated = {
                "value" : value,
                "field" : field
            }
            const edit = await this.model.updateArticle(fieldUpdated)
        }.bind(this))

        update();
    }*/

    makeFieldEditable(elem, _input, objtext, id) {
        this.lastInputEdited = elem.id
        const input = _input
        elem.addEventListener("click", function() {
            elem.innerHTML = objtext.string1 + elem.innerText + "<br />" + objtext.string2
            elem.insertAdjacentHTML('beforeend', input)
            document.getElementById("validateEdit").removeAttribute("hidden");
        }, {once : true})

        elem.addEventListener("keydown", async function(event) {
            if(event.key === "Escape" || event.key === "Enter") {
                if(!$("#"+id+"").value || $("#"+id+"").value === "") {
                    //call popup
                    console.log("input vide")
                    return
                }
                elem.innerHTML = $("#"+id+"").value
                const fieldUpdated = {
                    "value" : elem.innerHTML,
                    "field" : elem.id,
                    "slug" : this.articleSlug
                }
                const edit = await this.model.updateArticle(fieldUpdated)
            }
        }.bind(this), false)
    }

    makeFieldEditableRadio(elem, _input, id) {
        this.lastInputEdited = elem.id
        console.log("id radio : " + this.lastInputEdited)
        const input = _input
        elem.addEventListener("click", function() {
            //elem.innerHTML = objtext.string1 + elem.innerText + "<br />" + objtext.string2
            elem.insertAdjacentHTML('beforeend', input)
            document.getElementById("validateEdit").removeAttribute("hidden");
        }, {once : true})

        elem.addEventListener("keydown", function(event) {
            let  radios = document.getElementsByName('articleStatus');
            console.log(radios)
            if(event.key === "Escape" || event.key === "Enter") {
                /*if(!$("#"+id+"").value || $("#"+id+"").value === "") {
                    //call popup
                    console.log("input vide")
                    return
                }*/
                for(let i=0, length=radios.length; i<length; i++) {
                    if(radios[i].checked) {
                        console.log(radios[i] + " : is checked")
                        console.log(radios[i])
                        const updateValue =  radios[i].value
                        console.log(updateValue)
                        elem.innerHTML = "statut publication: " + radios[i].value
                    }
                }

                //elem.innerHTML = $("#"+id+"").value
            }
        }, false)
    }

    editInput() {
        const author = JSON.parse(localStorage.getItem("author"))
        const firstname = sessionStorage.getItem("firstname")

        if(firstname === author.firstname) {
            console.log("author ok")
            $("#editArticle").innerHTML += "<button>Edit</button>"
            $("#removeArticle").innerHTML += "<button>Supprimer</button>"
        }
        else {return}

        const editTitle = document.getElementById("articleTitle")
        const inputTitle = `<input id="editTitle" value=${editTitle.innerText} type="text" class="validate" required autofocus="true"></input>`
        const titleText = {"string1" : "Titre original : ", "string2" : "Editer Titre : "}
        this.makeFieldEditable(editTitle, inputTitle, titleText, "editTitle")

        const editSumary = document.getElementById("articleSumary")
        const inputSummary = `<input id="ediSumary" value=${editSumary.innerText} type="text" class="validate" required autofocus="true"></input>`
        const summaryText = {"string1" : "article sommaire : ", "string2" : "Editer sommaire : "}
        this.makeFieldEditable(editSumary, inputSummary, summaryText, "ediSumary")

        //this.makeFieldEditable(editTitle, inputTitle, titleText, "editTitle")
        const editStatus = document.getElementById("articlePublish")
        const inputStatus = `<fieldset>
        <legend id ="editPublish">Changer le status de publication</legend>
        <form>
          <input type="radio" id="id1" name="articleStatus" value="Non publié">
          <label for="id1">Non publié</label>
          <input type="radio" id="id2" name="articleStatus" value="publié">
          <label for="id2">Publié</label>
        </form>
        `
        this.makeFieldEditableRadio(editStatus, inputStatus, "editPublish")

        const editContent = document.getElementById("articleContent")
        const inputContent = `<input id="ediContent" value=${editContent.innerText} type="textarea" class="validate" required autofocus="true"></input>`
        const contentText = {"string1" : "", "string2" : "Editer le conetnue : "}
        this.makeFieldEditable(editContent, inputContent, contentText, "ediContent")
      
        
        /*
        editTitle.addEventListener("click", function() {
            editTitle.innerHTML = "Titre original : " + editTitle.innerText + "<br />" + "Editer Titre : "
            editTitle.insertAdjacentHTML('beforeend', inputTitle)
            document.getElementById("validateEdit").removeAttribute("hidden");
        }, {once : true})

        editTitle.addEventListener("keydown", function(event) {
            if(event.key === "Escape" || event.key === "Enter") {
                editTitle.innerHTML = $("#editTitle").value
            }
        }, false)*/
        
    }
        
        //var self = this;
        /*
        console.log("edit function called")
        console.log("field to update : " + this.lastInputEdited)
        document.getElementById("validateEdit").
        addEventListener("click", async function(e) {
            console.log("edit function called")
            console.log("field to update : " + this.lastInputEdited)
            const valueToUpdate = document.getElementById("articleTitle").innerText
            const fieldUpdated = {
                "fieldUpdated" : valueToUpdate
            }
            const edit = await this.model.updateArticle(fieldUpdated)

        }.bind(this), false);*/
    
    
        /*

        this.r = function() {
              //document.getElementById("validateEdit").
            document.getElementById("validateEdit")
            .addEventListener("click", async function(e) {
                this.handle_click(e)
            
                //edit
                $("#editTitle").value
                const edit = await this.model.updateArticle($("#editTitle").value)
    
            }.bind(this), false)
        }

        console.log(this.r)
        this.r();
        */
        /*
        addEventListener("click", async function() {
            
            
            //edit
            $("#editTitle").value
            const edit = await this.model.updateArticle($("#editTitle").value)

        })
        */
}

window.articleController = new ArticleController()
