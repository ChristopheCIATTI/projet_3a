// Manage user privige
class LoginController extends BaseController {
    constructor() {
        super(false)
        this.init()
        this.model = new Model()
        let tokenStatus
        tokenStatus = this.checkToken()  
        this.ifLogged(tokenStatus)
    }
    
    init() {
        const content = document.getElementsByClassName("container")
        const h1 = document.getElementById("formTitle")
        const forgotPwd = document.getElementById("textforgotPwd")
        //h1.textContent = "blabla"

        fetch("./app/text/user.json")
        .then(response => response.json())
        .then(response => console.log(response))
        .then(response => {
            h1.textContent = response.loginFormTitle
            //forgotPwd.textContent = response.forgotPwd ? response.forgotPwd : "Mot de passe oublié?" 
        })
        //.then(response => console.log(response.forgotPwd))
        //.then(response => h1.textContent = response.loginFormTitle)
        //.then(response => forgotPwd.textContent = response.forgotPwd)
    }
    /*
    ifLogged(tokenStatus) {
        tokenStatus.then(status => {
            if(status == false) {
                console.log(status)
                //this.logout()
                return false
            } 
            if(status == true) {
                //this.displayUserInfo()
                //navigate("profileUser")
                this.updateNavBar("navbarProfile", "Mon compte" , "useraccount")
                return true
            }
        })
    }*/
    
    
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

    // Display field : firstname, middlename, lastname, mobile, email, registeredat, lastlogin
    displayUserInfo() {
        let container = document.querySelector('.container').innerHTML = ""
            this.removeAllChildNodes(container);
            

            let h2 = document.createElement("h2")
            let div1 = document.createElement("div")
            let div2 = document.createElement("div")
            //let a1 = document.createElement("div")

            // var newContent = document.createTextNode('Hi there and greetings!');
            let tableName = document.createTextNode("Info utilisateur") 
            let userName = document.createTextNode(sessionStorage.getItem("user"))
            let logout = document.createTextNode("se deconencter")

            let firstname = document.createTextNode(sessionStorage.getItem("firstname"))
            let middleName = document.createTextNode(sessionStorage.getItem("middleName"))
            let lastName = document.createTextNode(sessionStorage.getItem("lastName"))
            let mobile = document.createTextNode(sessionStorage.getItem("mobile"))
            let registeredAt = document.createTextNode(sessionStorage.getItem("registeredAt"))
            let lastLogin = document.createTextNode(sessionStorage.getItem("lastLogin"))

            const storage = {...sessionStorage}

            for (const [key, value] of Object.entries(storage)) {
                console.log(`${key}: ${value}`);
                let textNodeKey = ""
                if(key == "token") {continue}
                if(key == "firstname") {textNodeKey = "Prenom"}
                if(key == "middleName") {textNodeKey = "Deuxieme prenom"}
                let tr = document.createElement("tr")
                let thKey = document.createElement("th")
                let thValue = document.createElement("th")

                let keyNode = document.createTextNode(textNodeKey)
                thKey.appendChild(keyNode)
                document.querySelector('.container').appendChild(tr);
                document.querySelector('.container').appendChild(thKey);

            }


            h2.appendChild(tableName)
            div1.appendChild(userName)
            div2.setAttribute("class", "waves-effect waves-light btn")
            div2.setAttribute("onclick", "loginController.logout()")
            div2.appendChild(logout)
            document.querySelector('.container').appendChild(h2);
            document.querySelector('.container').appendChild(div1);
            document.querySelector('.container').appendChild(div2);
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
            console.log(response)
            if(response == 403) {
                // Here call modal
                //openModal("invalidCredentials")     
                /*
                $(document).ready(function(){
                    $("#invalidCredentialsModal").modal('show');
                });
                */
                //loadHTML("invalidCredentials")
                console.log("response status = 403")
                return
                
            }

            if(response !== 200 || response == 304) {
                console.log("login ok")
                console.log("response, status = 200 304")
                userInfo = await this.model.getUserInfo(login.email)
                console.log(userInfo)
            }

            if(sessionStorage.getItem("token")) {
                // if the local storage already setted, go to index page
                navigate('index')
                return
            }
            else {
                // set local storage
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

    logout() {
        sessionStorage.removeItem("token")
        sessionStorage.removeItem("user")
        this.restoreNavBar()
        navigate('login')
    }
}

window.loginController = new LoginController()
