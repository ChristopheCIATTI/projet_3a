/*module.exports = class tools {

    $(selector, f) {
        if (f == undefined)
            return document.querySelector(selector)
        else 
            document.querySelectorAll(selector).forEach(f)
    }

    navigate(view) {
        include('content',  `views/${view}.html`, `app/controllers/${view}.js`)
    }
}*/
/*
export default function navigate(view) {
    include('content',  `views/${view}.html`, `app/controllers/${view}.js`)
}
*/

function $(selector, f) {
    if (f == undefined)
        return document.querySelector(selector)
    else 
        document.querySelectorAll(selector).forEach(f)
}

function fetchJSON(url, token) {
    const headers = new Headers();
    if (token !== undefined) {
        headers.append("Authorization", `Bearer ${token}`)
    }
    return new Promise((resolve, reject) => fetch(url, {cache: "no-cache", headers: headers})
        .then(res => {
            if (res.status === 200) {
                resolve(res.json())
            } else {
                reject(res.status)
            }
        })
        .catch(err => reject(err)))
}

function include(selector, url, urlcontroller) {
    fetch(url, {cache: "no-cache"})
        .then(res => res.text())
        .then(html => {
            $(`#${selector}`).innerHTML = html
            fetch (urlcontroller, {cache: "no-cache"})
                .then(res => res.text())
                .then(js => {
                    eval(js)
                })
        })
        .catch(function(err) {
            console.log('Failed to fetch page: ', err)
        });
}

function navigate(view) {
    include('content',  `views/${view}.html`, `app/controllers/${view}.js`)
}

/*
function openModal(modal, controllers) {
    include('content',  `modals/${modal}.html`, `app/controllers/${controllers}.js`)
}
*/

function loadHTML(htmlContent){
    console.log("loadHTML called")
    fetch(`modals/${htmlContent}.html`)
    .then(response=> response.text())
    .then(text=> document.getElementById('content').innerHTML = text);
  }
  

const dateFormat = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/;
function reviver(key, value) {
    if (typeof value === "string" && dateFormat.test(value)) {
        return new Date(value);
    }
    return value;
}

function getParameterByName(name) {
    let match = RegExp('[?&]' + name + '=([^&]*)').exec(window.location.search);
    return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
}

function loadJson(jsonFile) {
    const jsonData = require('./../text/' + jsonFile + ".json"); 
    console.log(jsonData);
    return jsonData
}
