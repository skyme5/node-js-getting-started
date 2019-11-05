const express = require('express')
const path = require('path')
const request = require('request')
const PORT = process.env.PORT || 5000
const
    socks5 = require('simple-socks'),
    server = socks5.createServer().listen(PORT);


// function get(url) {
//     return new Promise((resolve, reject) => {
//         request(url, function (error, response, body) {
//             if (error) {
//                 reject(error)
//                 return
//             }
//             resolve(body)
//         })
//     })
// }

// express()
//     .use(express.static(path.join(__dirname, 'public')))
//     .set('views', path.join(__dirname, 'views'))
//     .set('view engine', 'ejs')
//     .get('/app', (req, res) => {
//         get(req.query.url).then((response) => {
//             res.send(response)
//         }).catch((err)=>{
//             res.send(err)
//         })
//     })
//     .listen(PORT, () => console.log(`Listening on ${ PORT }`))

// When a reqest arrives for a remote destination
server.on('proxyConnect', function (info, destination) {
    console.log('connected to remote server at %s:%d', info);
});

// When data arrives from the remote connection
// server.on('proxyData', function (data) {
//   console.log(data.length);
// });

// When an error occurs connecting to remote destination
server.on('proxyError', function (err) {
    console.error('unable to connect to remote server');
    console.error(err);
});

// When a proxy connection ends
server.on('proxyEnd', function (response, args) {
    console.log('socket closed with code %d', response);
    console.log(args);
});
