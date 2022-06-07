const jwt = require('jsonwebtoken')
const jwtKey = 'backnode'
const jwtExpirySeconds = 3600

module.exports = (userService, articleService) => {
    return {
        validateJWT(req, res, next) {
            const httpStatus200 = 200
            const httpStatus401 = 401

            const tokenVerified = {
                httpStatus: null,
                verifiedMessage: null
            }


            console.log("validateJWT")

            if (req.headers.authorization === undefined) {
                res.status(401).end()
                return
            }

            //const token = req.headers.authorization.split(" ")[1];
            const token = req.headers.authorization
            //console.log(req.headers.authorization)
            /*
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
            })*/
            try {
                tokenVerified.verifiedMessage = jwt.verify(token, jwtKey);
                console.log(tokenVerified.verifiedMessage)
                tokenVerified.httpStatus = httpStatus200
                //return res.status(httpStatus200).end()
                //return res.json(tokenVerified)
                //next();
                res.status(200)
                next();
                //continue
            }
            catch(e) {
                console.log(e)
                return res.status(httpStatus401).end()
            }
        },

        checkJWT(req, res, next) {
            const httpStatus200 = 200
            const httpStatus401 = 401

            const tokenVerified = {
                httpStatus: null,
                verifiedMessage: null
            }


            console.log("checkJWT")

            if (req.headers.authorization === undefined) {
                res.status(401).end()
                return
            }

            //const token = req.headers.authorization.split(" ")[1];
            const token = req.headers.authorization
            //console.log(req.headers.authorization)
            /*
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
            })*/
            try {
                tokenVerified.verifiedMessage = jwt.verify(token, jwtKey);
                console.log(tokenVerified.verifiedMessage)
                tokenVerified.httpStatus = httpStatus200
                return res.status(httpStatus200).end()
                //return res.json(tokenVerified)
                //next();
                //res.status(200).end()
            }
            catch(e) {
                console.log(e)
                return res.status(httpStatus401).end()
            }
        },

        generateJWT(login) {
            return jwt.sign({login}, jwtKey, {
                algorithm: 'HS256',
                expiresIn: jwtExpirySeconds
            })
        }
    }
}
