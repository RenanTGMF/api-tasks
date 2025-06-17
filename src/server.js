import http from 'node:http';
import { Database } from './database.js';

const server = http.createServer((req, res) => {
    const database = new Database()

    return res.writeHead(404).end()
})

server.listen(3333)