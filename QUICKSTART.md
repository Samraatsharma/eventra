# Eventra Quick Start Guide

Get Eventra running locally in 10 minutes!

## Prerequisites

- Node.js 18+ ([Download](https://nodejs.org/))
- Git ([Download](https://git-scm.com/))
- Firebase account ([Sign up free](https://firebase.google.com/))

## Step 1: Clone & Install (2 minutes)

```bash
# Clone the repository
git clone <your-repo-url>
cd eventra

# Install dependencies
npm install
```

## Step 2: Firebase Setup (5 minutes)

### Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project"
3. Name it "eventra-dev"
4. Disable Google Analytics (optional)
5. Click "Create project"

### Enable Authentication

1. Click "Authentication" in sidebar
2. Click "Get started"
3. Click "Email/Password"
4. Toggle "Enable"
5. Click "Save"

### Create Firestore Database

1. Click "Firestore Database" in sidebar
2. Click "Create database"
3. Select "Start in production mode"
4. Choose your location
5. Click "Enable"

### Add Security Rules

1. In Firestore, click "Rules" tab
2. Copy and paste this:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read: if request.auth != null;
      allow write: if request.auth != null && request.auth.uid == userId;
    }
    
    match /vendors/{vendorId} {
      allow read: if true;
      allow create: if request.auth != null;
      allow update, delete: if request.auth != null && 
        resource.data.userId == request.auth.uid;
    }
    
    match /services/{serviceId} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    
    match /bookings/{bookingId} {
      allow read: if request.auth != null;
      allow create: if request.auth != null;
      allow update: if request.auth != null;
    }
  }
}
```

3. Click "Publish"

### Get Firebase Config

1. Click gear icon ⚙️ next to "Project Overview"
2. Click "Project settings"
3. Scroll to "Your apps"
4. Click web icon `</>`
5. Enter nickname: "eventra-web"
6. Click "Register app"
7. Copy the `firebaseConfig` object

## Step 3: Environment Setup (1 minute)

Create `.env.local` file in project root:

```bash
# Copy example file
cp .env.example .env.local
```

Edit `.env.local` and paste your Firebase config:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSy...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=eventra-dev.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=eventra-dev
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=eventra-dev.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789:web:abc123
```

## Step 4: Run Development Server (1 minute)

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Step 5: Test the App (1 minute)

### Create Test Vendor

1. Click "Sign Up"
2. Fill in:
   - Name: "Test Vendor"
   - Email: "vendor@test.com"
   - Password: "test123"
   - Role: "Offer Services"
3. Click "Create Account"
4. Click "Dashboard"
5. Fill in vendor profile:
   - Business Name: "Elite Events"
   - Description: "Premium event services"
   - Categories: "Wedding, Birthday"
   - Location: "New York, NY"
   - Price Range: "$$$"
6. Click "Create Vendor Profile"
7. Click "Add Service"
8. Fill in:
   - Service Name: "Wedding Package"
   - Description: "Complete wedding planning"
   - Price: 5000
   - Category: "Wedding"
   - Duration: "6 months"
9. Click "Add Service"

### Create Test User & Book

1. Sign out
2. Click "Sign Up"
3. Fill in:
   - Name: "Test User"
   - Email: "user@test.com"
   - Password: "test123"
   - Role: "Book Services"
4. Click "Create Account"
5. Click "Explore"
6. Click on "Elite Events"
7. Click "Book Now" on Wedding Package
8. Select a future date
9. Enter notes: "Need for 100 guests"
10. Click "Submit Booking Request"

### Check Booking in Dashboard

1. Sign out
2. Sign in as vendor@test.com
3. Go to Dashboard
4. See booking request in "Booking Requests"
5. Click "Confirm"

## 🎉 Success!

You now have Eventra running locally with:
- ✅ User authentication
- ✅ Vendor profiles
- ✅ Service management
- ✅ Booking system
- ✅ Premium UI with animations

## Next Steps

### Customize the App

1. **Change Colors**: Edit `tailwind.config.ts`
2. **Add Categories**: Edit category arrays in pages
3. **Modify UI**: Edit components in `src/components/`

### Add More Features

- Image uploads for vendor galleries
- Payment integration (Stripe)
- Email notifications
- Reviews and ratings
- Advanced search filters

### Deploy to Production

Follow [DEPLOYMENT.md](./DEPLOYMENT.md) for complete deployment guide.

## Common Issues

### Port 3000 Already in Use

```bash
# Kill process on port 3000
npx kill-port 3000

# Or use different port
npm run dev -- -p 3001
```

### Firebase Auth Error

- Check `.env.local` has correct values
- Ensure no extra spaces in environment variables
- Restart dev server after changing `.env.local`

### Firestore Permission Denied

- Check security rules are published
- Ensure user is authenticated
- Check browser console for detailed error

### Build Errors

```bash
# Clear cache and reinstall
rm -rf node_modules .next
npm install
npm run build
```

## Useful Commands

```bash
# Development
npm run dev          # Start dev server
npm run build        # Build for production
npm start            # Start production server
npm run lint         # Run ESLint

# Clear cache
rm -rf .next         # Clear Next.js cache
rm -rf node_modules  # Clear dependencies
```

## Project Structure

```
eventra/
├── src/
│   ├── app/              # Next.js pages
│   ├── components/       # React components
│   ├── contexts/         # React contexts
│   ├── lib/             # Utilities & Firebase
│   └── types/           # TypeScript types
├── public/              # Static assets
├── .env.local          # Environment variables (create this)
└── package.json        # Dependencies
```

## Resources

- [Next.js Docs](https://nextjs.org/docs)
- [Firebase Docs](https://firebase.google.com/docs)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Framer Motion Docs](https://www.framer.com/motion/)

## Support

- Check [README.md](./README.md) for detailed documentation
- Check [TESTING.md](./TESTING.md) for testing guide
- Check [DEPLOYMENT.md](./DEPLOYMENT.md) for deployment guide

---

Happy coding! 🚀
