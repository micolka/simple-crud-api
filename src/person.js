const { v4: uuidv4 } = require('uuid')
const { PERS0N_DELETE_SUCCESS, PERSON_ID_NOT_FOUND, REQUIRED_FIELDS_MISSING } = require('./constats')

const dataBase = []

const addPerson = (data) => {
    const { name, age, hobbies } = data
    if (!name || !age || !hobbies) return REQUIRED_FIELDS_MISSING
    const person = { id: uuidv4(), name, age, hobbies }
    const length = dataBase.push(person)
    return dataBase[length - 1]
}

const getAllPersons = () => {
    return dataBase
}

const getPerson = (id) => {
    const person = dataBase.find(el => el.id === id)
    return person ? person : PERSON_ID_NOT_FOUND
}

const updatePerson = (id, data) => {
    const index = dataBase.findIndex((el) => el.id === id)
    if (index !== -1) {
        dataBase[index] = {id, ...data}
        return dataBase[index]
    } 
    return PERSON_ID_NOT_FOUND
}

const deletePerson = (id) => {
    const index = dataBase.findIndex((el) => el.id === id)
    if (index !== -1) {
        dataBase.splice(index, 1)
        return PERS0N_DELETE_SUCCESS
    }
    return PERSON_ID_NOT_FOUND
  }

module.exports = { addPerson, getAllPersons, getPerson, updatePerson, deletePerson }
