# Eventra Installation Checklist

Use this checklist to ensure proper installation and setup.

## ✅ Pre-Installation

- [ ] Node.js 18+ installed (`node --version`)
- [ ] npm installed (`npm --version`)
- [ ] Git installed (`git --version`)
- [ ] Firebase account created
- [ ] Code editor installed (VS Code recommended)

## ✅ Project Setup

- [ ] Repository cloned or downloaded
- [ ] Navigate to project directory (`cd eventra`)
- [ ] Dependencies installed (`npm install`)
- [ ] No installation errors in terminal

## ✅ Firebase Configuration

### Firebase Project
- [ ] Firebase project created
- [ ] Project name noted down
- [ ] Project ID noted down

### Authentication
- [ ] Authentication enabled in Firebase Console
- [ ] Email/Password provider enabled
- [ ] No other providers accidentally enabled

### Firestore Database
- [ ] Firestore database created
- [ ] Started in production mode
- [ ] Location selected (closest to users)
- [ ] Security rules copied and published
- [ ] Rules show "Published" status

### Firebase Config
- [ ] Web app registered in Firebase
- [ ] Firebase config object copied
- [ ] All 6 config values obtained:
  - [ ] API Key
  - [ ] Auth Domain
  - [ ] Project ID
  - [ ] Storage Bucket
  - [ ] Messaging Sender ID
  - [ ] App ID

## ✅ Environment Variables

- [ ] `.env.local` file created in root directory
- [ ] All 6 Firebase variables added
- [ ] No extra spaces in variable values
- [ ] No quotes around values
- [ ] File saved
- [ ] Variables start with `NEXT_PUBLIC_`

Example format:
```
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyAbc123...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
NEXT_PUBLIC_FIREBASE_APP_ID=1:123:web:abc123
```

## ✅ Development Server

- [ ] Run `npm run dev`
- [ ] No errors in terminal
- [ ] Server starts successfully
- [ ] Port 3000 is available (or alternative port shown)
- [ ] Open http://localhost:3000
- [ ] Homepage loads without errors
- [ ] No console errors in browser DevTools

## ✅ Visual Verification

### Homepage
- [ ] Dark theme displays correctly
- [ ] Purple/blue gradient colors visible
- [ ] Hero section with animated background
- [ ] "Explore Services" button visible
- [ ] Event categories section displays (6 categories)
- [ ] Stats section shows (3 stat cards)
- [ ] Navbar at top with logo "Eventra"
- [ ] "Login" and "Sign Up" buttons in navbar

### Animations
- [ ] Background elements animate (floating effect)
- [ ] Hover effects work on cards
- [ ] Buttons have hover effects
- [ ] Smooth transitions between states

### Responsive Design
- [ ] Resize browser window
- [ ] Layout adjusts for mobile
- [ ] Hamburger menu appears on mobile
- [ ] No horizontal scroll
- [ ] All text is readable

## ✅ Authentication Test

### Sign Up
- [ ] Click "Sign Up" in navbar
- [ ] Sign up page loads
- [ ] Form displays correctly
- [ ] Fill in all fields:
  - Name: "Test User"
  - Email: "test@example.com"
  - Password: "test123"
  - Confirm Password: "test123"
  - Role: "Book Services"
- [ ] Click "Create Account"
- [ ] No errors appear
- [ ] Redirect to homepage
- [ ] User name appears in navbar
- [ ] "Sign Out" button appears
- [ ] Check Firebase Console > Authentication
- [ ] New user appears in user list

### Sign Out
- [ ] Click "Sign Out"
- [ ] Redirect to homepage
- [ ] Navbar shows "Login" and "Sign Up" again
- [ ] User is logged out

### Login
- [ ] Click "Login"
- [ ] Login page loads
- [ ] Enter credentials:
  - Email: "test@example.com"
  - Password: "test123"
- [ ] Click "Sign In"
- [ ] No errors appear
- [ ] Redirect to homepage
- [ ] User is logged in

## ✅ Vendor Flow Test

### Create Vendor Account
- [ ] Sign out if logged in
- [ ] Sign up with new email
- [ ] Select "Offer Services" role
- [ ] Account created successfully
- [ ] "Dashboard" link appears in navbar

### Create Vendor Profile
- [ ] Click "Dashboard"
- [ ] Vendor profile form displays
- [ ] Fill in all fields:
  - Business Name: "Test Vendor"
  - Description: "Test description"
  - Categories: "Wedding, Birthday"
  - Location: "New York, NY"
  - Price Range: "$$$"
- [ ] Click "Create Vendor Profile"
- [ ] Profile created successfully
- [ ] Dashboard displays
- [ ] Check Firebase Console > Firestore > vendors
- [ ] New vendor document exists

