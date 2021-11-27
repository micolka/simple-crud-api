const http = require('http')
const PORT = process.env.PORT || 5000

const dataBase = []

const head = {"Content-Type": "application/json"}

const server = http.createServer((req, res) => {
    if (req.url === '/person') {

        switch (req.method) {
            case 'GET': {
                res.writeHead(200, head)
                res.write('hello from server')
                res.end()
                break
            }
            case 'POST': {
                res.writeHead(200, head)
                res.write('hello from server')
                res.end()
                break
            }
            case 'PUT': {
                res.writeHead(200, head)
                res.write('hello from server')
                res.end()
                break
            }
            case 'DELETE': {
                res.writeHead(200, head)
                res.write('hello from server')
                res.end()
                break
            }
            default : {
                res.writeHead(405, head)
                res.end(JSON.stringify({message: `Method ${req.method} is not allowed`}))
            }
        }

    } else {
        res.writeHead(400, head)
        res.end(JSON.stringify({message: `Wrong route ${req.url}`}))
    }
})

server.listen(PORT, () => {
    console.log(`server started on port: ${PORT}`);
})