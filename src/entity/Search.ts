import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Search {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    hash: string;

    @Column()
    question: string;

    @Column()
    response: string;

    @Column()
    score: number;

    @Column()
    createdAt: Date;
}
