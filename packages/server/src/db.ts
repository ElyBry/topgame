import { Sequelize, SequelizeOptions } from 'sequelize-typescript'
import { User } from './database/models/UserModel'
import { SiteTheme } from './database/models/SiteTheme'
import { UserTheme } from './database/models/UserTheme'

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
    timestamps: true,
  },
  logging: true,
}

export const sequelize = new Sequelize(sequelizeOptions);

sequelize.addModels([User, UserTheme, SiteTheme]);

export async function dbConnect() {
  try {
    await sequelize.authenticate()
    await sequelize.sync(/*{force: true}*/)
    console.log('Connection has been established successfully.')
  } catch (error) {
    console.error('Unable to connect to the database:', error)
  }
}
