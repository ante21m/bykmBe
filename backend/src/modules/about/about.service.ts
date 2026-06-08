import { Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AboutSection } from '../../entities/about-section.entity';

@Injectable()
export class AboutService implements OnModuleInit {
  constructor(
    @InjectRepository(AboutSection)
    private readonly aboutRepository: Repository<AboutSection>,
  ) {}

  async onModuleInit() {
    const count = await this.aboutRepository.count();
    if (count === 0) {
      await this.seed();
    }
  }

  private async seed() {
    const sections: Partial<AboutSection>[] = [
      {
        sectionKey: 'overview',
        title: 'Who We Are',
        titleAm: 'እኛ ማን ነን',
        content:
          'BYKM Trading PLC is a premier multi-sectoral Ethiopian corporation, operating at the forefront of national development and industrial transformation. Registered under the Ethiopian Company Registration Proclamation and licensed by the Ethiopian Construction Authority — Grade-4 (GC-4) in Building, Road, Water, and Electro-mechanical works — BYKM is uniquely positioned to execute complex, cross-sectoral initiatives that drive Ethiopia toward its goal of becoming an upper-middle-income nation by 2030.',
        contentAm:
          'ቢኬኤም ትሬዲንግ ኃላፊነቱ የተወሰነ የግል ማህበር በብሔራዊ ልማት እና በኢንዱስትሪ ለውጥ ግንባር ቀደም ሆኖ የሚሰራ ሁለገብ ዘርፍ የኢትዮጵያ ኮርፖሬሽን ነው።',
        sortOrder: 1,
      },
      {
        sectionKey: 'mission',
        title: 'Our Mission',
        titleAm: 'ተልእኳችን',
        content:
          'To architect and execute integrated, multi-sectoral initiatives that drive Ethiopia\'s industrial transformation — from infrastructure and agro-industrialization to global trade, digital economy, and modern consumer ecosystems — creating lasting value for stakeholders and communities.',
        contentAm:
          'የኢትዮጵያን የኢንዱስትሪ ለውጥ የሚያራምዱ የተቀናጁ ሁለገብ ዘርፍ ተነሳሽነቶችን መንደፍ እና ማስፈፀም።',
        sortOrder: 2,
      },
      {
        sectionKey: 'vision',
        title: 'Our Vision',
        titleAm: 'ራዕያችን',
        content:
          'To be Ethiopia\'s most trusted and innovative multi-sectoral corporation, recognized globally for engineering integrated solutions that build national prosperity.',
        contentAm:
          'በኢትዮጵያ ውስጥ በጣም ታማኝ እና ፈጠራ ያለው ሁለገብ ዘርፍ ኮርፖሬሽን ለመሆን።',
        sortOrder: 3,
      },
      {
        sectionKey: 'values',
        title: 'Our Values',
        titleAm: 'እሴቶቻችን',
        content:
          'Integrity, Innovation, Excellence, Sustainability, and Partnership — these five core values guide every decision and define every relationship.',
        contentAm:
          'ታማኝነት፣ ፈጠራ፣ የላቀ ደረጃ፣ ዘላቂነት እና አጋርነት — እነዚህ አምስት ዋና እሴቶች በየውሳኔያችን ይመሩናል።',
        sortOrder: 4,
      },
      {
        sectionKey: 'history',
        title: 'Our Story',
        titleAm: 'ታሪካችን',
        content:
          'Founded with a vision to participate in Ethiopia\'s transformative growth, BYKM Trading PLC has rapidly established itself across five strategic pillars. From mega-corridor infrastructure projects in Addis Ababa to coffee value chain development, our portfolio demonstrates a commitment to national industrial sovereignty.',
        contentAm:
          'በኢትዮጵያ የትራንስፎርሜሽን እድገት ውስጥ ለመሳተፍ በራዕይ የተመሰረተው ቢኬኤም ትሬዲንግ ኃላፊነቱ የተወሰነ የግል ማህበር በአምስት ስትራቴጂካዊ ምሰሶዎች ላይ በፍጥነት መመስረት ችሏል።',
        sortOrder: 5,
      },
    ];
    await this.aboutRepository.save(sections);
  }

  async findAll(): Promise<AboutSection[]> {
    return this.aboutRepository.find({
      order: { sortOrder: 'ASC' },
    });
  }

  async findOne(id: string): Promise<AboutSection> {
    const section = await this.aboutRepository.findOne({ where: { id } });
    if (!section) throw new NotFoundException(`About section ${id} not found`);
    return section;
  }

  async create(data: Partial<AboutSection>): Promise<AboutSection> {
    const section = this.aboutRepository.create(data);
    return this.aboutRepository.save(section);
  }

  async update(id: string, data: Partial<AboutSection>): Promise<AboutSection> {
    await this.findOne(id);
    await this.aboutRepository.update(id, data);
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.findOne(id);
    await this.aboutRepository.delete(id);
  }
}
