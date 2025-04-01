import { DataType, Model } from 'sequelize-typescript'
import { ModelAttributes } from 'sequelize/types'

export interface IUser {
  id: number
  name: string
	authMethod: string
}

export const userModel: ModelAttributes<Model, IUser> = {
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
	authMethod: {
		type: DataType.STRING(255),
    allowNull: false,
	}
}
