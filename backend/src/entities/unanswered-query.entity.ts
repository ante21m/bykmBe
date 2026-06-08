import {
  Entity, PrimaryGeneratedColumn, Column, CreateDateColumn,
} from 'typeorm';

@Entity('unanswered_queries')
export class UnansweredQuery {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  query: string;

  @Column({ length: 10, default: 'en' })
  lang: string;

  @CreateDateColumn()
  createdAt: Date;
}
