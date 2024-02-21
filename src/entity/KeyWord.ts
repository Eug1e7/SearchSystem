import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class KeyWord {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    hash: string;

    @Column()
    text: string;

    @Column()
    score: number;
}
