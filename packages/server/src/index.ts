import dotenv from 'dotenv'
import cors from 'cors'
import express from 'express'
import { dbConnect } from './db'

import reactionRouter from './routes/reactionRouter'
import themeRouter from './routes/themeRouter';
import topicRouter from './routes/topicRouter'
import errorRouter from './routes/errorRouter'
import { validateInput } from './middlewares/sanitize'

dotenv.config()

const app = express()
app.use(cors({
	origin: "http://localhost:3000",
  credentials: true
}))

const port = Number(process.env.SERVER_PORT) || 3001
app.set('port', port);

app.use(express.json())

dbConnect()
// app.use(cookieParser())
// app.use(authMiddleware);
app.use(validateInput)
app.use(express.static('./'))

app.use('/topics/', topicRouter)
app.use('/topics/:topicId/', reactionRouter)
app.use('/theme', themeRouter);
app.use('/error/', errorRouter);

app.listen(port, () => {
  console.log(`  ➜ 🎸 Server is listening on port: ${port}`)
})
