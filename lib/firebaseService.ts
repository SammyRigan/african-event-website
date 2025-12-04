import { db, storage } from './firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

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

export interface ContactFormSubmission {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  timestamp: any;
}

export const submitContactForm = async (data: Omit<ContactFormSubmission, 'timestamp'>) => {
  try {
    const docRef = await addDoc(collection(db, 'contact-submissions'), {
      ...data,
      timestamp: serverTimestamp()
    });
    
    console.log('Contact form submission saved with ID: ', docRef.id);
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error('Error saving contact form submission: ', error);
    throw error;
  }
};

export interface Speaker {
  id?: string;
  name: string;
  title: string;
  titleFr: string;
  image: string;
  bio: string;
  bioFr: string;
  country?: string;
  achievements?: string[];
  achievementsFr?: string[];
  education?: string[];
  educationFr?: string[];
  expertise?: string[];
  expertiseFr?: string[];
  impact?: string[];
  impactFr?: string[];
  initiatives?: string[];
  initiativesFr?: string[];
  experience?: string[];
  experienceFr?: string[];
  order: number;
  isActive: boolean;
  timestamp: any;
}

export const addSpeaker = async (data: Omit<Speaker, 'id' | 'timestamp'>) => {
  try {
    const docRef = await addDoc(collection(db, 'speakers'), {
      ...data,
      timestamp: serverTimestamp()
    });
    
    console.log('Speaker added with ID: ', docRef.id);
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error('Error adding speaker: ', error);
    throw error;
  }
};

export const updateSpeaker = async (id: string, data: Partial<Speaker>) => {
  try {
    const { updateDoc, doc } = await import('firebase/firestore');
    await updateDoc(doc(db, 'speakers', id), {
      ...data,
      timestamp: serverTimestamp()
    });
    
    console.log('Speaker updated with ID: ', id);
    return { success: true, id };
  } catch (error) {
    console.error('Error updating speaker: ', error);
    throw error;
  }
};

export const deleteSpeaker = async (id: string) => {
  try {
    const { deleteDoc, doc } = await import('firebase/firestore');
    await deleteDoc(doc(db, 'speakers', id));
    
    console.log('Speaker deleted with ID: ', id);
    return { success: true, id };
  } catch (error) {
    console.error('Error deleting speaker: ', error);
    throw error;
  }
};

export const uploadSpeakerImage = async (file: File, speakerName: string): Promise<string> => {
  try {
    // Create a unique filename
    const timestamp = Date.now();
    const sanitizedName = speakerName.toLowerCase().replace(/[^a-z0-9]/g, '-');
    const filename = `speakers/${sanitizedName}-${timestamp}.${file.name.split('.').pop()}`;
    
    // Create a reference to the file location
    const storageRef = ref(storage, filename);
    
    // Upload the file
    const snapshot = await uploadBytes(storageRef, file);
    
    // Get the download URL
    const downloadURL = await getDownloadURL(snapshot.ref);
    
    console.log('Image uploaded successfully:', downloadURL);
    return downloadURL;
  } catch (error) {
    console.error('Error uploading image:', error);
    throw error;
  }
};

export interface GalleryImage {
  id?: string;
  src: string;
  category: string;
  alt: string;
  order: number;
  isActive: boolean;
  timestamp: any;
}

export const addGalleryImage = async (data: Omit<GalleryImage, 'id' | 'timestamp'>) => {
  try {
    const docRef = await addDoc(collection(db, 'gallery-images'), {
      ...data,
      timestamp: serverTimestamp()
    });
    
    console.log('Gallery image added with ID: ', docRef.id);
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error('Error adding gallery image: ', error);
    throw error;
  }
};

export const updateGalleryImage = async (id: string, data: Partial<GalleryImage>) => {
  try {
    const { updateDoc, doc } = await import('firebase/firestore');
    await updateDoc(doc(db, 'gallery-images', id), {
      ...data,
      timestamp: serverTimestamp()
    });
    
    console.log('Gallery image updated with ID: ', id);
    return { success: true, id };
  } catch (error) {
    console.error('Error updating gallery image: ', error);
    throw error;
  }
};

