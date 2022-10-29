const express = require('express')
const morgan = require('morgan')

const app = express()
const PORT = process.env.PORT || 5000


function customMiddleware(req, res, next) {
    if(req.url === '/help'){
        res.send('<h1>Sorry. This page is reserved by admin</h1>')
    }


    next()
} 

function tinnyLogger () {
    return (req, res, next) => {
        console.log(`${req.method} ------------ ${req.url}`)
        next()
    }
}

const middleware = [customMiddleware, tinnyLogger()]


// app.use(morgan('dev'))



app.use(middleware)

app.get('/about', morgan('dev'), ((req, res) => {
    res.send("<p>This is about us page</p>")
}))

app.get('/help', ((req, res) => {
    res.send('This is help page')
}))

app.get('/my-id/shamima', ((req, res) => {
    res.send("Tanjila Shamima")
}))

app.get('/', ((req, res) => {
    res.send('<h1>Hello World</h1>')
}))

app.get('*', ((req, res) => {
    res.send('404 Not Found')
}))


app.listen(PORT, () => {
    console.log('I am listening port ', PORT)
})