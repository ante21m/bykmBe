import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum ProjectStatus {
  COMPLETED = 'completed',
  ACTIVE = 'active',
  PIPELINE = 'pipeline',
}

export enum ProjectPillar {
  AGRO = 'agro',
  INFRASTRUCTURE = 'infrastructure',
  LOGISTICS = 'logistics',
  DIGITAL = 'digital',
  HOSPITALITY = 'hospitality',
}

@Entity('projects')
export class Project {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 255 })
  title: string;

  @Column({ length: 255, nullable: true })
  titleAm: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'text', nullable: true })
  descAm: string;

  @Column({ type: 'text', nullable: true })
  scope: string;

  @Column({ type: 'text', nullable: true })
  scopeAm: string;

  @Column({ type: 'text', nullable: true })
  achievement: string;

  @Column({ type: 'text', nullable: true })
  achievAm: string;

  @Column({ type: 'text', nullable: true })
  impact: string;

  @Column({ type: 'text', nullable: true })
  impactAm: string;

  @Column({
    type: 'text',
    enum: ProjectPillar,
  })
  pillar: ProjectPillar;

  @Column({
    type: 'text',
    enum: ProjectStatus,
    default: ProjectStatus.ACTIVE,
  })
  status: ProjectStatus;

  @Column({ nullable: true })
  client: string;

  @Column({ nullable: true })
  clientAm: string;

  @Column({ nullable: true })
  location: string;

  @Column({ nullable: true })
  locationAm: string;

  @Column({ nullable: true })
  startYear: number;

  @Column({ nullable: true })
  endYear: number;

  @Column({ nullable: true })
  imageUrl: string;

  @Column({ type: 'text', nullable: true })
  kpis: string;

  @Column({ default: false })
  featured: boolean;

  @Column({ default: 0 })
  sortOrder: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