export const deleteGalleryImage = async (id: string) => {
  try {
    const { deleteDoc, doc } = await import('firebase/firestore');
    await deleteDoc(doc(db, 'gallery-images', id));
    
    console.log('Gallery image deleted with ID: ', id);
    return { success: true, id };
  } catch (error) {
    console.error('Error deleting gallery image: ', error);
    throw error;
  }
};

export const uploadGalleryImage = async (file: File, imageName: string): Promise<string> => {
  try {
    // Create a unique filename
    const timestamp = Date.now();
    const sanitizedName = imageName.toLowerCase().replace(/[^a-z0-9]/g, '-');
    const filename = `gallery/${sanitizedName}-${timestamp}.${file.name.split('.').pop()}`;
    
    // Create a reference to the file location
    const storageRef = ref(storage, filename);
    
    // Upload the file
    const snapshot = await uploadBytes(storageRef, file);
    
    // Get the download URL
    const downloadURL = await getDownloadURL(snapshot.ref);
    
    console.log('Gallery image uploaded successfully:', downloadURL);
    return downloadURL;
  } catch (error) {
    console.error('Error uploading gallery image:', error);
    throw error;
  }
};

export interface PartnershipFormData {
  fullName: string
  contactPerson: string
  position: string
  email: string
  phone: string
  website: string
  instagram: string
  linkedin: string
  twitter: string
  partnershipTypes: string[]
  otherPartnershipType: string
  description: string
  keyMarkets: string
  previousPartnerships: string
  whyPartner: string
  howCollaborate: string
  valueGain: string
  upcomingEvents: string
  consentAccurate: boolean
  consentContact: boolean
  consentTerms: boolean
  signature: string
  date: string
}

export const sendPartnershipEmails = async (
  formData: PartnershipFormData,
  language: 'en' | 'fr' = 'en',
  adminEmail: string = 'admin@creativesconnectafrika.com'
) => {
  try {
    // Import email templates
    const { generateUserConfirmationEmail, generateAdminNotificationEmail } = await import('./emailTemplates');
    
    // Generate email templates
    const userEmail = generateUserConfirmationEmail(formData, language);
    const adminEmailTemplate = generateAdminNotificationEmail(formData, language, adminEmail);
    
    // Create email documents in Firestore mail collection
    // The Firebase Trigger Email extension will automatically process these
    const userEmailDoc = await addDoc(collection(db, 'mail'), {
      to: userEmail.to,
      message: userEmail.message,
      timestamp: serverTimestamp()
    });
    
    const adminEmailDoc = await addDoc(collection(db, 'mail'), {
      to: adminEmailTemplate.to,
      message: adminEmailTemplate.message,
      timestamp: serverTimestamp()
    });
    
    console.log('Email documents created:', { userEmailDoc: userEmailDoc.id, adminEmailDoc: adminEmailDoc.id });
    return { success: true, userEmailId: userEmailDoc.id, adminEmailId: adminEmailDoc.id };
  } catch (error) {
    console.error('Error sending partnership emails:', error);
    throw error;
  }
};

// Send participant registration confirmation email
export const sendParticipantConfirmationEmail = async (
  formData: ParticipantRegistration,
  language: 'en' | 'fr' = 'en'
) => {
  try {
    // Import email template
    const { generateParticipantConfirmationEmail } = await import('./emailTemplates');
    
    // Generate email template
    const confirmationEmail = generateParticipantConfirmationEmail(formData, language);
    
    // Create email document in Firestore mail collection
    const emailDoc = await addDoc(collection(db, 'mail'), {
      to: confirmationEmail.to,
      message: confirmationEmail.message,
      timestamp: serverTimestamp()
    });
    
    console.log('Participant confirmation email created:', emailDoc.id);
    return { success: true, emailId: emailDoc.id };
  } catch (error) {
    console.error('Error sending participant confirmation email:', error);
    throw error;
  }
};

