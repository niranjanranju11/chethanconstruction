import type {
  CompanyProfile,
  DashboardSummary,
  EnquiryItem,
  PageResponse,
  ProjectDetail,
  ServiceItem,
  StorageQuota,
  TestimonialItem,
  User,
} from '../types';

export const DEFAULT_ADMIN_USER: User = {
  id: 'cc-admin-001',
  email: 'admin@chethanconstruction.com',
  role: 'ADMIN',
  createdAt: '2024-01-01T00:00:00Z',
};

export const DEFAULT_COMPANY: CompanyProfile = {
  id: 'cmp-001',
  companyName: 'Chethan Construction',
  tagline: 'Engineering Excellence & Architectural Craftsmanship',
  shortDescription: 'Premier civil engineering, residential, and commercial construction contractor in Bengaluru.',
  fullDescription: 'Chethan Construction delivers world-class structural integrity, modern architectural elevations, and transparent project delivery across Karnataka. With over a decade of hands-on experience, we turn architectural visions into enduring landmarks.',
  phone: '+91 98450 12345',
  whatsapp: '+91 98450 12345',
  email: 'admin@chethanconstruction.com',
  address: '#42, 8th Main, Vijayanagar, Bengaluru, Karnataka 560040',
  serviceArea: 'Bengaluru, Mysuru, Tumakuru, Mandya, Ramanagara & across Karnataka',
  googleMapsUrl: 'https://maps.google.com',
  logoUrl: '/logo.png',
  heroUrl: 'https://images.unsplash.com/photo-1541888946425-d0fbb18086f6?auto=format&fit=crop&w=2000&q=80',
  updatedAt: new Date().toISOString(),
};

export const DEFAULT_SERVICES: ServiceItem[] = [
  {
    id: 'srv-1',
    name: 'Residential Turnkey Construction',
    slug: 'residential-turnkey-construction',
    shortDescription: 'End-to-end luxury villas, duplex homes, and independent residences with strict quality control.',
    description: 'Complete turnkey residential construction from soil testing, foundation, structural RCC framing, premium brickwork to sanitary, electrical, flooring, and exterior landscaping. Delivered on-time with milestone-based transparency.',
    imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
    displayOrder: 1,
    published: true,
  },
  {
    id: 'srv-2',
    name: 'Commercial Complex & Retail Spaces',
    slug: 'commercial-complex-retail-spaces',
    shortDescription: 'High-traffic commercial complexes, office buildings, and retail showrooms designed for durability.',
    description: 'Engineered for optimal space utilization, structural load management, fire safety compliance, and contemporary facade aesthetics. Built for investors and commercial enterprises.',
    imageUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80',
    displayOrder: 2,
    published: true,
  },
  {
    id: 'srv-3',
    name: 'Structural Renovation & Remodeling',
    slug: 'structural-renovation-remodeling',
    shortDescription: 'Modernization, structural reinforcement, vertical floor extensions, and facade makeovers.',
    description: 'Transforming aging properties into contemporary, energy-efficient spaces with non-destructive retrofitting and modern architectural upgrades.',
    imageUrl: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=800&q=80',
    displayOrder: 3,
    published: true,
  },
  {
    id: 'srv-4',
    name: 'Architectural Design & 3D Elevation',
    slug: 'architectural-design-3d-elevation',
    shortDescription: 'Photorealistic 3D elevations, Vaastu-compliant floor plans, and municipal sanction drawings.',
    description: 'State-of-the-art computer-aided structural design, detailed blueprints, MEP schematics, and realistic walk-through visualizations before breaking ground.',
    imageUrl: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80',
    displayOrder: 4,
    published: true,
  },
];

