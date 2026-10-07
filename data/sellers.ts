import { SellerProfile } from '@/types';

export const sellers: SellerProfile[] = [
  {
    id: 'seller-lata-001',
    userId: 'user-seller-001',
    storeName: 'Lata Jewellers',
    storeSlug: 'lata-jewellers',
    storeNameHindi: 'लता ज्वैलर्स',
    description:
      'Established in Vidyarthi Market, Govind Nagar, Kanpur. Known for generations of honest relationships, authentic 22K BIS hallmarked gold jewellery, uncut Polki diamonds, and handcrafted heritage bridal ornaments.',
    logoUrl: '/images/hero/bridal-hero.jpg',
    bannerUrl: '/images/hero/bridal-hero.jpg',
    address: {
      line1: 'Shop No. 84, Vidyarthi Market',
      line2: 'Govind Nagar',
      area: 'Govind Nagar',
      city: 'Kanpur',
      state: 'Uttar Pradesh',
      pincode: '208006',
      coordinates: {
        lat: 26.4499,
        lng: 80.3319,
      },
    },
    phone: '+91 98390 12345',
    whatsapp: '+91 98390 12345',
    email: 'contact@latajewellers.com',
    gstin: '09AAACL1234F1Z5',
    pan: 'AAACL1234F',
    commissionRate: 8.0,
    verificationStatus: 'verified',
    isFeatured: true,
    googleRating: 4.9,
    googleReviewsCount: 127,
    operatingHours: {
      open: '10:00 AM',
      close: '09:00 PM',
      days: 'Monday – Sunday',
      closedOn: [],
    },
    onboardedAt: '2024-01-15T00:00:00Z',
    createdAt: '2024-01-15T00:00:00Z',
    updatedAt: '2026-03-01T00:00:00Z',
  },
  {
    id: 'seller-verma-002',
    userId: 'user-seller-002',
    storeName: 'Verma & Sons Jewellers',
    storeSlug: 'verma-sons-jewellers',
    storeNameHindi: 'वर्मा एंड संस ज्वैलर्स',
    description:
      'Premier Awadhi jewellery artisans of Hazratganj, Lucknow. Specialists in Jadau, handcrafted Polki choker sets, Kundan kadas, and Lucknowi pearls with authentic BIS Hallmark certification.',
    logoUrl: '/images/hero/lata-store.jpg',
    bannerUrl: '/images/collections/necklaces.jpg',
    address: {
      line1: '14, Mahatma Gandhi Marg',
      line2: 'Near Halwasiya Market, Hazratganj',
      area: 'Hazratganj',
      city: 'Lucknow',
      state: 'Uttar Pradesh',
      pincode: '226001',
      coordinates: {
        lat: 26.8500,
        lng: 80.9499,
      },
    },
    phone: '+91 94150 98765',
    whatsapp: '+91 94150 98765',
    email: 'info@vermasons.com',
    gstin: '09AABCV5678B1Z2',
    pan: 'AABCV5678B',
    commissionRate: 8.5,
    verificationStatus: 'verified',
    isFeatured: true,
    googleRating: 4.8,
    googleReviewsCount: 94,
    operatingHours: {
      open: '11:00 AM',
      close: '08:30 PM',
      days: 'Monday – Saturday',
      closedOn: ['Sunday'],
    },
    onboardedAt: '2024-06-20T00:00:00Z',
    createdAt: '2024-06-20T00:00:00Z',
    updatedAt: '2026-02-15T00:00:00Z',
  },
  {
    id: 'seller-shriram-003',
    userId: 'user-seller-003',
    storeName: 'Shri Ram Jewellers',
    storeSlug: 'shri-ram-jewellers',
    storeNameHindi: 'श्री राम ज्वैलर्स',
    description:
      'Rooted in Thatheri Bazar, Varanasi for over 60 years. Master craftsmen of traditional Banarasi pink meenakari, antique temple gold neckpieces, and bridal sets blessed by holy tradition.',
    logoUrl: '/images/hero/craftsmanship.jpg',
    bannerUrl: '/images/collections/bridal.jpg',
    address: {
      line1: 'K-37/42, Thatheri Bazar',
      line2: 'Chowk',
      area: 'Chowk',
      city: 'Varanasi',
      state: 'Uttar Pradesh',
      pincode: '221001',
      coordinates: {
        lat: 25.3176,
        lng: 83.0062,
      },
    },
    phone: '+91 98380 45678',
    whatsapp: '+91 98380 45678',
    email: 'shriramjewellers.vns@gmail.com',
    gstin: '09AABCS9012D1Z8',
    pan: 'AABCS9012D',
    commissionRate: 8.0,
    verificationStatus: 'verified',
    isFeatured: true,
    googleRating: 4.9,
    googleReviewsCount: 156,
    operatingHours: {
      open: '10:30 AM',
      close: '09:00 PM',
      days: 'Monday – Sunday',
      closedOn: [],
    },
    onboardedAt: '2024-09-10T00:00:00Z',
    createdAt: '2024-09-10T00:00:00Z',
    updatedAt: '2026-03-10T00:00:00Z',
  },
  {
    id: 'seller-royal-004',
    userId: 'user-seller-004',
    storeName: 'Royal Solitaires & Diamonds',
    storeSlug: 'royal-solitaires-diamonds',
    storeNameHindi: 'रॉयल सॉलिटेयर्स',
    description:
      'GIA and IGI certified natural diamond specialists in South Extension, New Delhi. Bespoke engagement solitaires, tennis bracelets, and contemporary cocktail rings with laser-inscribed certs.',
    logoUrl: '/images/collections/rings.jpg',
    bannerUrl: '/images/collections/rings.jpg',
    address: {
      line1: 'G-12, Main Market',
      line2: 'Part 1, South Extension',
      area: 'South Extension',
      city: 'New Delhi',
      state: 'Delhi',
      pincode: '110049',
      coordinates: {
        lat: 28.5700,
        lng: 77.2228,
      },
    },
    phone: '+91 99990 77889',
    whatsapp: '+91 99990 77889',
    email: 'delhi@royalsolitaires.in',
    gstin: '07AAACR3456K1Z9',
    pan: 'AAACR3456K',
    commissionRate: 7.5,
    verificationStatus: 'verified',
    isFeatured: false,
    googleRating: 4.9,
    googleReviewsCount: 210,
    operatingHours: {
      open: '11:00 AM',
      close: '08:00 PM',
      days: 'Tuesday – Sunday',
      closedOn: ['Monday'],
    },
    onboardedAt: '2025-01-05T00:00:00Z',
    createdAt: '2025-01-05T00:00:00Z',
    updatedAt: '2026-02-28T00:00:00Z',
  },
];

export function getSellers(): SellerProfile[] {
  return sellers;
}

export function getSellerBySlug(slug: string): SellerProfile | undefined {
  return sellers.find((s) => s.storeSlug === slug);
}

export function getSellerById(id: string): SellerProfile | undefined {
  return sellers.find((s) => s.id === id);
}
