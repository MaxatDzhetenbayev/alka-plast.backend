import { Column, HasMany, Table, Model } from 'sequelize-typescript';
import { WindowItem } from './window-item.entity';

@Table({ timestamps: true, tableName: 'windows' })
export class Window extends Model<Window> {
  @Column({
    primaryKey: true,
    autoIncrement: true,
    unique: true,
  })
  id: number;

  @Column
  name: string;

  @Column
  description: string;

  @HasMany(() => WindowItem)
  items: WindowItem[];
}
