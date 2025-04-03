import { DataType, Model } from 'sequelize-typescript'
import { ModelAttributes } from 'sequelize/types'

export interface IReaction {
  id: number
  topicId: number
  userId: number
  type: string
  createdAt: Date
  updatedAt: Date
}

export const reactionModel: ModelAttributes<Model, IReaction> = {
  id: {
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  topicId: {
    type: DataType.INTEGER,
    references: {
      model: 'topics',
      key: 'id',
    },
  },
  userId: {
    type: DataType.INTEGER,
    references: {
      model: 'users',
      key: 'id',
    },
  },
  type: {
    type: DataType.STRING,
    allowNull: false,
  },
  createdAt: {
    type: DataType.DATE,
  },
  updatedAt: {
    type: DataType.DATE,
  },
}
