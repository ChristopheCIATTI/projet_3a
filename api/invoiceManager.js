module.exports = (app, svc, jwt) => {

    app.get("/invoice/", jwt.validateJWT, async (req, res) => {
        const email = req.query["email"]
        try {
            let user_id = await svc.dao.getIdByEmail(email)
            user_id = user_id[0].id
            const invoice = await svc.dao.getInvoiceByUserId(user_id)
            return res.json(invoice)        
        }
        catch(e) {console.log(e)}
    })

    app.get("/invoice/:id", jwt.validateJWT, async (req, res) => {
        const id = req.params.id
        try {
            const invoice = await svc.dao.getInvoiceById(id)
            if(invoice === [] || invoice === undefined || invoice.length === 0) {
                return res.status(404).end()
            }
            return res.json(invoice)        
        }
        catch(e) {console.log(e)}
    })

    app.get("/invoice/row/:id", jwt.validateJWT, async (req, res) => {
        const id = req.params.id
        try {
            const invoice = await svc.dao.getInvoiceRowByInvoiceId(id)
            console.log(invoice)
            if(invoice === [] || invoice === undefined || invoice.length === 0) {
                return res.status(404).end()
            } 
            return res.json(invoice)        
        }
        catch(e) {console.log(e)}
    })

    app.get("/invoice/name/:id", jwt.validateJWT, async (req, res) => {
        const id = req.params.id
        try {
            const projectId = await svc.dao.getInvoiceByProjectId(id)
            console.log(projectId)
            console.log(projectId[0].project_id)
            const projectName = await svc.dao.getProjectNameByInvoiceId(id)
            console.log(projectName)
            return res.json(projectName)        
        }
        catch(e) {console.log(e)}
    })

    app.post("/invoice/", jwt.validateJWT, async (req, res) => {
        const email = req.query["email"]
        const facture = req.body
        try {
            let user_id = await svc.dao.getIdByEmail(email)
            let id = await svc.dao.getProjectIdByName(facture.project)
            if(id == [] || id == undefined || id.length == 0) {
                res.status(404).send()
            }
            id = id[0].id
            user_id = user_id[0].id 
            svc.dao.insertInvoice(facture, id, user_id)
        }
        catch(e) {console.log(e)}
    })

    app.post("/invoice/row/:id", jwt.validateJWT, async (req, res) => {
        const id = req.params.id
        const invoiceRow = req.body
        try {
            svc.dao.insertInvoiceRow(id, invoiceRow)
        }
        catch(e) {console.log(e)}
    })

    app.put("/invoice/:id", jwt.validateJWT, async (req, res) => {
        try {
            svc.dao.updateInvoice(req.body)
        }
        catch(e) {console.log(e)}
    })

    app.delete("/invoice/:id", jwt.validateJWT, async (req, res) => {
        const id = req.params.id
        try {
            await svc.dao.deleteInvoice(id)
        }
        catch(e) {console.log(e)}
    })

    app.delete("/invoice/row/:id", jwt.validateJWT, async (req, res) => {
        const id = req.params.id
        try {
            await svc.dao.deleteRow(id)
        }
        catch(e) {console.log(e)}
    })
}


