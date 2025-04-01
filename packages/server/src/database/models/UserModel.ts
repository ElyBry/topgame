import { Table, Column, Model, DataType, PrimaryKey, AutoIncrement, AllowNull, HasOne } from 'sequelize-typescript';
import { UserTheme } from './UserTheme';

@Table({
  timestamps: true,
  paranoid: false,
  tableName: 'users_data'
})
export class User extends Model<User> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  declare id: number;

  @AllowNull(false)
  @Column(DataType.STRING)
  declare name: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  declare authMethod: string;

  @HasOne(() => UserTheme)
  userTheme!: UserTheme;
}
