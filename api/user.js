const bcrypt = require('bcrypt');
const jwtApi = require('jsonwebtoken')
const jwtKey = 'backnode'
const jwtExpirySeconds = 3600

module.exports = (app, svc, jwt) => {
    
    app.get("/user"/*, jwt.validateJWT*/, async (req, res) => {
        try {
            const user = await svc.dao.getAllUser()
            return res.json(user)
        }
        catch(e) {console.log(e)}
    }) 

    app.get("/user/email/:email"/*, jwt.validateJWT*/, async (req, res) => {
        const email = req.params.email
        try {
            const user = await svc.dao.getUserByEmail(email)
            return res.json(email)
        }
        catch(e) {console.log(e)}
    })

    app.get("/user/id/:id"/*, jwt.validateJWT*/, async (req, res) => {
        const id = req.params.id
        try {
            const user = await svc.dao.getUserById(id)
            return res.json(user)
        }
        catch(e) {console.log(e)}
    })

    app.get("/user/checktoken/:token", /*jwt.validateJWT,*/ async (req, res) => {
        const token = req.params.token
        console.log("app.get checktoken")

        return true
    })

    app.post("/user/register/", async (req, res) => {
        const user = req.body

        try {
            user.passwordHash = await bcrypt.hash(user.password, 10);
            console.log(user.passwordHash)
            user.registeredAt = new Date()
            svc.dao.insertUser(user)
        }
        catch(e) {console.log(e)}
    })

    //lastLogin
    app.post("/user/login/", async(req, res) => {
        const email = req.body.email
        const password = req.body.password
        const lastLogin = new Date()

        try {
            if((email === undefined) || (password === undefined)) {
                return res.status(400).end()
            }
            const passwordCrypted = await svc.dao.getUserNamePasswordByEmail(email)
            console.log(passwordCrypted[0].passwordHash)
            const passwordIsOk = await bcrypt.compare(password, passwordCrypted[0].passwordHash)
            
            console.log("user : " + email)
            console.log("passwordIsOk : " + passwordIsOk)

            const accessToken = jwtApi.sign({email}, jwtKey, {
                algorithm: 'HS256',
                expiresIn: jwtExpirySeconds
            })

            if(passwordIsOk) {
                res.json({ accessToken: accessToken, firstname: passwordCrypted[0].firstname });
                const test = await svc.dao.updateLastLogin(lastLogin, email)
            }
            else {
                res.json({ message: "Invalid Credentials" })
            }
        }
        catch(e) {console.log(e)}
    })

    app.put("/user/email/:email", /*jwt.validateJWT,*/ async (req, res) => {
        //update
    })

    app.delete("/user/email/:email", /*jwt.validateJWT,*/ async (req, res) => {
        const email = req.params.email
        try {
            svc.dao.deleteUserByEmail(email)
        }
        catch(e) {console.log(e)}
    })
}

/**
 *   app.post("/customer/BtoC/", jwt.validateJWT, async (req, res) => {
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
 * 
 * 
 */

/*
module.exports = (app, svc, jwt) => {
	
    app.get("/user", jwt.validateJWT, async (req, res) => {
        try{
            const data = await svc.dao.getAll()
            if(data === undefined) {
                return res.status(404).end()
            }
            return res.json(data)
        }
        catch(e) {console.log(e)}
    })

    app.get("/user/data/:email", jwt.validateJWT, async (req, res) => {
        const email = req.params.email
        try {
            const data = await svc.dao.getByEmail(email)
            if(data === undefined) {
                return res.status(404).end()
            }
            return res.json(data)
        }
        catch(e) {console.log(e)}
    })

    app.post("/user/register", async (req, res) => {
        const {
            firstName, 
            lastName, 
            password,
            birthDate,
            emailAddress,
            postalAddress,
            phoneNumber,
            turnover,
            companyCharges} = req.body
        try {
            if(!(firstName && 
                lastName &&
                password &&
                birthDate &&
                emailAddress &&
                postalAddress &&
                phoneNumber &&
                turnover &&
                companyCharges)) {
                    res.status(400).send("All inputs should be filled");              
                }
            const isExist = await svc.dao.getByEmail(emailAddress)
            if(isExist.length >= 1) {
                return res.status(409).send("User already registered");
            }

            const hashedPassword = await bcrypt.hash(password, 10);
            svc.dao.insert({
                firstName, 
                lastName, 
                hashedPassword,
                birthDate,
                emailAddress,
                postalAddress,
                phoneNumber,
                turnover,
                companyCharges})

        }
        catch (e) {console.log(e)}
    })

    app.post("/user/authenticate", async(req, res) => {
        const email = req.body.emailAddress
        const password = req.body.password

        try {
            if((email === undefined) || (password === undefined)) {
                return res.status(400).end()
            }

            const user = await svc.dao.getByEmail(email)
            const passwordIsOk = await bcrypt.compare(password, user[0].password)

            const accessToken = jwtApi.sign({email}, jwtKey, {
                algorithm: 'HS256',
                expiresIn: jwtExpirySeconds
            })

            if(passwordIsOk) {
                res.json({ accessToken: accessToken });
            }
            else {
                res.json({ message: "Invalid Credentials" })
            }
        }
        catch(e) {console.log(e)}
    })

    app.put("/user/data/:email", jwt.validateJWT, async (req, res) => {
        const email = req.params.email
        const user = req.body
        let id = await svc.dao.getIdByEmail(email)
        id = id[0].id

        if(id === undefined || id.length === 0) {
            return res.status(404).end()
        }

        await svc.dao.update(user, id)
            .then(res.status(200).end())
            .catch(e => {
                console.log(e)
                res.status(500).end()
            })
           
    })
}
*/