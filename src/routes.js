import { randomUUID } from "node:crypto"
import { Database } from "./database.js"
import { regexPath } from "./utils/regex-path.js"

const database = new Database()

export const routes = [
    {
        method: 'GET',
        path: regexPath('/tasks'),
        handler: (req, res) => {
            const { search } = req.query

            const tasks = database.select('tasks', search ? {
                title: search,
                description: search,
            } : null)

            res.writeHead(200).end(JSON.stringify(tasks))
        }
    },
    {
       method: 'POST',
       path: regexPath('/tasks'),
       handler: (req, res) => {
            const {title, description} = req.body ?? []

            if (!title) {
                return res.writeHead(400).end(
                JSON.stringify({ message: 'title is required' }),
                )
            }

            if (!description) {
                return res.writeHead(400).end(
                JSON.stringify({message: 'description is required' })
                )
            }

            database.insert('tasks', {
                'id': randomUUID(),
                title,
                description,
                'completed_at': null,
                'created_at': new Date().toISOString(),
                'updated_at': new Date().toISOString(),
            })

            return res.writeHead(201).end()
       }
    },
    {
       method: 'PUT',
       path: regexPath('/tasks/:id'),
       handler: (req, res) => {
            const { id } = req.params
            const {title, description} = req.body ?? []

            if (!title && !description) {
                return res.writeHead(400).end(
                JSON.stringify({ message: 'title or description are required' }),
                )
            }

            const updated = database.update('tasks', id, {
                title,
                description
            })

            if (!updated) {
                return res.writeHead(404).end(JSON.stringify({error: 'Task not found'}))
            }
            
            return res.writeHead(204).end()
       }
    },
    {
       method: 'DELETE',
       path: regexPath('/tasks/:id'),
       handler: (req, res) => {
            const { id } = req.params

            const deleted = database.delete('tasks', id)
            
            if (!deleted) {
                return res.writeHead(404).end(JSON.stringify({error: 'Task not found'})) 
            }

            return res.writeHead(204).end()
       }
    },
    {
       method: 'PATCH',
       path: regexPath('/tasks/:id/complete'),
       handler: (req, res) => {
            const { id } = req.params

            const updated = database.updateCompletionStatus('tasks', id)
            
            if (!updated) {
                return res.writeHead(404).end(JSON.stringify({error: 'Task not found'})) 
            }

            return res.writeHead(204).end()
       }
    },
]