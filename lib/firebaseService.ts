import { db } from './firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

export interface ParticipantRegistration {
  fullName: string;
  email: string;
  phone?: string;
  country: string;
  identificationNumber: string;
  organization: string;
  designation: string;
  visaSupport: string;
  futureUpdates: string;
  consent: boolean;
  timestamp: any;
}

export interface ExhibitorRegistration {
  organizationName: string;
  contactPerson: string;
  email: string;
  phone: string;
  country: string;
  website?: string;
  aboutCompany?: string;
  productsServices?: string;
  category: string;
  boothNeeds: string;
  logoUpload?: File | null;
  shippingAssistance: string;
  accommodationAssistance: string;
  additionalAssistance?: string;
  consent: boolean;
  includeInHandbook: string;
  timestamp: any;
}

export const submitParticipantRegistration = async (data: Omit<ParticipantRegistration, 'timestamp'>) => {
  try {
    const docRef = await addDoc(collection(db, 'participant-registrations'), {
      ...data,
      timestamp: serverTimestamp()
    });
    
    console.log('Participant registration saved with ID: ', docRef.id);
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error('Error saving participant registration: ', error);
    throw error;
  }
};

export const submitExhibitorRegistration = async (data: Omit<ExhibitorRegistration, 'timestamp'>) => {
  try {
    const docRef = await addDoc(collection(db, 'exhibitor-registrations'), {
      ...data,
      timestamp: serverTimestamp()
    });
    
    console.log('Exhibitor registration saved with ID: ', docRef.id);
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error('Error saving exhibitor registration: ', error);
    throw error;
  }
};
