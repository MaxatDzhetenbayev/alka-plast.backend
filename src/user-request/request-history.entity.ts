import {
  BelongsTo,
  Column,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { UserRequest } from './user-request.entity';

@Table({ timestamps: true, tableName: 'request_history'})
export class RequestHistory extends Model<RequestHistory> {
  @Column({
    primaryKey: true,
    autoIncrement: true,
    unique: true,
  })
  id: number;

  @Column
  old: string;

  @Column
  new: string;

  @ForeignKey(() => UserRequest)
  requestid: number;

  @BelongsTo(() => UserRequest)
  request: UserRequest;
}
