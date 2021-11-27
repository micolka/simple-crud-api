const { v4: uuidv4 } = require('uuid')

const dataBase = []

const addPerson = (data) => {
    const person = {id: uuidv4(), ...data}
    const length = dataBase.push(person)
    return dataBase[length - 1]
}

const getAllPersons = () => {
    return dataBase
}

const getPerson = (id) => {
    return dataBase.find(el => el.id === id)
}

const updatePerson = (id, data) => {
    const index = dataBase.findIndex((el) => el.id === id)
    dataBase[index] = {id, ...data}
    return dataBase[index]
}

const deletePerson = (id) => {
    const index = dataBase.findIndex((el) => el.id === id)
    if (index !== -1) return dataBase.splice(index, 1)[0]
  }

module.exports = { addPerson, getAllPersons, getPerson, updatePerson, deletePerson }
