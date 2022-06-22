const assert = require('assert');
const mocha = require('mocha')
const chai = require('chai')
const chaiHttp = require('chai-http');
const http = require("http")
const express = require('express');
const request = require('supertest');
const server = require("./../main.js");
const app = express();

const bodyParser = require('body-parser');
const { expect } = require('chai');
const { response } = require('express');


chai.should()
chai.use(chaiHttp)

const ROOT_URL = "http://localhost:3333"

// Content article
const content = '<h1>Est facilis sapiente qui possimus sunt. </h1><p>Lorem ipsum dolor sit amet. \
Aut quas accusamus aut maxime asperiores qui explicabo commodi id quia voluptas. \
Ut accusamus corporis qui asperiores suscipit aut cumque nihil  ipsum quos quo totam \
sapiente ut delectus vero est eaque quae. Eos rerum fugit eum velit quae non illo aliquam \
est expedita voluptatibus et minima mollitia ut rerum aperiam ut natus nihil. Qui quisquam \
placeat hic vero amet eum quasi porro et harum tempora est quasi molestias ex repudiandae quia.\
Est sint quaerat <em>Sit quia quo autem consectetur</em>. Non ipsum eligendi ut minima obcaecati \
<strong>Ab aliquam aut illum totam</strong>. Ut molestias aliquam sit minima voluptate ut \
perspiciatis perspiciatis non consequatur quos qui nobis omnis aut iusto iste sit consectetur \
error. Ea officia repellat in mollitia vitae est vero dolore et saepe doloribus in enim debitis et\
aperiam corporis qui nobis aliquid. Aut architecto facere id ducimus delectus aut asperiores \
deleniti est corporis fugit qui sapiente cumque ut consequuntur voluptatem est possimus alias. \
</p><ol><li>Ut mollitia iste non assumenda blanditiis sed omnis tempore sit galisum ducimus. \
</li><li>Eos harum quia et consectetur accusantium quo quibusdam omnis id nobis libero. \
</li><li>Sit nesciunt dignissimos ut voluptates molestiae est autem reprehenderit sed harum voluptatem. \
</li><li>Aut saepe libero ut magni adipisci. </li><li>Et earum soluta quo asperiores porro ut architecto omnis. \
</li></ol><blockquote cite="https://www.loremipzum.com">Sit molestiae aperiam et blanditiis totam et earum omnis\
eum magnam velit a voluptas dolores non mollitia quibusdam? </blockquote><h2>Est dolores deserunt qui \
facilis aspernatur. </h2><p>Vel consequatur minus sed expedita odit33 dicta et repellat iure 33 voluptatem maxime.'

//const content_expected = ``

let token

// TC for have a token
describe('POST', () => {
    it('/user/login | Get Token', done => {
        chai.request(ROOT_URL)
        .post("/user/login")
        .set({"Content-Type" : "application/json", "Access-Control-Allow-Origin":"*"})
        .send({"email":"userTest1@test.test","password":"user1"})
        .end(function(error, response, body) {
            expect(response).to.have.status(200)
            expect(response).to.be.json

            jsonResponse = response.body

            assert.equal(jsonResponse.firstname, "userTest1")
            expect(jsonResponse).to.have.property("firstname")
            expect(jsonResponse).to.have.property("accessToken")
            token = jsonResponse.accessToken
            if (error) {done(error);} else {done()}
        })
       
    })
})

// Post new article
describe('POST', () => {
    it("/article/", done => {
        chai.request(ROOT_URL)
        .post("/article")
        .set({"Content-Type":"application/json", 
              "Access-Control-Allow-Origin":"*",
              "Authorization":token})
        .send({
            "title" : "Titre Article 4 - Test",
            "meta_title" : "Meta Titre Article 4 - Test",
            "summary" : "Summary Article 4 Test",
            "content" : content,
            "published" : "publish",
            "email" : "userTest1@test.test"
        })
        .end(function(error, response, body) {
            if (error) done(error);
            expect(response.status).to.equal(200);
        })
        done()

        // post new article
    })
})

