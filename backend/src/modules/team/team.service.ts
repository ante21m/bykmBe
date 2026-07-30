import { v4 as uuidv4 } from 'uuid';
import { Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TeamMember } from '../../entities/team-member.entity';

@Injectable()
export class TeamService implements OnModuleInit {
  constructor(
    @InjectRepository(TeamMember)
    private readonly teamRepository: Repository<TeamMember>,
  ) {}

  async onModuleInit() {
    const count = await this.teamRepository.count();
    if (count === 0) {
      await this.seedTeam();
    } else {
      const founder = await this.teamRepository.findOne({ where: { category: 'founder' } });
      if (founder) {
        founder.nameEn = 'Besufekad Molla Wube';
        founder.nameAm = 'በሱፈቃድ ሞላ ውቤ';
        founder.titleEn = 'Founder & General Manager';
        founder.titleAm = 'መሥራችና ዋና ሥራ አስኪያጅ';
        founder.descEn = 'Besufekad Molla Wube is the Founder and General Manager of BYKM Trading PLC, providing the strategic leadership and vision that drive the company\'s continued growth and transformation. With a strong commitment to innovation, engineering excellence, and sustainable development, he has built BYKM into a diversified enterprise dedicated to delivering long-term value across multiple industries.\n\nHis leadership is founded on integrity, operational excellence, and responsible investment, fostering a culture of quality, collaboration, and continuous improvement. Under his direction, BYKM is expanding its presence in both domestic and international markets while contributing to Ethiopia\'s industrial development, economic progress, and a more sustainable future.';
        founder.descAm = 'በሱፈቃድ ሞላ ውቤ የቢ.ዋይ.ኬ.ኤም (BYKM) ትሬዲንግ ኃላፊነቱ የተወሰነ የግል ማኅበር መሥራችና ዋና ሥራ አስኪያጅ ሲሆኑ፣ ለኩባንያው ቀጣይነት ያለው እድገትና ትራንስፎርሜሽን መሪ የሆነውን ስትራቴጂካዊ አመራርና ራዕይ የሚያቀርቡ ናቸው። በፈጠራ፣ በኢንጂነሪንግ ብቃትና በዘላቂ ልማት ላይ ባላቸው ጠንካራ ቁርጠኝነት፣ ቢ.ዋይ.ኬ.ኤም (BYKM)ን በበርካታ የሥራ ዘርፎች ዘላቂ እሴት ለማስገኘት የተጋ ስፋት ያለው ኢንተርፕራይዝ አድርገው ገንብተውታል።\n\nየእሳቸው አመራር በታማኝነት፣ በሥራ ብቃትና ኃላፊነት በተሞላበት ኢንቨስትመንት ላይ የተመሠረተ ሲሆን፣ የጥራት፣ የትብብርና የቀጣይነት ያለው መሻሻል ባህል እንዲጎለብት ያደርጋል። በእሳቸው መሪነት ቢ.ዋይ.ኬ.ኤም (BYKM) በአገር ውስጥና በዓለም አቀፍ ገበያዎች ያለውን ተሳትፎ እያሰፋ ለኢትዮጵያ የኢንዱስትሪ ልማት፣ ለኢኮኖሚ እድገትና ለበለጠ ዘላቂ የወደፊት ጊዜ የራሱን አስተዋጽኦ እያበረከተ ይገኛል።';
        await this.teamRepository.save(founder);
      }

      const leadershipUpdates: { titleEn: string; nameAm: string; titleAm: string }[] = [
        { titleEn: 'General Manager', nameAm: '[የዋና ሥራ አስኪያጅ ስም]', titleAm: 'ዋና ሥራ አስኪያጅ' },
        { titleEn: 'Deputy General Manager', nameAm: '[የምክትል ዋና ሥራ አስኪያጅ ስም]', titleAm: 'ምክትል ዋና ሥራ አስኪያጅ' },
        { titleEn: 'Chief Finance & Internal Audit Officer', nameAm: '[የፋይናንስ ኦፊሰር ስም]', titleAm: 'የፋይናንስና የውስጥ ኦዲት ዋና መኮንን' },
        { titleEn: 'Corporate Secretary', nameAm: '[የኮርፖሬት ጸሐፊ ስም]', titleAm: 'የኮርፖሬት ጸሐፊ' },
        { titleEn: 'Director of Infrastructure & Engineering', nameAm: '[የዳይሬክተር ስም]', titleAm: 'የመሠረተ-ልማትና ኢንጂነሪንግ ዳይሬክተር' },
        { titleEn: 'Director of Digital Economy & Technical Services', nameAm: '[የዳይሬክተር ስም]', titleAm: 'የዲጂታል ኢኮኖሚና ቴክኒክ አገልግሎቶች ዳይሬክተር' },
        { titleEn: 'Director of Global Gateway, Logistics & Transport', nameAm: '[የዳይሬክተር ስም]', titleAm: 'የዓለም አቀፍ ንግድ፣ ሎጂስቲክስና ትራንስፖርት ዳይሬክተር' },
        { titleEn: 'Director of Agro-Industrialization & Natural Resources', nameAm: '[የዳይሬክተር ስም]', titleAm: 'የአግሮ-ኢንዱስትሪና ተፈጥሮ ሀብት ዳይሬክተር' },
        { titleEn: 'Director of Hospitality, Retail & Consumer Ecosystems', nameAm: '[የዳይሬክተር ስም]', titleAm: 'የሆስፒታሊቲ፣ የችርቻሮና የተጠቃሚዎች ሥነ-ምህዳር ዳይሬክተር' },
      ];
      for (const u of leadershipUpdates) {
        const member = await this.teamRepository.findOne({ where: { titleEn: u.titleEn } });
        if (member) {
          member.nameAm = u.nameAm;
          member.titleAm = u.titleAm;
          await this.teamRepository.save(member);
        }
      }
    }
  }

