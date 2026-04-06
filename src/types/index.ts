export interface User {
  id: string;
  email: string;
  name: string;
  role: 'user' | 'vendor';
  createdAt: Date;
  updatedAt: Date;
}

export interface Vendor {
  id: string;
  userId: string;
  businessName: string;
  description: string;
  category: string[];
  location: string;
  rating: number;
  reviewCount: number;
  priceRange: string;
  gallery: string[];
  createdAt: Date;
}

export interface Service {
  id: string;
  vendorId: string;
  name: string;
  description: string;
  price: number;
  category: string;
  duration: string;
}

export interface Booking {
  id: string;
  userId: string;
  vendorId: string;
  serviceId: string;
  date: Date;
  notes: string;
  status: 'pending' | 'confirmed' | 'cancelled';
  createdAt: Date;
}

export interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, name: string, role: 'user' | 'vendor') => Promise<void>;
  signOut: () => Promise<void>;
}
