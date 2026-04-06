# Eventra - Premium Event Service Marketplace

A modern, production-ready web application connecting users with event vendors and service providers. Built with Next.js, Firebase, and Tailwind CSS.

## 🌟 Features

### For Users
- Browse and search event vendors by category, location, and price range
- View detailed vendor profiles with services and pricing
- Book services with preferred dates and custom notes
- Secure authentication with Firebase Auth

### For Vendors
- Create and manage vendor profiles
- Add/edit/delete services with pricing and descriptions
- View and manage booking requests
- Confirm or decline bookings

### Design Features
- Dark theme with neon purple/blue accents
- Glassmorphism UI with smooth animations
- Fully responsive (mobile, tablet, desktop)
- Premium typography and spacing
- Framer Motion animations throughout

## 🛠️ Tech Stack

- **Frontend**: Next.js 14 (App Router), TypeScript, Tailwind CSS
- **Animations**: Framer Motion
- **Backend**: Firebase (Authentication + Firestore)
- **Forms**: React Hook Form
- **Icons**: Lucide React
- **Hosting**: Vercel-ready

## 📁 Project Structure

```
eventra/
├── src/
│   ├── app/
│   │   ├── (auth)/
│   │   │   ├── login/page.tsx
│   │   │   └── signup/page.tsx
│   │   ├── explore/page.tsx
│   │   ├── vendor/[id]/page.tsx
│   │   ├── booking/page.tsx
│   │   ├── dashboard/page.tsx
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   └── globals.css
│   ├── components/
│   │   ├── layout/
│   │   │   └── Navbar.tsx
│   │   └── ui/
│   │       ├── Button.tsx
│   │       ├── Card.tsx
│   │       └── Input.tsx
│   ├── contexts/
│   │   └── AuthContext.tsx
│   ├── lib/
│   │   ├── firebase/
│   │   │   ├── config.ts
│   │   │   ├── auth.ts
│   │   │   └── firestore.ts
│   │   └── utils/
│   │       └── cn.ts
│   └── types/
│       └── index.ts
├── public/
├── .env.example
├── package.json
├── tsconfig.json
├── tailwind.config.ts
└── next.config.js
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ installed
- Firebase account (free tier)
- Git

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd eventra
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Firebase Setup

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project
3. Enable Authentication:
   - Go to Authentication > Sign-in method
   - Enable "Email/Password"
4. Create Firestore Database:
   - Go to Firestore Database
   - Create database in production mode
   - Start collection (it will be created automatically by the app)
5. Get your Firebase config:
   - Go to Project Settings > General
   - Scroll to "Your apps" section
   - Click the web icon (</>)
   - Copy the configuration

### 4. Environment Variables

Create a `.env.local` file in the root directory:

```bash
cp .env.example .env.local
```

Fill in your Firebase credentials:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

### 5. Firestore Security Rules

In Firebase Console, go to Firestore Database > Rules and add:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users collection
    match /users/{userId} {
      allow read: if request.auth != null;
      allow write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Vendors collection
    match /vendors/{vendorId} {
      allow read: if true;
      allow create: if request.auth != null;
      allow update, delete: if request.auth != null && 
        resource.data.userId == request.auth.uid;
    }
    
    // Services collection
    match /services/{serviceId} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    
    // Bookings collection
    match /bookings/{bookingId} {
      allow read: if request.auth != null && 
        (resource.data.userId == request.auth.uid || 
         resource.data.vendorId in get(/databases/$(database)/documents/vendors).data.userId);
      allow create: if request.auth != null;
      allow update: if request.auth != null;
    }
  }
}
```

### 6. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📦 Deployment to Vercel

### Option 1: Deploy via Vercel Dashboard

1. Push your code to GitHub
2. Go to [Vercel](https://vercel.com)
3. Click "New Project"
4. Import your GitHub repository
5. Add environment variables from `.env.local`
6. Click "Deploy"

### Option 2: Deploy via Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy
vercel

# Deploy to production
vercel --prod
```

### Environment Variables on Vercel

Add all variables from `.env.local` in:
- Vercel Dashboard > Your Project > Settings > Environment Variables

## 🎨 Design System

### Colors
- Primary: Purple (#8b5cf6)
- Accent: Blue (#3b82f6)
- Background: Dark (#030712, #111827)
- Text: Light gray to white

### Components
- Glassmorphism cards with backdrop blur
- Gradient buttons and text
- Smooth hover animations
- Responsive grid layouts

## 📱 Pages

1. **Landing Page** (`/`)
   - Hero section with animated background
   - Event categories
   - Featured vendors

2. **Explore Page** (`/explore`)
   - Vendor listing with filters
   - Search functionality
   - Category, price, and rating filters

3. **Vendor Profile** (`/vendor/[id]`)
   - Vendor details and services
   - Service pricing and descriptions
   - Book now functionality

4. **Booking Page** (`/booking`)
   - Date selection
   - Custom notes
   - Booking confirmation

5. **Authentication** (`/login`, `/signup`)
   - Email/password authentication
   - User/Vendor role selection

6. **Vendor Dashboard** (`/dashboard`)
   - Manage services
   - View booking requests
   - Confirm/decline bookings

## 🔒 Security

- Firebase Authentication for secure user management
- Firestore security rules for data protection
- Environment variables for sensitive data
- Client-side route protection

## 🧪 Testing

After deployment, test these flows:

1. **User Flow**:
   - Sign up as a user
   - Browse vendors
   - View vendor profile
   - Book a service

2. **Vendor Flow**:
   - Sign up as a vendor
   - Create vendor profile
   - Add services
   - Manage bookings

## 📝 Data Models

### Users
```typescript
{
  id: string
  email: string
  name: string
  role: 'user' | 'vendor'
  createdAt: Date
  updatedAt: Date
}
```

### Vendors
```typescript
{
  id: string
  userId: string
  businessName: string
  description: string
  category: string[]
  location: string
  rating: number
  reviewCount: number
  priceRange: string
  gallery: string[]
  createdAt: Date
}
```

### Services
```typescript
{
  id: string
  vendorId: string
  name: string
  description: string
  price: number
  category: string
  duration: string
}
```

### Bookings
```typescript
{
  id: string
  userId: string
  vendorId: string
  serviceId: string
  date: Date
  notes: string
  status: 'pending' | 'confirmed' | 'cancelled'
  createdAt: Date
}
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a pull request

## 📄 License

MIT License - feel free to use this project for personal or commercial purposes.

## 🆘 Support

For issues or questions:
- Open an issue on GitHub
- Check Firebase documentation
- Review Next.js documentation

## 🎯 Future Enhancements

- Image upload for vendor galleries
- Real-time chat between users and vendors
- Payment integration (Stripe)
- Review and rating system
- Email notifications
- Calendar integration
- Advanced search with filters
- Vendor analytics dashboard

---

Built with ❤️ using Next.js, Firebase, and Tailwind CSS
