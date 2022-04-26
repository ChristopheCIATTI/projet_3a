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
            .then(response => {resolve(response.json())})
            .catch(error => reject(error))
        })
    }

    checkToken(token) {
        this.headers.set('Content-Type', 'application/x-www-form-urlencoded');
        this.headers.set('Content-Type', 'application/json')
        this.headers.set('Access-Control-Allow-Origin', '*');
        
        return new Promise((resolve, reject) => {
            fetch(`${this.url}/token/${token}`, {
                method: "GET",
                headers: this.headers,
            })
            .then(response => {resolve(response.json())})
            .catch(error => reject(error))
        })
    }
}
