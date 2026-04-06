const admin = require('firebase-admin');

// Initialize Firebase Admin
const serviceAccount = require('../serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

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
    services: [
      { name: 'Holographic Scenography', description: 'Creating 3D environments that blend physical with digital', price: 150000 },
      { name: 'Spatial Sound Architecture', description: 'Immersive audio engineering with surgical precision', price: 85000 },
      { name: 'Light Design', description: 'Premium lighting setups for unforgettable moments', price: 65000 },
    ],
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
    services: [
      { name: 'LED Stage Design', description: 'Cutting-edge LED installations', price: 120000 },
      { name: 'DJ & Sound System', description: 'Premium sound systems with professional DJs', price: 45000 },
      { name: 'Laser Shows', description: 'Spectacular laser light shows', price: 75000 },
    ],
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
    services: [
      { name: 'Multi-Cuisine Buffet', description: 'Indian, Continental, Chinese cuisines', price: 850 },
      { name: 'Live Counters', description: 'Chaat, Pasta, Grills', price: 650 },
      { name: 'Dessert Bar', description: 'Premium desserts and sweets', price: 450 },
    ],
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
    services: [
      { name: 'Floral Decoration', description: 'Fresh flower arrangements and installations', price: 85000 },
      { name: 'Stage Setup', description: 'Custom stage design and setup', price: 125000 },
      { name: 'Lighting & Draping', description: 'Ambient lighting with fabric draping', price: 65000 },
    ],
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
    services: [
      { name: 'Birthday Decoration', description: 'Themed birthday party setups', price: 25000 },
      { name: 'Balloon Decoration', description: 'Creative balloon arrangements', price: 15000 },
      { name: 'Photo Booth Setup', description: 'Customized photo booth with props', price: 18000 },
    ],
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
    services: [
      { name: 'Vegetarian Thali', description: 'Traditional Indian vegetarian meals', price: 550 },
      { name: 'Non-Veg Buffet', description: 'Chicken, Mutton, Fish varieties', price: 750 },
      { name: 'Snacks & Starters', description: 'Variety of appetizers', price: 350 },
    ],
  },
];

async function seedDatabase() {
  console.log('Starting database seeding...');
  
  try {
    for (const vendor of seedVendors) {
      await db.collection('vendors').add({
        ...vendor,
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
      });
      console.log(`Added vendor: ${vendor.businessName}`);
    }
    
    console.log('Database seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
