const fs = require('fs');
const path = require('path');

const p = path.join(
    path.dirname(process.mainModule.filename),
    'data',
    'cart.json'
);

module.exports = class Cart {
    static addProduct(id, productPrice) {
        console.log('addProduct');
        console.log(id);
        fs.readFile(p, (err, fileContents) => {
            let cart = {products:[], totalPrice: 0};

            if (!err) {
                cart = JSON.parse(fileContents);
            }

            const existingProductIndex = cart.products.findIndex(prod => prod.id == id);
            const existingProduct = cart.products[existingProductIndex];

            let updatedProduct;

            if (existingProduct) {
                updatedProduct = { ...existingProduct }; //add all properties of the existing product to the updated product
                updatedProduct.qty++;
                cart.products = [...cart.products];
                cart.products[existingProductIndex] = updatedProduct;
            } else {
                updatedProduct = { id: id, qty: 1 }
                cart.products = [...cart.products, updatedProduct];
            }

            cart.totalPrice += Number(productPrice);

            fs.writeFile(p, JSON.stringify(cart), err => {
                console.log('err->');
                console.log(err);
            });
        });
    }

    static deleteProduct(id, productPrice) {
        fs.readFile(p, (err, fileContents) => {
            if (err) {
                return;
            }

            const updatedCart = { ...JSON.parse(fileContents) };
            const product = updatedCart.products.find(prod => prod.id === id);

            if (!product) { //if product doesn't exist in the cart
                return;
            }

            const productQty = product.qty;

            updatedCart.products = updatedCart.products.filter(prod => prod.id !== id);

            updatedCart.totalPrice -= Number(productPrice) * Number(productQty);

            fs.writeFile(p, JSON.stringify(updatedCart), err => {
                console.log(err);
            });
        });
    }

    static getCart(cb){
        fs.readFile(p, (err, fileContents) => {
            const cart = JSON.parse(fileContents);

            if (err) {
                cb(null);
            } else {
                cb(cart);
            }
        });
    }
}