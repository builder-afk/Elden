import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    date: new Date().toISOString().split('T')[0],
    city: 'Kanpur',
    rates: {
      gold24K: 7420,
      gold22K: 6850,
      gold18K: 5610,
      silver10g: 880,
    },
    currency: 'INR',
    unit: 'per gram',
    source: 'Lata Jewellers Showroom Registry',
  });
}
