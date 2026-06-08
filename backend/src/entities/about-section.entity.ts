import { v4 as uuidv4 } from 'uuid';
import {
  Entity,
  BeforeInsert,
  PrimaryColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('about_sections')
export class AboutSection {
  @PrimaryColumn({ type: 'varchar', length: 36 })
  id: string;

  @BeforeInsert()
  generateId() {
    this.id = uuidv4();
  }

  @Column({ length: 100 })
  sectionKey: string;

  @Column({ length: 255 })
  title: string;

  @Column({ length: 255, nullable: true })
  titleAm: string;

  @Column({ type: 'text' })
  content: string;

  @Column({ type: 'text', nullable: true })
  contentAm: string;

  @Column({ default: 0 })
  sortOrder: number;

  @Column({ default: true })
  active: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
