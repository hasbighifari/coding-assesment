const express = require('express')
const app = express
const router = app.Router()
const asyncMiddleware = require('../../middleware/async')
const VendingMachine = require('../vending_machine/VendingMachineClass')


router.get("/get", asyncMiddleware(async (req, res) => {
    const vendingMachine = new VendingMachine()
    const productDrink = await vendingMachine.getAllProductDrink()
    productDrink.map(item => {
        if (Number(item.qty) === 0) {
            item.statusQty = "kosong"
        }
        else {
            item.statusQty = "tersedia"
        }
    })
    res.send(productDrink)
}))
router.get("/getById", asyncMiddleware(async (req, res) => {
    const vendingMachine = new VendingMachine()
    const productDrink = await vendingMachine.getProductDrinkById(req.body.id)
    productDrink.map(item => {
        if (Number(item.qty) === 0) {
            item.statusQty = "kosong"
        }
        else {
            item.statusQty = "tersedia"
        }
    })
    res.send(productDrink)
}))

router.post("/insert", asyncMiddleware(async (req, res) => {
    const vendingMachine = new VendingMachine(req.body.insertProduct)
    const result = await vendingMachine.setProductToFirebase()
    if (result.insertStatus) {
        res.send({
            message: result.message
        })
    }
    else {
        res.status(401).send({
            errorMessage: "insert failed"
        })
    }
}))

router.post("/getDrinkByCustomer", asyncMiddleware(async (req, res) => {
    console.log("REQUEST", req.body)
    const vendingMachine = new VendingMachine()
    const result = await vendingMachine.setCustomerMoney(req.body.customerMoney, req.body.id, req.body.qty)
    if (result.paymentStatus) {
        console.log("RESULT", result.productDrink)
        res.send({
            productDrink: result.productDrink,
            message: result.uangKembalian === 0 ? "anda sudah membayar minumannya , Silahkan ambil minuman anda"
                : "anda sudah membayar minumannya , Silahkan ambil minuman anda dan uang kembalian sebesar Rp." + result.uangKembalian
        })
    }
    else {
        res.status(401).send({
            errorMessage: "Anda belum bisa ambil minumal, anda belum bayar"
        })
    }
}))
router.post("/updateQty", asyncMiddleware(async (req, res) => {
    const vendingMachine = new VendingMachine()
    const result = await vendingMachine.updateQtyProduct(req.body.id, { qty: req.body.qty })
    const getProduct = await vendingMachine.getProductDrinkById(req.body.id)
    res.send(getProduct)
}))

module.exports = router

