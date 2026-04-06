import {
  collection,
  doc,
  getDoc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  Timestamp,
} from 'firebase/firestore';
import { db } from './config';
import { Vendor, Service, Booking } from '@/types';

// Vendors
export const createVendor = async (vendorData: Omit<Vendor, 'id' | 'createdAt'>): Promise<string> => {
  const docRef = await addDoc(collection(db, 'vendors'), {
    ...vendorData,
    createdAt: Timestamp.now(),
  });
  return docRef.id;
};

export const getVendor = async (id: string): Promise<Vendor | null> => {
  const docRef = doc(db, 'vendors', id);
  const docSnap = await getDoc(docRef);
  
  if (!docSnap.exists()) return null;
  
  const data = docSnap.data();
  return {
    id: docSnap.id,
    ...data,
    createdAt: data.createdAt.toDate(),
  } as Vendor;
};

export const getVendorById = async (vendorId: string): Promise<Vendor | null> => {
  return getVendor(vendorId);
};

export const getAllVendors = async (): Promise<Vendor[]> => {
  const querySnapshot = await getDocs(collection(db, 'vendors'));
  return querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
    createdAt: doc.data().createdAt.toDate(),
  })) as Vendor[];
};

export const getVendorsByCategory = async (category: string): Promise<Vendor[]> => {
  const q = query(
    collection(db, 'vendors'),
    where('category', 'array-contains', category)
  );
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
    createdAt: doc.data().createdAt.toDate(),
  })) as Vendor[];
};

export const updateVendor = async (id: string, data: Partial<Vendor>): Promise<void> => {
  const docRef = doc(db, 'vendors', id);
  await updateDoc(docRef, data);
};

// Services
export const createService = async (serviceData: Omit<Service, 'id'>): Promise<string> => {
  const docRef = await addDoc(collection(db, 'services'), serviceData);
  return docRef.id;
};

export const getServicesByVendor = async (vendorId: string): Promise<Service[]> => {
  const q = query(collection(db, 'services'), where('vendorId', '==', vendorId));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  })) as Service[];
};

export const updateService = async (id: string, data: Partial<Service>): Promise<void> => {
  const docRef = doc(db, 'services', id);
  await updateDoc(docRef, data);
};

export const deleteService = async (id: string): Promise<void> => {
  await deleteDoc(doc(db, 'services', id));
};

// Bookings
export const createBooking = async (bookingData: any): Promise<string> => {
  const docRef = await addDoc(collection(db, 'bookings'), {
    ...bookingData,
    createdAt: Timestamp.now(),
  });
  return docRef.id;
};

export const getBookingsByUser = async (userId: string): Promise<Booking[]> => {
  const q = query(
    collection(db, 'bookings'),
    where('userId', '==', userId),
    orderBy('createdAt', 'desc')
  );
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
    date: doc.data().date?.toDate?.() || new Date(),
    createdAt: doc.data().createdAt.toDate(),
  })) as Booking[];
};

export const getUserBookings = async (userId: string): Promise<any[]> => {
  try {
    const q = query(
      collection(db, 'bookings'),
      where('userId', '==', userId),
      orderBy('createdAt', 'desc')
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    console.error('Error getting user bookings:', error);
    return [];
  }
};

export const getBookingsByVendor = async (vendorId: string): Promise<Booking[]> => {
  const q = query(
    collection(db, 'bookings'),
    where('vendorId', '==', vendorId),
    orderBy('createdAt', 'desc')
  );
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
    date: doc.data().date?.toDate?.() || new Date(),
    createdAt: doc.data().createdAt.toDate(),
  })) as Booking[];
};

export const updateBookingStatus = async (
  id: string,
  status: 'pending' | 'confirmed' | 'cancelled'
): Promise<void> => {
  const docRef = doc(db, 'bookings', id);
  await updateDoc(docRef, { status });
};
