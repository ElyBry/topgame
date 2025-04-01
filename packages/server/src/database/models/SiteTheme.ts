import { Table, Column, Model, DataType, PrimaryKey, AutoIncrement, AllowNull, Unique, Index, HasMany } from 'sequelize-typescript';
import { UserTheme } from './UserTheme';

@Table({
  timestamps: false,
  paranoid: true,
  tableName: 'site_theme'
})
export class SiteTheme extends Model<SiteTheme> {
  @AutoIncrement
  @PrimaryKey
  @Column(DataType.INTEGER)
  declare id: number;

  @Index
  @AllowNull(false)
  @Unique
  @Column(DataType.STRING)
  declare theme: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  declare description: string;

  @HasMany(() => UserTheme)
  userThemes!: UserTheme[];  
}
