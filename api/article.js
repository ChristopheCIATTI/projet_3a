const { json } = require("body-parser")

module.exports = (app, svc, jwt) => {

    // Get all article
    app.get("/article", /*jwt.validateJWT,*/ async (req, res) => {
        try {
            const article = await svc.dao.getAllArticle()
            return res.json(article)
        }
        catch(e) {console.log(e)}
    })

    app.get("/article/last10publish/", async (req, res) => {
        try {
            const article = await svc.dao.get10LastArticle()
            return res.json(article)
        }
        catch(e) {console.log(e)}
    })

    app.get("/article/offset/:offset/", async (req, res) => {
        const offset = req.params.offset
        try {
            const article = await svc.dao.get5moreArticles(offset)
            return res.json(article)
        }
        catch(e) {console.log(e)}
    })

    // Get number of article
    app.get("/article/count", /*jwt.validateJWT,*/ async (req, res) => {
        try {
            const articleNumber = await svc.dao.getNumberArticles()
            console.log(articleNumber[0])
            //return res.json({articleNumber : articleNumber[0]})
            res.json(articleNumber[0])
            //res.json({ accessToken: accessToken, firstname: passwordCrypted[0].firstname });
        }
        catch(e) {console.log(e)}
    })

    // Get one of article by his id
    app.get("/article/id/:id", /*jwt.validateJWT,*/ async (req, res) => {
        const id = req.params.id
        try {
            const article = await svc.dao.getArticleById(id)
            return res.json(article)
        }
        catch(e) {console.log(e)}
    })

    // Get all articles by his author
    // Return 10 first article by last update date
    app.get("/article/author/:author", jwt.validateJWT, async (req, res) => {
        const author = req.params.author
        
        try {
            let id = await svc.userDao.getIdByEmail(author)
            id = id[0].id

            const article = await svc.dao.getArticleByAuthor(id)
            return res.json(article)
            //return res.status(200).end()
        }
        catch(e) {console.log(e)}
    
    })

    //fetch(`${this.url}/author/${sessionStorage.getItem("email")}/offset/${offset}`
    app.get("/article/author/:author/offset/:offset", jwt.validateJWT, async (req, res) => {
        const author = req.params.author
        const offset = req.params.offset

        try {
            let id = await svc.userDao.getIdByEmail(author)
            id = id[0].id

            const article = await svc.dao.getArticleByAuthor5More(id, offset)
            return res.json(article)
        }
        catch(e) {console.log(e)}
    })

    /*
    app.get("/article/authorId/:authorId", async (req, res) => {
        const authorId = req.params.authorId
        console.log(authorId)

        try {
            let author_id = await 
        }
    })
    */

    app.get("/article/author/:author/id/:id", /*jwt.validateJWT,*/ async (req, res) => {
        const id = req.params.id
        const author = req.params.author

        try {
            const article = await svc.dao.getArticleByAuthorAndId(author, id)
            return res.json(article)
        }
        catch(e) {console.log(e)}
    })

    // Get article by his title
    app.get("/article/title/:title", /*jwt.validateJWT,*/ async (req, res) => {
        const title = req.params.title

        try {
            const article = await svc.dao.getArticleByTitle(title)
            return res.json(article)
        }
        catch(e) {console.log(e)}
    })

    app.get("/article/author/:author/title/:title", /*jwt.validateJWT,*/ async (req, res) => {
        const title = req.params.title
        const author = req.params.author

        try {
            const article = await svc.dao.getArticleByTitleAndAuthor(title, author_id)
            return res.json(article)
        }
        catch(e) {console.log(e)}
    })

    app.get("/article/slug/:slug", /*jwt.validateJWT,*/ async (req, res) => {
        const slug = req.params.slug

        try {
//let id = await svc.userDao.getIdByEmail(author)

            const article = await svc.dao.getArticleBySlug(slug)
            console.log(article[0].author_id)

            const author_id = await svc.userDao.getAuthorNameByAuthorId(article[0].author_id)
           
            console.log([article, author_id])

            return res.json([article, author_id])
        }
        catch(e) {console.log(e)}
    })

    app.get("/article/author/:author/slug/:slug", /*jwt.validateJWT,*/ async (req, res) => {
        const slug = req.params.slug
        const author = req.params.author

        try {
            const article = await svc.dao.getArticleBySlugAndAuthor(slug, author_id)
            return res.json(article)
        }
        catch(e) {console.log(e)}
    })

    app.get("/article/published/:published", async (req, res) => {
        const _published = req.params.published
        const published = (_published == 'true' ? 1 : 0);
        console.log(published)

        //if (!(typeof published === 'boolean')) {throw "Invalid value passed to request";}

        try {
            const articles = await svc.dao.getAllArticle()
            for(let i in articles) {
                if(articles[i].published !== published) {
                    articles.splice(i, 1)
                }
            }

            console.log("after sort")
            console.log(articles)
            return res.json(articles)
        }
        catch(e) {console.log(e)}
    })

    // Add article
    app.post("/article/", jwt.validateJWT, async (req, res) => {

        const article = req.body

        if(!article) {
            return res.status(403).send("Invalid inputfiel; field cannot be empty");
        }

        for(let i in article) {
            console.log(article[i])
            if(article[i] == undefined || article[i] == null || article[i] == "" || article[i] == " ") {
                return res.status(403).send("Invalid inputfiel; field cannot be empty");
            }
        }

        try {
            const id  = await svc.userDao.getIdByEmail(article.email)
            const slugify = articleTitle =>
                articleTitle
                    .toLowerCase()
                    .trim()
                    .replace(/[^\w\s-]/g, '')
                    .replace(/[\s_-]+/g, '-')
                    .replace(/^-+|-+$/g, '');

            const slug = slugify(article.title)
            const created_at = new Date()
            const updated_at = new Date()

            /*
            console.log("author_id : " + id)
            console.log("title : " + article.title)
            console.log("meta_title : " + article.meta_title)
            console.log("slug : " + slug)
            console.log("summary : " + article.summary)
            console.log("content : " + article.content)
            console.log("publish : " + article.published)
            console.log("created_at : " + created_at)
            */

            let publish
            if(article.published === "publish") {
                publish = 1
            }
            else {
                publish = 0
            }

            const postArticle = {
                "author_id" : id[0].id,
                "title" : article.title,
                "meta_title" : article.meta_title,
                "slug" : slug,
                "summary" : article.summary,
                "published" : publish,
                "created_at" : created_at,
                "updated_at" : updated_at,
                "content" : article.content
            }
            
            console.log("console.log(article.content)")
            console.log(article.content)
            console.log("console.log(postArticle.content)")
            console.log(postArticle.content)

            console.log("console.log(postArticle)")
            console.log(postArticle)

            const r1 = await svc.dao.insertArticle(postArticle)

            if(publish) {
                let publish_at = new Date()
                await svc.dao.updatePublished_atBySlug(publish_at, slug)
            }
            return res.status(200).end()
        }
        catch(e) {console.log(e)}
    })

    app.put("/article/update/", jwt.validateJWT, async (req, res) => {
        const update = req.body

        try {
            const update = req.body
            console.log(update)
            console.log(update.field)
            console.log(update.slug)
            let field
            switch (update.field) {
                case "articleTitle": 
                    field = "title"
                    break;
            
                case "articleSumary":
                    field = "summary"
                    break;
                
                case "articlePublish":
                    field = "published"
                    break;
                
                case "articleContent":
                    field = "content"
                    break;
            }
            
            console.log(field)

            const updateField = svc.dao.updateField(update.value, field, update.slug)
            const dateUpdate = new Date()
            const updateDate = svc.dao.updateFieldUpdate_atBySlug(dateUpdate, update.slug)
            
        }
        catch(e) {console.log(e)}
    })

    app.delete("/article/", /*jwt.validateJWT,*/ async (req, res) => {
        try {
            await deleteAllArticle()
        }
        catch(e) {console.log(e)}
    })

    app.delete("/article/id/:id", /*jwt.validateJWT,*/ async (req, res) => {
        const id = req.params.id

        try {
            await deleteArticleById(id)
        }
        catch(e) {console.log(e)}
    })

    app.delete("/article/author/:author", /*jwt.validateJWT,*/ async (req, res) => {
        const author = req.params.author

        try {
            await deleteArticleByAuthor(author)
        }
        catch(e) {console.log(e)}
    })

    app.delete("/article/author/:author/id/:id", jwt.validateJWT, async (req, res) => {
        const id = req.params.id
        const author = req.params.author

        try {
            await svc.dao.deleteArticleByAuhorAndId(author, id)
        }
        catch(e) {console.log(e)}
    })

    app.delete("/article/slug/:slug", jwt.validateJWT, async (req, res) => {
        const slug = req.params.slug
        try {
            await svc.dao.deleteArticleBySlug(slug)
        }
        catch(e) {console.log(e)}
    })
}
