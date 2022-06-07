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

    // Get article by his author
    app.get("/article/author/:author", /*jwt.validateJWT,*/ async (req, res) => {
        const author = req.params.author
        try {
            const article = await svc.dao.getArticleByAuthor(author)
            return res.json(article)
        }
        catch(e) {console.log(e)}
    })

    // WTF ???!
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
            const article = await svc.dao.getArticleBySlug(slug)
            return res.json(article)
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


    app.get("/test/test", jwt.validateJWT, async (req, res) => {

        const article = req.body

        await svc.dao.insertArticle()

        console.log("hgdgdfhhgfgh")

        return res.json("c'est ok")
        /*
        const article = req.body
        console.log(req)
        //console.log("post new article")
        //console.log(article)
        console.log("post ok")
        */
    })


    app.get("/test", async (req, res) => {
        console.log(svc)

        return
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

            const postArticle = {
                "author_id" : id,
                "title" : article.title,
                "meta_title" : article.meta_title,
                "slug" : slug,
                "summary" : article.summary,
                "published" : article.published,
                "created_at" : created_at,
                "content" : article.content
            }
            
            await svc.dao.insertArticle(postArticle)
            return res.status(200).end()
        }
        catch(e) {console.log(e)}
    })

    app.put("/article/:id", /*jwt.validateJWT,*/ async (req, res) => {
        const id = req.params.id
        const article = req.body

        console.log("update article")
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

    app.delete("/article/author/:author/id/:id", /*jwt.validateJWT,*/ async (req, res) => {
        const id = req.params.id
        const author = req.params.author

        try {
            await deleteArticleByAuhorAndId(author, id)
        }
        catch(e) {console.log(e)}
    })
}
