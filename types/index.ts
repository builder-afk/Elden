// ─── Product & Catalogue Types ───

export interface Product {
  id: string;
  sku: string;
  name: string;
  slug: string;
  collection: string;
  collectionSlug: string;
  category: string;
  categorySlug: string;
  description: string;
  metal?: string;
  purity?: string;
  grossWeight?: string;
  netWeight?: string;
  stoneInfo?: string;
  sizes?: string[];
  price?: number;
  priceDisplay?: string;
  makingCharge?: string;
  images: ProductImage[];
  availability: 'in-stock' | 'made-to-order' | 'enquire';
  certification?: string;
  featured: boolean;
  isNew?: boolean;
  occasion?: string[];
  style?: 'traditional' | 'contemporary' | 'minimal' | 'statement';
  careInfo?: string;
  sortOrder: number;
  // ── Marketplace additions ──
  sellerId?: string;
  seller?: SellerProfile;
  inventoryCount?: number;
  isActive?: boolean;
  shippingInfo?: ShippingInfo;
}

export interface ProductImage {
  id: string;
  url: string;
  alt: string;
  sortOrder: number;
  isPrimary: boolean;
}

export interface Collection {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  productCount: number;
  featured: boolean;
  sortOrder: number;
  // ── Marketplace additions ──
  sellerId?: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  parentId?: string;
  image: string;
}

// ─── Seller Types ───

