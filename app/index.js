import cookieParser from 'cookie-parser'
import express from 'express'
import { auth } from './controllers/auth.controller.js'
//fix __dirname
import path from 'path'
import { fileURLToPath } from 'url'
import {
  adminMiddleware,
  publicMiddleware
} from './middlewares/authorization.js'
const __dirname = path.dirname(fileURLToPath(import.meta.url))

//server
const app = express()
app.set('port', 4000)
app.listen(app.get('port'))

console.log(`✨ Server running on port: ${app.get('port')}`)
console.log(`http://localhost:${app.get('port')}`)

//config
app.use(express.static(`${__dirname}/public`))
app.use(express.json())
app.use(cookieParser())

//routes - endpoints
app.get('/', publicMiddleware, (req, res) => {
  res.sendFile(`${__dirname}/pages/login.html`)
})

app.get('/register', publicMiddleware, (req, res) => {
  res.sendFile(`${__dirname}/pages/register.html`)
})

app.get('/admin', adminMiddleware, (req, res) => {
  res.sendFile(`${__dirname}/pages/admin.html`)
})

app.post('/api/login', auth.login)
app.post('/api/register', auth.register)