describe('POST', () => {
    it("/article/", done => {
        chai.request(ROOT_URL)
        .post("/article")
        .set({"Content-Type":"application/json", 
              "Access-Control-Allow-Origin":"*",
              "Authorization":token})
        .send({
            "title" : "Titre Article 5 - Test",
            "meta_title" : "Meta Titre Article 5 - Test",
            "summary" : "Summary Article 5 Test",
            "content" : content,
            "published" : "publish",
            "email" : "userTest1@test.test"
        })
        .end(function(error, response, body) {
            if (error) done(error);
            expect(response.status).to.equal(200);
        })
        done()

        // post new article
    })
})

describe('POST', () => {
    it("/article/", done => {
        chai.request(ROOT_URL)
        .post("/article")
        .set({"Content-Type":"application/json", 
              "Access-Control-Allow-Origin":"*",
              "Authorization":token})
        .send({
            "title" : "Titre Article 6 - Test",
            "meta_title" : "Meta Titre Article 6 - Test",
            "summary" : "Summary Article 6 Test",
            "content" : content,
            "published" : "publish",
            "email" : "userTest1@test.test"
        })
        .end(function(error, response, body) {
            if (error) done(error);
            expect(response.status).to.equal(200);
        })
        done()

        // post new article
    })
})

describe('POST', () => {
    it("/article/", done => {
        chai.request(ROOT_URL)
        .post("/article")
        .set({"Content-Type":"application/json", 
              "Access-Control-Allow-Origin":"*",
              "Authorization":token})
        .send({
            "title" : "Titre Article 7 - Test",
            "meta_title" : "Meta Titre Article 7 - Test",
            "summary" : "Summary Article 7 Test",
            "content" : content,
            "published" : "publish",
            "email" : "userTest1@test.test"
        })
        .end(function(error, response, body) {
            if (error) done(error);
            expect(response.status).to.equal(200);
        })
        done()

        // post new article
    })
})
describe('POST', () => {
    it("/article/", done => {
        chai.request(ROOT_URL)
        .post("/article")
        .set({"Content-Type":"application/json", 
              "Access-Control-Allow-Origin":"*",
              "Authorization":token})
        .send({
            "title" : "Titre Article 8 - Test",
            "meta_title" : "Meta Titre Article 8 - Test",
            "summary" : "Summary Article 8 Test",
            "content" : content,
            "published" : "publish",
            "email" : "userTest1@test.test"
        })
        .end(function(error, response, body) {
            if (error) done(error);
            expect(response.status).to.equal(200);
        })
        done()

        // post new article
    })
})
describe('POST', () => {
    it("/article/", done => {
        chai.request(ROOT_URL)
        .post("/article")
        .set({"Content-Type":"application/json", 
              "Access-Control-Allow-Origin":"*",
              "Authorization":token})
        .send({
            "title" : "Titre Article 9 - Test",
            "meta_title" : "Meta Titre Article 9 - Test",
            "summary" : "Summary Article 9 Test",
            "content" : content,
            "published" : "publish",
            "email" : "userTest1@test.test"
        })
        .end(function(error, response, body) {
            if (error) done(error);
            expect(response.status).to.equal(200);
        })
        done()

        // post new article
    })
})
describe('POST', () => {
    it("/article/", done => {
        chai.request(ROOT_URL)
        .post("/article")
        .set({"Content-Type":"application/json", 
              "Access-Control-Allow-Origin":"*",
              "Authorization":token})
        .send({
            "title" : "Titre Article 10 - Test",
            "meta_title" : "Meta Titre Article 10 - Test",
            "summary" : "Summary Article 10 Test",
            "content" : content,
            "published" : "publish",
            "email" : "userTest1@test.test"
        })
        .end(function(error, response, body) {
            if (error) done(error);
            expect(response.status).to.equal(200);
        })
        done()

        // post new article
    })
})