// Send exhibitor registration confirmation email
export const sendExhibitorConfirmationEmail = async (
  formData: ExhibitorRegistration,
  language: 'en' | 'fr' = 'en'
) => {
  try {
    // Import email template
    const { generateExhibitorConfirmationEmail } = await import('./emailTemplates');
    
    // Generate email template
    const confirmationEmail = generateExhibitorConfirmationEmail(formData, language);
    
    // Create email document in Firestore mail collection
    const emailDoc = await addDoc(collection(db, 'mail'), {
      to: confirmationEmail.to,
      message: confirmationEmail.message,
      timestamp: serverTimestamp()
    });
    
    console.log('Exhibitor confirmation email created:', emailDoc.id);
    return { success: true, emailId: emailDoc.id };
  } catch (error) {
    console.error('Error sending exhibitor confirmation email:', error);
    throw error;
  }
};

// Send contact form confirmation email
export const sendContactConfirmationEmail = async (
  formData: ContactFormSubmission,
  language: 'en' | 'fr' = 'en'
) => {
  try {
    // Import email template
    const { generateContactConfirmationEmail } = await import('./emailTemplates');
    
    // Generate email template
    const confirmationEmail = generateContactConfirmationEmail(formData, language);
    
    // Create email document in Firestore mail collection
    const emailDoc = await addDoc(collection(db, 'mail'), {
      to: confirmationEmail.to,
      message: confirmationEmail.message,
      timestamp: serverTimestamp()
    });
    
    console.log('Contact confirmation email created:', emailDoc.id);
    return { success: true, emailId: emailDoc.id };
  } catch (error) {
    console.error('Error sending contact confirmation email:', error);
    throw error;
  }
};

export interface GalleryCategory {
  id?: string;
  key: string; // Unique identifier (e.g., 'fashion', 'music')
  label: string; // Display name (e.g., 'Fashion', 'Music')
  labelFr?: string; // French display name
  order: number;
  isActive: boolean;
  timestamp: any;
}

export const addGalleryCategory = async (data: Omit<GalleryCategory, 'id' | 'timestamp'>) => {
  try {
    const docRef = await addDoc(collection(db, 'gallery-categories'), {
      ...data,
      timestamp: serverTimestamp()
    });
    
    console.log('Gallery category added with ID: ', docRef.id);
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error('Error adding gallery category: ', error);
    throw error;
  }
};

export const updateGalleryCategory = async (id: string, data: Partial<GalleryCategory>) => {
  try {
    const { updateDoc, doc } = await import('firebase/firestore');
    await updateDoc(doc(db, 'gallery-categories', id), {
      ...data,
      timestamp: serverTimestamp()
    });
    
    console.log('Gallery category updated with ID: ', id);
    return { success: true, id };
  } catch (error) {
    console.error('Error updating gallery category: ', error);
    throw error;
  }
};

export const deleteGalleryCategory = async (id: string) => {
  try {
    const { deleteDoc, doc } = await import('firebase/firestore');
    await deleteDoc(doc(db, 'gallery-categories', id));
    
    console.log('Gallery category deleted with ID: ', id);
    return { success: true, id };
  } catch (error) {
    console.error('Error deleting gallery category: ', error);
    throw error;
  }
};

export interface BlogPost {
  id?: string;
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  author: string;
  readTime: string;
  category: string;
  image: string;
  content: Array<{
    type: string;
    text?: string;
    items?: string[];
  }>;
  order?: number;
  isActive?: boolean;
  timestamp?: any;
}

export const addBlogPost = async (data: Omit<BlogPost, 'id' | 'timestamp'>) => {
  try {
    const docRef = await addDoc(collection(db, 'blog-posts'), {
      ...data,
      order: data.order || 0,
      isActive: data.isActive !== undefined ? data.isActive : true,
      timestamp: serverTimestamp()
    });
    
    console.log('Blog post added with ID: ', docRef.id);
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error('Error adding blog post: ', error);
    throw error;
  }
};

