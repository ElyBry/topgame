import { sequelize } from '../db'
import { topicModel } from '../database/models/topic'
import { commentModel } from '../database/models/comment'

export const Topics = sequelize.define('topics', topicModel)
export const TopicComments = sequelize.define('comments', commentModel)

Topics.hasMany(TopicComments, {
  foreignKey: 'topicId',
  as: 'comments',
})
TopicComments.belongsTo(Topics, {
  foreignKey: 'topicId',
  as: 'topics',
})

export const getTopics = async (_req: any, res: any) => {
  try {
    const topics = await Topics.findAll({ order: [['createdAt', 'DESC']], })

    res.send(topics)
  } catch (err) {
    console.error(err)
    res.status(500).send(err, ' - unexpected error occurred on server!')
  }
}

export const addTopic = async (req: any, res: any) => {
  try {
    const { name, text, author, createdAt } = req.body
    const topic = await Topics.create({ name, text, author, createdAt })

    res.send(topic)
  } catch (err) {
    console.error(err)
    res.status(500).send(err, ' - unexpected error occurred on server!')
  }
}

export const getCommentsByTopicId = async (req: any, res: any) => {
  try {
    return await TopicComments.findAll({
      where: { topicId: req.params.id },
      order: [['createdAt', 'ASC']],
    })
  } catch (err) {
    return res.status(500).send(err);
  }
}

export const getTopicId = async (req: any, res: any) => {
  try {
    const commentsTopic = await getCommentsByTopicId(req, res);
    const topic = await Topics.findByPk(req.params.id)
    const result = {topic, commentsTopic};

    res.status(200).send(result)
  } catch (err) {
    console.error(err)
    res.status(500).send(err, ' - unexpected error occurred on server!')
  }
}

export const createComment = async (req: any, res: any) => {
  const { id } = req.params
  const { text, author, parentCommentId } = req.body

  try {
    const comment = await TopicComments.create({
      topicId: id,
      text,
      author,
      parentCommentId: parentCommentId || null,
      createdAt: new Date(),
      updatedAt: new Date()
    })

    res.send(comment)
  } catch (err) {
    console.error(err)
    res.status(500).send(err, ' - unexpected error occurred on server!')
  }
}