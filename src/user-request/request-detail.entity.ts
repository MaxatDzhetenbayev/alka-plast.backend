import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasOne,
  Model,
  Table,
} from 'sequelize-typescript';
import { UserRequest } from './user-request.entity';
import { WindowItem } from 'src/windows/entities/window-item.entity';

interface Options {
  height?: number;
  width?: number;
}

@Table({ timestamps: true, tableName: 'request_details' })
export class RequestDetail extends Model<RequestDetail> {
  @Column({
    primaryKey: true,
    autoIncrement: true,
    unique: true,
  })
  id: number;

  @ForeignKey(() => WindowItem)
  @Column
  item_id: number;

  @Column
  instalation_date: Date;

  @Column
  measurement_date: Date;

  @Column({
    type: DataType.JSONB,
  })
  options: Options;

  @Column({
    defaultValue: 'pending',
  })
  status: string;

  @ForeignKey(() => UserRequest)
  @Column
  request_id: number;

  @BelongsTo(() => UserRequest)
  request: UserRequest;

  @BelongsTo(() => WindowItem)
  item: WindowItem;
}
