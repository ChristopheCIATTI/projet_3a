class Article {
    constructor(id, author_id, parent_id, title, meta_title, slug, summary,	published,
                created_at, updated_at, published_at, content) {
                    this.id = id
                    this.author_id = author_id
                    this.parent_id = parent_id
                    this.title = title
                    this.meta_title = meta_title
                    this.slug = slug
                    this.summary = summary 
                    this.published = published 	
                    this.created_at = created_at 	
                    this.updated_at = updated_at 	
                    this.published_at =published_at
                    this.content = content  
    }
}

class User {
    constructor(id, firstname, middleName, lastName, mobile, email, passwordHash, registeredAt, lastLogin) {
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