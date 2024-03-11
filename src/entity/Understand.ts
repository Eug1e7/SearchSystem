// Search-system\SearchSystemAPI\src\entity\Understand.ts

import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Understand {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 255 })
    hash: string;

    @Column({ type: 'int' })
    understandingScore: number;

    @Column({ type: 'datetime' })
    createdAt: Date;
}
