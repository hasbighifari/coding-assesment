let firebase;
const insertProductDrink = (insertProduct) => {
    return new Promise((resolve, reject) => {
        const product = firebase.database().ref("VendingMachine")
        product.push(insertProduct, error => {
            if (error) {
                reject(error)
            }
            else {
                resolve({
                    insertStatus: true,
                    message: "Insert product success"
                })
            }
        })
    })
}

const getAllProductDrink = () => {
    return new Promise((resolve, reject) => {
        const product = firebase.database().ref("VendingMachine")
        product.once("value", snapshot => {
            const productSnap = snapshot.val()
            const productList = []
            for (let id in productSnap) {
                productList.push({ id, ...productSnap[id] })
            }
            resolve(productList)
        })
    })
}

const getProductFromId = (id) => {
    return new Promise((resolve, reject) => {
        const product = firebase.database().ref("VendingMachine").child(id)
        product.once("value", snapshot => {
            const productSnap = snapshot.val()
            const productList = []
            for (let id in productSnap) {
                productList.push({ id, ...productSnap[id] })
            }
            resolve(productList)
        })
    })
}

const updateQtyProduct = (id, update) => {
    return new Promise((resolve, reject) => {
        const product = firebase.database().ref("VendingMachine").child(id)
        product.update({ ...update }).then(result => {
            resolve({ updateStatus: true })
        }).catch(error => {
            reject({ updateStatus: false })
        })
    })
}

module.exports = (firebaseDb) => {
    firebase = firebaseDb
    return {
        insertProductDrink: insertProductDrink,
        getAllProductDrink: getAllProductDrink,
        getProductFromId: getProductFromId,
        updateQtyProduct: updateQtyProduct
    }
}