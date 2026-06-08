import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('about_sections')
export class AboutSection {
  @PrimaryGeneratedColumn('uuid')
  id: string;

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
