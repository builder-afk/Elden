import { StoreInfo } from '@/types';

export const storeInfo: StoreInfo = {
  name: 'Lata Jewellers',
  nameHindi: 'लता ज्वैलर्स',
  address: {
    line1: 'Shop No. 84, Vidyarthi Market',
    line2: 'Govind Nagar',
    area: 'Govind Nagar',
    city: 'Kanpur',
    state: 'Uttar Pradesh',
    pincode: '208006',
  },
  googleRating: 4.9,
  googleReviews: 127,
  hours: {
    open: '10:00 AM',
    close: '9:00 PM',
    days: 'Monday – Sunday',
  },
  coordinates: {
    lat: 26.4499,
    lng: 80.3319,
  },
  shoppingModes: ['In-store shopping', 'In-store pickup', 'Delivery'],
  mapEmbedUrl:
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3572.583321528612!2d80.3319!3d26.4499!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjbCsDI2JzU5LjYiTiA4MMKwMTknNTQuOCJF!5e0!3m2!1sen!2sin!4v1',
};

export const brandPillars = [
  {
    title: 'Trust',
    titleHindi: 'विश्वास',
    description: 'Built on decades of honest relationships and genuine craftsmanship.',
    icon: 'shield-check',
  },
  {
    title: 'Craftsmanship',
    titleHindi: 'कारीगरी',
    description: 'Every piece reflects meticulous attention to detail and traditional artistry.',
    icon: 'gem',
  },
  {
    title: 'Variety',
    titleHindi: 'विविधता',
    description: 'From timeless bridal sets to everyday elegance, designs for every moment.',
    icon: 'sparkles',
  },
  {
    title: 'Value',
    titleHindi: 'मूल्य',
    description: 'Fair, transparent pricing that respects your hard-earned investment.',
    icon: 'heart-handshake',
  },
  {
    title: 'Relationships',
    titleHindi: 'रिश्ते',
    description: 'Generations of families returning to us for their most cherished milestones.',
    icon: 'users',
  },
];
