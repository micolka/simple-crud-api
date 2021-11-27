const http = require('http')
const { addPerson, getAllPersons, getPerson, updatePerson, deletePerson } = require('./src/person')
const { getReqData, getUrlParams } = require('./src/utils')
const PORT = process.env.PORT || 5000

const head = {"Content-Type": "application/json"}

const server = http.createServer(async (req, res) => {

    const { personId, url } = getUrlParams(req.url)

    if (url === 'person') {
        switch (req.method) {
            case 'GET': {
                let data = personId ? getPerson(personId) : getAllPersons()
                res.writeHead(200, head)
                res.end(JSON.stringify(data))
                break
            }
            case 'POST': {
                const data = await getReqData(req)
                const person = addPerson(data)
                res.writeHead(201, head)
                res.end(JSON.stringify(person))
                break
            }
            case 'PUT': {
                const data = await getReqData(req)
                const person = updatePerson(personId, data)
                res.writeHead(200, head)
                res.end(JSON.stringify(person))
                break
            }
            case 'DELETE': {
                const person = deletePerson(personId)
                if(person) {
                    res.writeHead(204, head)
                    res.end()
                }
                break
            }
            default : {
                res.writeHead(404, head)
                res.end(JSON.stringify({message: `Method ${req.method} is not allowed`}))
            }
        }

    } else {
        res.writeHead(400, head)
        res.end(JSON.stringify({message: `Wrong route ${req.url}`}))
    }
})

server.listen(PORT, () => {
    console.log(`server started on port: ${PORT}`)
})
