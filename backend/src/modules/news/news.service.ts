import { Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { News } from '../../entities/news.entity';

@Injectable()
export class NewsService implements OnModuleInit {
  constructor(
    @InjectRepository(News)
    private readonly newsRepository: Repository<News>,
  ) {}

  async onModuleInit() {
    const count = await this.newsRepository.count();
    if (count === 0) {
      await this.seedNews();
    }
  }

  private async seedNews() {
    const items: Partial<News>[] = [
      {
        title: 'BYKM Completes Addis Ababa Mega-Corridor Project Ahead of Schedule',
        titleAm: 'ቢኬኤም የአዲስ አበባ ሜጋ ኮሪደር ፕሮጀክትን ከጊዜ በፊት አጠናቀቀ',
        author: 'BYKM Communications Team',
        authorAm: 'የቢኬኤም ኮሙዩኒኬሽን ቡድን',
        tags: 'infrastructure, urban development, addis ababa, corridor',
        excerpt: 'The 20.5km integrated corridor project finished 15 days ahead of the national deadline, setting a new benchmark for urban infrastructure delivery in Ethiopia.',
        excerptAm: 'የ20.5 ኪሎ ሜትር የተቀናጀ ኮሪደር ፕሮጀክት ከብሔራዊ ቀጠሮ 15 ቀናት ቀደም ብሎ ተጠናቋል።',
        content: 'BYKM Trading PLC has successfully completed the Addis Ababa Mega-Corridor Infrastructure Project, a landmark urban redevelopment initiative spanning the capital\'s Central Business District. The project, which involved the installation of 20.5km of high-durability integrated corridors, modern urban furniture, and comprehensive utility relocation, was finished 15 days ahead of schedule.\n\n"This achievement reflects the engineering mindset that defines BYKM," said the project lead. "We approached every phase — from logistics to construction — with the precision of a mega-infrastructure operation."\n\nThe project is part of a broader national urbanization strategy and has already redefined pedestrian functionality and urban aesthetics in Addis Ababa.',
        contentAm: 'ቢኬኤም ትሬዲንግ ኃላፊነቱ የተወሰነ የግል ማህበር የአዲስ አበባ ሜጋ ኮሪደር መሠረተ ልማት ፕሮጀክትን በተሳካ ሁኔታ አጠናቋል። ይህ ፕሮጀክት 20.5 ኪሎ ሜትር ከፍተኛ ጥንካሬ ያላቸውን የተቀናጁ ኮሪደሮችን መትከልን ያካተተ ሲሆን ከቀጠሮው 15 ቀናት ቀደም ብሎ ተጠናቋል።',
        views: 1247,
        active: true,
        featured: true,
        sortOrder: 1,
        publishedAt: '2026-01-15',
      },
      {
        title: 'BYKM Partners with Federal Ministry on Green Legacy Riverside Project',
        titleAm: 'ቢኬኤም ከፌደራል ሚኒስቴር ጋር በአረንጓዴ አሻራ የወንዝ ዳር ፕሮጀክት ተባብሯል',
        author: 'Sustainability Desk',
        authorAm: 'የዘላቂነት ዴስክ',
        tags: 'environment, green legacy, riverside, sustainability',
        excerpt: 'Over 50,000 sqm of indigenous flora integrated with heavy-duty civil masonry as part of Ethiopia\'s National Green Legacy Initiative.',
        excerptAm: 'ከ50,000 ካሬ ሜትር በላይ የሀገር በቀል እፅዋት ከከባድ ሲቪል ድንጋይ ግንባታ ጋር ተዋህዷል።',
        content: 'BYKM Trading PLC, in partnership with the Federal Ministry of Urban Development, has completed the Green Legacy Riverside Restoration project. This ecological initiative transformed erosion-prone waterways into stabilized Urban Green Lungs, integrating over 50,000 sqm of indigenous flora with heavy-duty civil masonry and flood-protection systems.\n\nThe project directly supports Ethiopia\'s National Green Legacy Initiative and demonstrates BYKM\'s commitment to environmental stewardship alongside industrial development.',
        contentAm: 'ቢኬኤም ትሬዲንግ ኃላፊነቱ የተወሰነ የግል ማህበር ከፌደራል ከተማ ልማት ሚኒስቴር ጋር በመተባበር የአረንጓዴ አሻራ የወንዝ ዳር መልሶ ማቋቋም ፕሮጀክትን አጠናቋል።',
        views: 892,
        active: true,
        featured: true,
        sortOrder: 2,
        publishedAt: '2025-11-20',
      },
      {
        title: 'BYKM Launches Coffee Export Initiative for Premium Global Markets',
        titleAm: 'ቢኬኤም ለፕሪሚየም ዓለም አቀፍ ገበያ የቡና ኤክስፖርት ተነሳሽነት ጀመረ',
        author: 'Trade & Commerce Editor',
        authorAm: 'የንግድ እና ኮሜርስ አዘጋጅ',
        tags: 'coffee, export, trade, agriculture, value-add',
        excerpt: 'New integrated roasting and packaging facility will transition Ethiopia from raw bean export to high-value finished coffee products.',
        excerptAm: 'አዲስ የተቀናጀ የማብሰያ እና ማሸጊያ ፋሲሊቲ ኢትዮጵያን ከጥሬ ቡና ወደ ከፍተኛ ዋጋ ያለው የተጠናቀቀ ቡና ምርት ያሸጋግራል።',
        content: 'BYKM Trading PLC has announced the launch of its Coffee Export Initiative, a strategic venture aimed at maximizing Ethiopia\'s foreign exchange earnings through value-added coffee exports. The centerpiece of the initiative is an integrated roasting and packaging facility currently in active development.\n\nThe facility will feature industrial-scale roasting lines, premium packaging capabilities, certification laboratories, and dedicated export logistics — covering the full coffee value chain.',
        contentAm: 'ቢኬኤም ትሬዲንግ ኃላፊነቱ የተወሰነ የግል ማህበር የቡና ኤክስፖርት ተነሳሽነቱን ይፋ አድርጓል።',
        views: 563,
        active: true,
        featured: false,
        sortOrder: 3,
        publishedAt: '2025-09-10',
      },
    ];

    await this.newsRepository.save(items);
  }

  async findAll(active?: boolean): Promise<News[]> {
    const where: any = {};
    if (active !== undefined) where.active = active;
    return this.newsRepository.find({
      where,
      order: { sortOrder: 'ASC', publishedAt: 'DESC' },
    });
  }

  async findFeatured(): Promise<News[]> {
    return this.newsRepository.find({
      where: { featured: true, active: true },
      order: { sortOrder: 'ASC' },
    });
  }

  async findOne(id: string): Promise<News> {
    const item = await this.newsRepository.findOne({ where: { id } });
    if (!item) throw new NotFoundException(`News ${id} not found`);
    return item;
  }

  async create(data: Partial<News>): Promise<News> {
    const item = this.newsRepository.create({ ...data, publishedAt: new Date().toISOString().split('T')[0] });
    return this.newsRepository.save(item);
  }

  async update(id: string, data: Partial<News>): Promise<News> {
    await this.findOne(id);
    await this.newsRepository.update(id, data);
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.findOne(id);
    await this.newsRepository.delete(id);
  }
}
