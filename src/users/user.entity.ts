import { UserRequest } from 'src/user-request/user-request.entity';
import { Column, DataType, HasMany, Table, Model } from 'sequelize-typescript';

@Table({
  timestamps: true,
})
export class User extends Model<User> {
  @Column({
    primaryKey: true,
    autoIncrement: true,
    unique: true,
  })
  id: number;

  @Column({
    unique: true,
  })
  username: string;

  @Column
  passwordHash: string;

  @Column({
    type: DataType.ARRAY(DataType.STRING),
  })
  roles: string[];

  @HasMany(() => UserRequest)
  requests: UserRequest[];
}
