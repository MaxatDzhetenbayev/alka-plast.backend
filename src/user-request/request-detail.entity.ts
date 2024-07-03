import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { UserRequest } from './user-request.entity';

@Table({ timestamps: true, tableName: 'request_details' })
export class RequestDetail extends Model<RequestDetail> {
  @Column({
    primaryKey: true,
    autoIncrement: true,
    unique: true,
  })
  id: number;

  @Column
  item_id: number;

  @Column
  instalation_date: Date;

  @Column
  measurement_date: Date;
  
  @Column({
    type: DataType.JSONB,
  })
  options: Object;

  @Column({
    defaultValue: 'pending',
  })
  status: string;


  @ForeignKey(() => UserRequest)
  @Column
  request_id: number;

  @BelongsTo(() => UserRequest)
  request: UserRequest;
}