describe('POST', () => {
    it("/article/", done => {
        chai.request(ROOT_URL)
        .post("/article")
        .set({"Content-Type":"application/json", 
              "Access-Control-Allow-Origin":"*",
              "Authorization":token})
        .send({
            "title" : "Titre Article 11 - Test",
            "meta_title" : "Meta Titre Article 11 - Test",
            "summary" : "Summary Article 11 Test",
            "content" : content,
            "published" : "publish",
            "email" : "userTest1@test.test"
        })
        .end(function(error, response, body) {
            if (error) done(error);
            expect(response.status).to.equal(200);
        })
        done()

        // post new article
    })
})

describe('POST', () => {
    it("/article/", done => {
        chai.request(ROOT_URL)
        .post("/article")
        .set({"Content-Type":"application/json", 
              "Access-Control-Allow-Origin":"*",
              "Authorization":token})
        .send({
            "title" : "Titre Article 12 - Test",
            "meta_title" : "Meta Titre Article 12 - Test",
            "summary" : "Summary Article 12 Test",
            "content" : content,
            "published" : "publish",
            "email" : "userTest1@test.test"
        })
        .end(function(error, response, body) {
            if (error) done(error);
            expect(response.status).to.equal(200);
        })
        done()

        // post new article
    })
})

describe('POST', () => {
    it("/article/", done => {
        chai.request(ROOT_URL)
        .post("/article")
        .set({"Content-Type":"application/json", 
              "Access-Control-Allow-Origin":"*",
              "Authorization":token})
        .send({
            "title" : "Titre Article 13 - Test",
            "meta_title" : "Meta Titre Article 13 - Test",
            "summary" : "Summary Article 4 Test",
            "content" : content,
            "published" : "publish",
            "email" : "userTest1@test.test"
        })
        .end(function(error, response, body) {
            if (error) done(error);
            expect(response.status).to.equal(200);
        })
        done()

        // post new article
    })
})

