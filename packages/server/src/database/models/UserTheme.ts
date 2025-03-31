import { Table, Column, Model, DataType, PrimaryKey, AutoIncrement, AllowNull, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { User } from './UserModel';
import { SiteTheme } from './SiteTheme';

@Table({
  timestamps: true,
  paranoid: false,
  tableName: 'user_theme'
})
export class UserTheme extends Model<UserTheme> {
  @AutoIncrement
  @PrimaryKey
  @Column(DataType.INTEGER)
  declare id: number;

  @ForeignKey(() => SiteTheme)
  @AllowNull(false)
  @Column({
    type: DataType.INTEGER,
    references: {
      model: 'site_theme',
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
  })
  declare themeId: string;

  @BelongsTo(() => SiteTheme)
  theme!: SiteTheme;  

  @ForeignKey(() => User)
  @AllowNull(false)
  @Column({
    type: DataType.INTEGER,
    field: 'ownerId',
    references: {
      model: 'users_data',
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE', 
  })
  declare ownerId: number;
}
