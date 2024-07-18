import { Column, Table } from "sequelize-typescript";

@Table({modelName: 'comments', timestamps: true})
export class Comment {
    @Column({
        primaryKey: true,
        autoIncrement: true,
        unique: true,
    })
    id: number;
    
    @Column
    text: string;
    
    @Column
    image: string

    @Column
    userId: number;

    
}



