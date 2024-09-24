import {
  Table,
  Column,
  Model,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { UserRequest } from 'src/user-request/user-request.entity';
import { User } from 'src/users/user.entity';

@Table({ timestamps: true, tableName: 'user_reviews' })
export class UserReview extends Model<UserReview> {
  @Column({
    primaryKey: true,
    autoIncrement: true,
    unique: true,
  })
  id: number;

  @Column
  user_id: number;

  @ForeignKey(() => UserRequest)
  @Column
  user_request_id: number;

  @Column
  review: string;

  @Column
  image: string;

  @Column
  rating: number;

  @ForeignKey(() => User)
  worker_id: number;

  @Column
  createdAt: Date;

  @Column
  updatedAt: Date;

  @BelongsTo(() => User, { as: 'reviews', foreignKey: 'user_id' })
  worker: User;

  @BelongsTo(() => UserRequest)
  request: UserRequest;
}
