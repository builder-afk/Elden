import { NextResponse } from 'next/server';
import { products } from '@/data/catalogue';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const collection = searchParams.get('collection');
  const featured = searchParams.get('featured');

  let result = [...products];
  if (collection) {
    result = result.filter((p) => p.collectionSlug === collection);
  }
  if (featured === 'true') {
    result = result.filter((p) => p.featured);
  }

  return NextResponse.json({
    success: true,
    total: result.length,
    products: result,
  });
}
