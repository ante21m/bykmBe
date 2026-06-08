import { v4 as uuidv4 } from 'uuid';
import { Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Service } from '../../entities/service.entity';

@Injectable()
export class ServicesDataService implements OnModuleInit {
  constructor(
    @InjectRepository(Service)
    private readonly serviceRepository: Repository<Service>,
  ) {}

  async onModuleInit() {
    const count = await this.serviceRepository.count();
    if (count === 0) {
      await this.seedServices();
    }
  }

  private async seedServices() {
    const services: Partial<Service>[] = [
      {
        pillarKey: 'agro',
        pillarTitle: 'Agro-Industrialization & Natural Resources',
        pillarDescription:
          'Transitioning Ethiopia from a raw-material exporter to a processed-goods powerhouse through the full value chain.',
        title: 'Coffee Value Chain Management',
        description:
          'Full lifecycle management of Ethiopia\'s "green gold" — from promotion and industrial roasting to strategic export of finished coffee products to maximize foreign exchange earnings.',
        features: [
          'Industrial coffee roasting',
          'Premium packaging',
          'International export logistics',
          'Foreign exchange optimization',
        ],
        icon: 'coffee',
        sortOrder: 1,
        active: true,
      },
      {
        pillarKey: 'agro',
        pillarTitle: 'Agro-Industrialization & Natural Resources',
        pillarDescription:
          'Transitioning Ethiopia from a raw-material exporter to a processed-goods powerhouse through the full value chain.',
        title: 'High-Value Agriculture & Agro-Processing',
        description:
          'Commercial production and export of oilseeds, pulses, and industrial crops, plus manufacturing plants that process raw agricultural inputs into value-added goods.',
        features: [
          'Oilseed & pulse production',
          'Industrial crop cultivation',
          'Agro-processing facilities',
          'Import substitution manufacturing',
        ],
        icon: 'wheat',
        sortOrder: 2,
        active: true,
      },
      {
        pillarKey: 'agro',
        pillarTitle: 'Agro-Industrialization & Natural Resources',
        pillarDescription:
          'Transitioning Ethiopia from a raw-material exporter to a processed-goods powerhouse through the full value chain.',
        title: 'Mineral Extraction & Bottled Water',
        description:
          'Sustainable mining operations and mineral water production applying extraction methods aligned with Ethiopia\'s National Green Legacy.',
        features: [
          'Sustainable mineral extraction',
          'Bottled mineral water production',
          'Green extraction protocols',
          'Biodiversity preservation',
        ],
        icon: 'gem',
        sortOrder: 3,
        active: true,
      },
      {
        pillarKey: 'infrastructure',
        pillarTitle: 'Infrastructure, Engineering & Urban Development',
        pillarDescription:
          'Providing the physical foundation required for a modern, smart-city economy through integrated engineering excellence.',
        title: 'Grade-4 General Contracting',
        description:
          'Complex works in Building, Road, Water, and Electro-mechanical engineering using our Grade-4 (GC-4) certification from the Ethiopian Construction Authority.',
        features: [
          'Building construction',
          'Road & highway engineering',
          'Water infrastructure',
          'Electro-mechanical systems',
        ],
        icon: 'building',
        sortOrder: 4,
        active: true,
      },
      {
        pillarKey: 'infrastructure',
        pillarTitle: 'Infrastructure, Engineering & Urban Development',
        pillarDescription:
          'Providing the physical foundation required for a modern, smart-city economy through integrated engineering excellence.',
        title: 'Urban Redevelopment & Living Infrastructure',
        description:
          'Mega-Corridor projects blending heavy civil engineering with ecological restoration, creating Living Infrastructure that serves cities and nature simultaneously.',
        features: [
          'Mega-corridor development',
          'Urban green lung creation',
          'Riverside stabilization',
          'Sustainable drainage systems',
        ],
        icon: 'city',
        sortOrder: 5,
        active: true,
      },
      {
        pillarKey: 'infrastructure',
        pillarTitle: 'Infrastructure, Engineering & Urban Development',
        pillarDescription:
          'Providing the physical foundation required for a modern, smart-city economy through integrated engineering excellence.',
        title: 'Real Estate & Technical Consultancy',
        description:
          'Urban land acquisition and development for residential, office, and commercial complexes, plus professional project studies and engineering management consultancy.',
        features: [
          'Real estate development',
          'Commercial complex construction',
          'Engineering consultancy',
          'Project management',
        ],
        icon: 'home',
        sortOrder: 6,
        active: true,
      },
      {
        pillarKey: 'logistics',
        pillarTitle: 'Global Trade, Logistics & Transport',
        pillarDescription:
          'Positioning BYKM as the primary link between Ethiopian producers and the global market through integrated trade solutions.',
        title: 'Strategic Import/Export & Trade Agency',
        description:
          'Facilitating the flow of critical industrial machinery, stationery, and general commodities. Commission agent services bridging international buyers and local producers.',
        features: [
          'Industrial machinery import',
          'Agricultural export facilitation',
          'Trade agency services',
          'Commission representation',
        ],
        icon: 'globe',
        sortOrder: 7,
        active: true,
      },
      {
        pillarKey: 'logistics',
        pillarTitle: 'Global Trade, Logistics & Transport',
        pillarDescription:
          'Positioning BYKM as the primary link between Ethiopian producers and the global market through integrated trade solutions.',
        title: 'Logistics, Warehousing & Fleet Management',
        description:
          'Complete physical architecture for trade including transit services, freight forwarding, high-capacity warehouse rental, and vehicle/heavy machinery import and rental.',
        features: [
          'Freight forwarding',
          'High-capacity warehousing',
          'Vehicle & machinery rental',
          'Fleet management',
        ],
        icon: 'truck',
        sortOrder: 8,
        active: true,
      },
      {
        pillarKey: 'digital',
        pillarTitle: 'Digital Economy, Media & Technical Services',
        pillarDescription:
          'Integrating technology into the industrial process, moving Ethiopia toward Industry 4.0.',
        title: 'ICT & Telecommunications Infrastructure',
        description:
          'Network infrastructure development and specialized Information Communication Technology services to modernize business operations across Ethiopia.',
        features: [
          'Network infrastructure',
          'ICT system integration',
          'Telecommunications solutions',
          'Smart city connectivity',
        ],
        icon: 'network',
        sortOrder: 9,
        active: true,
      },
      {
        pillarKey: 'digital',
        pillarTitle: 'Digital Economy, Media & Technical Services',
        pillarDescription:
          'Integrating technology into the industrial process, moving Ethiopia toward Industry 4.0.',
        title: 'Printing, Publishing & Knowledge Transfer',
        description:
          'Full-scale printing house operations, specialized printing machinery import, and professional ICT training to equip Ethiopia\'s workforce for the digital age.',
        features: [
          'Commercial printing',
          'Specialized machinery import',
          'ICT vocational training',
          'Digital literacy programs',
        ],
        icon: 'printer',
        sortOrder: 10,
        active: true,
      },
      {
        pillarKey: 'hospitality',
        pillarTitle: 'Hospitality, Retail & Consumer Ecosystems',
        pillarDescription:
          'Elevating the standard of living and consumption in Modern Ethiopia.',
        title: 'Luxury Hospitality & Eco-Resorts',
        description:
          'Development and management of hotels, eco-resorts, and specialized leisure services (including boat leisure), showcasing Ethiopian hospitality and natural beauty to the world.',
        features: [
          'Hotel development & management',
          'Eco-resort construction',
          'Boat leisure services',
          'Ethiopian hospitality brand',
        ],
        icon: 'hotel',
        sortOrder: 11,
        active: true,
      },
      {
        pillarKey: 'hospitality',
        pillarTitle: 'Hospitality, Retail & Consumer Ecosystems',
        pillarDescription:
          'Elevating the standard of living and consumption in Modern Ethiopia.',
        title: 'Modernized Retail & Agricultural Supply',
        description:
          'Tiered retail network from Cafés and Mini-markets to Supermarkets and Hypermarkets, plus importation and distribution of high-quality fertilizers, veterinary medicines, and agricultural chemicals.',
        features: [
          'Multi-format retail network',
          'Agricultural input supply',
          'Fertilizer distribution',
          'Consumer goods distribution',
        ],
        icon: 'store',
        sortOrder: 12,
        active: true,
      },
    ];

    await this.serviceRepository.save(
      services.map((s) => ({ ...s, id: uuidv4() })),
    );
  }

