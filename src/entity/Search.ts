import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Search {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 255 })
    hash: string;

    @Column({ type: 'text' })
    question: string;

    @Column({ type: 'text' })
    response: string;

    @Column({ type: 'datetime' })
    createdAt: Date;
}