export const DEFAULT_PROJECTS: ProjectDetail[] = [
  {
    id: 'proj-1',
    title: 'Sri Lakshmi Nilaya - Luxury Duplex Residence',
    slug: 'sri-lakshmi-nilaya-luxury-duplex',
    shortDescription: 'Contemporary 4BHK duplex residence featuring cantilever balconies, teakwood finishes, and landscaped terrace.',
    description: 'Built on a 40x60 plot in Vijayanagar, Bengaluru. Complete turnkey construction including subterranean sump, seismic-resistant RCC framework, Italian marble flooring, and smart automation wiring.',
    location: 'Vijayanagar, Bengaluru',
    projectType: 'Residential Duplex',
    area: '4,200 sq.ft',
    startDate: '2023-02-15',
    completionDate: '2024-03-20',
    status: 'COMPLETED',
    featured: true,
    published: true,
    mediaCount: 3,
    createdAt: '2024-03-25T10:00:00Z',
    coverMedia: {
      id: 'med-1',
      projectId: 'proj-1',
      storageKey: 'projects/proj-1/cover.jpg',
      publicUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
      mediaType: 'IMAGE',
      stage: 'AFTER',
      displayOrder: 0,
      cover: true,
      createdAt: '2024-03-25T10:00:00Z',
    },
    media: [
      {
        id: 'med-1',
        projectId: 'proj-1',
        storageKey: 'projects/proj-1/cover.jpg',
        publicUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
        mediaType: 'IMAGE',
        stage: 'AFTER',
        displayOrder: 0,
        cover: true,
        createdAt: '2024-03-25T10:00:00Z',
      },
      {
        id: 'med-1b',
        projectId: 'proj-1',
        storageKey: 'projects/proj-1/during.jpg',
        publicUrl: 'https://images.unsplash.com/photo-1541888946425-d0fbb186156a?auto=format&fit=crop&w=1200&q=80',
        mediaType: 'IMAGE',
        stage: 'DURING',
        displayOrder: 1,
        cover: false,
        createdAt: '2024-03-25T10:00:00Z',
      },
      {
        id: 'med-1c',
        projectId: 'proj-1',
        storageKey: 'projects/proj-1/interior.jpg',
        publicUrl: 'https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?auto=format&fit=crop&w=1200&q=80',
        mediaType: 'IMAGE',
        stage: 'AFTER',
        displayOrder: 2,
        cover: false,
        createdAt: '2024-03-25T10:00:00Z',
      },
    ],
  },
  {
    id: 'proj-2',
    title: 'Emerald Heights Commercial Plaza',
    slug: 'emerald-heights-commercial-plaza',
    shortDescription: 'G+4 commercial hub designed with double-glazed glass facade, high-speed elevator shafts, and retail arcades.',
    description: 'Prime commercial structure in Rajajinagar featuring 14,000 sq.ft of column-free floor plates, underground multi-vehicle parking, and modern solar grid integration.',
    location: 'Rajajinagar, Bengaluru',
    projectType: 'Commercial Complex',
    area: '14,000 sq.ft',
    startDate: '2023-08-10',
    status: 'ONGOING',
    featured: true,
    published: true,
    mediaCount: 1,
    createdAt: '2024-01-15T12:00:00Z',
    coverMedia: {
      id: 'med-2',
      projectId: 'proj-2',
      storageKey: 'projects/proj-2/cover.jpg',
      publicUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
      mediaType: 'IMAGE',
      stage: 'DURING',
      displayOrder: 0,
      cover: true,
      createdAt: '2024-01-15T12:00:00Z',
    },
    media: [
      {
        id: 'med-2',
        projectId: 'proj-2',
        storageKey: 'projects/proj-2/cover.jpg',
        publicUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
        mediaType: 'IMAGE',
        stage: 'DURING',
        displayOrder: 0,
        cover: true,
        createdAt: '2024-01-15T12:00:00Z',
      },
    ],
  },
  {
    id: 'proj-3',
    title: 'Chethan Heritage Villa',
    slug: 'chethan-heritage-villa',
    shortDescription: 'Traditional courtyard villa blending vernacular Chettinad architecture with contemporary structural engineering.',
    description: 'Crafted with terracotta tiles, carved stone pillars, central open-to-sky courtyard, and rainwater harvesting cistern.',
    location: 'Mysore Road, Bengaluru',
    projectType: 'Residential Villa',
    area: '5,100 sq.ft',
    startDate: '2022-11-01',
    completionDate: '2023-12-10',
    status: 'COMPLETED',
    featured: true,
    published: true,
    mediaCount: 1,
    createdAt: '2023-12-15T09:00:00Z',
    coverMedia: {
      id: 'med-3',
      projectId: 'proj-3',
      storageKey: 'projects/proj-3/cover.jpg',
      publicUrl: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1200&q=80',
      mediaType: 'IMAGE',
      stage: 'AFTER',
      displayOrder: 0,
      cover: true,
      createdAt: '2023-12-15T09:00:00Z',
    },
    media: [
      {
        id: 'med-3',
        projectId: 'proj-3',
        storageKey: 'projects/proj-3/cover.jpg',
        publicUrl: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1200&q=80',
        mediaType: 'IMAGE',
        stage: 'AFTER',
        displayOrder: 0,
        cover: true,
        createdAt: '2023-12-15T09:00:00Z',
      },
    ],
  },
  {
    id: 'proj-4',
    title: 'Greenwood Premium Row Houses',
    slug: 'greenwood-premium-row-houses',
    shortDescription: 'A cluster of 8 contemporary gated community row houses with landscaped avenues and private rooftop gardens.',
    description: 'Ongoing gated development in Kengeri Satellite Town. Fast-track construction using precision Mivan shuttering and autoclaved aerated concrete (AAC) blocks.',
    location: 'Kengeri Satellite Town, Bengaluru',
    projectType: 'Residential Community',
    area: '22,000 sq.ft',
    startDate: '2024-01-10',
    status: 'ONGOING',
    featured: false,
    published: true,
    mediaCount: 1,
    createdAt: '2024-01-20T11:00:00Z',
    coverMedia: {
      id: 'med-4',
      projectId: 'proj-4',
      storageKey: 'projects/proj-4/cover.jpg',
      publicUrl: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
      mediaType: 'IMAGE',
      stage: 'DURING',
      displayOrder: 0,
      cover: true,
      createdAt: '2024-01-20T11:00:00Z',
    },
    media: [
      {
        id: 'med-4',
        projectId: 'proj-4',
        storageKey: 'projects/proj-4/cover.jpg',
        publicUrl: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
        mediaType: 'IMAGE',
        stage: 'DURING',
        displayOrder: 0,
        cover: true,
        createdAt: '2024-01-20T11:00:00Z',
      },
    ],
  },
  {
    id: 'proj-5',
    title: 'Pranav Tech Park Logistics Annex',
    slug: 'pranav-tech-park-logistics-annex',
    shortDescription: 'Pre-Engineered Building (PEB) industrial warehouse with heavy-duty epoxy flooring and overhead crane provision.',
    description: 'Upcoming high-clearance logistics facility spanning 28,000 sq.ft designed for industrial storage and automated fulfillment operations.',
    location: 'Peenya Industrial Area, Bengaluru',
    projectType: 'Industrial / PEB',
    area: '28,000 sq.ft',
    startDate: '2024-06-01',
    status: 'UPCOMING',
    featured: false,
    published: true,
    mediaCount: 1,
    createdAt: '2024-03-01T14:00:00Z',
    coverMedia: {
      id: 'med-5',
      projectId: 'proj-5',
      storageKey: 'projects/proj-5/cover.jpg',
      publicUrl: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80',
      mediaType: 'IMAGE',
      stage: 'GENERAL',
      displayOrder: 0,
      cover: true,
      createdAt: '2024-03-01T14:00:00Z',
    },
    media: [
      {
        id: 'med-5',
        projectId: 'proj-5',
        storageKey: 'projects/proj-5/cover.jpg',
        publicUrl: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80',
        mediaType: 'IMAGE',
        stage: 'GENERAL',
        displayOrder: 0,
        cover: true,
        createdAt: '2024-03-01T14:00:00Z',
      },
    ],
  },
];

