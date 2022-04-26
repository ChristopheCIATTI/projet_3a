module.exports = class projectManager {
    constructor(
        id,
        name,
        client_id, 
        status) {
        this.id = id
        this.name = name
        this.client_id = client_id
        this.status = status
    }
}
