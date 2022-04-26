const { json } = require("body-parser")

module.exports = (app, svc, jwt) => {

    app.get("/customer", jwt.validateJWT, async (req, res) => {
        const email = req.query["email"]
        try {

            let user_id = await svc.dao.getIdByEmail(email)
            user_id = user_id[0].id
            let customer = await svc.dao.getAllCustomer(user_id)
            customer = customer
            let business = await svc.dao.getAllBusiness(user_id)
            business = business
            const data = {"customer": customer, "business": business}
            return res.json(data)
        }
        catch(e) {console.log(e)}
    })

    app.get("/customer/name/", jwt.validateJWT, async (req, res) => {
        const email = req.query["email"]
        try {
            let user_id = await svc.dao.getIdByEmail(email)
            console.log(user_id[0].id)
            
            user_id = user_id[0].id
            let customer = await svc.dao.getNameCustomer(user_id)
            console.log(customer)

            let business = await svc.dao.getNameBusiness(user_id)
            console.log(business)

            const response = {}
            customer.map((item) => {
                response[item.name] = item.name
            })
            business.map((item) => {
                response[item.name] = item.name
            })
            return res.json(response)
        }
        catch(e) {console.log(e)}
    })

    app.post("/customer/BtoC/", jwt.validateJWT, async (req, res) => {
        const customer = req.body
        const {name, userEmail, email, adresse, numero} = req.body
        
        try {
            if(!(name && userEmail && email && adresse && numero)) {
                res.status(400).send("All inputs should be filled");
            }

            let id = await svc.dao.getIdByEmail(userEmail)
            id = id[0].id
            if(id == [] || id == undefined || id == null || id.length == 0) {
                res.status(500).send()
            }
            svc.dao.insertCustomer(customer, id)
        }
        catch(e) {console.log(e)}
    })
    
    app.post("/customer/BtoB/", jwt.validateJWT, async (req, res) => {
        const customer = req.body
        const {name, userEmail, email, adresse, numero} = req.body
        
        try {
            if(!(name && userEmail && email && adresse && numero)) {
                res.status(400).send("All inputs should be filled");
            }

            let id = await svc.dao.getIdByEmail(userEmail)
            id = id[0].id
            if(id == [] || id == undefined || id == null || id.length == 0) {
                res.status(500).send()
            }
            svc.dao.insertBusiness(customer, id)
        }
        catch(e) {console.log(e)}
    })

    app.get("/customer/BtoC/:id", jwt.validateJWT, async (req, res) => {
        const id = req.params.id
        try{
            const data = await svc.dao.getCustomerById(id)
            if(data === undefined || data.length < 1) {return res.status(404).end()}
            return res.json(data)
        }
        catch(e) {console.log(e)}
    })

    app.get("/customer/BtoB/:id", jwt.validateJWT, async (req, res) => {
        const id = req.params.id
        try{
            const data = await svc.dao.getBusinessById(id)
            if(data === undefined || data.length < 1) {return res.status(404).end()}
            return res.json(data)
        }
        catch(e) {console.log(e)}
    })

    app.get("/customer/project/:client_id", jwt.validateJWT, async (req, res) => {
        const id = req.params.client_id
        try {
            const data = await svc.dao.getClientFromProjectByClientId(id)
            if(data === undefined || data.length < 1) {return res.status(404).end()}
            return res.json(data)
        }
        catch(e) {console.log(e)}
    })

    app.put("/customer/BtoC/:id", jwt.validateJWT, async (req, res) => {
        const id = req.params.id
        if(id === undefined || id.length === 0) {
            return res.status(404).end()
        }

        await svc.dao.updateCustomer(req.body)
        .then(res.status(200).end())
        .catch(e => {
            console.log(e)
            res.status(500).end()
        })
    })

    app.put("/customer/BtoB/:id", jwt.validateJWT, async (req, res) => {
        const id = req.params.id
        if(id === undefined || id.length === 0) {
            return res.status(404).end()
        }

        await svc.dao.updateBusiness(req.body)
        .then(res.status(200).end())
        .catch(e => {
            console.log(e)
            res.status(500).end()
        })
    })

    app.delete("/customer/BtoC/:id", jwt.validateJWT, async (req, res) => {
        const id = req.params.id
        if(id === undefined || id.length === 0) {
            return res.status(404).end()
        }
        
        await svc.dao.deleteCustomer(id)
        .then(res.status(200).end())
        .catch(e => {
            console.log(e)
            res.status(500).end()
        })
    })

    app.delete("/customer/BtoB/:id", jwt.validateJWT, async (req, res) => {
        const id = req.params.id

        if(id === undefined || id.length === 0) {
            return res.status(404).end()
        }
        
        await svc.dao.deleteBusiness(id)
        .then(res.status(200).end())
        .catch(e => {
            console.log(e)
            res.status(500).end()
        })
    })

    app.get("/customer/search/", jwt.validateJWT, async (req, res) => {
        const query = req.query.query
        const user_id = req.query.user_id

        try {
            const customer = await svc.dao.searchCustomer(query, user_id)
            //if(customer === undefined) {return res.status(404).end()}
            const business = await svc.dao.searchBusiness(query, user_id)
            const data = {"customer": customer, "business": business}
            return res.json(data)
        }
        catch(e) {console.log(e)}
    })
}
