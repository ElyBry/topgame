import { DataType, Model } from 'sequelize-typescript'
import { ModelAttributes } from 'sequelize/types'

export interface ITopic {
  id: number
  name: string
  text: string
  author: string
  createdAt: Date
  updatedAt: Date
}

export const topicModel: ModelAttributes<Model, ITopic> = {
  id: {
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  name: {
    type: DataType.STRING(255),
    allowNull: false,
  },
  text: {
    type: DataType.STRING,
    allowNull: false,
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
