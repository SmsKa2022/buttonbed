const {v4: uuidv4} = require('uuid');
const db = {

    cart: [
        {
            id: uuidv4(),
            title: 'Apple',
            price: 2,
            count: 1
        },
        {
            id: uuidv4(),
            title: `Orange`,
            price: 5,
            count: 1
        },
        {
            id: uuidv4(),
            title: 'mouse',
            price: 10,
            count: 1
        }
    ]
}

module.exports = {
    db
}
console.log(db.cart[0].count)