import { supabase } from './client';
import { products as fallbackProducts, collections as fallbackCollections, reviews as fallbackReviews } from '@/data/catalogue';
import { Product, Collection, Review, AppointmentRequest, BridalConsultationRequest } from '@/types';

const isSupabaseConfigured = () => {
  return (
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
    !process.env.NEXT_PUBLIC_SUPABASE_URL.includes('placeholder') &&
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY &&
    !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY.includes('placeholder')
  );
};

export async function getCollections(): Promise<Collection[]> {
  if (!isSupabaseConfigured()) {
    return fallbackCollections;
  }
  try {
    const { data, error } = await supabase
      .from('collections')
      .select('*')
      .order('sort_order', { ascending: true });

    if (error || !data || data.length === 0) return fallbackCollections;
    return data as Collection[];
  } catch {
    return fallbackCollections;
  }
}

export async function getProducts(options?: {
  collectionSlug?: string;
  featured?: boolean;
  limit?: number;
}): Promise<Product[]> {
  if (!isSupabaseConfigured()) {
    let result = [...fallbackProducts];
    if (options?.collectionSlug) {
      result = result.filter((p) => p.collectionSlug === options.collectionSlug);
    }
    if (options?.featured) {
      result = result.filter((p) => p.featured);
    }
    if (options?.limit) {
      result = result.slice(0, options.limit);
    }
    return result;
  }

  try {
    let query = supabase.from('products').select('*, product_images(*)');
    if (options?.featured) query = query.eq('featured', true);
    if (options?.limit) query = query.limit(options.limit);

    const { data, error } = await query;
    if (error || !data || data.length === 0) return fallbackProducts;
    return data as Product[];
  } catch {
    return fallbackProducts;
  }
}

export async function createAppointment(appointment: AppointmentRequest) {
  if (!isSupabaseConfigured()) {
    console.log('[Lata Jewellers] Appointment logged (Local Demo Mode):', appointment);
    try {
      const existing = JSON.parse(localStorage.getItem('lata_admin_appointments') || '[]');
      const newEntry = {
        id: 'APT-' + Math.floor(1000 + Math.random() * 9000),
        customer_name: appointment.name,
        phone: appointment.phone,
        email: appointment.email,
        date: appointment.date,
        time: appointment.time,
        type: appointment.type,
        status: 'new',
        product_ids: appointment.productIds || [],
        created_at: new Date().toISOString(),
      };
      localStorage.setItem('lata_admin_appointments', JSON.stringify([newEntry, ...existing]));
    } catch {
      // Storage safe fallback
    }
    return { success: true, id: 'APT-DEMO-101' };
  }

  const { data, error } = await supabase.from('appointments').insert([
    {
      customer_name: appointment.name,
      phone: appointment.phone,
      email: appointment.email,
      date: appointment.date,
      time: appointment.time,
      type: appointment.type,
      notes: appointment.notes,
      product_ids: appointment.productIds || [],
      status: 'new',
    },
  ]);

  if (error) throw error;
  return { success: true, data };
}

export async function createBridalEnquiry(enquiry: BridalConsultationRequest) {
  if (!isSupabaseConfigured()) {
    console.log('[Lata Jewellers] Bridal Consultation logged (Local Demo Mode):', enquiry);
    try {
      const existing = JSON.parse(localStorage.getItem('lata_admin_bridal') || '[]');
      const newEntry = {
        id: 'BRD-' + Math.floor(1000 + Math.random() * 9000),
        name: enquiry.name,
        phone: enquiry.phone,
        wedding_date: enquiry.weddingDate,
        appointment_date: enquiry.appointmentDate,
        preferred_time: enquiry.preferredTime,
        jewellery_interests: enquiry.jewelleryInterests,
        budget_range: enquiry.budgetRange,
        additional_requirements: enquiry.additionalRequirements,
        status: 'new',
        created_at: new Date().toISOString(),
      };
      localStorage.setItem('lata_admin_bridal', JSON.stringify([newEntry, ...existing]));
    } catch {
      // Storage safe fallback
    }
    return { success: true, id: 'BRD-DEMO-202' };
  }

  const { data, error } = await supabase.from('bridal_enquiries').insert([
    {
      name: enquiry.name,
      phone: enquiry.phone,
      wedding_date: enquiry.weddingDate,
      appointment_date: enquiry.appointmentDate,
      preferred_time: enquiry.preferredTime,
      jewellery_interests: enquiry.jewelleryInterests,
      budget_range: enquiry.budgetRange,
      additional_requirements: enquiry.additionalRequirements,
      status: 'new',
    },
  ]);

  if (error) throw error;
  return { success: true, data };
}

export async function getReviews(): Promise<Review[]> {
  if (!isSupabaseConfigured()) {
    return fallbackReviews;
  }
  try {
    const { data, error } = await supabase
      .from('reviews')
      .select('*')
      .eq('featured', true);
    if (error || !data || data.length === 0) return fallbackReviews;
    return data as Review[];
  } catch {
    return fallbackReviews;
  }
}
