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
        sectionKey: 'hero',
        title: 'Hero Section',
        titleAm: 'የመግቢያ ክፍል',
        content: JSON.stringify({
          edition: '2025/26',
          motto: 'Architecting Ethiopian Integrated Future!',
          line1: 'Building Ethiopia\'s',
          line2: 'Next Horizon',
          typeWords: 'Construction,Trade,Logistics,Technology,Hospitality',
          desc: 'BYKM Trading PLC is a multi-sectoral Ethiopian corporation delivering integrated solutions across construction, trade, logistics, digital economy, and hospitality — driving national development.',
          discoverBtn: 'Discover More',
          viewProjectsBtn: 'View Our Projects',
        }),
        contentAm: JSON.stringify({
          edition: '2017/18',
          motto: 'የኢትዮጵያን የተቀናጀ የወደፊት እድገት በመቅረጽ!',
          line1: 'የኢትዮጵያን',
          line2: 'ቀጣይ አድማስ እየገነባን',
          typeWords: 'ኮንስትራክሽን,ንግድ,ሎጂስቲክስ,ቴክኖሎጂ,ሆስፒታሊቲ',
          desc: 'ቢኬኤም ትሬዲንግ ኃላፊነቱ የተወሰነ የግል ማህበር በኮንስትራክሽን፣ ንግድ፣ ሎጂስቲክስ፣ ዲጂታል ኢኮኖሚ እና ሆስፒታሊቲ ዘርፎች የተቀናጁ መፍትሄዎችን የሚያቀርብ ሁለገብ ዘርፍ የኢትዮጵያ ኮርፖሬሽን ነው።',
          discoverBtn: 'ተጨማሪ ይወቁ',
          viewProjectsBtn: 'ፕሮጀክቶቻችንን ይመልከቱ',
        }),
        sortOrder: 1,
      },
      {
        sectionKey: 'heroStats',
        title: 'Hero Statistics',
        titleAm: 'የስታቲስቲክስ አሃዞች',
        content: JSON.stringify([
          { value: '10+', unit: 'Years', labelEn: 'of trusted experience', labelAm: 'የታመነ ልምድ' },
          { value: '5', unit: 'Pillars', labelEn: 'strategic sectors', labelAm: 'ስትራቴጂካዊ ዘርፎች' },
          { value: '100+', unit: 'Projects', labelEn: 'delivered nationwide', labelAm: 'በመላ ሀገሪቱ የተረከቡ' },
          { value: '500+', unit: 'Workforce', labelEn: 'skilled professionals', labelAm: 'ሙያዊ ባለሙያዎች' },
        ]),
        contentAm: null,
        sortOrder: 2,
      },
      {
        sectionKey: 'mission',
        title: 'Mission Section',
        titleAm: 'የተልእኮ ክፍል',
        content: JSON.stringify({
          label: 'Our Mission',
          items: [
            { label: 'Nation Building', sub: 'Delivering critical infrastructure and urban development projects that transform communities.' },
            { label: 'Industrial Value', sub: 'Developing agro-industrial value chains that boost local production and export capacity.' },
            { label: 'Innovation & Tech', sub: 'Championing digital transformation and technological innovation across sectors.' },
            { label: 'Sustainable Growth', sub: 'Creating lasting economic value while preserving Ethiopia\'s natural and cultural heritage.' },
          ],
        }),
        contentAm: JSON.stringify({
          label: 'ተልእኳችን',
          items: [
            { label: 'ሀገር ግንባታ', sub: 'ማህበረሰቦችን የሚለውጡ ወሳኝ መሰረተ ልማት እና የከተማ ልማት ፕሮጀክቶችን ማድረስ።' },
            { label: 'የኢንዱስትሪ እሴት', sub: 'የሀገር ውስጥ ምርት እና የኤክስፖርት አቅምን የሚያሳድጉ የአግሮ-ኢንዱስትሪ እሴት ሰንሰለቶችን ማዳበር።' },
            { label: 'ፈጠራ እና ቴክ', sub: 'የዲጂታል ትራንስፎርሜሽን እና የቴክኖሎጂ ፈጠራን በሁሉም ዘርፎች ማስተዋወቅ።' },
            { label: 'ዘላቂ እድገት', sub: 'የኢትዮጵያን ተፈጥሮ እና ባህላዊ ቅርሶች በመጠበቅ ዘላቂ ኢኮኖሚያዊ እሴት መፍጠር።' },
          ],
        }),
        sortOrder: 3,
      },
      {
        sectionKey: 'pillars',
        title: 'Pillars Section',
        titleAm: 'የምሰሶዎች ክፍል',
        content: JSON.stringify({
          label: 'Our Strategic Pillars',
          title: 'Five Pillars of Impact',
          desc: 'BYKM operates across five interconnected strategic pillars, each representing a core sector of Ethiopia\'s industrial transformation agenda.',
          explore: 'Explore pillar services',
          pillarsData: [
            { key: 'infra', tagline: 'Building the backbone of modern Ethiopia', exploreLabel: 'Infrastructure' },
            { key: 'logistics', tagline: 'Connecting Ethiopia to the world', exploreLabel: 'Logistics' },
            { key: 'agro', tagline: 'From farm to global markets', exploreLabel: 'Agro Services' },
            { key: 'digital', tagline: 'Powering the digital future', exploreLabel: 'Digital Services' },
            { key: 'hospitality', tagline: 'Redefining Ethiopian hospitality', exploreLabel: 'Hospitality' },
          ],
        }),
        contentAm: JSON.stringify({
          label: 'ስትራቴጂካዊ ምሰሶዎቻችን',
          title: 'አምስት የተፅእኖ ምሰሶዎች',
          desc: 'ቢኬኤም ከአምስት እርስ በርስ የተያያዙ ስትራቴጂካዊ ምሰሶዎች ጋር ይሰራል።',
          explore: 'የምሰሶ አገልግሎቶችን ያስሱ',
          pillarsData: [
            { key: 'infra', tagline: 'የዘመናዊቷ ኢትዮጵያ መሰረት መገንባት', exploreLabel: 'መሰረተ ልማት' },
            { key: 'logistics', tagline: 'ኢትዮጵያን ከዓለም ጋር ማገናኘት', exploreLabel: 'ሎጂስቲክስ' },
            { key: 'agro', tagline: 'ከእርሻ ወደ ዓለም አቀፍ ገበያ', exploreLabel: 'የአግሮ አገልግሎቶች' },
            { key: 'digital', tagline: 'ዲጂታል የወደፊቱን ማብራት', exploreLabel: 'ዲጂታል አገልግሎቶች' },
            { key: 'hospitality', tagline: 'የኢትዮጵያን እንግዳ ተቀባይነት እንደገና መወሰን', exploreLabel: 'ሆስፒታሊቲ' },
          ],
        }),
        sortOrder: 4,
      },
      {
        sectionKey: 'flagship',
        title: 'Flagship Project Section',
        titleAm: 'የዋና ፕሮጀክት ክፍል',
        content: JSON.stringify({
          label: 'Flagship Project',
          title: 'Addis Ababa Corridor Development',
          desc: 'A landmark infrastructure initiative transforming the capital\'s urban landscape through integrated road, drainage, sidewalk, and streetscape development.',
          viewAll: 'View All Projects',
          kpis: [
            { label: 'Investment', value: '$500M+' },
            { label: 'Coverage', value: '40+ km' },
            { label: 'Timeline', value: '2023-2026' },
          ],
          client: 'Addis Ababa City Administration',
          clientSub: 'Under the Addis Ababa Corridor Development Project',
        }),
        contentAm: JSON.stringify({
          label: 'ዋና ፕሮጀክት',
          title: 'የአዲስ አበባ ኮሪዶር ልማት',
          desc: 'የተቀናጀ የመንገድ፣ የፍሳሽ ማስወገጃ፣ የእግረኛ መንገድ እና የመንገድ ዳር ልማት አማካኝነት የዋና ከተማዋን የከተማ መልክአምድር የሚለውጥ ታላቅ የመሰረተ ልማት ተነሳሽነት።',
          viewAll: 'ሁሉንም ፕሮጀክቶች ይመልከቱ',
          kpis: [
            { label: 'ኢንቨስትመንት', value: 'ከ500 ሚሊዮን ዶላር በላይ' },
            { label: 'ሽፋን', value: 'ከ40 ኪሜ በላይ' },
            { label: 'ጊዜ መስመር', value: '2023-2026' },
          ],
          client: 'የአዲስ አበባ ከተማ አስተዳደር',
          clientSub: 'በአዲስ አበባ ኮሪዶር ልማት ፕሮጀክት ስር',
        }),
        sortOrder: 5,
      },
      {
        sectionKey: 'values',
        title: 'Values Intro Section',
        titleAm: 'የእሴቶች መግቢያ ክፍል',
        content: JSON.stringify({
          label: 'Our Core Values',
          title: 'Principles That Guide Us',
        }),
        contentAm: JSON.stringify({
          label: 'ዋና እሴቶቻችን',
          title: 'የሚመሩን መርሆች',
        }),
        sortOrder: 6,
      },
      {
        sectionKey: 'esg',
        title: 'ESG Section',
        titleAm: 'የኢኤስጂ ክፍል',
        content: JSON.stringify({
          label: 'ESG & Sustainability',
          title: 'Committed to a Greener Future',
          desc: 'BYKM integrates Environmental, Social, and Governance principles into every project. From green building practices to community engagement, sustainability is at the heart of our operations.',
          cta: 'Learn About Our ESG Initiatives',
        }),
        contentAm: JSON.stringify({
          label: 'ኢኤስጂ እና ዘላቂነት',
          title: 'ለአረንጓዴ የወደፊት ቁርጠኝነት',
          desc: 'ቢኬኤም የአካባቢ፣ ማህበራዊ እና የአስተዳደር መርሆችን በየፕሮጀክቱ ውስጥ ያዋህዳል።',
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
        sectionKey: 'cta',
        title: 'CTA Section',
        titleAm: 'የጥሪ እርምጃ ክፍል',
        content: JSON.stringify({
          label: 'Let\'s Build Together',
          title: 'Partner with BYKM Trading PLC',
          desc: 'Whether you\'re a government agency, private investor, or international partner, BYKM welcomes collaboration on projects that drive Ethiopia\'s growth.',
          partnershipBtn: 'Explore Partnership',
          inquiryBtn: 'Send an Inquiry',
        }),
        contentAm: JSON.stringify({
          label: 'አብረን እንገንባ',
          title: 'ከቢኬኤም ትሬዲንግ ጋር አጋር ይሁኑ',
          desc: 'መንግስታዊ ኤጀንሲ፣ የግል ባለሀብት ወይም ዓለም አቀፍ አጋር ብትሆኑ፣ ቢኬኤም የኢትዮጵያን እድገት በሚያራምዱ ፕሮጀክቶች ላይ ትብብርን ይቀበላል።',
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
