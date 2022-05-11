class UserAccountControler extends BaseController {
    constructor() {
        super(false)
        this.displayUserInfo()
    }

    displayUserInfo() {
        const storage = {...sessionStorage}
        console.log(storage)

        $("#cellUser").innerHTML = storage.user
        $("#cellFirstName").innerHTML = storage.firstname
        $("#cellMiddleName").innerHTML = (storage.middleName !== "null" && storage.middleName !== undefined) ? storage.middleName : "" 
        $("#cellLastName").innerHTML = storage.lastName
        $("#cellEmail").innerHTML = storage.email
        $("#cellMobile").innerHTML = (storage.mobile !== "null" && storage.mobile !== undefined) ? storage.mobile : ""
        $("#cellRegisteredAt").innerHTML = this.jsonDateToString(storage.registeredAt)
        $("#cellLastLogin").innerHTML = this.jsonDateToString(storage.lastLogin)
    }
}

window.userAccountController = new UserAccountControler()