export const updateBlogPost = async (id: string, data: Partial<BlogPost>) => {
  try {
    const { updateDoc, doc } = await import('firebase/firestore');
    await updateDoc(doc(db, 'blog-posts', id), {
      ...data,
      timestamp: serverTimestamp()
    });
    
    console.log('Blog post updated with ID: ', id);
    return { success: true, id };
  } catch (error) {
    console.error('Error updating blog post: ', error);
    throw error;
  }
};

export const deleteBlogPost = async (id: string) => {
  try {
    const { deleteDoc, doc } = await import('firebase/firestore');
    await deleteDoc(doc(db, 'blog-posts', id));
    
    console.log('Blog post deleted with ID: ', id);
    return { success: true, id };
  } catch (error) {
    console.error('Error deleting blog post: ', error);
    throw error;
  }
};

export interface Video {
  id?: string;
  title: string;
  titleFr: string;
  url: string;
  location: string;
  locationFr: string;
  order?: number;
  isActive?: boolean;
  timestamp?: any;
}

export const addVideo = async (data: Omit<Video, 'id' | 'timestamp'>) => {
  try {
    const docRef = await addDoc(collection(db, 'videos'), {
      ...data,
      order: data.order || 0,
      isActive: data.isActive !== undefined ? data.isActive : true,
      timestamp: serverTimestamp()
    });
    
    console.log('Video added with ID: ', docRef.id);
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error('Error adding video: ', error);
    throw error;
  }
};

export const updateVideo = async (id: string, data: Partial<Video>) => {
  try {
    const { updateDoc, doc } = await import('firebase/firestore');
    await updateDoc(doc(db, 'videos', id), {
      ...data,
      timestamp: serverTimestamp()
    });
    
    console.log('Video updated with ID: ', id);
    return { success: true, id };
  } catch (error) {
    console.error('Error updating video: ', error);
    throw error;
  }
};

export const deleteVideo = async (id: string) => {
  try {
    const { deleteDoc, doc } = await import('firebase/firestore');
    await deleteDoc(doc(db, 'videos', id));
    
    console.log('Video deleted with ID: ', id);
    return { success: true, id };
  } catch (error) {
    console.error('Error deleting video: ', error);
    throw error;
  }
};

export interface Partner {
  id?: string;
  name: string;
  logo: string;
  website: string;
  location: string;
  description: {
    en: string;
    fr: string;
  };
  keyAreas: {
    en: string[];
    fr: string[];
  };
  order?: number;
  isActive?: boolean;
  timestamp?: any;
}

export const addPartner = async (data: Omit<Partner, 'id' | 'timestamp'>) => {
  try {
    const docRef = await addDoc(collection(db, 'partners'), {
      ...data,
      order: data.order || 0,
      isActive: data.isActive !== undefined ? data.isActive : true,
      timestamp: serverTimestamp()
    });
    
    console.log('Partner added with ID: ', docRef.id);
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error('Error adding partner: ', error);
    throw error;
  }
};

export const updatePartner = async (id: string, data: Partial<Partner>) => {
  try {
    const { updateDoc, doc } = await import('firebase/firestore');
    await updateDoc(doc(db, 'partners', id), {
      ...data,
      timestamp: serverTimestamp()
    });
    
    console.log('Partner updated with ID: ', id);
    return { success: true, id };
  } catch (error) {
    console.error('Error updating partner: ', error);
    throw error;
  }
};

export const deletePartner = async (id: string) => {
  try {
    const { deleteDoc, doc } = await import('firebase/firestore');
    await deleteDoc(doc(db, 'partners', id));
    
    console.log('Partner deleted with ID: ', id);
    return { success: true, id };
  } catch (error) {
    console.error('Error deleting partner: ', error);
    throw error;
  }
};