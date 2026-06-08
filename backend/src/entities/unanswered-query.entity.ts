import { v4 as uuidv4 } from 'uuid';
import {
  Entity, BeforeInsert, PrimaryColumn, Column, CreateDateColumn,
} from 'typeorm';

@Entity('unanswered_queries')
export class UnansweredQuery {
  @PrimaryColumn({ type: 'varchar', length: 36 })
  id: string;

  @BeforeInsert()
  generateId() {
    this.id = uuidv4();
  }

  @Column('text')
  query: string;

  @Column({ length: 10, default: 'en' })
  lang: string;

  @CreateDateColumn()
  createdAt: Date;
}
