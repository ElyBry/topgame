import { sequelize } from '../db'
import { reactionModel } from '../database/models/reaction'
import { topicModel } from '../database/models/topic'
import { userModel } from '../database/models/user'

export const Topic = sequelize.define('topic', topicModel)
export const Reaction = sequelize.define('reaction', reactionModel)
export const User = sequelize.define('user', userModel)

Topic.belongsTo(User, {
  foreignKey: 'userId',
  as: 'user',
})
Reaction.belongsTo(Topic, {
  foreignKey: 'topicId',
  as: 'topic',
})
Reaction.belongsTo(User, {
  foreignKey: 'userId',
  as: 'user',
})

export const addReaction = async (req: any, res: any) => {
  try {
    const { userId, topicId, type } = req.body
    const reaction = await Reaction.create({
      userId,
      topicId,
      type,
    })

    res.send(reaction)
  } catch (err) {
    console.error(err)
    res.status(500).send('Unexpected error occurred on server!')
  }
}

export const deleteReaction = async (req: any, res: any) => {
  try {
    const { id } = req.params
    await Reaction.destroy({
      where: {
        id
      },
    })

    res.send('success')
  } catch (err) {
    console.error(err)
    res.status(500).send('Unexpected error occurred on server!')
  }
}

export const getReactions = async (req: any, res: any) => {
  try {
    const { topicId } = req.params
    const reactions = await Reaction.findAll({
      where: {
        topicId: Number(topicId),
      },
    })

    res.send(reactions)
  } catch (err) {
    console.error(err)
    res.status(500).send('Unexpected error occurred on server!')
  }
}
