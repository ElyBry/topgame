import { DataType, Model } from 'sequelize-typescript'
import { ModelAttributes } from 'sequelize/types'

export interface IComment {
  id: number
  topicId: number
  parentCommentId: number | null
  author: string
  text: string
  createdAt: Date
  updatedAt: Date
}

export const commentModel: ModelAttributes<Model, IComment> = {
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
  text: {
    type: DataType.STRING(255),
    allowNull: false,
  },
  parentCommentId: {
    type: DataType.INTEGER,
    allowNull: true,
  },
  author: {
    type: DataType.STRING(255),
    allowNull: false,
  },
  createdAt: {
    type: DataType.DATE,
  },
  updatedAt: {
    type: DataType.DATE,
  },
}