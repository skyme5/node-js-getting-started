const express = require('express')
const path = require('path')
const request = require('request')
const PORT = process.env.PORT || 5000

function get(url) {
    return new Promise((resolve, reject) => {
        request(url, function (error, response, body) {
            if (error) {
                reject(error)
                return
            }
            resolve(body)
        })
    })
}

express()
    .use(express.static(path.join(__dirname, 'public')))
    .set('views', path.join(__dirname, 'views'))
    .set('view engine', 'ejs')
    .get('/app', (req, res) => {
        get(req.query.url).then((response) => {
            res.send(response)
        }).catch((err)=>{
            res.send(err)
        })
    })
    .listen(PORT, () => console.log(`Listening on ${ PORT }`))
