import { DataType, Model } from 'sequelize-typescript'
import { ModelAttributes } from 'sequelize/types'

export interface IReaction {
  id: number
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
