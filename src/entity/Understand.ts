// Search-system\SearchSystemAPI\src\entity\Understand.ts

import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Understand {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    hash: string;

    @Column()
    understandingScore: number;

    @Column()
    createdAt: Date;
}