  async findAll(pillarKey?: string): Promise<Service[]> {
    const query = this.serviceRepository.createQueryBuilder('service').where(
      'service.active = :active',
      { active: true },
    );

    if (pillarKey) {
      query.andWhere('service.pillarKey = :pillarKey', { pillarKey });
    }

    return query.orderBy('service.sortOrder', 'ASC').getMany();
  }

  async findPillars(): Promise<{ key: string; title: string; description: string }[]> {
    const services = await this.serviceRepository
      .createQueryBuilder('service')
      .select(['service.pillarKey', 'service.pillarTitle', 'service.pillarDescription'])
      .where('service.active = :active', { active: true })
      .distinctOn(['service.pillarKey'])
      .orderBy('service.pillarKey')
      .getMany();

    return services.map((s) => ({
      key: s.pillarKey,
      title: s.pillarTitle,
      description: s.pillarDescription,
    }));
  }

  async findOne(id: string): Promise<Service> {
    const service = await this.serviceRepository.findOne({ where: { id } });
    if (!service) throw new NotFoundException(`Service ${id} not found`);
    return service;
  }

  async create(data: Partial<Service>): Promise<Service> {
    const service = this.serviceRepository.create(data);
    return this.serviceRepository.save(service);
  }

  async update(id: string, data: Partial<Service>): Promise<Service> {
    await this.findOne(id);
    await this.serviceRepository.update(id, data);
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.findOne(id);
    await this.serviceRepository.delete(id);
  }
}
