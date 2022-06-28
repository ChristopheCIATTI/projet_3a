const assert = require('assert');
const mocha = require('mocha')
const chai = require('chai')
//const chaiHttp = require('chai-http');
const http = require("http")
//const express = require('express');
//const request = require('supertest');
//const server = require("./../main.js");
//const app = express();

//const bodyParser = require('body-parser');
const { expect } = require('chai');
//const { response } = require('express');

const jsdom = require("jsdom")
const { JSDOM } = jsdom;

chai.should()

const document = new JSDOM(`<!doctype html><html><head></head><body></body></html>`);
//.jsdom("<!doctype html><html><head></head><body></body></html>");

let  window = document.window//= document.defaultView;
window.document = document;

// require the module which you test
const popUp = require("../lib/popup.js");
const { popUpError, popUpValid } = require('../lib/popup.js');

popUp.init(window);

describe("popup", () => {
    it("popUp.js is a module ?", done=> {
        assert("object" === typeof popUp)
       done()
    })

    describe("Methods popUpDisplay", () => {
        it("Does popUpDisplay create popUp ?", () => {
            popUp.popUpDisplay("foo")
        })

        it("popUpDisplay is a function ?", () => {
            assert("function" === typeof popUp.popUpDisplay)
        })
    })

    describe("Methods popUpError", () => {
        it("Does popUpError create popUp ?", () => {
            popUp.popUpError("error")
        })

        it("popUpError is a function ?", () => {
            assert("function" === typeof popUpError)
        })
    })

    describe("Methods popUpValid", () => {
        it("Does popUpValid create popUp ?", () => {
            popUp.popUpValid("valid")
        })

        it("popUpValid is a function ?", () => {
            assert("function" === typeof popUpValid)
        })
    })
})
