import { v4 as uuidv4 } from 'uuid';
import {
  Entity, BeforeInsert, PrimaryColumn, Column, CreateDateColumn, UpdateDateColumn,
} from 'typeorm';

@Entity('gallery')
export class Gallery {
  @PrimaryColumn({ type: 'varchar', length: 36 })
  id: string;

  @BeforeInsert()
  generateId() {
    this.id = uuidv4();
  }

  @Column({ length: 255 })
  title: string;

  @Column({ length: 255, nullable: true })
  titleAm: string;

  @Column('text', { nullable: true })
  description: string;

  @Column('text', { nullable: true })
  descAm: string;

  @Column({ nullable: true })
  imageUrl: string;

  @Column({ default: true })
  active: boolean;

  @Column({ default: false })
  featured: boolean;

  @Column({ default: 0 })
  sortOrder: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