// Get
describe('GET', () => {
    
    it("/article | Get all articles", done => {
        chai.request(ROOT_URL)
        .get("/article")
        .set({"Content-Type" : "application/json", "Access-Control-Allow-Origin":"*"})
        .end(function(error, response, body) {
            expect(response.status).to.equal(200);
            expect(response).to.be.json
            jsonResponse = response.body
            //expect(jsonResponse.length).to.be.greaterThan(3)
            jsonResponse = jsonResponse[0]
            //expect(jsonResponse).to.have.property("id").to.not.be.null
            console.log(jsonResponse)
            
            expect(jsonResponse).to.have.property("author_id").to.not.be.null
            expect(jsonResponse).to.have.property("parent_id")
            expect(jsonResponse).to.have.property("title").to.not.be.null
            expect(jsonResponse).to.have.property("meta_title").to.not.be.null
            expect(jsonResponse).to.have.property("slug").to.not.be.null
            expect(jsonResponse).to.have.property("summary").to.not.be.null
            expect(jsonResponse).to.have.property("published").to.not.be.null
            expect(jsonResponse).to.have.property("created_at").to.not.be.null
            expect(jsonResponse).to.have.property("updated_at").to.not.be.null
            expect(jsonResponse).to.have.property("published_at").to.not.be.null
            expect(jsonResponse).to.have.property("content").to.not.be.null
            assert.equal(jsonResponse.parent_id, null)
            assert.equal(jsonResponse.title, "Titre Artic")
            assert.equal(jsonResponse.meta_title, "Meta Titre Article 1 - Test")
            assert.equal(jsonResponse.slug, "titre-article-1-test")
            assert.equal(jsonResponse.summary, "Summary Article 1 Test")
            assert.equal(jsonResponse.published, 1)
            //assert.equal(jsonResponse.content, content_expected)
            if (error) {done(error);} else {done()}
        })
        
    })
    
    it("/article/last10publish/", done => {
        chai.request(ROOT_URL)
        .get("/article/last10publish")
        .set({"Content-Type" : "application/json", "Access-Control-Allow-Origin":"*"})
        .end(function(error, response, body) {
            expect(response.status).to.equal(200);
            jsonResponse = response.body
            expect(jsonResponse.length).to.be.eql(10)
            jsonResponse = jsonResponse[0]
            expect(jsonResponse).to.have.property("id").to.not.be.null
            expect(jsonResponse).to.have.property("author_id").to.not.be.null
            expect(jsonResponse).to.have.property("parent_id")
            expect(jsonResponse).to.have.property("title").to.not.be.null
            expect(jsonResponse).to.have.property("meta_title").to.not.be.null
            expect(jsonResponse).to.have.property("slug").to.not.be.null
            expect(jsonResponse).to.have.property("summary").to.not.be.null
            expect(jsonResponse).to.have.property("published").to.not.be.null
            expect(jsonResponse).to.have.property("created_at").to.not.be.null
            expect(jsonResponse).to.have.property("updated_at").to.not.be.null
            expect(jsonResponse).to.have.property("published_at").to.not.be.null
            expect(jsonResponse).to.have.property("content").to.not.be.null
            if (error) {done(error);} else {done()}
        })
    })

    ///article/offset/:offset/
    it("/article/offset/:offset/", done => {
        // get article offset one of two
        chai.request(ROOT_URL)
        .get("/article/offset/10/")
        .set({"Content-Type" : "application/json", "Access-Control-Allow-Origin":"*"})
        .end(function(error, response, body) {
            expect(response.status).to.equal(200);
            jsonResponse = response.body
            expect(jsonResponse.length).to.be.greaterThan(0)
            jsonResponse = jsonResponse[0]
            expect(jsonResponse).to.have.property("id").to.not.be.null
            expect(jsonResponse).to.have.property("author_id").to.not.be.null
            expect(jsonResponse).to.have.property("parent_id")
            expect(jsonResponse).to.have.property("title").to.not.be.null
            expect(jsonResponse).to.have.property("meta_title").to.not.be.null
            expect(jsonResponse).to.have.property("slug").to.not.be.null
            expect(jsonResponse).to.have.property("summary").to.not.be.null
            expect(jsonResponse).to.have.property("published").to.not.be.null
            expect(jsonResponse).to.have.property("created_at").to.not.be.null
            expect(jsonResponse).to.have.property("updated_at").to.not.be.null
            expect(jsonResponse).to.have.property("published_at").to.not.be.null
            expect(jsonResponse).to.have.property("content").to.not.be.null
            if (error) {done(error);} else {done()}
        })
    })

    it("/article/count", done => {
        // get article offset one of two
        chai.request(ROOT_URL)
        .get("/article/count/")
        .set({"Content-Type" : "application/json", "Access-Control-Allow-Origin":"*"})
        .end(function(error, response, body) {
            expect(response.status).to.equal(200);
            jsonResponse = response.body
            assert.equal(jsonResponse.articleNumber, 13)
            if (error) {done(error);} else {done()}
        })
    })

    it("/article/author/:author", done => {
        chai.request(ROOT_URL)
        .get("/article/author/userTest1@test.test")
        .set({"Content-Type":"application/json", 
              "Access-Control-Allow-Origin":"*",
              "Authorization":token})
        .end(function(error, response, body) {
            expect(response.status).to.equal(200);
            jsonResponse = response.body
            assert.equal(jsonResponse.length, 10)
            jsonResponse = jsonResponse[0]
            expect(jsonResponse).to.have.property("id").to.not.be.null
            expect(jsonResponse).to.have.property("author_id").to.not.be.null
            expect(jsonResponse).to.have.property("parent_id")
            expect(jsonResponse).to.have.property("title").to.not.be.null
            expect(jsonResponse).to.have.property("meta_title").to.not.be.null
            expect(jsonResponse).to.have.property("slug").to.not.be.null
            expect(jsonResponse).to.have.property("summary").to.not.be.null
            expect(jsonResponse).to.have.property("published").to.not.be.null
            expect(jsonResponse).to.have.property("created_at").to.not.be.null
            expect(jsonResponse).to.have.property("updated_at").to.not.be.null
            expect(jsonResponse).to.have.property("published_at").to.not.be.null
            expect(jsonResponse).to.have.property("content").to.not.be.null
            if (error) {done(error);} else {done()}
        })
    })
    
    
    it("/article/author/:author/offset/:offset", done => {
        chai.request(ROOT_URL)
        .get("/article/author/userTest1@test.test/offset/10")
        .set({"Content-Type":"application/json", 
              "Access-Control-Allow-Origin":"*",
              "Authorization":token})
        .end(function(error, response, body) {
            //expect(response.status).to.equal(200);
            console.log(response.body)

            if (error) {done(error);} else {done()}
        })
    })
    
    /*
    it("/article/title/:title", done => {
        chai.request(ROOT_URL)
        .get("/article/title/")
        .set({"Content-Type" : "application/json", "Access-Control-Allow-Origin":"*"})
        .end(function(error, response, body) {

        })
    })
    */

    it("/article/slug/:slug", done => {
        chai.request(ROOT_URL)
        .get("/article/slug/titre-article-13-test")
        .set({"Content-Type" : "application/json", "Access-Control-Allow-Origin":"*"})
        .end(function(error, response, body) {
            expect(response.status).to.equal(200);
            jsonResponse = response.body
            assert.equal(jsonResponse.length, 2)
            jsonResponse = jsonResponse[0]
            expect(jsonResponse[0]).to.have.property("id").to.not.be.null
            expect(jsonResponse[0]).to.have.property("author_id").to.not.be.null
            expect(jsonResponse[0]).to.have.property("parent_id")
            expect(jsonResponse[0]).to.have.property("title").to.not.be.null
            expect(jsonResponse[0]).to.have.property("meta_title").to.not.be.null
            expect(jsonResponse[0]).to.have.property("slug").to.not.be.null
            expect(jsonResponse[0]).to.have.property("summary").to.not.be.null
            expect(jsonResponse[0]).to.have.property("published").to.not.be.null
            expect(jsonResponse[0]).to.have.property("created_at").to.not.be.null
            expect(jsonResponse[0]).to.have.property("updated_at").to.not.be.null
            expect(jsonResponse[0]).to.have.property("published_at").to.not.be.null
            expect(jsonResponse[0]).to.have.property("content").to.not.be.null
            if (error) {done(error);} else {done()}
        })
    })

    it("/article/published/:published", done => {
        chai.request(ROOT_URL)
        .get("/article/published/true")
        .set({"Content-Type" : "application/json", "Access-Control-Allow-Origin":"*"})
        .end(function(error, response,body) {
            expect(response.status).to.equal(200);
            jsonResponse = response.body
            jsonResponse = jsonResponse[0]
            expect(jsonResponse).to.have.property("id").to.not.be.null
            expect(jsonResponse).to.have.property("author_id").to.not.be.null
            expect(jsonResponse).to.have.property("parent_id")
            expect(jsonResponse).to.have.property("title").to.not.be.null
            expect(jsonResponse).to.have.property("meta_title").to.not.be.null
            expect(jsonResponse).to.have.property("slug").to.not.be.null
            expect(jsonResponse).to.have.property("summary").to.not.be.null
            expect(jsonResponse).to.have.property("published").to.not.be.null
            expect(jsonResponse).to.have.property("created_at").to.not.be.null
            expect(jsonResponse).to.have.property("updated_at").to.not.be.null
            expect(jsonResponse).to.have.property("published_at").to.not.be.null
            expect(jsonResponse).to.have.property("content").to.not.be.null
            if (error) {done(error);} else {done()}
        })
    })

    it("/article/published/:published", done => {
        chai.request(ROOT_URL)
        .get("/article/published/false")
        .set({"Content-Type" : "application/json", "Access-Control-Allow-Origin":"*"})
        .end(function(error, response,body) {
            expect(response.status).to.equal(200);
            jsonResponse = response.body
            jsonResponse = jsonResponse[0]
            expect(jsonResponse).to.have.property("id").to.not.be.null
            expect(jsonResponse).to.have.property("author_id").to.not.be.null
            expect(jsonResponse).to.have.property("parent_id")
            expect(jsonResponse).to.have.property("title").to.not.be.null
            expect(jsonResponse).to.have.property("meta_title").to.not.be.null
            expect(jsonResponse).to.have.property("slug").to.not.be.null
            expect(jsonResponse).to.have.property("summary").to.not.be.null
            expect(jsonResponse).to.have.property("published").to.not.be.null
            expect(jsonResponse).to.have.property("created_at").to.not.be.null
            expect(jsonResponse).to.have.property("updated_at").to.not.be.null
            expect(jsonResponse).to.have.property("published_at").to.not.be.null
            expect(jsonResponse).to.have.property("content").to.not.be.null
            if (error) {done(error);} else {done()}
        })
    })
})

