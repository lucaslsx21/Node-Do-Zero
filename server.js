// import { createServer } from 'node:http'

// const server = createServer((request, response) => {
//     response.write('Hello World')

//     return response.end()
// })

// server.listen(3333)

// localhost: 3333


import { fastify } from 'fastify'
// import { DatabaseMemory } from './database-memory.js'
import { DatabasePostgres } from './database-postgres.js'

const server = fastify()

// GET = que busca uma infomação;
// POST = serve para criação;
// PUT = serve para alterar;
// DELETE = serve para deletar;
// PATCH = serve para alterar alguma informação especifica;
// Route Paramenter = serve para identificar o 'id' da rota;

// POST http://localhost:3333/videos
// PUT http://localhost:3333/videos/1

// const database = new DatabaseMemory()
const database = new DatabasePostgres()

// Request Body

server.post('/videos', async (request, reply) => {
    const { title, description, duration } = request.body
    

    await database.create({
        title,
        description,
        duration,
    })
    return reply.status(201).send()
})

server.get('/videos', async (request) => {
    const search = request.query.search

    const videos = await database.list(search)
    return videos
})

server.put('/videos/:id', async (request, reply) => {
    const videoId = request.params.id

    const { title, description, duration } = request.body

        await database.update(videoId, {
            title,
            description,
            duration,

    })
    return reply.status(204).send()
})

server.delete('/videos/:id', async (request, reply) => {
    const videoId = request.params.id

    await database.delete(videoId)

    return reply.status(204).send()
})

server .listen({
    host: '0.0.0.0',
    port: process.env.PORT ?? 3333,
})