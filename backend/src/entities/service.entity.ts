import { v4 as uuidv4 } from 'uuid';
import {
  Entity,
  BeforeInsert,
  PrimaryColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('services')
export class Service {
  @PrimaryColumn({ type: 'varchar', length: 36 })
  id: string;

  @BeforeInsert()
  generateId() {
    this.id = uuidv4();
  }

  @Column({ length: 100 })
  pillarKey: string;

  @Column({ length: 255 })
  pillarTitle: string;

  @Column({ type: 'text' })
  pillarDescription: string;

  @Column({ length: 255 })
  title: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'simple-array', nullable: true })
  features: string[];

  @Column({ length: 100, nullable: true })
  icon: string;

  @Column({ default: 0 })
  sortOrder: number;

  @Column({ default: true })
  active: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
