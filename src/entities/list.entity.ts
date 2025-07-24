import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn} from 'typeorm';

@Entity()

export class List {
    @PrimaryGeneratedColumn()
    id: string;

    @Column()
    title: string

    @Column()
    description: string

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}