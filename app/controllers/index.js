import createArticle from "/templates/blockcreatearticle.html"

class IndexController extends BaseController {
    constructor() {
        super()
        this.model = new Model()
        
        this.checkToken()
        this.displayArticles()
    }

    checkToken() {
        console.log("checkToken")
        if(sessionStorage.getItem("token") && sessionStorage.getItem("token") != undefined) {
            const token = sessionStorage.getItem("token")
            const checkToken = await this.model.checkToken(token)
            console.log(checkToken)
        }
    }

    /*
html loader 
loadfooter = () => {

    fetch('./include/fr/footer.inc')
    .then ( (r) => {  return r.text();  } )
    .then ( (s) => {
            p= new DOMParser();
            d = p.parseFromString(s,'text/html') ;

            if ((f = d.body.querySelector('div')) !== null) {

              f.querySelector(`span[id="footer-org"]`)
              .append(document.createTextNode('SQLPAC'));

              document.querySelector('footer').append(f);
            }
    });
};
    */

    /*
    sayHello() {
        this.toast("bonjourToast")
    }
    */

    async displayArticles() {

        //articleNumber
        const displayArticleNumber = document.querySelector("#articleNumber")
        
        try {
            const articles = await this.model.getAllArticles()
            let articlesnumber = await this.model.getNumberArticles()
            articlesnumber = JSON.parse(JSON.stringify(articlesnumber)) 
            //console.log(obj.articleNumber)

            displayArticleNumber.innerHTML += articlesnumber.articleNumber
        }
        catch (e) {
            console.log(e)
            this.displayServiceError()
        }
    }
}

window.indexController = new IndexController()