### Add Service
- [ ] In dashboard, click "Add Service"
- [ ] Service form displays
- [ ] Fill in all fields:
  - Service Name: "Test Service"
  - Description: "Test description"
  - Price: 1000
  - Category: "Wedding"
  - Duration: "4 hours"
- [ ] Click "Add Service"
- [ ] Service appears in list
- [ ] Check Firebase Console > Firestore > services
- [ ] New service document exists

## ✅ User Booking Test

### Browse Vendors
- [ ] Sign out
- [ ] Sign in as regular user
- [ ] Click "Explore"
- [ ] Explore page loads
- [ ] Vendor cards display
- [ ] Test vendor appears in list

### View Vendor Profile
- [ ] Click on test vendor card
- [ ] Vendor profile page loads
- [ ] Vendor details display correctly
- [ ] Services section shows test service
- [ ] "Book Now" button visible

### Create Booking
- [ ] Click "Book Now" on service
- [ ] Booking page loads
- [ ] Vendor details display
- [ ] Select future date
- [ ] Enter notes: "Test booking"
- [ ] Click "Submit Booking Request"
- [ ] Success message displays
- [ ] Auto-redirect to homepage
- [ ] Check Firebase Console > Firestore > bookings
- [ ] New booking document exists

### Vendor Receives Booking
- [ ] Sign out
- [ ] Sign in as vendor
- [ ] Go to Dashboard
- [ ] Scroll to "Booking Requests"
- [ ] Test booking appears
- [ ] Status shows "PENDING"
- [ ] Booking details correct

### Confirm Booking
- [ ] Click "Confirm" on booking
- [ ] Status changes to "CONFIRMED"
- [ ] Status badge turns green
- [ ] Action buttons disappear

## ✅ Feature Verification

### Search & Filters
- [ ] Go to Explore page
- [ ] Search bar works
- [ ] Category filters work
- [ ] Price filters work
- [ ] Rating filters work
- [ ] Combined filters work
- [ ] "Clear Filters" button works

### Navigation
- [ ] All navbar links work
- [ ] Browser back button works
- [ ] Direct URL access works
- [ ] Protected routes redirect to login

### Error Handling
- [ ] Try login with wrong password
- [ ] Error message displays
- [ ] Try signup with existing email
- [ ] Error message displays
- [ ] Try booking without date
- [ ] Validation error shows

## ✅ Performance Check

- [ ] Open browser DevTools
- [ ] Go to Network tab
- [ ] Reload homepage
- [ ] Page loads in < 3 seconds
- [ ] No failed requests (red)
- [ ] No console errors
- [ ] No console warnings (or only minor ones)

## ✅ Mobile Responsiveness

- [ ] Open DevTools
- [ ] Toggle device toolbar (mobile view)
- [ ] Test iPhone SE (375px)
- [ ] Test iPad (768px)
- [ ] Test desktop (1920px)
- [ ] All layouts work correctly
- [ ] No horizontal scroll
- [ ] All buttons are clickable
- [ ] All text is readable

## ✅ Build Test

- [ ] Run `npm run build`
- [ ] Build completes successfully
- [ ] No TypeScript errors
- [ ] No build errors
- [ ] Bundle sizes are reasonable
- [ ] Run `npm start`
- [ ] Production server starts
- [ ] Open http://localhost:3000
- [ ] App works in production mode

## ✅ Code Quality

- [ ] Run `npm run lint`
- [ ] No critical linting errors
- [ ] Code follows ESLint rules
- [ ] TypeScript types are correct

## ✅ Documentation

- [ ] README.md exists and is complete
- [ ] QUICKSTART.md exists
- [ ] DEPLOYMENT.md exists
- [ ] TESTING.md exists
- [ ] PROJECT_SUMMARY.md exists
- [ ] All documentation is readable
- [ ] Code comments are present

## ✅ Git & Version Control

- [ ] `.gitignore` file exists
- [ ] `.env.local` is in `.gitignore`
- [ ] `node_modules` is in `.gitignore`
- [ ] `.next` is in `.gitignore`
- [ ] No sensitive data in git

## 🎉 Installation Complete!

If all items are checked, your Eventra installation is complete and working correctly!

## 🐛 Troubleshooting

If any items are not checked, refer to:

1. **QUICKSTART.md** - For setup issues
2. **README.md** - For general documentation
3. **TESTING.md** - For testing issues
4. **Firebase Console** - For backend issues
5. **Browser DevTools Console** - For frontend errors

## 📝 Notes

Use this space to note any issues or customizations:

```
Date: _______________
Installed by: _______________
Node version: _______________
npm version: _______________
Issues encountered: 




Customizations made:




```

## ✅ Ready for Next Steps

Once installation is complete:

1. **Customize**: Modify colors, content, and features
2. **Test**: Run through complete testing guide
3. **Deploy**: Follow deployment guide for production
4. **Monitor**: Set up analytics and error tracking
5. **Scale**: Add more features and optimize

---

Happy building! 🚀
