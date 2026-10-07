import { NextResponse } from 'next/server';
import { createAppointment } from '@/lib/supabase/queries';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const result = await createAppointment(body);
    return NextResponse.json({ success: true, result });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