/*
 const fieldUpdated = {
                    "value" : elem.innerHTML,
                    "field" : elem.id,
                    "slug" : this.articleSlug
                }
*/

describe('PUT', () => {
    /*
    it("/article/update/", done => {
        chai.request(ROOT_URL)
        .put("/article/update/")
        .set({"Content-Type":"application/json", 
        "Access-Control-Allow-Origin":"*",
        "Authorization":token})
        .send({"value" : "Titre Article Updated", "field" : "articleTitle", "slug" : "titre-article-4-test"})
        .end(function(error, response, body) {
            expect(response.status).to.equal(200);
            if (err) done(err);
        })
        done()
    })
    */

    it("/article/update/", done => {
        chai.request(ROOT_URL)
        .put("/article/update/")
        .set({"Content-Type":"application/json", 
        "Access-Control-Allow-Origin":"*",
        "Authorization":token})
        .send({"value" : "Meta Titre Article 4 - Updated", "field" : "articleTitle", "slug" : "titre-article-4-test"})
        .end(function(error, response, body) {
            expect(response.status).to.equal(200);
            if (err) done(err);
        })
        done()
    })

    it("/article/update/", done => {
        chai.request(ROOT_URL)
        .put("/article/update/")
        .set({"Content-Type":"application/json", 
        "Access-Control-Allow-Origin":"*",
        "Authorization":token})
        .send({"value" : "Summary Article 4 Updated", "field" : "articleSumary", "slug" : "titre-article-4-test"})
        .end(function(error, response, body) {
            expect(response.status).to.equal(200);
            if (err) done(err);
        })
        done()
    })

    it("/article/update/", done => {
        chai.request(ROOT_URL)
        .put("/article/update/")
        .set({"Content-Type":"application/json", 
        "Access-Control-Allow-Origin":"*",
        "Authorization":token})
        .send({"value" : 0, "field" : "articlePublish", "slug" : "titre-article-4-test"})
        .end(function(error, response, body) {
            expect(response.status).to.equal(200);
            if (err) done(err);
        })
        done()
    })

    it("/article/update/", done => {
        chai.request(ROOT_URL)
        .put("/article/update/")
        .set({"Content-Type":"application/json", 
        "Access-Control-Allow-Origin":"*",
        "Authorization":token})
        .send({"value" : "content updated", "field" : "articleContent", "slug" : "titre-article-4-test"})
        .end(function(error, response, body) {
            expect(response.status).to.equal(200);
            if (err) done(err);
        })
        done()
    })
})

