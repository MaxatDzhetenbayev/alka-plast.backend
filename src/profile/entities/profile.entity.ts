import {
  Table,
  Column,
  Model,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { User } from 'src/users/user.entity';

@Table({ timestamps: false, tableName: 'profiles' })
export class Profile extends Model<Profile> {
  @Column({
    primaryKey: true,
    autoIncrement: true,
    unique: true,
  })
  id: number;

  @ForeignKey(() => User)
  user_id: number;

  @Column
  name: string;

  @Column
  surname: string;

  @Column
  image: string;

  @BelongsTo(() => User, { as: 'profile', foreignKey: 'user_id' })
  user: User;
}
