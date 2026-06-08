import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  ContactSubmission,
  SubmissionStatus,
} from '../../entities/contact-submission.entity';
import { CreateContactDto } from './dto/create-contact.dto';

@Injectable()
export class ContactService {
  constructor(
    @InjectRepository(ContactSubmission)
    private readonly contactRepository: Repository<ContactSubmission>,
  ) {}

  async create(createContactDto: CreateContactDto): Promise<ContactSubmission> {
    const submission = this.contactRepository.create({
      ...createContactDto,
      newsletterConsent: createContactDto.newsletterConsent ?? false,
    });
    return this.contactRepository.save(submission);
  }

  async findAll(
    page = 1,
    limit = 20,
    status?: SubmissionStatus,
  ): Promise<{ data: ContactSubmission[]; total: number; page: number; limit: number }> {
    const query = this.contactRepository.createQueryBuilder('submission');

    if (status) {
      query.where('submission.status = :status', { status });
    }

    query
      .orderBy('submission.createdAt', 'DESC')
      .skip((page - 1) * limit)
      .take(limit);

    const [data, total] = await query.getManyAndCount();
    return { data, total, page, limit };
  }

  async findOne(id: string): Promise<ContactSubmission> {
    const submission = await this.contactRepository.findOne({ where: { id } });
    if (!submission) {
      throw new NotFoundException(`Contact submission ${id} not found`);
    }
    return submission;
  }

  async updateStatus(
    id: string,
    status: SubmissionStatus,
  ): Promise<ContactSubmission> {
    const submission = await this.findOne(id);
    submission.status = status;
    return this.contactRepository.save(submission);
  }

  async getStats(): Promise<Record<string, number>> {
    const stats = await this.contactRepository
      .createQueryBuilder('s')
      .select('s.status', 'status')
      .addSelect('COUNT(*)', 'count')
      .groupBy('s.status')
      .getRawMany();

    return stats.reduce(
      (acc, { status, count }) => ({ ...acc, [status]: Number(count) }),
      {},
    );
  }
}
