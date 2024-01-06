const express = require('express')
const morgan = require('morgan')

const app = express()

app.use(express.json())

const cors = require('cors')

app.use(cors())


const requestLogger = (request, response, next) => {
    console.log('Method:', request.method)
    console.log('Path:  ', request.path)
    console.log('Body:  ', request.body)
    console.log('---')
    next()
}

app.use(requestLogger)

app.use(morgan('method: :method url: :url status: :status content-length: :res[content-length] date: :date[web] - response-time: :response-time ms :res[body]'))

let notes = [
    {
        id: 1,
        content: "HTML is easy",
        date: "2019-05-30T17:30:31.098Z",
        important: true
    },
    {
        id: 2,
        content: "Browser can execute only Javascript",
        date: "2019-05-30T18:39:34.091Z",
        important: false
    },
    {
        id: 3,
        content: "GET and POST are the most important methods of HTTP protocol",
        date: "2019-05-30T19:20:14.298Z",
        important: true
    },
    {
        id: 4,
        content: "GET and POST are the most important methods of HTTP protocol",
        date: "2024-01-06T19:20:14.298Z",
        important: true
    }
]

app.get('/', (request, response) => {
    response.send('<h1>Hello World!</h1>')
})

app.get('/info', (request, response) => {
    let out = `Notes-server has info for ${notes.length} notes<br />\n<br />\n`;
    out += `${new Date().toUTCString()}`
    response.send(out)
})

app.get('/api/notes/:id', (request, response) => {
    const id = Number(request.params.id)
    if (isNaN(id)) {
        return response.status(400).json({ error: 'note id not a number' })
    }
    console.log('searching for note', id)
    const note = notes.find(note => note.id === id)
    if (note) {
        console.log('note found', note)
        response.json(note)
    } else {
        console.log('note', id, 'not found')
        response.status(404).end()
    }
})

app.get('/api/notes', (request, response) => {
    response.json(notes)
})

app.delete('/api/notes/:id', (request, response) => {
    const id = Number(request.params.id)
    notes = notes.filter(note => note.id !== id)
    response.status(204).end()
})

const generateId = () => {
    const maxId = notes.length > 0
        ? Math.max(...notes.map(n => n.id))
        : 0
    return maxId + 1
}

app.post('/api/notes', (request, response) => {
    const { body } = request
    if (!body.content) {
        return response.status(400).json({
            error: 'content missing'
        })
    }
    const note = {
        id: generateId(),
        content: body.content,
        date: new Date(),
        important: body.important || false
    }
    notes = notes.concat(note)
    response.json(note)
})

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})