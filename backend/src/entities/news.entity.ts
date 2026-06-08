import {
  Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn,
} from 'typeorm';

@Entity('news')
export class News {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 255 })
  title: string;

  @Column({ length: 255, nullable: true })
  titleAm: string;

  @Column('text')
  excerpt: string;

  @Column('text', { nullable: true })
  excerptAm: string;

  @Column('text')
  content: string;

  @Column('text', { nullable: true })
  contentAm: string;

  @Column({ nullable: true })
  imageUrl: string;

  @Column({ nullable: true })
  fileUrl: string;

  @Column({ nullable: true })
  fileName: string;

  @Column({ default: true })
  active: boolean;

  @Column({ default: false })
  featured: boolean;

  @Column({ nullable: true })
  author: string;

  @Column({ nullable: true })
  authorAm: string;

  @Column({ nullable: true })
  tags: string;

  @Column({ nullable: true })
  sourceUrl: string;

  @Column({ default: 0 })
  views: number;

  @Column({ default: 0 })
  sortOrder: number;

  @Column({ type: 'date', nullable: true })
  publishedAt: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
