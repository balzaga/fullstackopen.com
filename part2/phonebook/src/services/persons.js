import axios from 'axios'
//http://localhost:3001/persons
//http://localhost:3001/api/persons
//https://balzaga-persons-server-2081d4f6c3a0.herokuapp.com/api/persons
let  baseUrl = '/api/persons'

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => {
        return response.data
    })
}

const create = newObject => {
    const request = axios.post(baseUrl, newObject)
    return request.then(response => {
        return response.data
    })
}

const update = (id, newObject) => {
    const request = axios.put(`${baseUrl}/${id}`, newObject)
    return request.then(response => {
        return response.data
    })
}

const deletePerson = (id) => {
    const request = axios.delete(`${baseUrl}/${id}`)
    return request.then(response => {
        console.log('respuesta delete person ',response.data)
        return response.data
    })
}

// eslint-disable-next-line
export default { getAll, create, update, deletePerson }