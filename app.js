const express = require('express')
const path = require('path')
const {db} = require('./DB')


const PORT = 3001
const server = express()
console.log("http://localhost:3001/")
server.set('view engine', 'hbs')
server.set('views', path.join(process.env.PWD, 'src', 'views'))
server.use(express.urlencoded({extended: true}))
server.use(express.static(path.join(process.env.PWD, 'public')))
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

server.path('/cart/:id', (req, res) => {
    const {id} = req.params
    const {action} = req.body
    const currentGood = db.cart.find((el) => el.id === id)
    if (action === 'inсrease') {
        currentGood.count += 1
    } else if (action === 'decrease') {
        currentGood.count -= 1
    }
    const total = db.cart.reduce((acc, el) => acc + el.price * el.count, 0)
    res.json({
        count: currentGood.count,
        total
    })
})
server.use(express.static('.'));
server.listen(PORT, () => {
    console.log(`Server has been started on port: ${PORT}`)
})
