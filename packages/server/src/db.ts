import { Sequelize, SequelizeOptions } from 'sequelize-typescript'
const isDev = process.env.NODE_ENV === 'development'
const {
  POSTGRES_HOST,
  POSTGRES_HOST_DEV,
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  POSTGRES_DB,
  POSTGRES_PORT,
} = process.env

export const sequelizeOptions: SequelizeOptions = {
  host: isDev ? POSTGRES_HOST_DEV : POSTGRES_HOST,
  port: Number(POSTGRES_PORT),
  username: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
  database: POSTGRES_DB,
  dialect: 'postgres',
  repositoryMode: true,
  define: {
    timestamps: false,
  },
}
export const sequelize = new Sequelize(sequelizeOptions)

export async function dbConnect() {
  try {
    await sequelize.authenticate()
    await sequelize.sync({ force: false })
    console.log('Connection has been established successfully.')
  } catch (error) {
    console.error('Unable to connect to the database:', error)
  }
}
