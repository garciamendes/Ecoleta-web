// Node
import path from 'path'

// Third party
import express from 'express'
import cors from 'cors'

// Local
import routes from './router'

// Const to use Express
const app = express()

// Development in json format (REST)
app.use(cors())
app.use(express.json())

// Routes
app.use(routes)

// View uploads
app.use('/uploads', express.static(path.resolve(__dirname, '..', 'uploads')))

// Backend development port
app.listen(3333)