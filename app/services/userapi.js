class UserAPI extends BaseAPIService {
    constructor() {
        super("user")
    }

    insertUser(user) {
        this.headers.set('Content-Type', 'application/x-www-form-urlencoded');
        this.headers.set('Content-Type', 'application/json')
        this.headers.set('Access-Control-Allow-Origin', '*');
        
        return new Promise((resolve, reject) => {
            fetch(`${this.url}/register`, {
                method: "POST",
                headers: this.headers,
                body: JSON.stringify(user)
            })
        })
    }

    login(user) {
        this.headers.set('Content-Type', 'application/x-www-form-urlencoded');
        this.headers.set('Content-Type', 'application/json')
        this.headers.set('Access-Control-Allow-Origin', '*');
        
        return new Promise((resolve, reject) => {
            fetch(`${this.url}/login`, {
                method: "POST",
                headers: this.headers,
                body: JSON.stringify(user)
            })
            .then(function(response) {
                if (response.ok/*response.status == 200*/) {
                    resolve(response.json())
                }  
                if (response.status == 403) {
                    resolve(403)
                }
            })
            //.then(response => {resolve(response.json())})
            //.then(response => {resolve(response.status)})
            .catch(error => reject(error))
        })
    }

    checkToken(token) {
        const sendToken = this.sendToken()
        this.headers.set('Content-Type', 'application/x-www-form-urlencoded');
        this.headers.set('Content-Type', 'application/json')
        this.headers.set('Access-Control-Allow-Origin', '*');
        this.headers.set('Authorization', sendToken)

        return new Promise((resolve, reject) => {
            fetch(`${this.url}/checktoken/`, {
                method: "GET",
                headers: this.headers,
            })
            //.then(response => console.log("response api : " + response))
            .then(response => resolve(response))
            .catch(error => reject(error))
        })
    }

    getUserInfo(email) {
        const sendToken = this.sendToken()
        this.headers.set('Content-Type', 'application/x-www-form-urlencoded');
        this.headers.set('Content-Type', 'application/json')
        this.headers.set('Access-Control-Allow-Origin', '*');
        this.headers.set('Authorization', sendToken)

        return new Promise((resolve, reject) => {
            fetch(`${this.url}/email/${email}`, {
                method: "GET",
                headers: this.headers,
            })
            //.then(response => console.log(response))
            .then(response => {resolve(response.json())})
            .catch(error => reject(error))
        })
    }

    getAuthorNameById(authorId) {
        this.headers.set('Content-Type', 'application/x-www-form-urlencoded');
        this.headers.set('Content-Type', 'application/json')
        this.headers.set('Access-Control-Allow-Origin', '*');
        this.headers.set('Cache-Control', 'no-cache, no-store, must-revalidate')

        return new Promise((resolve, reject) => {
            console.log(`${this.url}/authorId/${authorId}`)
            fetch(`${this.url}/authorId/${authorId}`, {
                method: "GET",
                headers: this.headers
            })
            .then(response => {resolve(response.json())})
            .catch(error => reject(error))
        })
    }
}
