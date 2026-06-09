import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UnansweredQuery } from '../../entities/unanswered-query.entity';

interface BilingualQAPair {
  keywords: string[];
  en: string;
  am: string;
  suggestions?: string[];
}

function isAmharic(text: string): boolean {
  return /[\u1200-\u137F]/.test(text);
}

const companyData: BilingualQAPair[] = [
  {
    keywords: ['what is bykm', 'who is bykm', 'tell me about bykm', 'about bykm', 'what does bykm do', 'company', 'overview'],
    en: 'BYKM Trading PLC is a premier multi-sectoral Ethiopian corporation established in 2018. We operate through five integrated strategic pillars: Agro-Industrialization & Natural Resources, Infrastructure & Engineering, Global Trade & Logistics, Digital Economy & Media, and Hospitality & Retail. With a paid-up capital of more than 10,000,000 ETB and a Grade-4 General Contractor (GC-4) certification, we are committed to architecting Ethiopia\'s integrated future.',
    am: 'ቢኬኤም ትሬዲንግ ኃላፊነቱ የተወሰነ የግል ማህበር በ2018 ዓ.ም. የተመሰረተ ሁለገብ ዘርፍ የኢትዮጵያ ኮርፖሬሽን ነው። በአምስት የተቀናጁ ስትራቴጂካዊ ምሰሶዎች ይሰራል፦ አግሮ-ኢንዱስትሪላይዜሽን እና የተፈጥሮ ሀብት፣ መሠረተ ልማት እና ምህንድስና፣ ዓለም አቀፍ ንግድ እና ሎጂስቲክስ፣ ዲጂታል ኢኮኖሚ እና ሚዲያ፣ እንዲሁም ሆስፒታሊቲ እና ችርቻሮ። በmore than 10,000,000 ብር የተከፈለ ካፒታል እና በደረጃ-4 አጠቃላይ ኮንትራክተር (ጂሲ-4) የምስክር ወረቀት የተመሰከረለት ሲሆን፣ የኢትዮጵያን የተቀናጀ የወደፊት እድገት ለመቅረጽ ቆርጦ ይሰራል።',
    suggestions: ['vision mission', 'business pillars', 'services offered'],
  },
  {
    keywords: ['vision', 'mission', 'goal', 'objective', '2030'],
    en: 'Our Vision 2030 is to be Ethiopia\'s leading architect of a sustainable future, pioneering a seamless integrated ecosystem that fuels national prosperity. Our mission consists of four strategic impact goals: Unlocking Wealth (+40% value-addition by 2027), Building Resiliency (green infrastructure by 2030), Connecting Markets (3 digital trade pivots by 2028), and Empowering People (5,000+ career opportunities by 2030).',
    am: 'ራዕያችን 2030 የኢትዮጵያ ዘላቂ የወደፊት እድገት መሪ አርክቴክት መሆን ነው። ተልዕኳችን አራት ስትራቴጂካዊ የተጽእኖ ግቦችን ያካትታል፦ ሀብትን መፍታት (በ2027 +40% እሴት መጨመር)፣ የመቋቋም አቅም መገንባት (በ2030 አረንጓዴ መሠረተ ልማት)፣ ገበያዎችን ማገናኘት (በ2028 3 ዲጂታል የንግድ ለውጦች)፣ እና ህዝቡን ማብቃት (በ2030 5,000+ የስራ ዕድሎች)።',
    suggestions: ['company overview', 'business pillars', 'ESG commitment'],
  },
  {
    keywords: ['service', 'what do you offer', 'business pillar', 'pillar', 'cluster'],
    en: 'BYKM operates through five strategic business pillars: (1) Agro-Industrialization & Natural Resources — coffee value chain, high-value agriculture, mineral extraction; (2) Infrastructure, Engineering & Urban Development — Grade-4 contracting, mega-corridors, real estate; (3) Global Trade, Logistics & Transport — import/export, freight forwarding, warehousing; (4) Digital Economy, Media & Technical Services — ICT infrastructure, printing, digital training; (5) Hospitality, Retail & Consumer Ecosystems — hotels, eco-resorts, retail networks.',
    am: 'ቢኬኤም በአምስት ስትራቴጂካዊ የንግድ ምሰሶዎች ይሰራል፦ (1) አግሮ-ኢንዱስትሪላይዜሽን እና የተፈጥሮ ሀብት — የቡና ሰንሰለት፣ ከፍተኛ ዋጋ ያለው እርሻ፣ የማዕድን ቁፋሮ፤ (2) መሠረተ ልማት፣ ምህንድስና እና የከተማ ልማት — ደረጃ-4 ኮንትራክተር፣ ሜጋ ኮሪደሮች፣ ሪል እስቴት፤ (3) ዓለም አቀፍ ንግድ፣ ሎጂስቲክስ እና ትራንስፖርት — ማስመጣት/መላክ፣ የጭነት ዝውውር፣ መጋዘን፤ (4) ዲጂታል ኢኮኖሚ፣ ሚዲያ እና ቴክኒክ አገልግሎቶች — አይሲቲ መሠረተ ልማት፣ ህትመት፣ ዲጂቫል ስልጠና፤ (5) ሆስፒታሊቲ፣ ችርቻሮ እና የሸማቾች ስነ-ምህዳር — ሆቴሎች፣ ኢኮ-ሪዞርቶች፣ የችርቻሮ አውታሮች።',
    suggestions: ['agro-industrialization', 'infrastructure', 'digital economy'],
  },
  {
    keywords: ['agro', 'agriculture', 'coffee', 'natural resource', 'mineral'],
    en: 'Our Agro-Industrialization pillar covers the full value chain of Ethiopia\'s agricultural wealth. Key services include Coffee Value Chain Management (from industrial roasting to export), High-Value Agriculture & Agro-Processing (oilseeds, pulses), and Sustainable Mineral Extraction & Bottled Water production. Our tagline is "From Soil to Global Shelf."',
    am: 'የአግሮ-ኢንዱስትሪላይዜሽን ምሰሳችን የኢትዮጵያን የግብርና ሀብት ሙሉ ሰንሰለት ይሸፍናል። ዋና አገልግሎቶች፦ የቡና ሰንሰለት አስተዳደር (ከኢንዱስትሪ ማብሰያ እስከ ወደ ውጭ መላክ)፣ ከፍተኛ ዋጋ ያለው እርሻ እና አግሮ-ፕሮሰሲንግ (ቅባት እህሎች፣ ጥራጥሬዎች)፣ እንዲሁም ዘላቂ የማዕድን ቁፋሮ እና የታሸገ ውሃ ምርት። መፈክራችን "ከአፈር ወደ ዓለም አቀፍ መደርደሪያ" የሚል ነው።',
    suggestions: ['trade logistics', 'hospitality retail', 'business pillars'],
  },
  {
    keywords: ['infrastructure', 'construction', 'engineering', 'contractor', 'building', 'road', 'corridor'],
    en: 'Our Infrastructure pillar delivers Grade-4 General Contracting excellence in building, road, water, and electro-mechanical engineering. We specialize in Mega-Corridor urban redevelopment, Living Infrastructure integrating ecological restoration, and Real Estate & Technical Consultancy. We delivered the landmark 20.5km Addis Ababa Mega-Corridor project 15 days ahead of schedule.',
    am: 'የመሠረተ ልማት ምሰሳችን በህንፃ፣ መንገድ፣ ውሃ እና ኤሌክትሮ-መካኒካል ምህንድስና የደረጃ-4 አጠቃላይ ኮንትራክተር የላቀ አፈጻጸም ያቀርባል። በሜጋ ኮሪደር የከተማ ልማት፣ ኢኮሎጂካል መልሶ ማቋቋምን በሚያካትት ህያው መሠረተ ልማት፣ እንዲሁም ሪል እስቴት እና ቴክኒክ አማካሪነት ላይ ልዩ እውቀት አለን። ታዋቂውን 20.5ኪሜ የአዲስ አበባ ሜጋ ኮሪደር ፕሮጀክት ከተወሰነው ጊዜ 15 ቀናት ቀደም ብለን አጠናቀናል።',
    suggestions: ['projects portfolio', 'company overview', 'contact information'],
  },
  {
    keywords: ['trade', 'logistics', 'import', 'export', 'freight', 'warehouse', 'transport'],
    en: 'Our Global Trade & Logistics pillar positions BYKM as Ethiopia\'s gateway to the world. We offer strategic import/export services, trade agency and commission representation, freight forwarding, high-capacity warehousing, and vehicle/heavy machinery rental. We connect Ethiopian producers with international markets.',
    am: 'የዓለም አቀፍ ንግድ እና ሎጂስቲክስ ምሰሳችን ቢኬኤምን የኢትዮጵያ ወደ ዓለም መውጫ በር አድርጎ ያቆመዋል። ስልታዊ የማስመጣት/መላክ አገልግሎቶች፣ የንግድ ወኪልነት እና ኮሚሽን ውክልና፣ የጭነት ዝውውር፣ ከፍተኛ አቅም ያለው መጋዘን፣ እንዲሁም የተሽከርካሪ/ከባድ ማሽነሪ ኪራይ እናቀርባለን። የኢትዮጵያን አምራቾች ከዓለም አቀፍ ገበያ ጋር እናገናኛለን።',
    suggestions: ['agro-industrialization', 'services offered', 'partnership'],
  },
  {
    keywords: ['digital', 'economy', 'ict', 'technology', 'media', 'printing', 'it', 'tech'],
    en: 'Our Digital Economy pillar drives Industry 4.0 for Ethiopia. Services include ICT & Telecommunications Infrastructure, Smart City connectivity solutions, commercial printing and publishing, specialized printing machinery import, and ICT vocational training programs for Ethiopia\'s workforce.',
    am: 'የዲጂታል ኢኮኖሚ ምሰሳችን ለኢትዮጵያ ኢንዱስትሪ 4.0ን ያካሂዳል። አገልግሎቶቹ፦ አይሲቲ እና ቴሌኮሙኒኬሽን መሠረተ ልማት፣ ስማርት ከተማ አገናኝ መፍትሄዎች፣ የንግድ ህትመት እና ህትመት፣ የልዩ ማተሚያ ማሽነሪ ማስመጣት፣ እንዲሁም ለኢትዮጵያ የሰው ኃይል የአይሲቲ የሙያ ስልጠና ፕሮግራሞችን ያካትታሉ።',
    suggestions: ['business pillars', 'infrastructure', 'services offered'],
  },
  {
    keywords: ['hospitality', 'hotel', 'retail', 'consumer', 'eco-resort', 'restaurant', 'tourism'],
    en: 'Our Hospitality pillar elevates Ethiopian living standards. We develop and manage luxury hotels and eco-resorts, operate a tiered retail network from mini-markets to hypermarkets, and supply high-quality fertilizers, veterinary medicines, and agricultural inputs to support Ethiopia\'s agricultural sector.',
    am: 'የሆስፒታሊቲ ምሰሳችን የኢትዮጵያውያንን የኑሮ ደረጃ ያሳድጋል። የቅንጦት ሆቴሎችን እና ኢኮ-ሪዞርቶችን እናዘጋጃለን እንዲሁም እናስተዳድራለን፣ ከሚኒ ማርኬት እስከ ሃይፐርማርኬት ድረስ የተደራጀ የችርቻሮ አውታር እንሰራለን፣ እንዲሁም የኢትዮጵያን የግብርና ዘርፍ ለመደገፍ ከፍተኛ ጥራት ያላቸውን ማዳበሪያዎች፣ የእንስሳት ህክምና መድኃኒቶች እና የግብርና ግብዓቶችን እናቀርባለን።',
    suggestions: ['agro-industrialization', 'business pillars', 'careers'],
  },
  {
    keywords: ['project', 'portfolio', 'case study', 'flagship', 'completed project'],
    en: 'Our flagship project is the Addis Ababa Mega-Corridor Infrastructure Project — 20.5km of integrated urban corridors delivered 15 days ahead of schedule for the Addis Ababa City Administration. Other projects include the Green Legacy Riverside Restoration (50,000+ sqm of indigenous flora), Coffee Export Initiative, Digital Infrastructure & Smart City Pivot, Industrial Value-Addition Hubs, and a Tiered Retail Network Expansion.',
    am: 'ዋና ፕሮጀክታችን የአዲስ አበባ ሜጋ ኮሪደር መሠረተ ልማት ፕሮጀክት ነው — 20.5ኪሜ የተቀናጀ የከተማ ኮሪደሮች ከተወሰነው ጊዜ 15 ቀናት ቀደም ብሎ ለአዲስ አበባ ከተማ አስተዳደር የተረከበ። ሌሎች ፕሮጀክቶች፦ አረንጓዴ ቅርስ የወንዝ ዳር መልሶ ማቋቋም (50,000+ ካሬ ሜትር የአገር በቀል እፅዋት)፣ የቡና ኤክስፖርት ኢኒሼቲቭ፣ የዲጂታል መሠረተ ልማት እና ስማርት ከተማ፣ የኢንዱስትሪ እሴት መጨመሪያ ማዕከላት፣ እንዲሁም የተደራጀ የችርቻሮ አውታር መስፋፋትን ያካትታሉ።',
    suggestions: ['infrastructure', 'company overview', 'contact information'],
  },
  {
    keywords: ['contact', 'reach', 'phone', 'email', 'address', 'location', 'get in touch'],
    en: 'You can reach BYKM Trading PLC at our headquarters: Yeka Sub-City, Woreda 08, House No. 4-04, Addis Ababa, Ethiopia. Phone: +251 911 34 32 90 (Primary) or +251 912 76 43 43 (Operations). Email: info@bykmgroup.com. For partnerships, contact gm@bykmgroup.com. You can also use our contact form to submit a detailed inquiry.',
    am: 'ቢኬኤም ትሬዲንግ ኃላፊነቱ የተወሰነ የግል ማህበርን በዋና መሥሪያ ቤታችን ማግኘት ይችላሉ፦ የካ ክፍለ ከተማ፣ ወረዳ 08፣ ቤት ቁጥር 4-04፣ አዲስ አበባ፣ ኢትዮጵያ። ስልክ፦ +251 911 34 32 90 (ዋና) ወይም +251 912 76 43 43 (ኦፕሬሽን)። ኢሜይል፦ info@bykmgroup.com። ለአጋርነት፦ gm@bykmgroup.com። እንዲሁም የእውቂያ ቅጻችንን በመጠቀም ዝርዝር ጥያቄ ማቅረብ ይችላሉ።',
    suggestions: ['partnership', 'careers', 'company overview'],
  },
  {
    keywords: ['partner', 'partnership', 'invest', 'investment', 'joint venture', 'jv', 'collaborate'],
    en: 'We actively invite government partners, international investors, and financial institutions to partner with BYKM. As a legally registered Ethiopian PLC with Category "A" taxpayer status, we provide an ideal local anchor for high-impact projects. Contact our Office of the General Manager at gm@bykmgroup.com or use our Partnership & JV inquiry form on the contact page.',
    am: 'የመንግስት አጋሮችን፣ ዓለም አቀፍ ባለሀብቶችን እና የፋይናንስ ተቋማትን ከቢኬኤም ጋር አጋር እንዲሆኑ በንቃት እንጋብዛለን። በህጋዊ መንገድ የተመዘገበ የኢትዮጵያ ኃላፊነቱ የተወሰነ የግል ማህበር፣ ምድብ "ሀ" ግብር ከፋይ ሆኖ፣ ከፍተኛ ተጽእኖ ላላቸው ፕሮጀክቶች ተስማሚ የሆነ የሀገር ውስጥ መልህቅ እንሆናለን። የአጠቃላይ ሥራ አስኪያጅ ቢሮን በ gm@bykmgroup.com ወይም በእውቂያ ገፁ ላይ ያለውን የአጋርነት ቅጽ ይጠቀሙ።',
    suggestions: ['company overview', 'contact information', 'infrastructure'],
  },
  {
    keywords: ['career', 'job', 'employment', 'work', 'talent', 'vacancy', 'join'],
    en: 'BYKM is building towards 5,000+ career opportunities by 2030. We welcome talented professionals in engineering, trade, digital, hospitality, and management. Please send your inquiry through our contact form selecting "Careers & Capacity Building" or email talent@bykmgroup.com.',
    am: 'ቢኬኤም በ2030 5,000+ የስራ ዕድሎችን ለመፍጠር እየሰራ ነው። በምህንድስና፣ ንግድ፣ ዲጂታል፣ ሆስፒታሊቲ እና አስተዳደር ዘርፎች ችሎታ ያላቸው ባለሙያዎችን እንቀበላለን። እባክዎ ጥያቄዎን በእውቂያ ቅጻችን "ሙያ እና አቅም ግንባታ" የሚለውን በመምረጥ ወይም በ talent@bykmgroup.com ኢሜይል ያስገቡ።',
    suggestions: ['company overview', 'vision mission', 'contact information'],
  },
  {
    keywords: ['esg', 'green', 'environment', 'sustainability', 'legacy', 'green legacy', 'eco'],
    en: 'BYKM is an active institutional partner of Ethiopia\'s National Green Legacy Initiative. Our ESG commitment spans four pillars: Environmental (100km of carbon-neutral urban infrastructure), Social (5,000+ sustainable careers), Governance (100% ISO-compliance), and Economic (40% increase in local value-addition). We follow ISO 9001:2015, ISO 45001:2018, ISO 14001:2015, and ISO 20400 standards.',
    am: 'ቢኬኤም የኢትዮጵያ ብሄራዊ አረንጓዴ አሻራ ፕሮግራም ንቁ ተቋማዊ አጋር ነው። የኢኤስጂ ቁርጠኝነታችን በአራት ምሰሶዎች ይዘረጋል፦ አካባቢ (100ኪሜ የካርቦን-ገለል የከተማ መሠረተ ልማት)፣ ማህበራዊ (5,000+ ዘላቂ የስራ ዕድሎች)፣ አስተዳደር (100% አይኤስኦ ተገዢነት)፣ እና ኢኮኖሚያዊ (40% የሀገር ውስጥ እሴት መጨመር)። የISO 9001:2015፣ ISO 45001:2018፣ ISO 14001:2015 እና ISO 20400 ደረጃዎችን እንከተላለን።',
    suggestions: ['infrastructure', 'vision mission', 'company overview'],
  },
  {
    keywords: ['leadership', 'management', 'ceo', 'general manager', 'founder', 'team', 'who runs'],
    en: 'BYKM operates under a Tri-Level Governance Model. Level I: The General Assembly (sovereign authority). Level II: Executive Command led by General Manager Eng. Besufekad Molla Wube and Deputy GM W/ro Yeshiye Semeňew Bogale. Level III: Sectoral Execution through specialized Sector Managers supported by Finance & Internal Audit, Corporate Secretarial, and Asset & Property Management.',
    am: 'ቢኬኤም በሶስት-ደረጃ የአስተዳደር ሞዴል ይሰራል። ደረጃ I፦ ጠቅላላ ጉባኤ (ሉዓላዊ ባለስልጣን)። ደረጃ II፦ የአስፈጻሚ አዛዥ በአጠቃላይ ሥራ አስኪያጅ ኢንጂነር በሱፈቃድ ሞላ ዉቤ እና ምክትል ሥራ አስኪያጅ ወ/ሮ የሺዬ ሰማነው ቦጋሌ ይመራል። ደረጃ III፦ የዘርፍ አፈጻጸም በልዩ ዘርፍ ሥራ አስኪያጆች ከፋይናንስ እና የውስጥ ኦዲት፣ ኮርፖሬት ሴክሬታሪያት፣ እና የንብረት እና ሪል እስቴት አስተዳደር ድጋፍ ጋር።',
    suggestions: ['company overview', 'vision mission', 'careers'],
  },
  {
    keywords: ['registration', 'tin', 'vat', 'license', 'certificate', 'legal', 'tax'],
    en: 'BYKM Trading PLC statutory details: Registration No: AACATB/2/0257491/2018, TIN: 0103921383, VAT No: 35205580010, Tax Category: "A" Taxpayer, Technical Grade: Grade-4 General Contractor (GC-4), Certificate No: CON/32486 (Ethiopian Construction Authority).',
    am: 'የቢኬኤም ትሬዲንግ ኃላፊነቱ የተወሰነ የግል ማህበር ህጋዊ መረጃ፦ የምዝገባ ቁጥር፦ AACATB/2/0257491/2018፣ ቲኢን፦ 0103921383፣ የቫት ቁጥር፦ 35205580010፣ የግብር ምድብ፦ ምድብ "ሀ" ግብር ከፋይ፣ የቴክኒክ ደረጃ፦ ደረጃ-4 አጠቃላይ ኮንትራክተር (ጂሲ-4)፣ የምስክር ወረቀት ቁጥር፦ CON/32486 (የኢትዮጵያ ኮንስትራክሽን ባለስልጣን)።',
    suggestions: ['company overview', 'leadership', 'contact information'],
  },
  {
    keywords: ['hello', 'hi', 'hey', 'greeting', 'good morning', 'good afternoon'],
    en: 'Welcome to BYKM Trading PLC! I\'m your smart assistant. I can help you learn about our company, services, projects, partnership opportunities, and more. What would you like to know?',
    am: 'እንኳን ወደ ቢኬኤም ትሬዲንግ ኃላፊነቱ የተወሰነ የግል ማህበር በደህና መጡ! እኔ የእርስዎ ብልህ ረዳት ነኝ። ስለ ኩባንያችን፣ አገልግሎቶቻችን፣ ፕሮጀክቶቻችን፣ የአጋርነት ዕድሎቻችን እና ሌሎችም እንዲያውቁ ልረዳዎ እችላለሁ። ምን ማወቅ ይፈልጋሉ?',
    suggestions: ['company overview', 'business pillars', 'contact information'],
  },
  {
    keywords: ['thank', 'thanks', 'appreciate'],
    en: 'You\'re welcome! Feel free to ask if you have any other questions about BYKM Trading PLC. We\'re here to help.',
    am: 'ምንም አይደለም! ስለ ቢኬኤም ትሬዲንግ ኃላፊነቱ የተወሰነ የግል ማህበር ሌላ ጥያቄ ካለዎት በነፃነት ይጠይቁ። እኛ ለመርዳት እዚህ ነን።',
    suggestions: ['company overview', 'services offered', 'contact information'],
  },
];

