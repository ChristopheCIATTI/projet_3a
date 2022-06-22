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
//chai.use(require('chai-json-schema'));

let token
describe('POST', () => {
    it('/user/register/', done => {
        chai.request(ROOT_URL)
        .post("/user/register/")
        .set({"Content-Type" : "application/json", "Access-Control-Allow-Origin":"*"})
        .send({"firstname":"userTest4", "lastName":"userTest4", "email":"userTest4@test.test", "password":"user4"})
        .end(function(error, response, body) {
            if (err) done(err);
            expect(res.status).to.equal(200);
        })
        done()
    })

    it('/user/login | Wrong user', done => {
        chai.request(ROOT_URL)
        .post("/user/login")
        .set({"Content-Type" : "application/json", "Access-Control-Allow-Origin":"*"})
        .send({"email":"false","password":"false"})
        .end(function(error, response, body) {
            expect(response).to.have.status(403)
            if (error) {done(error);} else {done()}
        })
    })

    it('/user/login | Valid user', done => {
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

describe('GET', () => {
    it('/user/checktoken | InValid token', done => {
        //token header
        chai.request(ROOT_URL)
        .get("/user/checktoken/")
        .set({"Content-Type" : "application/json", "Access-Control-Allow-Origin":"*", "Authorization":"bad"})
        .end(function(error, response, body) {
            expect(response).to.have.status(401)
            if (error) {done(error);} else {done()}
        })  
    })

    it('/user/checktoken | Valid token', done => {
        //token header
        chai.request(ROOT_URL)
        .get("/user/checktoken/")
        .set({"Content-Type" : "application/json", "Access-Control-Allow-Origin":"*", "Authorization":token})
        .end(function(error, response, body) {
            expect(response).to.have.status(200)
            if (error) {done(error);} else {done()}
        })  
    })

    it('/user | Get all user', done  => {
        chai.request(ROOT_URL)
        .get("/user")
        .set({"Content-Type" : "application/json", "Access-Control-Allow-Origin":"*"})
        .end(function(error, response, body) {
            expect(response).to.have.status(200)
            jsonResponse = response.body
            expect(response).to.be.json
            expect(jsonResponse.length).to.be.greaterThan(3)
            jsonResponse = jsonResponse[0]
            expect(jsonResponse).to.have.property("id")
            expect(jsonResponse).to.have.property("firstname")
            expect(jsonResponse).to.have.property("middleName")
            expect(jsonResponse).to.have.property("lastName")
            expect(jsonResponse).to.have.property("mobile")
            expect(jsonResponse).to.have.property("email")
            expect(jsonResponse).to.have.property("passwordHash")
            expect(jsonResponse).to.have.property("registeredAt")
            expect(jsonResponse).to.have.property("lastLogin")
            if (error) {done(error);} else {done()}
        })  
    })

    it('/user/email/:email', (done) => {
        chai.request(ROOT_URL)
        .get("/user/email/userTest4@test.test")
        .set({"Content-Type" : "application/json", "Access-Control-Allow-Origin":"*"})
        .end(function(error, response, body) {
            jsonResponse = response.body
            expect(response).to.have.status(200)
            expect(response).to.be.json
            expect(jsonResponse).to.have.property("firstname")
            expect(jsonResponse).to.have.property("middleName")
            expect(jsonResponse).to.have.property("lastName")
            expect(jsonResponse).to.have.property("email")
            expect(jsonResponse).to.have.property("mobile")
            expect(jsonResponse).to.have.property("registeredAt")
            expect(jsonResponse).to.have.property("lastLogin")
            assert.equal(jsonResponse.firstname, "userTest4")
            assert.equal(jsonResponse.middleName, null)
            assert.equal(jsonResponse.lastName, "userTest4")
            assert.equal(jsonResponse.email, "userTest4@test.test")
            assert.equal(jsonResponse.mobile, null)
            if (error) {done(error);} else {done()}
        })
    })

    it('/user/id:id', done => {
        chai.request(ROOT_URL)
        .get("/user/id/1")
        .set({"Content-Type" : "application/json", "Access-Control-Allow-Origin":"*"})
        .end(function(error, response, body) {
            expect(response).to.have.status(200)
            if (error) {done(error);} else {done()}
        })
    })
})

describe('DELETE', () => {
    it('/user/email/:email', done => {
        chai.request(ROOT_URL)
        .delete("/user/email/userTest4@test.test")
        .set({"Content-Type" : "application/json", "Access-Control-Allow-Origin":"*"})
        .end(function(error, response, body) {
            if (err) done(err);
            expect(res.status).to.equal(200);
        })
        done()
    })
})
