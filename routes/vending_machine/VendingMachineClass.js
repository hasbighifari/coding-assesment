const firebase = require('../../startup/firebase')
const firebaseModel = require('../../model/firebaseModel')(firebase)

class VendingMachine {
    constructor(insertProduct) {
        this.insertProduct = insertProduct
    }

    setProductToFirebase() {
        return new Promise(async (resolve, reject) => {
            const result = await firebaseModel.insertProductDrink(this.insertProduct)
            resolve(result)
        })
    }
    getAllProductDrink() {
        return new Promise(async (resolve, reject) => {
            const result = await firebaseModel.getAllProductDrink()
            resolve(result)
        })
    }
    getProductDrinkById(id) {
        return new Promise(async (resolve, reject) => {
            if (typeof id === "string") {
                const productDrink = await this.getAllProductDrink()
                resolve(productDrink.filter(item => item.id === id))
            }
            else {
                const productDrink = id.map(item => {
                    return this.getProductDrinkById(item)
                })
                const result = await Promise.all(productDrink)
                resolve(result.map(item => item[0]))
            }
        })
    }

    setCustomerMoney(customerMoney, id, qty) {
        return new Promise(async (resolve, reject) => {
            const productDrink = await this.getProductDrinkById(id)
            const totalPayment = productDrink.reduce((acc, item) => {
                return acc + Number(item.price)
            }, 0)
            if (productDrink.length !== 0) {
                if (Number(customerMoney) >= Number(totalPayment) * (Number(productDrink[0].qty) - Number(qty))) {
                    console.log("masuk sini")
                    const result = await this.updateQtyProduct(id, { qty: qty })
                    if (result.updateStatus) {
                        resolve({
                            paymentStatus: true,
                            uangKembalian: Number(customerMoney)-Number(totalPayment) * (Number(productDrink[0].qty) - Number(qty)),
                            productDrink
                        })
                    }
                    else {
                        resolve({
                            paymentStatus: false
                        })
                    }
                }
            }
            else {
                resolve({
                    paymentStatus: false
                })
            }
        })
    }
    updateQtyProduct(id, update) {
        return new Promise(async (resolve, reject) => {
            const result = await firebaseModel.updateQtyProduct(id, update)
            resolve(result)
        })
    }
}

module.exports = VendingMachine