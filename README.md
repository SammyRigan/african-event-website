# Creatives Connect Afrika - Event Website

A modern event website for the Creatives Connect Afrika Festival & Forum 2025, featuring participant and exhibitor registration forms with Firebase integration.

## 🚀 Features

- **Modern Landing Page** - Beautiful, responsive design with video background
- **Bilingual Support** - English and French language support
- **Registration Forms** - Separate forms for participants and exhibitors
- **Firebase Integration** - Real-time data storage with Firestore
- **Admin Dashboard** - View and manage all registrations
- **Export Functionality** - Export registrations to CSV
- **Search & Filter** - Advanced filtering and search capabilities
- **Static Site Ready** - Can be deployed as a static site

## 🛠️ Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS, Shadcn UI Components
- **Database**: Firebase Firestore
- **Deployment**: Vercel, Netlify, or Firebase Hosting

## 📋 Prerequisites

- Node.js 18+ 
- npm or pnpm
- Firebase project (for database)

## 🚀 Quick Start

### 1. Clone and Install

```bash
git clone <repository-url>
cd african-event-website
npm install
```

### 2. Firebase Setup

1. **Create Firebase Project**
   - Go to [Firebase Console](https://console.firebase.google.com/)
   - Create a new project
   - Enable Firestore Database

2. **Get Firebase Config**
   - In Firebase Console → Project Settings → General
   - Scroll down to "Your apps" section
   - Click "Add app" → Web app
   - Copy the config object

3. **Update Firebase Config**
   - Open `lib/firebase.ts`
   - Replace the placeholder config with your actual Firebase config:

```typescript
const firebaseConfig = {
  apiKey: "your-actual-api-key",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "your-sender-id",
  appId: "your-app-id"
};
```

4. **Set Up Firestore Security Rules**
   - In Firebase Console → Firestore → Rules
   - Update rules for development (you can add authentication later):

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if true;
    }
  }
}
```

### 3. Run Development Server

```bash
npm run dev
```

Visit `http://localhost:3000` to see the website.

## 📊 Admin Dashboard

### Access Admin Dashboard
- Navigate to `/admin` or click "Admin Dashboard" in the header
- View all participant and exhibitor registrations
- Search and filter registrations
- Export data to CSV

### Admin Features
- **Real-time Data** - Live updates from Firebase
- **Search** - Search by name, email, organization, or country
- **Filter** - Filter by participant type or view all
- **Export** - Download registrations as CSV files
- **Statistics** - View registration counts and summaries

### Test Firebase Connection
- Visit `/test-firebase` to test Firebase connectivity
- Add test documents and verify read/write operations

## 📝 Registration Forms

### Participant Registration
- Personal information (name, email, phone, country)
- Organization details
- Visa support requirements
- Future updates preferences
- Consent agreement

### Exhibitor Registration
- Organization information
- Contact person details
- Exhibition category and booth needs
- Logistics assistance requirements
- Handbook inclusion preferences
- Consent agreement

## 🚀 Deployment

### Option 1: Vercel (Recommended)
```bash
npm install -g vercel
vercel
```

### Option 2: Netlify
```bash
npm run build
# Upload dist folder to Netlify
```

### Option 3: Firebase Hosting
```bash
npm install -g firebase-tools
firebase init hosting
firebase deploy
```

## 📁 Project Structure

```
african-event-website/
├── app/
│   ├── page.tsx              # Main landing page
│   ├── admin/
│   │   └── page.tsx          # Admin dashboard
│   ├── test-firebase/
│   │   └── page.tsx          # Firebase test page
│   ├── layout.tsx            # Root layout
│   └── globals.css           # Global styles
├── components/
│   └── ui/                   # Shadcn UI components
├── lib/
│   ├── firebase.ts           # Firebase configuration
│   ├── firebaseService.ts    # Firebase operations
│   └── utils.ts              # Utility functions
├── public/                   # Static assets
└── package.json
```

## 🔧 Configuration

### Environment Variables (Optional)
Create a `.env.local` file for additional configuration:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
```

### Customization
- **Colors**: Update Tailwind config in `tailwind.config.ts`
- **Content**: Modify text content in `app/page.tsx`
- **Forms**: Customize form fields in the registration components
- **Styling**: Update CSS classes and components as needed

## 🔒 Security Considerations

### Development
- Current Firestore rules allow all read/write operations
- Suitable for development and testing

### Production
- Implement proper authentication
- Set up secure Firestore rules
- Add rate limiting for form submissions
- Consider adding CAPTCHA for spam prevention

## 📊 Data Structure

### Participant Registrations Collection
```typescript
{
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
  timestamp: Timestamp;
}
```

### Exhibitor Registrations Collection
```typescript
{
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
  shippingAssistance: string;
  accommodationAssistance: string;
  additionalAssistance?: string;
  consent: boolean;
  includeInHandbook: string;
  timestamp: Timestamp;
}
```

## 🐛 Troubleshooting

### Common Issues

1. **Firebase Connection Errors**
   - Verify Firebase config in `lib/firebase.ts`
   - Check Firestore security rules
   - Test connection at `/test-firebase`

2. **Build Errors**
   - Clear `.next` folder: `rm -rf .next`
   - Reinstall dependencies: `npm install`
   - Check TypeScript errors: `npm run build`

3. **Styling Issues**
   - Verify Tailwind CSS is properly configured
   - Check component imports
   - Clear browser cache

### Support
- Check browser console for error messages
- Verify Firebase project settings
- Test individual components in isolation

## 📈 Analytics & Monitoring

### Firebase Analytics (Optional)
Add Firebase Analytics to track user interactions:

```typescript
import { getAnalytics } from 'firebase/analytics';
const analytics = getAnalytics(app);
```

### Error Monitoring
Consider adding error monitoring services like Sentry for production deployments.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

---

**Built with ❤️ for Creatives Connect Afrika Festival & Forum 2025**
