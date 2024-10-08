import {
  Column,
  Table,
  DataType,
  ForeignKey,
  BelongsTo,
  Model,
  HasMany,
} from 'sequelize-typescript';
import { Window } from './window.entity';
import { WindowItemFeature } from './window-item-feature.entity';
import { RequestDetail } from 'src/user-request/request-detail.entity';

@Table({ timestamps: true, tableName: 'window_items' })
export class WindowItem extends Model<WindowItem> {
  @Column({
    primaryKey: true,
    autoIncrement: true,
    unique: true,
  })
  id: number;

  @Column
  name: string;

  @Column
  price: number;

  @Column
  image: string;

  @Column({
    type: DataType.JSONB,
  })
  characteristics: Object;

  @ForeignKey(() => Window)
  @Column
  window_id: number;

  @BelongsTo(() => Window)
  window: Window;

  @HasMany(() => WindowItemFeature)
  features: WindowItemFeature[];

  @HasMany(() => RequestDetail)
  requestDetails: RequestDetail[];
}
