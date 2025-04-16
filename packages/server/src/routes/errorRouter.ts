import express from 'express'
import { addErrors } from '../controllers/errorController'

const errorRouter = express.Router({ mergeParams: true })

errorRouter.post('/', addErrors)

export default errorRouter
