const express = require('express')
const app = express
const bodyParser = require("body-parser")
const vendingMachine = require('../routes/vending_machine/vendingMachine')


module.exports = app => {
    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({ extended: false }))
    app.use("/api/v1/aia-test/vending-machine", vendingMachine)
}

