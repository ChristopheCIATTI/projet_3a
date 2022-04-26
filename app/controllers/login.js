class LoginController extends BaseFormController {
    constructor() {
        super(false)
        this.model = new Model()
        this.ifLogged()
        //this.checkToken()
    }

    saysHello() {
        let p = document.createElement("p")
        let textnode = document.createTextNode("hello world checked");

        p.appendChild(textnode)
        document.appendChild(p)
        console.log("Hello world!")
    }

    ifLogged() {
        if(sessionStorage.getItem("token")) {
            let container = document.querySelector('.container').innerHTML = ""
            //this.removeAllChildNodes(container);

            let div1 = document.createElement("div")
            let div2 = document.createElement("div")
            let a1 = document.createElement("div")

            // var newContent = document.createTextNode('Hi there and greetings!');
            let userName = document.createTextNode(sessionStorage.getItem("user"))
            let logout = document.createTextNode("se deconencter")
            div1.appendChild(userName)
            div2.setAttribute("class", "waves-effect waves-light btn")
            div2.setAttribute("onclick", "loginController.logout()")
            div2.appendChild(logout)
            document.querySelector('.container').appendChild(div1);
            document.querySelector('.container').appendChild(div2);
            logged = true
            
        }
        logged = false
    }

    async checkToken() {
        console.log("checkToken")
        const checkToken = await this.model.checkToken(token)
        console.log(checkToken)
    }

    async login() {
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
            if(sessionStorage.getItem("token")) {
                navigate('index')
                return
            }
            else {
                sessionStorage.setItem("token", response.accessToken)
                sessionStorage.setItem("user", response.firstname)
            }
        }
    }

    logout() {
        sessionStorage.removeItem("token")
        sessionStorage.removeItem("user")
        navigate('login')
    }
}

window.loginController = new LoginController()