export const DEFAULT_STORAGE_QUOTA: StorageQuota = {
  totalBytesUsed: 1435682816, // 1.34 GB
  maxFreeBytes: 10737418240,  // 10.00 GB
  usagePercentage: 13.4,
  uploadAllowed: true,
  formattedUsed: '1.34 GB',
  formattedLimit: '10.00 GB',
};

export const DEFAULT_TESTIMONIALS: TestimonialItem[] = [
  {
    id: 't-1',
    customerName: 'Suresh Gowda',
    customerRoleOrContext: 'Owner, Sri Lakshmi Nilaya (Vijayanagar)',
    quote: 'Chethan Construction built our duplex home with outstanding quality. Every stage, from foundation to painting, was executed transparently and on schedule. Highly recommended!',
    rating: 5,
    published: true,
    displayOrder: 1,
  },
  {
    id: 't-2',
    customerName: 'Dr. Ramesh Kumar',
    customerRoleOrContext: 'Developer, Emerald Plaza (Rajajinagar)',
    quote: 'Their technical expertise in structural engineering and column-free commercial design saved us substantial time and cost. The team is remarkably professional.',
    rating: 5,
    published: true,
    displayOrder: 2,
  },
  {
    id: 't-3',
    customerName: 'Anitha & Manjunath',
    customerRoleOrContext: 'Homeowners, Heritage Villa (Mysuru Road)',
    quote: 'We wanted a traditional courtyard villa with modern amenities. Chethan and his engineering team delivered beyond our expectations. The craftsmanship is breathtaking!',
    rating: 5,
    published: true,
    displayOrder: 3,
  },
];

