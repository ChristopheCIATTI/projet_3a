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
const fs = require("fs");
const jsdom = require("jsdom")
const { JSDOM } = jsdom;

const tools = require("./../app/tools.js")

chai.should()

const index = fs.readFileSync("./index.html")
const document = new JSDOM(index)
const indexControllerView = fs.readFileSync("./views/index.html")
//const indexController = require("./app/controllers/index.js")

//const indexController = eval("./../app/controllers/index.js")

//const ctrl = eval("/app/controllers/baseController.js")

//navigate("index")

// # Not working

//const document = new JSDOM(`<!doctype html><html><head></head><body></body></html>`);
//const document = new JSDOM(`${index}`);
//.jsdom("<!doctype html><html><head></head><body></body></html>");

let  window = document.window//= document.defaultView;
window.document = document;


const baseController = require("./../app/controllers/basecontroller.js").window
//window.baseController = baseController
//window.indexController = indexController

const ctrl = fs.readFileSync("./app/controllers/basecontroller.js")
const newctrl = new BaseController().window

//console.log(dom.window.document.getElementById("main").textContent);

//const indexcontroller = require("../app/controllers/index.js")
//window.baseController = require("../app/controllers/baseController.js")

//window.baseController = baseController

describe("index", () => {
    it("test", () => {
        //console.log("hello")
        //console.log(dom.window.document.getElementById("main").textContent);
        //console.log(baseController)
        //console.log(indexcontroller)
        //console.log("document")
        //console.log(window)
        //console.log(window.indexController)
        //console.log()      
        console.log(ctrl)
    })
})