export interface SellerProfile {
  id: string;
  userId: string;
  storeName: string;
  storeSlug: string;
  storeNameHindi?: string;
  description?: string;
  logoUrl?: string;
  bannerUrl?: string;
  address: SellerAddress;
  phone: string;
  whatsapp?: string;
  email: string;
  gstin?: string;
  pan?: string;
  bankDetails?: BankDetails;
  commissionRate: number;
  verificationStatus: VerificationStatus;
  isFeatured: boolean;
  googleRating?: number;
  googleReviewsCount: number;
  operatingHours?: OperatingHours;
  onboardedAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface SellerAddress {
  line1: string;
  line2?: string;
  area: string;
  city: string;
  state: string;
  pincode: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
}

export interface BankDetails {
  accountName: string;
  accountNumber: string;
  ifsc: string;
  bankName: string;
}

export interface OperatingHours {
  open: string;
  close: string;
  days: string;
  closedOn?: string[];
}

export type VerificationStatus =
  | 'pending'
  | 'documents_submitted'
  | 'verified'
  | 'suspended'
  | 'rejected';

export interface SellerDocument {
  id: string;
  sellerId: string;
  documentType: DocumentType;
  documentUrl: string;
  verificationStatus: 'pending' | 'approved' | 'rejected';
  reviewerNotes?: string;
  uploadedAt: string;
}

export type DocumentType =
  | 'gstin'
  | 'pan_card'
  | 'shop_license'
  | 'hallmark_license'
  | 'identity_proof'
  | 'address_proof';

// ─── Seller Registration Form ───

export interface SellerRegistrationData {
  storeName: string;
  storeNameHindi?: string;
  description?: string;
  address: SellerAddress;
  phone: string;
  whatsapp?: string;
  email: string;
  gstin?: string;
  pan?: string;
  bankDetails?: BankDetails;
}

// ─── Customer Types ───

export interface CustomerProfile {
  id: string;
  userId: string;
  fullName: string;
  phone?: string;
  defaultAddress?: ShippingAddress;
  createdAt: string;
}

export interface ShippingAddress {
  fullName: string;
  phone: string;
  line1: string;
  line2?: string;
  area: string;
  city: string;
  state: string;
  pincode: string;
}

export interface ShippingInfo {
  shipsFrom?: string;
  estimatedDays?: number;
  freeShippingAbove?: number;
}

// ─── Cart Types ───

export interface CartItem {
  id: string;
  customerId: string;
  productId: string;
  quantity: number;
  selectedSize?: string;
  addedAt: string;
  // Joined data
  product?: Product;
}

// ─── Order Types ───

export type OrderStatus =
  | 'pending'
  | 'confirmed'
  | 'processing'
  | 'shipped'
  | 'delivered'
  | 'cancelled'
  | 'refund_requested'
  | 'refunded';

export type PaymentStatus =
  | 'pending'
  | 'authorized'
  | 'captured'
  | 'failed'
  | 'refunded';

export interface Order {
  id: string;
  orderNumber: string;
  customerId: string;
  sellerId: string;
  status: OrderStatus;
  subtotal: number;
  makingCharges: number;
  gstAmount: number;
  shippingAmount: number;
  totalAmount: number;
  commissionAmount: number;
  sellerPayout: number;
  shippingAddress: ShippingAddress;
  paymentMethod?: string;
  paymentId?: string;
  paymentStatus: PaymentStatus;
  notes?: string;
  createdAt: string;
  updatedAt: string;
  // Joined data
  items?: OrderItem[];
  customer?: CustomerProfile;
  seller?: SellerProfile;
}

export interface OrderItem {
  id: string;
  orderId: string;
  productId?: string;
  productName: string;
  productSku?: string;
  productImage?: string;
  quantity: number;
  unitPrice: number;
  selectedSize?: string;
  metal?: string;
  purity?: string;
}

// ─── Payout Types ───

export type PayoutStatus = 'pending' | 'processing' | 'completed' | 'failed';

export interface SellerPayout {
  id: string;
  sellerId: string;
  periodStart: string;
  periodEnd: string;
  totalSales: number;
  totalCommission: number;
  netPayout: number;
  status: PayoutStatus;
  razorpayTransferId?: string;
  createdAt: string;
}

// ─── Dispute Types ───

export type DisputeType =
  | 'product_quality'
  | 'not_as_described'
  | 'not_delivered'
  | 'damaged'
  | 'other';

export type DisputeStatus =
  | 'open'
  | 'under_review'
  | 'resolved_buyer'
  | 'resolved_seller'
  | 'escalated'
  | 'closed';

export interface Dispute {
  id: string;
  orderId: string;
  raisedBy: string;
  type: DisputeType;
  description: string;
  evidenceUrls?: string[];
  status: DisputeStatus;
  resolutionNotes?: string;
  createdAt: string;
  resolvedAt?: string;
  // Joined data
  order?: Order;
}

// ─── Auth Types ───

export type UserRole = 'customer' | 'seller' | 'admin';

export interface AuthUser {
  id: string;
  email: string;
  role: UserRole;
  fullName?: string;
  avatarUrl?: string;
}

// ─── Occasion Types ───

export interface Occasion {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  icon?: string;
}

// ─── Wishlist Types ───

export interface WishlistItem {
  productId: string;
  addedAt: string;
}

// ─── Appointment Types ───

export type AppointmentStatus =
  | 'new'
  | 'contacted'
  | 'confirmed'
  | 'visited'
  | 'follow-up'
  | 'converted'
  | 'closed';

export interface AppointmentRequest {
  name: string;
  phone: string;
  email?: string;
  date: string;
  time: string;
  type: 'store-visit' | 'bridal-consultation' | 'general' | 'ring-consultation';
  productIds?: string[];
  notes?: string;
}

export interface BridalConsultationRequest {
  name: string;
  phone: string;
  weddingDate: string;
  appointmentDate: string;
  preferredTime: string;
  jewelleryInterests: string[];
  budgetRange?: string;
  additionalRequirements?: string;
}

// ─── Review Types ───

export interface Review {
  id: string;
  author: string;
  rating: number;
  text: string;
  source: 'google' | 'manual';
  featured: boolean;
  date: string;
  // ── Marketplace additions ──
  productId?: string;
  sellerId?: string;
  customerId?: string;
  isVerifiedPurchase?: boolean;
  product?: Product;
  seller?: SellerProfile;
}

// ─── Store Types ───

export interface StoreInfo {
  name: string;
  nameHindi: string;
  address: {
    line1: string;
    line2: string;
    area: string;
    city: string;
    state: string;
    pincode: string;
  };
  googleRating: number;
  googleReviews: number;
  hours: {
    open: string;
    close: string;
    days: string;
  };
  coordinates: {
    lat: number;
    lng: number;
  };
  shoppingModes: string[];
  phone?: string;
  whatsapp?: string;
  website?: string;
  mapEmbedUrl: string;
}

// ─── Finder Types ───

export interface FinderSelections {
  shoppingFor?: string;
  occasion?: string;
  jewelleryType?: string;
  style?: string;
  budget?: string;
}

// ─── API Response Types ───

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  total: number;
  page: number;
  pageSize: number;
  hasMore: boolean;
}
