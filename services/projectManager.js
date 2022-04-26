const bcrypt = require('bcrypt')
const ProjectManagerDAO = require('../datamodel/projectManagerDao')
const ProjectManager = require('../datamodel/projectManager')

module.exports = class ProjectManagerService {
    constructor(db) {
        this.dao = new ProjectManagerDAO(db)
    }
}