  private async seedTeam() {
    const items: Partial<TeamMember>[] = [
      {
        nameEn: 'Besufekad Molla Wube',
        nameAm: 'በሱፈቃድ ሞላ ውቤ',
        titleEn: 'Founder & General Manager',
        titleAm: 'መሥራችና ዋና ሥራ አስኪያጅ',
        descEn: 'Besufekad Molla Wube is the Founder and General Manager of BYKM Trading PLC, providing the strategic leadership and vision that drive the company\'s continued growth and transformation. With a strong commitment to innovation, engineering excellence, and sustainable development, he has built BYKM into a diversified enterprise dedicated to delivering long-term value across multiple industries.\n\nHis leadership is founded on integrity, operational excellence, and responsible investment, fostering a culture of quality, collaboration, and continuous improvement. Under his direction, BYKM is expanding its presence in both domestic and international markets while contributing to Ethiopia\'s industrial development, economic progress, and a more sustainable future.',
        descAm: 'በሱፈቃድ ሞላ ውቤ የBYKM ትሬዲንግ ኃ/የተ/የግ/ማኅበር መሥራችና ዋና ሥራ አስኪያጅ ሲሆኑ፣ ለኩባንያው ቀጣይነት ያለው እድገትና ትራንስፎርሜሽን መሪ የሆነውን ስትራቴጂካዊ አመራርና ራዕይ የሚያቀርቡ ናቸው። በፈጠራ፣ በኢንጂነሪንግ ብቃትና በዘላቂ ልማት ላይ ባላቸው ጠንካራ ቁርጠኝነት፣ BYKMን በበርካታ የሥራ ዘርፎች ዘላቂ እሴት ለማስገኘት የተጋ ስፋት ያለው ኢንተርፕራይዝ አድርገው ገንብተውታል።\n\nየእሳቸው አመራር በታማኝነት፣ በሥራ ብቃትና ኃላፊነት በተሞላበት ኢንቨስትመንት ላይ የተመሠረተ ሲሆን፣ የጥራት፣ የትብብርና የቀጣይነት ያለው መሻሻል ባህል እንዲጎለብት ያደርጋል። በእሳቸው መሪነት BYKM በአገር ውስጥና በዓለም አቀፍ ገበያዎች ያለውን ተሳትፎ እያሰፋ ለኢትዮጵያ የኢንዱስትሪ ልማት፣ ለኢኮኖሚ እድገትና ለበለጠ ዘላቂ የወደፊት ጊዜ የራሱን አስተዋጽኦ እያበረከተ ይገኛል።',
        category: 'founder',
        active: true,
        sortOrder: 1,
      },
      {
        nameEn: '[General Manager Name]',
        nameAm: '[የዋና ሥራ አስኪያጅ ስም]',
        titleEn: 'General Manager',
        titleAm: 'ዋና ሥራ አስኪያጅ',
        descEn: 'The General Manager oversees the day-to-day operations of the company, ensuring that strategic objectives are effectively translated into measurable business outcomes while maintaining operational excellence across all divisions.',
        descAm: 'ጠቅላላ ሥራ አስኪያጁ የኩባንያውን ዕለት ተዕለት አሰራር ይመልከታል፣ ስትራቴጂካዊ ዓላማዎች በተገቢ ሁኔታ ወደ መገመት የሚችሉ የንግድ ውጤቶች እንዲሆኑ ሲያድግ በምክር ክፍሎች ውስጥ የአሰራር የላቀነትን ይጠብቃል።',
        category: 'leadership',
        active: true,
        sortOrder: 2,
      },
      {
        nameEn: '[Deputy General Manager Name]',
        nameAm: '[የምክትል ዋና ሥራ አስኪያጅ ስም]',
        titleEn: 'Deputy General Manager',
        titleAm: 'ምክትል ዋና ሥራ አስኪያጅ',
        descEn: 'The Deputy General Manager supports corporate leadership by coordinating business units, improving organizational efficiency, and ensuring seamless execution of strategic initiatives.',
        descAm: 'የጠቅላላ ሥራ አስኪያጅ ተ部副ው የንግድ ክፍሎችን በማስተካከያ፣ የድርጅት ቅልጥፍናን በማሻሻል እና ስትራቴጂካዊ ተነሳሽነቶች በተቀናጀ ሁኔታ እንዲፈጸሙ በማድረግ የኮርፖሬት መሪነትን ይደግፋል።',
        category: 'leadership',
        active: true,
        sortOrder: 3,
      },
      {
        nameEn: '[Finance Officer Name]',
        nameAm: '[የፋይናንስ ኦፊሰር ስም]',
        titleEn: 'Chief Finance & Internal Audit Officer',
        titleAm: 'የፋይናንስና የውስጥ ኦዲት ዋና መኮንን',
        descEn: 'Responsible for corporate finance, budget planning, internal audit, risk management, and financial compliance across all BYKM operations.',
        descAm: 'በቢዋይኬኤም ሁሉም አሰራሮች ውስጥ ለኮርፖሬት ፋይናንስ፣ በጀት ስለ በጀት ስለርፕ፣ የውስጥ ማረጋጋት፣ የአደጋ አስተዳደር እና የፋይናንስ ተገዢነት ባለግопули።',
        category: 'leadership',
        active: true,
        sortOrder: 4,
      },
      {
        nameEn: '[Corporate Secretary Name]',
        nameAm: '[የኮርፖሬት ጸሐፊ ስም]',
        titleEn: 'Corporate Secretary',
        titleAm: 'የኮርፖሬት ጸሐፊ',
        descEn: 'Responsible for corporate governance, board administration, regulatory compliance, legal documentation, and corporate communications.',
        descAm: 'ለኮርፖሬት አስተዳደር፣ የቦርድ አስተዳደር፣ የምርምር ተገዢነት፣ ህጋዊ ሰነዶች እና የኮርፖሬት ግንኙነት ባለግопули።',
        category: 'leadership',
        active: true,
        sortOrder: 5,
      },
      {
        nameEn: '[Director Name]',
        nameAm: '[የዳይሬክተር ስም]',
        titleEn: 'Director of Infrastructure & Engineering',
        titleAm: 'የመሠረተ-ልማትና ኢንጂነሪንግ ዳይሬክተር',
        descEn: 'Leads engineering, infrastructure development, construction projects, and smart-city initiatives while ensuring engineering excellence across all operational sectors.',
        descAm: 'ምህንድስናን፣ የመሠረተ ልማት ልማትን፣ የግንባታ ፕሮጀክቶችን እና የስማርት ከተማ ተነሳሽነቶችን ይመራል፣ በሁሉም የአሰራር ዘርፎች ውስጥ የምህንድስና የላቀነትን ሲጠብቅ።',
        category: 'leadership',
        active: true,
        sortOrder: 6,
      },
      {
        nameEn: '[Director Name]',
        nameAm: '[የዳይሬክተር ስም]',
        titleEn: 'Director of Digital Economy & Technical Services',
        titleAm: 'የዲጂታል ኢኮኖሚና ቴክኒክ አገልግሎቶች ዳይሬክተር',
        descEn: 'Leads digital transformation through software development, AI solutions, ICT infrastructure, cloud technologies, cybersecurity, and digital innovation.',
        descAm: 'ሶፍትዌር ልማት፣ AI መፍትሔዎች፣ ICT መሠረተ ልማት፣ የክላውድ ቴክኖሎጂዎች፣ የ ሳይበር ጥበቃ እና ዲጂታል ፈጠራ በኋላ ዲጂታል ለውጥን ይመራል።',
        category: 'leadership',
        active: true,
        sortOrder: 7,
      },
      {
        nameEn: '[Director Name]',
        nameAm: '[የዳይሬክተር ስም]',
        titleEn: 'Director of Global Gateway, Logistics & Transport',
        titleAm: 'የዓለም አቀፍ ንግድ፣ ሎጂስቲክስና ትራንስፖርት ዳይሬክተር',
        descEn: 'Oversees international trade, logistics, transportation, supply chain operations, and import/export services that connect BYKM with regional and global markets.',
        descAm: 'ቢዋይኬኤምን ከክልላዊ እና ከዓለም አቀፍ ገበያዎች ጋር የሚያገናኝ አለም አቀፍ ንግድ፣ ሎጂስቲክስ፣ ትራንስፖርት፣ የአቅርቦት ሰንሰለት አሰራሮች እና ማስመጣት/መላክ አገልግሎቶችን ይመልከታል።',
        category: 'leadership',
        active: true,
        sortOrder: 8,
      },
      {
        nameEn: '[Director Name]',
        nameAm: '[የዳይሬክተር ስም]',
        titleEn: 'Director of Agro-Industrialization & Natural Resources',
        titleAm: 'የአግሮ-ኢንዱስትሪና ተፈጥሮ ሀብት ዳይሬክተር',
        descEn: 'Responsible for agricultural investment, agro-processing, natural resource development, food security initiatives, and export-oriented production.',
        descAm: 'ለግብርና ማድረግ፣ አግሮ-ፕሮሰሲንግ፣ የተፈጥሮ ሀብት ልማት፣ የምግብ ዋስትና ተነሳሽነቶች እና ወደ ውጭ በተመለከተ ምርት ባለግопули።',
        category: 'leadership',
        active: true,
        sortOrder: 9,
      },
      {
        nameEn: '[Director Name]',
        nameAm: '[የዳይሬክተር ስም]',
        titleEn: 'Director of Hospitality, Retail & Consumer Ecosystems',
        titleAm: 'የሆስፒታሊቲ፣ የችርቻሮና የተጠቃሚዎች ሥነ-ምህዳር ዳይሬክተር',
        descEn: 'Leads hospitality, tourism, retail, consumer services, and lifestyle businesses while enhancing customer experience and market expansion.',
        descAm: 'ሆስፒታሊቲን፣ ቱሪዝምን፣ ችርቻሮን፣ የፍጆታ አገልግሎቶችን እና የህይወት ዘይቤ ንግዶችን ይመራል፣ የደንበኛ ተሞክሮን እና ገበያ ማስፋፊያን ሲያሻሽል።',
        category: 'leadership',
        active: true,
        sortOrder: 10,
      },
    ];

    await this.teamRepository.save(
      items.map((item) => ({ ...item, id: uuidv4() })),
    );
  }

  async findAll(category?: string): Promise<TeamMember[]> {
    const where: any = {};
    if (category) where.category = category;
    return this.teamRepository.find({
      where,
      order: { sortOrder: 'ASC' },
    });
  }

  async findActive(category?: string): Promise<TeamMember[]> {
    const where: any = { active: true };
    if (category) where.category = category;
    return this.teamRepository.find({
      where,
      order: { sortOrder: 'ASC' },
    });
  }

  async findOne(id: string): Promise<TeamMember> {
    const item = await this.teamRepository.findOne({ where: { id } });
    if (!item) throw new NotFoundException(`Team member ${id} not found`);
    return item;
  }

  async create(data: Partial<TeamMember>): Promise<TeamMember> {
    const item = this.teamRepository.create(data);
    return this.teamRepository.save(item);
  }

  async update(id: string, data: Partial<TeamMember>): Promise<TeamMember> {
    await this.findOne(id);
    await this.teamRepository.update(id, data);
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.findOne(id);
    await this.teamRepository.delete(id);
  }
}