const fallbackEn = 'Thank you for your question. I don\'t have specific information about that in my knowledge base. I\'d recommend checking our Services page for detailed information, or using the Contact form to reach our team directly. You can also ask me about: our company overview, business pillars, services, projects, partnerships, careers, ESG commitment, leadership, or contact information.';
const fallbackAm = 'ጥያቄዎ እናመሰግናለን። በእውቀት መረባችን ውስጥ ስለዚህ ጉዳይ የተለየ መረጃ የለኝም። ዝርዝር መረጃ ለማግኘት የአገልግሎቶቻችንን ገጽ እንዲመለከቱ ወይም የእውቂያ ቅጻችንን በመጠቀም ቡድናችንን በቀጥታ እንዲያነጋግሩ እመክራለሁ። እንዲሁም ስለ፦ የኩባንያ አጠቃላይ እይታ፣ የንግድ ምሰሶዎች፣ አገልግሎቶች፣ ፕሮጀክቶች፣ አጋርነቶች፣ ሙያዎች፣ ኢኤስጂ ቁርጠኝነት፣ አመራር፣ ወይም የእውቂያ መረጃ መጠየቅ ይችላሉ።';

const fallbackSuggestions = ['company overview', 'business pillars', 'contact information'];

@Injectable()
export class ChatService {
  constructor(
    @InjectRepository(UnansweredQuery)
    private readonly unansweredRepo: Repository<UnansweredQuery>,
  ) {}

