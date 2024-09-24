import { UserRequest } from 'src/user-request/user-request.entity';
import {
  Column,
  DataType,
  HasMany,
  Table,
  Model,
  HasOne,
} from 'sequelize-typescript';
import { UserReview } from 'src/user-reviews/entities/user-review.entity';
import { Profile } from 'src/profile/entities/profile.entity';

@Table({
  timestamps: true,
  tableName: 'users',
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

  @Column
  email: string;

  @HasOne(() => Profile, { as: 'profile', foreignKey: 'user_id' })
  profile: Profile;

  @Column({
    type: DataType.ARRAY(DataType.STRING),
  })
  roles: string[];

  @HasMany(() => UserRequest)
  requests: UserRequest[];

  @HasMany(() => UserReview, { as: 'user_reviews', foreignKey: 'worker_id' })
  reviews: UserReview[];
}
