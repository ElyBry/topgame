import dotenv from 'dotenv'
import cors from 'cors'
import express from 'express'
import { dbConnect } from './db'

import reactionRouter from './routes/reactionRouter'
import themeRouter from './routes/themeRouter';
import topicRouter from './routes/topicRouter'

dotenv.config()

const app = express()
app.use(cors({
	origin: "http://localhost:3000",
}))

const port = Number(process.env.SERVER_PORT) || 3001
app.set('port', port);

app.use(express.json())

dbConnect()

app.use(express.static('./'))

app.use('/topics/', topicRouter)
app.use('/topics/:topicId/', reactionRouter)
app.use('/api', themeRouter);

app.get('/', (_, res) => {
  res.send('Hello, World!')
})

app.listen(port, () => {
  console.log(`  ➜ 🎸 Server is listening on port: ${port}`)
})
