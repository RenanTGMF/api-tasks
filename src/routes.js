import { randomUUID } from "node:crypto"
import { Database } from "./database.js"

const database = new Database()

export const routes = [
    {
       method: 'POST',
       path: '/tasks',
       handler: (req, res) => {
            const {title, description} = req.body

            const task = {
                'id': randomUUID(),
                title,
                description,
                'completed_at': null,
                'created_at': new Date().toISOString(),
                'updated_at': new Date().toISOString(),
            }

            database.insert('tasks', task)

            res.writeHead(201).end()
       }
    }
]