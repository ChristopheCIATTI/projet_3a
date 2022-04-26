class RegisterController extends BaseController {
    constructor() {
        super(false)
        this.model = new Model()
    }

    createAccount() {
        const user = {
            "firstname" : $("#firstname").value,
            "lastName" : $("#lastName").value,
            "email" : $("#email").value,
            "password" : $("#password").value 
        }

        let required = 0;
        for (let item in user) {
            console.log(user[item])
            if(user[item] == null ||user[item].length == 0) {
                console.log("champ vide")
                required += 1
                //this.toast("champ vide") le toast ne fonctionne pas
            }
        }

        if(required === 0) {
            this.model.insertUser(user)
            navigate('index')
        }
       
    }
}

window.registerController = new RegisterController()
