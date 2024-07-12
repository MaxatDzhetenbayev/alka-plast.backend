import { BelongsTo, Column, ForeignKey, Model, Table } from "sequelize-typescript";
import { UserRequest } from "src/user-request/user-request.entity";

@Table({ timestamps: true, tableName: 'payments' })
export class Payment extends Model<Payment> {
    @Column({
        primaryKey: true,
        autoIncrement: true,
        unique: true,
    })
    id: number;

    @Column
    payment_intent_id: string;

    @Column
    amount: number;

    @Column
    currency: string;

    @Column
    status: string;

    @Column
    payment_method_id: string;

    @Column
    card_brand: string;

    @Column
    card_last: string;

    @Column
    receipt_url: string;

    @ForeignKey(() => UserRequest)
    @Column
    request_id: number;

    @Column
    createdAt: Date;

    @Column
    updatedAt: Date;

    @BelongsTo(() => UserRequest)
    request: UserRequest;
}




