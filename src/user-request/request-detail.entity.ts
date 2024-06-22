import {
  BelongsTo,
  Column,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { UserRequest } from './user-request.entity';

@Table({ timestamps: true })
export class RequestDetail extends Model<RequestDetail> {
  @Column({
    primaryKey: true,
    autoIncrement: true,
    unique: true,
  })
  id: number;

  @Column
  model: string;

  @Column({
    defaultValue: 'pending',
  })
  status: string;

  @ForeignKey(() => UserRequest)
  @Column
  requestid: number;

  @BelongsTo(() => UserRequest)
  request: UserRequest;
}
