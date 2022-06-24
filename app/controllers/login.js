// Manage user privige
class LoginController extends BaseController {
    constructor() {
        super(false)
        this.init()
        this.model = new Model()
        //let tokenStatus
        //tokenStatus = this.checkToken()  
        //this.ifLogged(tokenStatus)
    }
    
    init() {
        const content = document.getElementsByClassName("container")
        const h1 = document.getElementById("formTitle")
        const forgotPwd = document.getElementById("textforgotPwd")
        h1.textContent = "Se connecter"
    }

    async checkToken() {
        if(sessionStorage.getItem("token") && sessionStorage.getItem("token") != undefined) {
            const token = sessionStorage.getItem("token")
            let checkToken = await this.model.checkToken(token)
            console.log(checkToken)
            
            if(checkToken.status === 401) {
                this.logout()
                console("401 : logged again")
                //this.tokenStatus = false
                //console.log(this.tokenStatus)
                //return false
                return Promise.resolve(false);
            }

            if(checkToken.status === 200) {
                console.log("200 : logged")
                //this.tokenStatus = true
                //console.log(this.tokenStatus)
                //return true
                return Promise.resolve(true);
            }
            
        }

        if(!sessionStorage.getItem("token") || sessionStorage.getItem("token") == undefined) {
            //this.tokenStatus = false
            return false
        }
    }

    async login() {
        let userInfo
        if(sessionStorage.getItem("token") && sessionStorage.getItem("user")) {
            //user deja logged
            const token = sessionStorage.getItem("token")
        }

        const login = {
            email: $("#fieldLogin").value,
            password: $("#fieldPassword").value
        }

        if(login.email == null || login.email.length == 0) {
            this.toast("champ identifiant vide")
        }

        else if(login.password == null || login.password.length == 0) {
            this.toast("champ mot de passe vide")
        }

        else if((login.email.length != 0) && (login.password.length != 0)) {
            console.log(login.email)
            console.log(login.password)
            const response = await this.model.login(login)
            console.log("response")
            console.log(response)
            if(response == 403) {
                popUp.popUpError("Credentials invalides");
                console.log("response status = 403")
                return
                
            }

            if(response !== 403 /* == 200 || response == 304 || response == 204*/) {

                popUp.popUpValid("Vous êtes Connecté");
                userInfo = await this.model.getUserInfo(login.email)
                console.log(userInfo)
            }

            if(sessionStorage.getItem("token")) {
                // if the local storage already setted, go to index page
                navigate('index')
                
            }
            else {
                // set local storage
                console.log("else userinfo")
                console.log(userInfo)

                sessionStorage.setItem("token", response.accessToken)
                sessionStorage.setItem("user", response.firstname)

                sessionStorage.setItem("firstname", userInfo.firstname)
                sessionStorage.setItem("middleName", userInfo.middleName)
                sessionStorage.setItem("lastName", userInfo.lastName)
                sessionStorage.setItem("email", userInfo.email)
                sessionStorage.setItem("mobile", userInfo.mobile)
                sessionStorage.setItem("registeredAt", userInfo.registeredAt)
                sessionStorage.setItem("lastLogin", userInfo.lastLogin)

                // And go to home
                navigate('index')
            }
        }
    }

    /*
    logout() {
        sessionStorage.removeItem("token")
        sessionStorage.removeItem("user")
        this.restoreNavBar()
        navigate('login')
    }*/
}

window.loginController = new LoginController()
