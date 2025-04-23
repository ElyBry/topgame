import express from 'express'
import { addReaction, deleteReaction,  getReactions } from '../controllers/reactionController'

const reactionRouter = express.Router({ mergeParams: true })

reactionRouter.post('/reactions', addReaction)
reactionRouter.get('/reactions', getReactions)
reactionRouter.delete('/reactions/:id', deleteReaction)

export default reactionRouter
