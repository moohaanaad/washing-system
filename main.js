import express from 'express'
import dotenv from 'dotenv'
import bootstrap from './src/bootstrap.js'
const app = express()
const port = 3000

dotenv.config({ path: './.env', quiet: true })

bootstrap(express, app)

app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`Example app listening on port ${port}!`))