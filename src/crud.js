const { validate: uuidValidate } = require('uuid')
const { addPerson, getAllPersons, getPerson, updatePerson, deletePerson } = require('./person')
const { getReqData, getUrlParams } = require('./utils')

const { PERS0N_DELETE_SUCCESS, PERSON_ID_NOT_FOUND, REQUIRED_FIELDS_MISSING } = require('./constats')

const head = {"Content-Type": "application/json"}

const handleResponses = async(req, res) => {
    const { personId, url } = getUrlParams(req.url)

    if (url === 'person') {
        switch (req.method) {
            case 'GET': {
                withUUIDCheck(res, personId, () => getPerson(personId), getAllPersons)
                break
            }
            case 'POST': {
                const data = await getReqData(req)
                const person = addPerson(data)
                if (person === REQUIRED_FIELDS_MISSING) {
                    res.writeHead(400, head)
                    res.end(JSON.stringify({message: `Can't find all required person's fields!`}))
                } else {
                    res.writeHead(201, head)
                    res.end(JSON.stringify(person)) 
                }
                break
            }
            case 'PUT': {
                withUUIDCheck(res, personId, async () => {
                    const data = await getReqData(req)
                    return updatePerson(personId, data)
                })
                break
            }
            case 'DELETE': {
                withUUIDCheck(res, personId, () => {
                    return deletePerson(personId)
                })
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
}

const handleRequestResult = (res, data, personId) => {
    switch(data) {
        case PERS0N_DELETE_SUCCESS: {
            res.writeHead(204, head)
            res.end()
            break
        }
        case PERSON_ID_NOT_FOUND: {
            res.writeHead(404, head)
            res.end(JSON.stringify({message: `Person id: ${personId} isn't found!`}))
            break
        }        
        default: {
            res.writeHead(200, head)
            res.end(JSON.stringify(data))
        }
    }
}

const withUUIDCheck = async (res, personId, personCallback, evadeValidationCallback) => {
    if (personId === undefined && evadeValidationCallback) {
        const data = evadeValidationCallback()
        handleRequestResult(res, data, personId)
        return
    }
    if (uuidValidate(personId)) {
        let person = await personCallback()
        handleRequestResult(res, person, personId)
    } else {
        res.writeHead(400, head)
        res.end(JSON.stringify({message: `${personId} isn't valid uuid!`}))
    }
}

module.exports = { handleRequestResult, withUUIDCheck, handleResponses }
