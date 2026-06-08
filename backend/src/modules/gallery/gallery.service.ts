import { v4 as uuidv4 } from 'uuid';
import { Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Gallery } from '../../entities/gallery.entity';

@Injectable()
export class GalleryService implements OnModuleInit {
  constructor(
    @InjectRepository(Gallery)
    private readonly galleryRepository: Repository<Gallery>,
  ) {}

  async onModuleInit() {
    const count = await this.galleryRepository.count();
    if (count === 0) {
      await this.seedGallery();
    }
  }

  private async seedGallery() {
    const items: Partial<Gallery>[] = [
      {
        title: 'Addis Ababa Mega-Corridor Project',
        titleAm: 'የአዲስ አበባ ሜጋ ኮሪደር ፕሮጀክት',
        description: '20.5km integrated urban corridor development, completed 15 days ahead of schedule.',
        descAm: 'የ20.5 ኪሎ ሜትር የተቀናጀ የከተማ ኮሪደር ልማት፣ ከቀጠሮው 15 ቀናት ቀደም ብሎ የተጠናቀቀ።',
        active: true,
        featured: true,
        sortOrder: 1,
      },
      {
        title: 'Green Legacy Riverside Restoration',
        titleAm: 'አረንጓዴ አሻራ የወንዝ ዳር መልሶ ማቋቋም',
        description: 'Over 50,000 sqm of indigenous flora integrated with civil engineering infrastructure.',
        descAm: 'ከ50,000 ካሬ ሜትር በላይ የሀገር በቀል እፅዋት ከሲቪል ምህንድስና መሠረተ ልማት ጋር የተዋሃደ።',
        active: true,
        featured: true,
        sortOrder: 2,
      },
      {
        title: 'Coffee Export Initiative Facility',
        titleAm: 'የቡና ኤክስፖርት ተነሳሽነት ፋሲሊቲ',
        description: 'Integrated roasting and packaging facility for premium Ethiopian coffee exports.',
        descAm: 'ለፕሪሚየም የኢትዮጵያ ቡና ኤክስፖርት የተቀናጀ የማብሰያ እና ማሸጊያ ፋሲሊቲ።',
        active: true,
        featured: false,
        sortOrder: 3,
      },
    ];

    await this.galleryRepository.save(
      items.map((item) => ({ ...item, id: uuidv4() })),
    );
  }

  async findAll(active?: boolean): Promise<Gallery[]> {
    const where: any = {};
    if (active !== undefined) where.active = active;
    return this.galleryRepository.find({
      where,
      order: { sortOrder: 'ASC' },
    });
  }

  async findOne(id: string): Promise<Gallery> {
    const item = await this.galleryRepository.findOne({ where: { id } });
    if (!item) throw new NotFoundException(`Gallery ${id} not found`);
    return item;
  }

  async create(data: Partial<Gallery>): Promise<Gallery> {
    const item = this.galleryRepository.create(data);
    return this.galleryRepository.save(item);
  }

  async update(id: string, data: Partial<Gallery>): Promise<Gallery> {
    await this.findOne(id);
    await this.galleryRepository.update(id, data);
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.findOne(id);
    await this.galleryRepository.delete(id);
  }
}
