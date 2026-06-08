import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UnansweredQuery } from '../../entities/unanswered-query.entity';

@Injectable()
export class UnansweredQueriesService {
  constructor(
    @InjectRepository(UnansweredQuery)
    private readonly repo: Repository<UnansweredQuery>,
  ) {}

  async create(data: Partial<UnansweredQuery>): Promise<UnansweredQuery> {
    const item = this.repo.create(data);
    return this.repo.save(item);
  }

  async findAll(page = 1, limit = 20): Promise<{ data: UnansweredQuery[]; total: number; page: number; limit: number }> {
    const [data, total] = await this.repo.findAndCount({
      order: { createdAt: 'DESC' },
      skip: (page - 1) * limit,
      take: limit,
    });
    return { data, total, page, limit };
  }

  async remove(id: string): Promise<void> {
    await this.repo.delete(id);
  }
}
