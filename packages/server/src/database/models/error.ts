import { DataType, Model } from 'sequelize-typescript'
import { ModelAttributes } from 'sequelize/types'
import { ErrorInfo } from 'react'

export interface IError {
  id: number,
  error: Error,
  errorInfo: ErrorInfo,
  updatedAt: Date,
  createdAt: Date
}

export const errorModel: ModelAttributes<Model, IError> = {
  id: {
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  error: {
    type: DataType.TEXT,
    allowNull: false,
  },
  errorInfo: {
		type: DataType.TEXT,
    allowNull: false,
	},
  createdAt: {
    type: DataType.DATE,
    allowNull: false,
    defaultValue: DataType.NOW,
  },
  updatedAt: {
    type: DataType.DATE,
    allowNull: false,
    defaultValue: DataType.NOW,
  },
}
