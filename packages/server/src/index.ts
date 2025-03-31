import dotenv from 'dotenv'
import cors from 'cors'
import express from 'express'
import { dbConnect } from './db'

import reactionRouter from './routes/reactionRouter'
import themeRouter from './routes/themeRouter';

dotenv.config()

const app = express()
app.use(express.json());

app.use(cors())
app.use(express.json())
const port = Number(process.env.SERVER_PORT) || 3001

dbConnect()

app.use('/topics/:topicId/', reactionRouter)
app.use('/api', themeRouter);

app.use(express.static('./'))

app.get('/', (_, res) => {
  res.send('Hello, World!')
})

app.listen(port, () => {
  console.log(`  ➜ 🎸 Server is listening on port: ${port}`)
})
