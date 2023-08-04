require('module-alias/register')

const path = require('path')
const http = require("http")
const express = require('express')
const favicon = require('serve-favicon')
const bodyParser = require("body-parser")
const main = require('@library/router/main')

const app = express()

app.set("json spaces", 3)
app.set('view engine', 'ejs')
app.set('views', __dirname + '/library/router/view')

app.use('/', main)
app.use(bodyParser.json())
app.use(express.static("library"))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(favicon(path.join(__dirname, "library", "assets", "images", "favicon.jpeg")))

process.on('uncaughtException', (err) => { console.log(err.message) })
http.createServer(app).listen(8080, () => { console.log('running on 8080') })