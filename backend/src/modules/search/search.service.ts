import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, ILike } from 'typeorm';
import { News } from '../../entities/news.entity';
import { Project } from '../../entities/project.entity';
import { Service } from '../../entities/service.entity';

@Injectable()
export class SearchService {
  constructor(
    @InjectRepository(News)
    private readonly newsRepository: Repository<News>,
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,
    @InjectRepository(Service)
    private readonly serviceRepository: Repository<Service>,
  ) {}

  async search(q: string) {
    if (!q.trim()) {
      return { news: [], projects: [], services: [] };
    }

    const term = `%${q}%`;

    const [news, projects, services] = await Promise.all([
      this.newsRepository.find({
        where: [
          { title: ILike(term) },
          { titleAm: ILike(term) },
          { excerpt: ILike(term) },
          { excerptAm: ILike(term) },
          { tags: ILike(term) },
          { content: ILike(term) },
          { contentAm: ILike(term) },
        ],
        order: { publishedAt: 'DESC' },
        take: 5,
      }),
      this.projectRepository.find({
        where: [
          { title: ILike(term) },
          { titleAm: ILike(term) },
          { description: ILike(term) },
          { descAm: ILike(term) },
        ],
        order: { sortOrder: 'ASC' },
        take: 5,
      }),
      this.serviceRepository.find({
        where: [
          { title: ILike(term) },
          { description: ILike(term) },
          { pillarTitle: ILike(term) },
        ],
        order: { sortOrder: 'ASC' },
        take: 5,
      }),
    ]);

    return { news, projects, services };
  }
}
