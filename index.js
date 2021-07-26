const net = require('net');

const server = net.createServer(
    // (clt) => {
    //     clt.on('data', (d) => {
    //         console.log('from the first one')
    //     })
    // }
)

server.on('error', err => {
    throw err;
})

server.on('connection', (clt) => {
    console.log('client connected')

    clt.on('data', (d) => {
        console.log('got some data ...', d)
        let converted = d.toString('utf8');
            console.log('converted to str', converted)
            console.log(converted.slice(0, 3))
            if (converted.slice(0, 3) === 'GET') {
                console.log('nice HTTP request', converted)
                // here send an index.html page
                //clt.write(d)
                clt.write('<p>Hello that a p</p>\r\n')
                clt.end();
            }
        
    })
    clt.on('close', () => {
        console.log('client disconnected closing')
    })
    clt.on('error', () => {
        console.log('some error')
        throw err;
    })
    
})

// server.on('data', (data, clt) => {
//     console.log('some data on the server', data); 
// })

server.listen('3000', () => {
    console.log('listening on port 3000')
})


