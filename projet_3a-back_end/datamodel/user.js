module.exports = class List {
    constructor(
        id, 
        firstname, 
        middleName,
        lastName,
        mobile,
        email,
        passwordHash,
        registeredAt,
        lastLogin
        ) {
        this.id = id
        this.firstname = firstname
        this.middleName = middleName
        this.lastName = lastName
        this.mobile = mobile
        this.email = email
        this.passwordHash = passwordHash
        this.registeredAt = registeredAt
        this.lastLogin = lastLogin
    }
}
