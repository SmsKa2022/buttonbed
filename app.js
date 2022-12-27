const express = require('express')
const path = require('path')
const {db} = require('./DB')
// const fs = require('fs')
const PORT = 3002
const server = express()

// process.env.PWD = path.dirname(fs.realpathSync(__filename))

server.set('view engine', 'hbs')
server.set('views', path.join(__dirname, 'src', 'views'))
server.use(express.urlencoded({extended: true}))
server.use(express.static(path.normalize(__dirname+'/public')))
server.use(express.json())
server.use((req, res, next) => {
    console.log(req.body)
    // db.cart[0] += 1
        console.log(db.cart[0].count++)
        next()
},
   )
server.get('/', (req, res, next) => {
    console.log('hello')
    next()
},
(req, res) => {
    const cart = db.cart
    const total = db.cart.reduce((acc, el) => acc + el.price * el.count, 0)
    res.render('main', {cart, total})
    console.log(1)
})

server.patch('/cart/:id', (req, res) => {
    const id = req.params.id;
    const action = req.body.action;
    console.log(id, action);
    let currentGood = db.cart.find((el) => el.id === id);
    //console.log(currentGood);
    if (action == 'increase') {
        currentGood.count += 1;
    } else if (action == 'decrease') {
        currentGood.count -= 1;
    }
    //console.log(currentGood);
    let total = db.cart.reduce((acc, el) => acc + el.price * el.count, 0)
    res.json({
        count: currentGood.count,
        total
    })
})

server.use(express.static('.'));

server.listen(PORT, () => {
    console.log(`Server has been started on port: ${PORT}`)
})
console.log("http://localhost:3002/")