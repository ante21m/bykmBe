import { v4 as uuidv4 } from 'uuid';
import { Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HomeSection } from '../../entities/home-content.entity';

@Injectable()
export class HomeService implements OnModuleInit {
  constructor(
    @InjectRepository(HomeSection)
    private readonly homeRepository: Repository<HomeSection>,
  ) {}

  async onModuleInit() {
    const count = await this.homeRepository.count();
    if (count === 0) {
      await this.seed();
    }
  }

  private async seed() {
    const sections: Partial<HomeSection>[] = [
      {
        sectionKey: 'heroSection',
        title: 'Hero Section',
        titleAm: 'የመግቢያ ክፍል',
        content: JSON.stringify({
          edition: '',
          motto: 'Architecting Ethiopian Integrated Future!',
          line1: 'The Blueprint for',
          line2: '',
          typeWords: '',
          desc: 'Architecting Ethiopia\'s integrated future through four strategic pillars of industrial excellence, environmental stewardship, and economic resilience.',
          discoverBtn: 'Discover BYKM',
          viewProjectsBtn: 'View Projects',
          bgImage: '',
        }),
        contentAm: JSON.stringify({
          edition: '',
          motto: 'የኢትዮጵያን የተቀናጀ የወደፊት እድገት በማነድፍ ላይ!',
          line1: 'ብሉፕሪንቱ',
          line2: '',
          typeWords: '',
          desc: 'የኢትዮጵያን የተቀናጀ የወደፊት እድገት በማነድፍ በአራት ስትራቴጂካዊ ምሰሶዎች፡ የኢንዱስትሪ የላቀነት፣ የአካባቢ ጥበቃ እና ኢኮኖሚያዊ መቋቋም።',
          discoverBtn: 'ቢዋይኬኤምን ያውቁ',
          viewProjectsBtn: 'ፕሮጀክቶችን ይመልከቱ',
        }),
        sortOrder: 1,
      },
      {
        sectionKey: 'heroStatistics',
        title: 'Hero Statistics',
        titleAm: 'የስታቲስቲክስ አሃዞች',
        content: JSON.stringify([]),
        contentAm: null,
        sortOrder: 2,
      },
      {
        sectionKey: 'mission',
        title: 'Engineering Mindset Section',
        titleAm: 'የምህንድስና አስተሳሰብ ክፍል',
        content: JSON.stringify({
          label: 'Who We Are',
          title: 'Our Engineering Mindset',
        }),
        contentAm: JSON.stringify({
          label: 'እኛ ማን ነን',
          title: 'የምህንድስና አስተሳሰባችን',
        }),
        sortOrder: 3,
      },
      {
        sectionKey: 'pillars',
        title: 'Pillars Section',
        titleAm: 'የምሰሶዎች ክፍል',
        content: JSON.stringify({
          label: 'Our Strategic Pillars',
          title: 'Four Pillars of Impact',
          desc: 'BYKM operates across four interconnected strategic pillars, each representing a core sector of Ethiopia\'s industrial transformation agenda.',
          explore: 'Explore pillar services',
          pillarsData: [
            { key: 'infra', tagline: 'Building the backbone of modern Ethiopia', exploreLabel: 'Infrastructure' },
            { key: 'logistics', tagline: 'Connecting Ethiopia to the world', exploreLabel: 'Logistics' },
            { key: 'hospitality', tagline: 'Redefining Ethiopian hospitality', exploreLabel: 'Hospitality' },
            { key: 'agro', tagline: 'From farm to global markets', exploreLabel: 'Agro Services' },
          ],
        }),
        contentAm: JSON.stringify({
          label: 'ስትራቴጂካዊ ምሰሶዎቻችን',
          title: 'አራት የተፅእኖ ምሰሶዎች',
          desc: 'ቢዋይኬኤም ከአራት እርስ በርስ የተያያዙ ስትራቴጂካዊ ምሰሶዎች ጋር ይሰራል።',
          explore: 'የምሰሶ አገልግሎቶችን ያስሱ',
          pillarsData: [
            { key: 'infra', tagline: 'የዘመናዊቷ ኢትዮጵያ መሰረት መገንባት', exploreLabel: 'መሰረተ ልማት' },
            { key: 'logistics', tagline: 'ኢትዮጵያን ከዓለም ጋር ማገናኘት', exploreLabel: 'ሎጂስቲክስ' },
            { key: 'hospitality', tagline: 'የኢትዮጵያን እንግዳ ተቀባይነት እንደገና መወሰን', exploreLabel: 'ሆስፒታሊቲ' },
            { key: 'agro', tagline: 'ከእርሻ ወደ ዓለም አቀፍ ገበያ', exploreLabel: 'የአግሮ አገልግሎቶች' },
          ],
        }),
        sortOrder: 4,
      },
      {
        sectionKey: 'flagshipProject',
        title: 'Impact Counter Section',
        titleAm: 'የተጽዕኖ ቆጣሪ ክፍል',
        content: JSON.stringify({
          label: 'By The Numbers',
          title: 'Our Impact in Action',
          stats: [
            { value: '20.5', unit: 'km', label: 'Urban Infrastructure Delivered' },
            { value: '50K+', unit: 'sqm', label: 'Ecological Restoration' },
            { value: '1,000+', unit: '', label: 'Professional Careers by 2030' },
          ],
        }),
        contentAm: JSON.stringify({
          label: 'በቁጥሮች',
          title: 'ተጽዕኖአችን በተግባር',
          stats: [
            { value: '20.5', unit: 'ኪሜ', label: 'የከተማ መሠረተ ልማት ደርሷል' },
            { value: '50K+', unit: 'ስኩዌር ሜ', label: 'ሥነ-ምህዳር መልሶ ማቋቋም' },
            { value: '1,000+', unit: '', label: 'በ2030 የሙያ ስራዎች' },
          ],
        }),
        sortOrder: 5,
      },
      {
        sectionKey: 'values',
        title: 'Values Intro Section',
        titleAm: 'የእሴቶች መግቢያ ክፍል',
        content: JSON.stringify({
          label: 'Our Foundation',
          title: 'Our Core Values',
        }),
        contentAm: JSON.stringify({
          label: 'መሰረታችን',
          title: 'ዋና እሴቶቻችን',
        }),
        sortOrder: 6,
      },
      {
        sectionKey: 'esg',
        title: 'ESG Section',
        titleAm: 'የኢኤስጂ ክፍል',
        content: JSON.stringify({
          label: 'ESG & Sustainability',
          title: 'Committed to a Sustainable Future',
          desc: 'BYKM is committed to sustainable development through responsible engineering, environmental stewardship, and efficient resource management. We build today with a focus on protecting tomorrow.',
          cta: 'Learn About Our ESG Initiatives',
        }),
        contentAm: JSON.stringify({
          label: 'ኢኤስጂ እና ዘላቂነት',
          title: 'ለዘላቂ የወደፊት እጣ ፈንታ የተወሰነ',
          desc: 'ቢዋይኬኤም በኃላፊነት በተሞላ ምህንድስና፣ በአካባቢ ጥበቃ እና ቀልጣፋ የሀብት አያያዝ ዘላቂ ልማት ለማምጣት ቁርጠኛ ነው። የነገን ለመጠበቅ በማሰብ ዛሬ እንገነባለን።',
          cta: 'ስለ ኢኤስጂ ተነሳሽነቶቻችን ይወቁ',
        }),
        sortOrder: 7,
      },
      {
        sectionKey: 'partners',
        title: 'Partners Intro Section',
        titleAm: 'የአጋሮች መግቢያ ክፍል',
        content: JSON.stringify({
          label: 'Our Partners',
          title: 'Trusted by Industry Leaders',
        }),
        contentAm: JSON.stringify({
          label: 'አጋሮቻችን',
          title: 'በኢንዱስትሪ መሪዎች የታመነ',
        }),
        sortOrder: 8,
      },
      {
        sectionKey: 'ctaSection',
        title: 'CTA Section',
        titleAm: 'የጥሪ እርምጃ ክፍል',
        content: JSON.stringify({
          label: 'Work With BYKM',
          title: 'Building Strong Partnerships',
          desc: 'Whether you are a government organization, private investor, development partner, or financial institution, BYKM delivers reliable expertise, local knowledge, and trusted project execution to help turn ambitious ideas into lasting results.',
          partnershipBtn: 'Explore Partnership',
          inquiryBtn: 'Send an Inquiry',
        }),
        contentAm: JSON.stringify({
          label: 'ከቢዋይኬኤም ጋር ይስሩ',
          title: 'ጠንካራ አጋርነቶችን መገንባት',
          desc: 'የመንግስት ድርጅት፣ የግል ባለሀብት፣ የልማት አጋር፣ ወይም የፋይናንስ ተቋም ብትሆኑ፣ ቢዋይኬኤም ምኞት ያላቸውን ሃሳቦች ወደ ዘላቂ ውጤቶች ለመቀየር አስተማማኝ እውቀት፣ የአካባቢ እውቀት እና የታመነ የፕሮጀክት አፈጻጸም ያቀርባል።',
          partnershipBtn: 'አጋርነትን ያስሱ',
          inquiryBtn: 'ጥያቄ ይላኩ',
        }),
        sortOrder: 9,
      },
    ];
    await this.homeRepository.save(
      sections.map((s) => ({ ...s, id: uuidv4() })),
    );
  }

  async findAll(): Promise<HomeSection[]> {
    return this.homeRepository.find({
      order: { sortOrder: 'ASC' },
    });
  }

  async findOne(id: string): Promise<HomeSection> {
    const section = await this.homeRepository.findOne({ where: { id } });
    if (!section) throw new NotFoundException(`Home section ${id} not found`);
    return section;
  }

  async create(data: Partial<HomeSection>): Promise<HomeSection> {
    const section = this.homeRepository.create(data);
    return this.homeRepository.save(section);
  }

  async update(id: string, data: Partial<HomeSection>): Promise<HomeSection> {
    await this.findOne(id);
    await this.homeRepository.update(id, data);
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.findOne(id);
    await this.homeRepository.delete(id);
  }
}
