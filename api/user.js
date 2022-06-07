const bcrypt = require('bcrypt');
const jwtApi = require('jsonwebtoken')
const jwtKey = 'backnode'
const jwtExpirySeconds = 3600

module.exports = (app, svc, jwt) => {
    
    // Get All User
    app.get("/user"/*, jwt.validateJWT*/, async (req, res) => {
        try {
            const user = await svc.dao.getAllUser()
            return res.json(user)
        }
        catch(e) {console.log(e)}
    }) 

    // get user info by email
    app.get("/user/email/:email"/*, jwt.validateJWT*/, async (req, res) => {
        const email = req.params.email
        try {
            const user = await svc.dao.getUserByEmail(email)
            console.log({ firstname: user[0].firstname, middleName: user[0].middleName, lastName: user[0].lastName, email: user[0].email, mobile: user[0].mobile, registeredAt: user[0].registeredAt, lastLogin: user[0].lastLogin})
            return res.json({firstname: user[0].firstname, middleName: user[0].middleName, lastName: user[0].lastName, email: user[0].email, mobile: user[0].mobile, registeredAt: user[0].registeredAt, lastLogin: user[0].lastLogin});
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

    // Just check an user token if is always valid
    app.get("/user/checktoken", jwt.checkJWT, async (req, res) => {
        console.log("/user/checktoken")
    })

    // Create new Da
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

    // Login
    app.post("/user/login/", async(req, res) => {
        const email = req.body.email
        const password = req.body.password
        const lastLogin = new Date()

        try {
            if((email === undefined) || (password === undefined)) {
                return res.status(403).end()
            }

            // Check email
            const find_email = await svc.dao.getUserEmailByEmail(email)
            if(find_email == "" || find_email == undefined || find_email == null) {
                //res.json({ message: "Invalid Credentials" })
                return res.status(403).send("Invalid Credentials")
            }

            // Compare psswd
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
                await svc.dao.updateLastLogin(lastLogin, email)
                //res.json({ accessToken: accessToken, firstname: passwordCrypted[0].firstname });
                return res.status(200).json({ accessToken: accessToken, firstname: passwordCrypted[0].firstname });
                
            }
            else {
                //res.json({ message: "Invalid Credentials" })
                //return res.status(403).end()
                return res.status(403).send("Invalid Credentials")
            }
        }
        catch(e) {console.log(e)}
    })

    app.put("/user/email/:email", /*jwt.validateJWT,*/ async (req, res) => {
        //update
    })

    // Delete User
    app.delete("/user/email/:email", /*jwt.validateJWT,*/ async (req, res) => {
        const email = req.params.email
        try {
            svc.dao.deleteUserByEmail(email)
        }
        catch(e) {console.log(e)}
    })
}
