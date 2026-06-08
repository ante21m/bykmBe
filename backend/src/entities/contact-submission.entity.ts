import { v4 as uuidv4 } from 'uuid';
import {
  Entity,
  BeforeInsert,
  PrimaryColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum InquiryType {
  PARTNERSHIP = 'partnership',
  CONSTRUCTION = 'construction',
  TRADE = 'trade',
  CAREERS = 'careers',
  GENERAL = 'general',
}

export enum SubmissionStatus {
  PENDING = 'pending',
  READ = 'read',
  REPLIED = 'replied',
  ARCHIVED = 'archived',
}

@Entity('contact_submissions')
export class ContactSubmission {
  @PrimaryColumn({ type: 'varchar', length: 36 })
  id: string;

  @BeforeInsert()
  generateId() {
    this.id = uuidv4();
  }

  @Column({ length: 100 })
  firstName: string;

  @Column({ length: 100 })
  lastName: string;

  @Column({ length: 255 })
  email: string;

  @Column({ length: 20, nullable: true })
  phone: string;

  @Column({ length: 150, nullable: true })
  organization: string;

  @Column({ length: 100, nullable: true })
  country: string;

  @Column({
    type: 'text',
    enum: InquiryType,
    default: InquiryType.GENERAL,
  })
  inquiryType: InquiryType;

  @Column({ length: 255 })
  subject: string;

  @Column({ type: 'text' })
  message: string;

  @Column({
    type: 'text',
    enum: SubmissionStatus,
    default: SubmissionStatus.PENDING,
  })
  status: SubmissionStatus;

  @Column({ default: false })
  newsletterConsent: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
