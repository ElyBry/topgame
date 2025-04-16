import { sequelize } from '../db'
import { errorModel } from '../database/models/error'

export const Errors = sequelize.define('error', errorModel)

export const addErrors = async (req: any, res: any) => {
  try {
    const data = req.body.data
    const { error, errorInfo } = data
    if (!error || !errorInfo) {
      res.status(400).send('Неверные данные')
    }
    console.log(error, errorInfo, req.body)
    await Errors.create({ error, errorInfo, updatedAt: new Date(), createdAt: new Date() })

    res.send('Успешно')
  } catch (err) {
    console.error(err)
    res.status(500).send(err, ' - unexpected error occurred on server!')
  }
}