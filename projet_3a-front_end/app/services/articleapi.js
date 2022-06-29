class ArticleAPI extends BaseAPIService {
    constructor() {
        super("article")
        //this.model = new Model()

        /*
        let tokenStatus
        tokenStatus = this.checkToken()  
        this.ifLogged(tokenStatus)
        */
    }

    getArticleBySlug(slug) {
        this.headers.set('Content-Type', 'application/x-www-form-urlencoded');
        this.headers.set('Content-Type', 'application/json')
        this.headers.set('Access-Control-Allow-Origin', '*');
        this.headers.set('Cache-Control', 'no-cache, no-store, must-revalidate')

        return new Promise((resolve, reject) => {
            fetch(`${this.url}/slug/${slug}`, {
                method: "GET",
                headers: this.headers
            })
            .then(response => {resolve(response.json())})
            .catch(error => reject(error))
        })
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

    getLast10ArticlesPublish() {
        this.headers.set('Content-Type', 'application/x-www-form-urlencoded');
        this.headers.set('Content-Type', 'application/json')
        this.headers.set('Access-Control-Allow-Origin', '*');

        return new Promise((resolve, reject) => {
            fetch(`${this.url}/last10publish/`, {
                method: 'GET',
                headers: this.headers    
            })
            .then(response => {resolve(response.json())})
            .catch(error => reject(error))
        })
    }

    get5moreArticles(offset) {
        this.headers.set('Content-Type', 'application/x-www-form-urlencoded');
        this.headers.set('Content-Type', 'application/json')
        this.headers.set('Access-Control-Allow-Origin', '*');

        return new Promise((resolve, reject) => {
            fetch(`${this.url}/offset/${offset}/`, {
                method: 'GET',
                headers: this.headers    
            })
            .then(response => {resolve(response.json())})
            .catch(error => reject(error))
        })
    }

    getAllArticlesPublished(bool) {
        this.headers.set('Content-Type', 'application/x-www-form-urlencoded');
        this.headers.set('Content-Type', 'application/json')
        this.headers.set('Access-Control-Allow-Origin', '*');

        return new Promise((resolve, reject) => {
            fetch(`${this.url}/published/${bool}`, {
                method: 'GET',
                headers: this.headers    
            })
            .then(response => {resolve(response.json())})
            .catch(error => reject(error))
        })
    }

    getAllUserArticle() { 
        const sendToken = this.sendToken()
        this.headers.set('Content-Type', 'application/x-www-form-urlencoded');
        this.headers.set('Content-Type', 'application/json')
        this.headers.set('Access-Control-Allow-Origin', '*');
        this.headers.set('Authorization', sendToken)

        return new Promise((resolve, reject) => {
            fetch(`${this.url}/author/${sessionStorage.getItem("email")}`, {
                method: "GET",
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

    getAllMyArticles() {
        const sendToken = this.sendToken()
        this.headers.set('Content-Type', 'application/x-www-form-urlencoded');
        this.headers.set('Content-Type', 'application/json')
        this.headers.set('Access-Control-Allow-Origin', '*');
        this.headers.set('Authorization', sendToken)
        
        return new Promise((resolve, reject) => {
            fetch(`${this.url}/author/${sessionStorage.getItem("email")}`, {
                method: 'GET',
                headers: this.headers    
            })
            .then(response => {resolve(response.json())})
            .catch(error => reject(error))
        })
    }

    get5moreMyArticles(offset) {
        const sendToken = this.sendToken()
        this.headers.set('Content-Type', 'application/x-www-form-urlencoded');
        this.headers.set('Content-Type', 'application/json')
        this.headers.set('Access-Control-Allow-Origin', '*');
        this.headers.set('Authorization', sendToken)

        return new Promise((resolve, reject) => {
            fetch(`${this.url}/author/${sessionStorage.getItem("email")}/offset/${offset}`, {
                method: 'GET',
                headers: this.headers    
            })
            .then(response => {resolve(response.json())})
            .catch(error => reject(error))
        })
    }

    insertArticle(article) {
        const sendToken = this.sendToken()
        this.headers.set('Content-Type', 'application/x-www-form-urlencoded');
        this.headers.set('Content-Type', 'application/json')
        this.headers.set('Access-Control-Allow-Origin', '*');
        this.headers.set('Authorization', sendToken)

        return new Promise((resolve, reject) => {
            fetch(`${this.url}`, {
                method: 'POST',
                headers: this.headers,
                body: JSON.stringify(article)
            })
        })
    }

    updateArticle(value) {
        const sendToken = this.sendToken()
        this.headers.set('Content-Type', 'application/x-www-form-urlencoded');
        this.headers.set('Content-Type', 'application/json')
        this.headers.set('Access-Control-Allow-Origin', '*');
        this.headers.set('Authorization', sendToken)

        return new Promise((resolve, reject) => {
            fetch(`${this.url}/update/`, {
                method: 'PUT',
                headers: this.headers,
                body: JSON.stringify(value)
            })
        })
    }

    deleteArticle(value) {
        const sendToken = this.sendToken()
        this.headers.set('Content-Type', 'application/x-www-form-urlencoded');
        this.headers.set('Content-Type', 'application/json')
        this.headers.set('Access-Control-Allow-Origin', '*');
        this.headers.set('Authorization', sendToken)

        return new Promise((resolve, reject) => {
            fetch(`${this.url}/author/${value.author_id}/id/${value.id}`, {
                method: 'DELETE',
                headers: this.headers,
                body: JSON.stringify(value)
            })
        })
    }
}