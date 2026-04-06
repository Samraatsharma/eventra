import { NextResponse } from 'next/server';
import { collection, addDoc, getDocs, Timestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase/config';

const seedVendors = [
  {
    businessName: 'Aether Studios Delhi',
    email: 'contact@aetherstudios.in',
    category: ['Wedding', 'Decoration'],
    description: 'Architecting immersive digital environments and sensory-rich gala experiences for the next generation of events across India.',
    location: 'Delhi, India',
    priceRange: '$$$',
    rating: 4.9,
    reviewCount: 450,
    gallery: [],
    userId: 'seed-user-1',
  },
  {
    businessName: 'Prism Audio-Visual Mumbai',
    email: 'hello@prismaudio.in',
    category: ['Wedding', 'Birthday'],
    description: 'Tech entertainment specialists bringing futuristic audio-visual experiences to Indian celebrations.',
    location: 'Mumbai, Maharashtra',
    priceRange: '$$',
    rating: 4.8,
    reviewCount: 320,
    gallery: [],
    userId: 'seed-user-2',
  },
  {
    businessName: 'Nebula Gastronomy Bangalore',
    email: 'bookings@nebulagastro.in',
    category: ['Catering'],
    description: 'Molecular gastronomy and culinary excellence. Multi-cuisine catering for events of all scales.',
    location: 'Bangalore, Karnataka',
    priceRange: '$$',
    rating: 5.0,
    reviewCount: 580,
    gallery: [],
    userId: 'seed-user-3',
  },
  {
    businessName: 'Ethereal Spaces Bhopal',
    email: 'info@etherealspaces.in',
    category: ['Decoration'],
    description: 'Venue design and decoration specialists creating magical spaces for your special moments.',
    location: 'Bhopal, Madhya Pradesh',
    priceRange: '$$',
    rating: 4.7,
    reviewCount: 210,
    gallery: [],
    userId: 'seed-user-4',
  },
  {
    businessName: 'Nova Artistry Indore',
    email: 'contact@novaartistry.in',
    category: ['Decoration', 'Birthday'],
    description: 'Floral artistry and decor specialists bringing your vision to life with creative excellence.',
    location: 'Indore, Madhya Pradesh',
    priceRange: '$',
    rating: 4.8,
    reviewCount: 180,
    gallery: [],
    userId: 'seed-user-5',
  },
  {
    businessName: 'Royal Caterers Pune',
    email: 'bookings@royalcaterers.in',
    category: ['Catering'],
    description: 'Traditional and modern catering services for weddings and corporate events across Maharashtra.',
    location: 'Pune, Maharashtra',
    priceRange: '$',
    rating: 4.6,
    reviewCount: 420,
    gallery: [],
    userId: 'seed-user-6',
  },
  {
    businessName: 'Stellar Events Gurgaon',
    email: 'info@stellarevents.in',
    category: ['Wedding', 'Birthday'],
    description: 'Complete event management solutions for corporate and personal celebrations in NCR region.',
    location: 'Gurgaon, Haryana',
    priceRange: '$$$',
    rating: 4.9,
    reviewCount: 390,
    gallery: [],
    userId: 'seed-user-7',
  },
  {
    businessName: 'Fusion Flavors Delhi',
    email: 'bookings@fusionflavors.in',
    category: ['Catering'],
    description: 'Contemporary fusion cuisine blending traditional Indian flavors with international techniques.',
    location: 'Delhi, India',
    priceRange: '$$',
    rating: 4.7,
    reviewCount: 310,
    gallery: [],
    userId: 'seed-user-8',
  },
];

export async function GET() {
  try {
    // Check if vendors already exist
    const vendorsSnapshot = await getDocs(collection(db, 'vendors'));
    
    if (vendorsSnapshot.size > 0) {
      return NextResponse.json({ 
        message: 'Database already seeded', 
        count: vendorsSnapshot.size 
      });
    }

    // Add vendors
    let addedCount = 0;
    for (const vendor of seedVendors) {
      await addDoc(collection(db, 'vendors'), {
        ...vendor,
        createdAt: Timestamp.now(),
      });
      addedCount++;
    }

    return NextResponse.json({ 
      success: true, 
      message: `Successfully seeded ${addedCount} vendors`,
      count: addedCount
    });
  } catch (error: any) {
    console.error('Seed error:', error);
    return NextResponse.json({ 
      success: false, 
      error: error.message 
    }, { status: 500 });
  }
}
