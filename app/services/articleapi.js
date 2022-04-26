class ArticleAPI extends BaseAPIService {
    constructor() {
        super("article")
    }

    getAllArticles() {
        //const sendToken = this.sendToken()
        this.headers.set('Content-Type', 'application/x-www-form-urlencoded');
        this.headers.set('Content-Type', 'application/json')
        this.headers.set('Access-Control-Allow-Origin', '*');

        return new Promise((resolve, reject) => {
            fetch(`${this.url}`, {
                method: 'GET',
                headers: this.headers    
            })
            .then(response => {resolve(response.json())})
            .catch(error => reject(error))
        })
    }

    getNumberArticles() {
        this.headers.set('Content-Type', 'application/x-www-form-urlencoded');
        this.headers.set('Content-Type', 'application/json')
        this.headers.set('Access-Control-Allow-Origin', '*');

        return new Promise((resolve, reject) => {
            fetch(`${this.url}/count`, {
                method: 'GET',
                headers: this.headers    
            })
            .then(response => {resolve(response.json())})
            .catch(error => reject(error))
        })
    }
}
