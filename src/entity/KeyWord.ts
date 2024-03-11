import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class KeyWord {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 255 })
    hash: string;

    @Column({ type: 'varchar', length: 255 })
    text: string;

    @Column({ type: 'int' })
    score: number;

    @Column({ type: 'datetime' })
    createdAt: Date;
}
