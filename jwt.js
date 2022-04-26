const jwt = require('jsonwebtoken')
const jwtKey = 'backnode'
const jwtExpirySeconds = 3600

module.exports = (userAccountService, userService) => {
    return {
        validateJWT(req, res, next) {

            if (req.headers.authorization === undefined) {
                res.status(401).end()
                return
            }

            //const token = req.headers.authorization.split(" ")[1];
            const token = req.headers.authorization
            //console.log(req.headers.authorization)

            jwt.verify(token, jwtKey, {algorithm: "HS256"}, async (err, user) => {
                if(err) {
                    res.status(401).end()
                    console.log(err)
                    return
                }
                try {
                    //req.user = await userAccountService.dao.getId(user.login)
                    req.user = await userService.dao.getIdByEmail(user.email)
                    return next()
                }
                catch (e) {
                    console.log(e)
                   res.status(401).end()
                }
            })
        },
        generateJWT(login) {
            return jwt.sign({login}, jwtKey, {
                algorithm: 'HS256',
                expiresIn: jwtExpirySeconds
            })
        }
    }
}