  async getResponse(userMessage: string, lang: 'en' | 'am' = 'en'): Promise<{ reply: string; suggestions: string[] }> {
    const normalized = userMessage.toLowerCase().trim();
    const detectedAmharic = isAmharic(normalized);
    const responseLang = lang === 'am' || detectedAmharic ? 'am' : 'en';

    const scored = companyData.map((pair) => {
      const score = pair.keywords.reduce((max, kw) => {
        const kwWords = kw.split(' ');
        const kwScore = kwWords.reduce((s, w) => s + (normalized.includes(w) ? 1 : 0), 0);
        return Math.max(max, kwWords.length > 0 ? kwScore / kwWords.length : 0);
      }, 0);
      return { pair, score };
    });

    const best = scored.sort((a, b) => b.score - a.score)[0];

    if (best && best.score >= 0.4) {
      return {
        reply: responseLang === 'am' ? best.pair.am : best.pair.en,
        suggestions: best.pair.suggestions || fallbackSuggestions,
      };
    }

    try {
      await this.unansweredRepo.save(this.unansweredRepo.create({ query: userMessage, lang: responseLang }));
    } catch {
      // ignore logging errors
    }

    return {
      reply: responseLang === 'am' ? fallbackAm : fallbackEn,
      suggestions: fallbackSuggestions,
    };
  }
}
