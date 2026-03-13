import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'
import bootstrap from './src/bootstrap.js'
const app = express()
const port = 3000

dotenv.config({ path: './.env', quiet: true })

app.use(cors({
  origin: "*",
  methods: "GET,POST,PUT,DELETE,PATCH"
}));


bootstrap(express, app)

app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`Example app listening on port ${port}!`))