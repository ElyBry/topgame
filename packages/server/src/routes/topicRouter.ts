import express from 'express'
import { addTopic, getTopicId, getTopics, createComment } from '../controllers/topicController'

const topicRouter = express.Router({ mergeParams: true })

topicRouter.get('/', getTopics)
topicRouter.post('/', addTopic)
topicRouter.get('/:id', getTopicId)
topicRouter.post('/:id/comment', createComment)

export default topicRouter