describe('DELETE', () => {

    it("/article/slug/:slug", done => {
        chai.request(ROOT_URL)
        .delete("/article/slug/titre-article-4-test")
        .set({"Content-Type":"application/json", 
        "Access-Control-Allow-Origin":"*",
        "Authorization":token})
        .end(function(error, response, body) {
            expect(response.status).to.equal(200);
            if (err) done(err);
        })
        done()
    })

    it("/article/slug/:slug", done => {
        chai.request(ROOT_URL)
        .delete("/article/slug/titre-article-5-test")
        .set({"Content-Type":"application/json", 
        "Access-Control-Allow-Origin":"*",
        "Authorization":token})
        .end(function(error, response, body) {
            expect(response.status).to.equal(200);
            if (err) done(err);
        })
        done()
    })

    it("/article/slug/:slug", done => {
        chai.request(ROOT_URL)
        .delete("/article/slug/titre-article-6-test")
        .set({"Content-Type":"application/json", 
        "Access-Control-Allow-Origin":"*",
        "Authorization":token})
        .end(function(error, response, body) {
            expect(response.status).to.equal(200);
            if (err) done(err);
        })
        done()
    })

    it("/article/slug/:slug", done => {
        chai.request(ROOT_URL)
        .delete("/article/slug/titre-article-7-test")
        .set({"Content-Type":"application/json", 
        "Access-Control-Allow-Origin":"*",
        "Authorization":token})
        .end(function(error, response, body) {
            expect(response.status).to.equal(200);
            if (err) done(err);
        })
        done()
    })

    it("/article/slug/:slug", done => {
        chai.request(ROOT_URL)
        .delete("/article/slug/titre-article-8-test")
        .set({"Content-Type":"application/json", 
        "Access-Control-Allow-Origin":"*",
        "Authorization":token})
        .end(function(error, response, body) {
            expect(response.status).to.equal(200);
            if (err) done(err);
        })
        done()
    })

    it("/article/slug/:slug", done => {
        chai.request(ROOT_URL)
        .delete("/article/slug/titre-article-9-test")
        .set({"Content-Type":"application/json", 
        "Access-Control-Allow-Origin":"*",
        "Authorization":token})
        .end(function(error, response, body) {
            expect(response.status).to.equal(200);
            if (err) done(err);
        })
        done()
    })

    it("/article/slug/:slug", done => {
        chai.request(ROOT_URL)
        .delete("/article/slug/titre-article-10-test")
        .set({"Content-Type":"application/json", 
        "Access-Control-Allow-Origin":"*",
        "Authorization":token})
        .end(function(error, response, body) {
            expect(response.status).to.equal(200);
            if (err) done(err);
        })
        done()
    })

    it("/article/slug/:slug", done => {
        chai.request(ROOT_URL)
        .delete("/article/slug/titre-article-11-test")
        .set({"Content-Type":"application/json", 
        "Access-Control-Allow-Origin":"*",
        "Authorization":token})
        .end(function(error, response, body) {
            expect(response.status).to.equal(200);
            if (err) done(err);
        })
        done()
    })

    it("/article/slug/:slug", done => {
        chai.request(ROOT_URL)
        .delete("/article/slug/titre-article-12-test")
        .set({"Content-Type":"application/json", 
        "Access-Control-Allow-Origin":"*",
        "Authorization":token})
        .end(function(error, response, body) {
            expect(response.status).to.equal(200);
            if (err) done(err);
        })
        done()
    })

    it("/article/slug/:slug", done => {
        chai.request(ROOT_URL)
        .delete("/article/slug/titre-article-13-test")
        .set({"Content-Type":"application/json", 
        "Access-Control-Allow-Origin":"*",
        "Authorization":token})
        .end(function(error, response, body) {
            expect(response.status).to.equal(200);
            if (err) done(err);
        })
        done()
    })
    
    // Untestable
    /*
    it("/article/id/:id/", done => {
        
    })
    */

    /*
    it("/article/author/:author", done => {
         chai.request(ROOT_URL)
         .delete("/article/author")
    })
    */

    /*
    it("/article/", done => {
        // pas tester car va tout peter
    })
    */
})
