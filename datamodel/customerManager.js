module.exports = class customerManager {
    constructor(
        id, 
        user_id, 
        name,
        email,
        phone_number,
        postal_address) {
        this.id = id
        this.user_id = user_id
        this.name = name
        this.email = email
        this.postal_address = postal_address
        this.phone_number = phone_number
    }
}
