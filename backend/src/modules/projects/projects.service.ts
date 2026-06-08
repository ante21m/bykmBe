import { v4 as uuidv4 } from 'uuid';
import { Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  Project,
  ProjectStatus,
  ProjectPillar,
} from '../../entities/project.entity';

@Injectable()
export class ProjectsService implements OnModuleInit {
  constructor(
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,
  ) {}

  async onModuleInit() {
    const count = await this.projectRepository.count();
    if (count === 0) {
      await this.seedProjects();
    }
  }

  private async seedProjects() {
    const projects: Partial<Project>[] = [
      {
        title: 'Addis Ababa Mega-Corridor Infrastructure Project',
        titleAm: 'የአዲስ አበባ ሜጋ-ኮሪደር መሠረተ ልማት ፕሮጀክት',
        description:
          "Full-scale urban redevelopment of the capital's Central Business District, redefining urban aesthetics and pedestrian functionality.",
        descAm:
          'የዋና ከተማዋን ማዕከላዊ ቢዝነስ ዲስትሪክት ሙሉ የከተማ መልሶ ማልማት።',
        scope:
          'Full-scale urban redevelopment, pedestrian corridor installation, and utility relocation across the CBD.',
        scopeAm:
          'ሙሉ የከተማ መልሶ ማልማት፣ የእግረኛ ኮሪደር መትከል እና ውስብስብ የከርሰ ምድር የፍጆታ አገልግሎት ማስተላለፍ።',
        achievement:
          'Installed 20.5km of high-durability integrated corridors and modern urban furniture, finishing 15 days ahead of the national deadline.',
        achievAm:
          '20.5 ኪሎ ሜትር የተቀናጁ ኮሪደሮችን ጭኖ፣ ከቀጠሮው 15 ቀናት ቀደም ብሎ አጠናቋል።',
        impact:
          "Redefined urban aesthetics and pedestrian functionality for Addis Ababa's Central Business District.",
        impactAm:
          'ለአዲስ አበባ ማዕከላዊ ቢዝነስ ዲስትሪክት የከተማ ውበት እና የእግረኛ ተግባርን አዳዲስ ትርጉም ሰጥቷል።',
        pillar: ProjectPillar.INFRASTRUCTURE,
        status: ProjectStatus.COMPLETED,
        client: 'Addis Ababa City Administration',
        clientAm: 'የአዲስ አበባ ከተማ አስተዳደር',
        location: 'Addis Ababa, Ethiopia',
        locationAm: 'አዲስ አበባ፣ ኢትዮጵያ',
        startYear: 2020,
        endYear: 2022,
        kpis: JSON.stringify([
          { val: '20.5 km', labelEn: 'Corridors', labelAm: 'ኮሪደሮች' },
          { val: '24/7', labelEn: 'Ops Cycle', labelAm: 'የኦፕስ ዑደት' },
          { val: '−15 days', labelEn: 'Early', labelAm: 'ቀደም' },
        ]),
        featured: true,
        sortOrder: 1,
      },
      {
        title: 'Green Legacy Riverside Restoration',
        titleAm: 'አረንጓዴ አሻራ የወንዝ ዳር መልሶ ማቋቋም',
        description:
          'Ecological stabilization of erosion-prone waterways and transformation into vibrant Urban Green Lungs.',
        descAm:
          'ለአፈር መሸርሸር የተጋለጡ የውሃ መስመሮች ወደ ከተማ አረንጓዴ ሳንባዎች የተለወጠ ሥነ-ምህዳር መረጋጋት።',
        scope:
          'Ecological stabilization of erosion-prone waterways integrating indigenous flora with heavy-duty masonry and flood-protection systems.',
        scopeAm:
          'የሀገር በቀል እፅዋትን ከከባድ የድንጋይ ግንባታ እና የጎርፍ መከላከያ ዘዴዎች ጋር በማዋሃድ ሥነ-ምህዳራዊ መረጋጋት።',
        achievement:
          'Integrated 50,000+ sqm of indigenous flora with heavy-duty civil masonry across riverside areas.',
        achievAm:
          'ከ50,000 ካሬ ሜትር በላይ የሀገር በቀል እፅዋትን ከከባድ ሲቪል ድንጋይ ግንባታ ጋር አዋህዷል።',
        impact:
          "Transformed neglected waterways into stabilized, vibrant Urban Green Lungs contributing to Ethiopia's Green Legacy Initiative.",
        impactAm:
          'የተረሱ የውሃ መስመሮችን ወደ ተረጋጋ፣ ሕያው የከተማ አረንጓዴ ሳንባዎች በመቀየር ለኢትዮጵያ አረንጓዴ አሻራ ተነሳሽነት አስተዋጽኦ አድርጓል።',
        pillar: ProjectPillar.INFRASTRUCTURE,
        status: ProjectStatus.COMPLETED,
        client: 'Federal Ministry of Urban Development',
        clientAm: 'የፌደራል ከተማ ልማት ሚኒስቴር',
        location: 'Addis Ababa, Ethiopia',
        locationAm: 'አዲስ አበባ፣ ኢትዮጵያ',
        startYear: 2019,
        endYear: 2021,
        kpis: JSON.stringify([
          { val: '50,000+', labelEn: 'sqm Flora', labelAm: 'ካሬ ሜ እፅዋት' },
          { val: '100%', labelEn: 'Green Aligned', labelAm: 'አረንጓዴ የተስተካከለ' },
          { val: '2 years', labelEn: 'Duration', labelAm: 'ቆይታ' },
        ]),
        featured: true,
        sortOrder: 2,
      },
      {
        title: 'Coffee Export Initiative',
        titleAm: 'የቡና ኤክስፖርት ተነሳሽነት',
        description:
          'Development of an integrated roasting and packaging facility to transition Ethiopia from raw bean export to high-value finished coffee products.',
        descAm: 'ለፕሪሚየም ቡና ኤክስፖርት የተቀናጀ የማብሰያ እና ማሸጊያ ፋሲሊቲ።',
        scope:
          'Full coffee value chain facility including industrial roasting, premium packaging, and international export logistics.',
        scopeAm:
          'ሙሉ የቡና እሴት ሰንሰለት ፋሲሊቲ፦ የማብሰያ መስመሮች፣ ማሸጊያ፣ የምስክር ወረቀት ላቦራቶሪዎች፣ የኤክስፖርት ሎጂስቲክስ።',
        achievement: 'In active development phase targeting premium global markets.',
        achievAm: 'የፋሲሊቲ ዲዛይን ተጠናቋል፤ የመሳሪያ ግዥ በሂደት ላይ።',
        impact:
          "Maximizing Ethiopia's foreign exchange earnings through value-added coffee exports.",
        impactAm:
          'ኢትዮጵያ ጥሬ ቡና ከመላክ ወደ ከፍተኛ ዋጋ ያለው የተጠናቀቀ ቡና ምርት እንድትሸጋገር ማድረግ።',
        pillar: ProjectPillar.AGRO,
        status: ProjectStatus.ACTIVE,
        client: 'Internal Initiative',
        clientAm: 'የውስጥ ስትራቴጂካዊ ተነሳሽነት',
        location: 'Addis Ababa, Ethiopia',
        locationAm: 'አዲስ አበባ፣ ኢትዮጵያ',
        startYear: 2024,
        kpis: JSON.stringify([
          { val: 'Active', labelEn: 'Phase', labelAm: 'ምዕራፍ' },
          { val: '2024–', labelEn: 'Timeline', labelAm: 'የጊዜ ሰሌዳ' },
          { val: 'Global', labelEn: 'Markets', labelAm: 'ገበያዎች' },
        ]),
        featured: true,
        sortOrder: 3,
      },
      {
        title: 'Digital Infrastructure & Smart City Pivot',
        titleAm: 'ዲጂታል መሠረተ ልማት እና ስማርት ከተማ ማዞሪያ',
        description:
          'Launching specialized ICT consultancy and network services providing Smart City solutions for emerging urban centers.',
        descAm:
          'ለስማርት ከተማ መፍትሄዎች አይሲቲ አማካሪነት እና አውታረ መረብ መሠረተ ልማት።',
        scope:
          'ICT network infrastructure development, smart city solutions, and digital logistics management systems.',
        scopeAm:
          'የአይሲቲ አውታረ መረብ ልማት፣ ስማርት ከተማ መፍትሄዎች፣ ዲጂታል ሎጂስቲክስ፣ የሰው ኃይል ስልጠና።',
        achievement: 'Framework established; pilot deployments underway.',
        achievAm: 'ማዕቀፍ ተቋቁሟል፤ የሙከራ ማሰማራቶች በመከናወን ላይ።',
        impact:
          'Modernizing Ethiopian business operations and positioning the nation for Industry 4.0.',
        impactAm:
          'የኢትዮጵያን የንግድ ሥራ ዘመናዊ በማድረግ እና አገሪቱን ለኢንዱስትሪ 4.0 ማስቀመጥ።',
        pillar: ProjectPillar.DIGITAL,
        status: ProjectStatus.ACTIVE,
        client: 'Multiple Urban Clients',
        clientAm: 'የተለያዩ የከተማ ደንበኞች',
        location: 'Ethiopia (Nationwide)',
        locationAm: 'ኢትዮጵያ (ሀገር አቀፍ)',
        startYear: 2024,
        kpis: JSON.stringify([
          { val: 'Pilot', labelEn: 'Stage', labelAm: 'ደረጃ' },
          { val: 'National', labelEn: 'Coverage', labelAm: 'ሽፋን' },
          { val: 'Ind. 4.0', labelEn: 'Vision', labelAm: 'ራዕይ' },
        ]),
        featured: false,
        sortOrder: 4,
      },
      {
        title: 'Industrial Value-Addition Hubs',
        titleAm: 'የኢንዱስትሪ እሴት ተጨማሪ ማዕከላት',
        description:
          'Establishing regional processing plants for minerals and agricultural inputs targeting 40% local value-addition by 2027.',
        descAm:
          'ለማዕድን እና የግብርና ግብዓቶች የክልል ማቀነባበሪያ ፋብሪካዎች።',
        scope:
          'Regional processing plants for minerals, agricultural inputs, and manufactured goods across Ethiopia.',
        scopeAm:
          'ለማዕድን፣ ቅባት እህሎች፣ ጥራጥሬዎች እና የተመረቱ ምርቶች የክልል ማቀነባበሪያ ፋብሪካዎች።',
        achievement: 'Site selection and feasibility studies complete.',
        achievAm: 'የጣቢያ ምርጫ ተጠናቋል፤ የአዋጭነት ጥናቶች ተጠናቀዋል።',
        impact:
          'Reducing import reliance and advancing industrial sovereignty across the Ethiopian economy.',
        impactAm:
          'የኢትዮጵያ ኢኮኖሚ የማምረት ሉዓላዊነትን ማሳደግ እና የውጭ ጥገኝነትን መቀነስ።',
        pillar: ProjectPillar.AGRO,
        status: ProjectStatus.PIPELINE,
        client: 'Internal Initiative',
        clientAm: 'የውስጥ ስትራቴጂካዊ ተነሳሽነት',
        location: 'Multiple Regions, Ethiopia',
        locationAm: 'በርካታ ክልሎች፣ ኢትዮጵያ',
        startYear: 2025,
        endYear: 2027,
        kpis: JSON.stringify([
          { val: '40%', labelEn: 'Value-Add', labelAm: 'እሴት-ተጨማሪ' },
          { val: '2 sites', labelEn: 'Regions', labelAm: 'ክልሎች' },
          { val: '2027', labelEn: 'Delivery', labelAm: 'አቅርቦት' },
        ]),
        featured: false,
        sortOrder: 5,
      },
      {
        title: 'Tiered Retail Network Expansion',
        titleAm: 'ደረጃ የተከፋፈለ የችርቻሮ አውታር መስፋፊያ',
        description:
          'Designing a tiered rollout of Hypermarkets and Supermarkets to streamline the distribution of Made in Ethiopia consumer goods.',
        descAm:
          'ደረጃ በደረጃ የሃይፐርማርኬት እና ሱፐርማርኬት መዘርጋት።',
        scope:
          'Multi-format retail network from mini-markets to hypermarkets, built on Ethiopian supply chain integration.',
        scopeAm:
          'ከሚኒ-ማርኬት እስከ ሃይፐርማርኬት ድረስ ባለ ብዙ ቅርጸት የችርቻሮ አውታር።',
        achievement: 'Business plan finalized; first location identified.',
        achievAm: 'የንግድ እቅድ ተጠናቋል፤ የመጀመሪያ ቦታ ተለይቷል።',
        impact: 'Elevating standards of living and consumption for Modern Ethiopia.',
        impactAm: 'ለዘመናዊቷ ኢትዮጵያ የኑሮ ደረጃ እና የፍጆታ ደረጃን ማሳደግ።',
        pillar: ProjectPillar.HOSPITALITY,
        status: ProjectStatus.PIPELINE,
        client: 'Internal Initiative',
        clientAm: 'የውስጥ ስትራቴጂካዊ ተነሳሽነት',
        location: 'Addis Ababa & Regional Cities',
        locationAm: 'አዲስ አበባ እና የክልል ከተሞች',
        startYear: 2025,
        endYear: 2028,
        kpis: JSON.stringify([
          { val: 'Planning', labelEn: 'Phase', labelAm: 'ምዕራፍ' },
          { val: '3-format', labelEn: 'Tiers', labelAm: 'ደረጃዎች' },
          { val: '2025–28', labelEn: 'Rollout', labelAm: 'መዘርጋት' },
        ]),
        featured: false,
        sortOrder: 6,
      },
    ];

    await this.projectRepository.save(
      projects.map((p) => ({ ...p, id: uuidv4() })),
    );
  }

  async findAll(pillar?: ProjectPillar, status?: ProjectStatus): Promise<Project[]> {
    const query = this.projectRepository.createQueryBuilder('project');

    if (pillar) query.andWhere('project.pillar = :pillar', { pillar });
    if (status) query.andWhere('project.status = :status', { status });

    return query.orderBy('project.sortOrder', 'ASC').getMany();
  }

  async findFeatured(): Promise<Project[]> {
    return this.projectRepository.find({
      where: { featured: true },
      order: { sortOrder: 'ASC' },
    });
  }

  async findOne(id: string): Promise<Project> {
    const project = await this.projectRepository.findOne({ where: { id } });
    if (!project) throw new NotFoundException(`Project ${id} not found`);
    return project;
  }

  async create(data: Partial<Project>): Promise<Project> {
    const project = this.projectRepository.create(data);
    return this.projectRepository.save(project);
  }

  async update(id: string, data: Partial<Project>): Promise<Project> {
    await this.findOne(id);
    await this.projectRepository.update(id, data);
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.findOne(id);
    await this.projectRepository.delete(id);
  }
}
