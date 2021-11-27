const  getReqData = (req) => {
    return new Promise((resolve, reject) => {
        try {
            let data = ''
            req.on('data', (chunk) => {
                data += chunk.toString()
            }).on('end', () => {
                resolve(JSON.parse(data))
            })
        } catch (error) {
            reject(error)
        }
    })
}

const getUrlParams = (reqURL) => {
    let [_, url, personId] = reqURL.split('/')
    if (personId === '') personId = undefined
    return { url, personId }
}

module.exports = { getReqData, getUrlParams }
