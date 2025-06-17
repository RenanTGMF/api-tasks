import http from 'node:http';
import { Database } from './database.js';
import { json } from './middlewares/json.js';

const server = http.createServer(async (req, res) => {
    const database = new Database()

    await json(req, res)

    return res.writeHead(404).end()
})

server.listen(3333)