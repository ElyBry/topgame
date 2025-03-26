import express from 'express'
import { addReaction, deleteReaction,  getReactions } from '../controllers/reactionController'

const reactionRouter = express.Router({ mergeParams: true })

reactionRouter.post('/add-reaction', addReaction)
reactionRouter.get('/reactions-list', getReactions)
reactionRouter.delete('/delete-reaction', deleteReaction)

export default reactionRouter
