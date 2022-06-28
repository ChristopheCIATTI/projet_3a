class ForgotPassword extends BaseController {
    constructor() {
        super()
        this.model = new Model()
    }

    async resetPassword() {
        const resetPassword = {
            email: $("#fieldLogin").value,
            password: $("#fieldPassword").value
        }

        if(resetPassword.email == null || resetPassword.email.length == 0) {
            //this.toast("champ identifiant vide")
            popUp.popUpError("champ identifiant vide")
        }

        else if(resetPassword.password == null || resetPassword.password.length == 0) {
            //this.toast("champ mot de passe vide")
            popUp.popUpError("champ mot de passe vide")
        }

        await this.model.resetPassword(resetPassword)
    }

}

window.forgotPassord = new ForgotPassword()