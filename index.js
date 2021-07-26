const net = require('net');
const fs = require('fs');

const server = net.createServer();

server.on('error', err => {
    throw err;
})

server.on('connection', (socket) => {
    console.log('Socket connected')

    socket.on('data', (d) => {
        let converted = d.toString('utf8');
        let date = new Date().toUTCString();

        if (converted.slice(0, 3) === 'GET') {
            if (converted.slice(4,5) === '/') {
                let indexFile = fs.readFileSync('index.html', 'utf8');

                socket.write('HTTP/1.1 200 OK\r\n')
                socket.write('Content-Type: text/html; charset=UTF-8\r\n')
                socket.write(`Date: ${date}\r\n`)
                socket.write(`Content-Length: ${indexFile.length}\r\n\n`)
                socket.write(indexFile)
            }
            socket.end();
        }
    })

    socket.on('error', () => {
        console.log('Error in the socket')
        throw err;
    })

    socket.on('close', () => {
        console.log('Socket disconnected')
    })
    
})

server.listen('3000', () => {
    console.log('Listening on port 3000')
})


