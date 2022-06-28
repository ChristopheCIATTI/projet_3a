const serviceBaseUrl = "http://localhost:3333"

class BaseAPIService {
    constructor(url) {
        this.url = `${serviceBaseUrl}/${url}`
        this.token = sessionStorage.getItem("token")
        this.headers = new Headers()
        if (this.token !== undefined) {
            this.headers.append("Authorization", `Bearer ${this.token}`)
        }
    }

    setUserId(userId) {
        localStorage.setItem("userId", userId)
    }

    getUserId() {
        const userId = localStorage.getItem("userId")
        if(userId !== null) {
            return userId
        }
        else {
            return false
        }
    }

    sendToken() {
        //return "Bearer" + " " + this.token
        return this.token
    }
}