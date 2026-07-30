import { v4 as uuidv4 } from 'uuid';
import {
  Entity, BeforeInsert, PrimaryColumn, Column, CreateDateColumn, UpdateDateColumn,
} from 'typeorm';

@Entity('team_members')
export class TeamMember {
  @PrimaryColumn({ type: 'varchar', length: 36 })
  id: string;

  @BeforeInsert()
  generateId() {
    this.id = uuidv4();
  }

  @Column({ length: 255 })
  nameEn: string;

  @Column({ length: 255, nullable: true })
  nameAm: string;

  @Column({ length: 255 })
  titleEn: string;

  @Column({ length: 255, nullable: true })
  titleAm: string;

  @Column('text')
  descEn: string;

  @Column('text', { nullable: true })
  descAm: string;

  @Column({ nullable: true })
  imageUrl: string;

  @Column({ length: 50, default: 'leadership' })
  category: string;

  @Column({ default: true })
  active: boolean;

  @Column({ default: 0 })
  sortOrder: number;

  @Column({ nullable: true })
  linkedinUrl: string;

  @Column({ nullable: true })
  email: string;

  @Column('json', { nullable: true })
  education: { degree: string; institution: string; year?: string; description?: string }[];

  @Column('json', { nullable: true })
  experience: { role: string; organization: string; startYear?: string; endYear?: string; description?: string }[];

  @Column('json', { nullable: true })
  certificates: { name: string; issuer: string; year?: string; url?: string }[];

  @Column('json', { nullable: true })
  awards: { title: string; year?: string; description?: string }[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
