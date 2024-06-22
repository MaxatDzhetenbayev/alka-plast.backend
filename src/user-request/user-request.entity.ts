import {
  BelongsTo,
  Column,
  ForeignKey,
  HasMany,
  HasOne,
  Table,
  Model,
} from 'sequelize-typescript';
import { RequestDetail } from './request-detail.entity';
import { RequestHistory } from './request-history.entity';
import { User } from 'src/users/user.entity';

@Table({ timestamps: true })
export class UserRequest extends Model<UserRequest> {
  @Column({
    primaryKey: true,
    autoIncrement: true,
    unique: true,
  })
  id: number;

  @Column
  fullname: string;

  @Column
  email: string;

  @Column
  phone: string;

  @Column
  address: string;

  @ForeignKey(() => User)
  @Column
  userid: number;

  @HasOne(() => RequestDetail)
  detail: RequestDetail;

  @HasMany(() => RequestHistory)
  histories: RequestHistory[];

  @BelongsTo(() => User)
  user: User;
}
