const http = require('http')
const { handleResponses } = require('./src/crud')

const PORT = process.env.PORT || 5000

const head = {"Content-Type": "application/json"}

const server = http.createServer(async (req, res) => {
    try {
        handleResponses(req, res)
    } catch(error) {
        res.writeHead(500, head)
        res.end(JSON.stringify({error}))
    }
})

server.listen(PORT, () => {
    console.log(`server started on port: ${PORT}`)
})
