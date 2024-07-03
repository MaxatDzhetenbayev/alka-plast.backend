import {
  Column,
  Table,
  ForeignKey,
  BelongsTo,
  Model,
} from 'sequelize-typescript';
import { WindowItem } from './window-item.entity';

@Table({ timestamps: true, tableName: 'item_features' })
export class WindowItemFeature extends Model<WindowItemFeature> {
  @Column({
    primaryKey: true,
    autoIncrement: true,
    unique: true,
  })
  id: number;

  @Column
  title: string;

  @Column
  description: string;

  @ForeignKey(() => WindowItem)
  item_id: number;
  ss;

  @BelongsTo(() => WindowItem)
  item: number;
}