export const DEFAULT_ENQUIRIES: EnquiryItem[] = [
  {
    id: 'enq-1',
    name: 'Mahesh Hegde',
    phone: '+91 94801 88231',
    email: 'hegde.mahesh@gmail.com',
    projectType: 'Residential Duplex',
    location: 'Nagarbhavi 2nd Stage, Bengaluru',
    budget: '₹85 - 95 Lakhs',
    message: 'Planning to construct a 30x50 3BHK duplex house with contemporary exterior elevation and car parking. Please share quotation and schedule site visit.',
    status: 'NEW',
    internalNotes: 'Followed up via WhatsApp. Site visit planned for Saturday morning.',
    createdAt: '2024-03-28T09:30:00Z',
  },
  {
    id: 'enq-2',
    name: 'Shankar Murthy',
    phone: '+91 98442 11900',
    email: 'smurthy@techconsult.in',
    projectType: 'Commercial Complex',
    location: 'West of Chord Road, Rajajinagar',
    budget: '₹2.2 - 2.5 Crores',
    message: 'Looking for a general contractor for G+3 commercial building with basement parking. Plan approval is completed.',
    status: 'CONTACTED',
    internalNotes: 'Blueprints received via email. Estimator preparing BOQ.',
    createdAt: '2024-03-26T14:15:00Z',
  },
  {
    id: 'enq-3',
    name: 'Sunitha Deshpande',
    phone: '+91 97410 55432',
    email: 'sunitha.deshpande@outlook.com',
    projectType: 'Renovation & Extension',
    location: 'Basaveshwaranagar',
    budget: '₹25 - 30 Lakhs',
    message: 'Need to add a 2nd floor residential unit to an existing single-floor building with structural reinforcement.',
    status: 'IN_PROGRESS',
    internalNotes: 'Structural engineer inspected column load capacity. Report approved.',
    createdAt: '2024-03-24T11:00:00Z',
  },
];

// Helper to access persistent local fallback store in browser
class MockStore {
  private get<T>(key: string, defaultVal: T): T {
    try {
      const data = localStorage.getItem(`cc_store_${key}`);
      return data ? JSON.parse(data) : defaultVal;
    } catch {
      return defaultVal;
    }
  }

  private set<T>(key: string, val: T): void {
    try {
      localStorage.setItem(`cc_store_${key}`, JSON.stringify(val));
    } catch (e) {
      console.warn('Could not save to localStorage', e);
    }
  }

  getProjects(): ProjectDetail[] {
    return this.get<ProjectDetail[]>('projects', DEFAULT_PROJECTS);
  }

  saveProjects(projects: ProjectDetail[]): void {
    this.set('projects', projects);
  }

  getEnquiries(): EnquiryItem[] {
    return this.get<EnquiryItem[]>('enquiries', DEFAULT_ENQUIRIES);
  }

  saveEnquiries(enquiries: EnquiryItem[]): void {
    this.set('enquiries', enquiries);
  }

  getCompany(): CompanyProfile {
    return this.get<CompanyProfile>('company', DEFAULT_COMPANY);
  }

  saveCompany(company: CompanyProfile): void {
    this.set('company', company);
  }

  getServices(): ServiceItem[] {
    return this.get<ServiceItem[]>('services', DEFAULT_SERVICES);
  }

  saveServices(services: ServiceItem[]): void {
    this.set('services', services);
  }

  getTestimonials(): TestimonialItem[] {
    return this.get<TestimonialItem[]>('testimonials', DEFAULT_TESTIMONIALS);
  }

  saveTestimonials(testimonials: TestimonialItem[]): void {
    this.set('testimonials', testimonials);
  }

  getDashboardSummary(): DashboardSummary {
    const projects = this.getProjects();
    const enquiries = this.getEnquiries();

    return {
      totalProjects: projects.length,
      publishedProjects: projects.filter((p) => p.published).length,
      ongoingProjects: projects.filter((p) => p.status === 'ONGOING').length,
      completedProjects: projects.filter((p) => p.status === 'COMPLETED').length,
      upcomingProjects: projects.filter((p) => p.status === 'UPCOMING').length,
      newEnquiries: enquiries.filter((e) => e.status === 'NEW').length,
      totalEnquiries: enquiries.length,
      recentProjects: projects.slice(0, 5),
      storageQuota: DEFAULT_STORAGE_QUOTA,
    };
  }

  toPageResponse<T>(items: T[], page = 0, size = 20): PageResponse<T> {
    const start = page * size;
    const content = items.slice(start, start + size);
    const totalPages = Math.ceil(items.length / size) || 1;
    return {
      content,
      page,
      size,
      totalElements: items.length,
      totalPages,
      last: page >= totalPages - 1,
    };
  }
}

export const mockStore = new MockStore();
