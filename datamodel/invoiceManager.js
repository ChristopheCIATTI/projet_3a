module.exports = class projectManager {
    constructor(
        id,
        project_id,
        status,
        edit_date,
        limit_pay,
        effective_pay,
        notes 
        ) {
        this.id = id
        this.project_id = project_id
        this.status = status
        this.edit_date = edit_date
        this.limit_pay = limit_pay
        this.effective_pay = effective_pay
        this.notes = notes
    }
}
