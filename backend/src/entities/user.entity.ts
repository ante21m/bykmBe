import { v4 as uuidv4 } from 'uuid';
import {
  Entity, BeforeInsert, PrimaryColumn, Column, CreateDateColumn, UpdateDateColumn,
} from 'typeorm';

@Entity('users')
export class User {
  @PrimaryColumn({ type: 'varchar', length: 36 })
  id: string;

  @BeforeInsert()
  generateId() {
    this.id = uuidv4();
  }

  @Column({ length: 100, unique: true })
  username: string;

  @Column({ length: 255 })
  password: string;

  @Column({ length: 50, default: 'admin' })
  role: string;

  @Column({ default: true })
  active: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
