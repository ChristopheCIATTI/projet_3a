module.exports = (app, svc, jwt) => {

    app.get('/useraccount/:login', jwt.validateJWT, async (req, res) => {
        const login = req.params.login
        const getLogin = await svc.dao.getId(login)

        if(getLogin === undefined || getLogin === null) {
            res.status(404).end()
            return
        }
        return res.json(getLogin)
    })

    app.post('/useraccount/authenticate', (req, res) => {
        const {login, password} = req.body
        if ((login === undefined) || (password === undefined)) {
            res.status(400).end()
            return
        }

        svc.validatePassword(login, password)
            .then(autheticated => {
                if (!autheticated) {
                    res.status(401).end()
                    return
                }
                res.json({'token': jwt.generateJWT(login)}) 
            })
            .catch(e => {
                console.log(e)
                res.status(500).end()
            })
    })

    app.get('/useraccount', jwt.validateJWT, async (req, res) => {
        const login = req.params.login

        const user_id = req.user.id
        
        if(user_id) {
            return res.status(200).end()
        }
        else {
            return res.status(401).end()
        }
    })
}

