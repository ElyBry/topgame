import express from 'express'
import { addReaction, getReactions } from '../controllers/reactionController'

const reactionRouter = express.Router({ mergeParams: true })

reactionRouter.post('/add-reaction', addReaction)
reactionRouter.get('/reactions-list', getReactions)

export default reactionRouter
