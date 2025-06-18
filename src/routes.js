import { randomUUID } from "node:crypto"
import { Database } from "./database.js"
import { regexPath } from "./utils/regex-path.js"

const database = new Database()

export const routes = [
    {
        method: 'GET',
        path: regexPath('/tasks'),
        handler: (req, res) => {
            const tasks = database.select('tasks')

            res.writeHead(200).end(JSON.stringify(tasks))
        }
    },
    {
       method: 'POST',
       path: regexPath('/tasks'),
       handler: (req, res) => {
            const {title, description} = req.body

            database.insert('tasks', {
                'id': randomUUID(),
                title,
                description,
                'completed_at': null,
                'created_at': new Date().toISOString(),
                'updated_at': new Date().toISOString(),
            })

            res.writeHead(201).end()
       }
    },
    {
       method: 'PUT',
       path: regexPath('/tasks/:id'),
       handler: (req, res) => {
            const { id } = req.params
            const {title, description} = req.body

            const updated = database.update('tasks', id, {
                title,
                description,
                'updated_at': new Date().toISOString(),
            })

            if (!updated) {
                res.writeHead(404).end(JSON.stringify({error: 'Task not found'}))
                return
            }
            
            res.writeHead(204).end()
       }
    }
]