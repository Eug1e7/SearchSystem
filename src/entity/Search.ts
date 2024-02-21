import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Search {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    hash: string;

    @Column()
    word: string;

    @Column()
    response: string;
}
