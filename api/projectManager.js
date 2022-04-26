module.exports = (app, svc, jwt) => {

    app.get("/projectManager", jwt.validateJWT, async (req, res) => {
        const email = req.query["email"]
        try {
            let user_id = await svc.dao.getIdByEmail(email)
            user_id = user_id[0].id
            let project = await svc.dao.getAllProject(user_id)
            return res.json(project)
        }
        catch(e) {console.log(e)}
    })

    app.get("/projectManager/:id", jwt.validateJWT, async (req, res) => {
        const id = req.params.id
        try {
            const data = await svc.dao.getProjectById(id)
            if(data === undefined || data.length < 1) {return res.status(404).end()}
            return res.json(data)
        }
        catch(e) {console.log(e)}
    })
    app.get("/projectManager/name/:email", jwt.validateJWT, async (req, res) => {
        const email = req.params.email
        try {
            let user_id = await svc.dao.getIdByEmail(email)
            user_id = user_id[0].id
            let project = await svc.dao.getAllProject(user_id)
            console.log(project)
            return res.json(project)
        }
        catch(e) {console.log(e)}
    })

    app.get("/projectManager/project_id/:id", jwt.validateJWT, async (req, res) => {
        const id = req.params.id
        try {
            console.log(id)
            let project = await svc.dao.getProjectNameById(id)
            console.log(project[0])
            console.log(project)
            if(project === [] || project === undefined || project.length === 0) {
                return res.status(404).end()
            }
            return res.json(project[0].name)
        }
        catch(e) {console.log(e)}
    })

    app.get("/projectManager/client/:id", jwt.validateJWT, async (req, res) => {
        const id = req.params.id
        try {
            let project = await svc.dao.getCustomerById(id)
            console.log(project[0])
            console.log(project)
            if(project === [] || project === undefined || project.length === 0) {
                //return res.status(404).end()
                project = await svc.dao.getBusinessById(id)
            }
            return res.json(project)
        }
        catch(e) {console.log(e)}
    })

    app.post("/projectManager", jwt.validateJWT, async (req, res) => {
        const project = req.body
        try {

            let id = await svc.dao.getCustomerIdByName(project.client_name)
            if(id.length == 0 || id === undefined) {
                id = await svc.dao.getBusinessIdByName(project.client_name)
                
            }
            if(id.length == 0 || id === undefined) {
                res.status(500).end
            }

            id = id[0].id

            if(project.name === null|| project.client_name === null || project.prospect === null || project.user_id === null) {
                res.status(400).send("All inputs should be filled")
            }
            svc.dao.insertProject(req.body, id)
        }
        catch(e) {console.log(e)}
    })

    app.put("/projectManager", jwt.validateJWT, async (req, res) => {
        try {
            await svc.dao.updateProject(req.body)
        }
        catch(e) {console.log(e)}
    })

    app.delete("/projectManager/:id", jwt.validateJWT, async (req, res) => {
        const id = req.params.id
        try {
            await svc.dao.deleteProject(id)
        }
        catch(e) {console.log(e)}
    })
}
