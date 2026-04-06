# Eventra Deployment Guide

Complete step-by-step guide to deploy Eventra to production.

## Prerequisites Checklist

- [ ] Node.js 18+ installed
- [ ] Git installed
- [ ] GitHub account
- [ ] Firebase account (free)
- [ ] Vercel account (free)

## Step 1: Firebase Setup (15 minutes)

### 1.1 Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project"
3. Enter project name: `eventra-production`
4. Disable Google Analytics (optional)
5. Click "Create project"

### 1.2 Enable Authentication

1. In Firebase Console, click "Authentication" in left sidebar
2. Click "Get started"
3. Click "Sign-in method" tab
4. Click "Email/Password"
5. Toggle "Enable"
6. Click "Save"

### 1.3 Create Firestore Database

1. Click "Firestore Database" in left sidebar
2. Click "Create database"
3. Select "Start in production mode"
4. Choose your location (closest to your users)
5. Click "Enable"

### 1.4 Set Firestore Security Rules

1. In Firestore Database, click "Rules" tab
2. Replace the content with:

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

3. Click "Publish"

### 1.5 Get Firebase Configuration

1. Click the gear icon (⚙️) next to "Project Overview"
2. Click "Project settings"
3. Scroll to "Your apps" section
4. Click the web icon `</>`
5. Enter app nickname: `eventra-web`
6. Click "Register app"
7. Copy the `firebaseConfig` object
8. Keep this tab open - you'll need these values

## Step 2: Prepare Code for Deployment

### 2.1 Create .env.local File

In your project root, create `.env.local`:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key_here
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

Replace the values with your Firebase config from Step 1.5.

### 2.2 Test Locally

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Open http://localhost:3000 and test:
- [ ] Sign up as a user
- [ ] Sign up as a vendor
- [ ] Create vendor profile
- [ ] Add a service
- [ ] Browse vendors
- [ ] Book a service

### 2.3 Build for Production

```bash
npm run build
```

If build succeeds, you're ready to deploy!

## Step 3: Deploy to Vercel (10 minutes)

### 3.1 Push to GitHub

```bash
# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit - Eventra production ready"

# Create GitHub repository (via GitHub website)
# Then add remote and push
git remote add origin https://github.com/YOUR_USERNAME/eventra.git
git branch -M main
git push -u origin main
```

### 3.2 Deploy via Vercel Dashboard

1. Go to [Vercel](https://vercel.com)
2. Click "Sign Up" or "Login" (use GitHub)
3. Click "Add New..." → "Project"
4. Import your `eventra` repository
5. Configure project:
   - Framework Preset: Next.js (auto-detected)
   - Root Directory: `./`
   - Build Command: `npm run build` (default)
   - Output Directory: `.next` (default)

### 3.3 Add Environment Variables

1. In Vercel project settings, click "Environment Variables"
2. Add each variable from your `.env.local`:
   - Name: `NEXT_PUBLIC_FIREBASE_API_KEY`
   - Value: `your_api_key`
   - Environment: Production, Preview, Development (check all)
3. Repeat for all 6 Firebase variables
4. Click "Save"

### 3.4 Deploy

1. Click "Deploy"
2. Wait 2-3 minutes for deployment
3. Once complete, click "Visit" to see your live site!

## Step 4: Post-Deployment Configuration

### 4.1 Update Firebase Authorized Domains

1. Go to Firebase Console
2. Click "Authentication" → "Settings" → "Authorized domains"
3. Add your Vercel domain:
   - `your-project.vercel.app`
   - Any custom domains you plan to use

### 4.2 Test Production Site

Visit your Vercel URL and test:
- [ ] Homepage loads correctly
- [ ] Sign up works
- [ ] Login works
- [ ] Vendor dashboard works
- [ ] Booking flow works
- [ ] All animations work
- [ ] Mobile responsive

## Step 5: Custom Domain (Optional)

### 5.1 Add Custom Domain in Vercel

1. In Vercel project, go to "Settings" → "Domains"
2. Enter your domain (e.g., `eventra.com`)
3. Click "Add"

### 5.2 Configure DNS

Vercel will show you DNS records to add:

For root domain (`eventra.com`):
```
Type: A
Name: @
Value: 76.76.21.21
```

For www subdomain:
```
Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

Add these in your domain registrar's DNS settings.

### 5.3 Wait for DNS Propagation

- Usually takes 5-60 minutes
- Vercel will auto-issue SSL certificate
- Your site will be live at your custom domain!

## Step 6: Monitoring & Maintenance

### 6.1 Vercel Analytics

1. In Vercel project, go to "Analytics"
2. View page views, performance metrics
3. Monitor errors in "Logs" tab

### 6.2 Firebase Usage

1. In Firebase Console, check "Usage" tab
2. Monitor:
   - Authentication users
   - Firestore reads/writes
   - Storage usage

### 6.3 Regular Updates

```bash
# Pull latest changes
git pull

# Make updates
# ... edit files ...

# Commit and push
git add .
git commit -m "Update: description"
git push

# Vercel auto-deploys on push!
```

## Troubleshooting

### Build Fails

**Error**: `Module not found`
- Run `npm install` locally
- Commit `package-lock.json`
- Push again

**Error**: `Type error in TypeScript`
- Run `npm run build` locally
- Fix TypeScript errors
- Push again

### Authentication Not Working

**Error**: `auth/unauthorized-domain`
- Add your Vercel domain to Firebase Authorized Domains
- Wait 5 minutes and try again

### Firestore Permission Denied

**Error**: `Missing or insufficient permissions`
- Check Firestore security rules
- Ensure user is authenticated
- Verify rules match the ones in Step 1.4

### Environment Variables Not Working

- Ensure all variables start with `NEXT_PUBLIC_`
- Redeploy after adding variables
- Check variable names match exactly

## Performance Optimization

### Enable Vercel Speed Insights

1. In Vercel project, go to "Speed Insights"
2. Click "Enable"
3. Monitor Core Web Vitals

### Optimize Images

```bash
# Install sharp for optimized images
npm install sharp
```

### Enable Caching

Vercel automatically caches:
- Static assets (CSS, JS, images)
- API routes with proper headers
- Static pages

## Security Checklist

- [ ] Firebase security rules configured
- [ ] Environment variables not in git
- [ ] HTTPS enabled (automatic with Vercel)
- [ ] Authentication required for sensitive routes
- [ ] Input validation on forms
- [ ] XSS protection (React default)

## Backup Strategy

### Firestore Backup

1. Go to Firebase Console
2. Click "Firestore Database"
3. Click "Import/Export" tab
4. Set up scheduled exports to Cloud Storage

### Code Backup

- Code is backed up on GitHub
- Vercel keeps deployment history
- Can rollback to any previous deployment

## Cost Estimation

### Free Tier Limits

**Vercel Free**:
- 100 GB bandwidth/month
- Unlimited deployments
- Automatic HTTPS

**Firebase Free (Spark Plan)**:
- 50,000 reads/day
- 20,000 writes/day
- 1 GB storage
- 10 GB/month transfer

### When to Upgrade

Upgrade when you exceed:
- 1,000+ daily active users
- 100,000+ monthly page views
- Need custom domains on Vercel
- Need more Firebase quota

## Success Metrics

Track these KPIs:
- User signups (Firebase Auth)
- Vendor registrations
- Bookings created
- Page load time (Vercel Analytics)
- Error rate (Vercel Logs)

## Next Steps

After successful deployment:

1. **Marketing**:
   - Share on social media
   - Submit to directories
   - SEO optimization

2. **Features**:
   - Add payment integration
   - Implement reviews
   - Add email notifications

3. **Scale**:
   - Monitor usage
   - Optimize performance
   - Plan for growth

---

## Quick Reference

### Useful Commands

```bash
# Local development
npm run dev

# Build for production
npm run build

# Start production server locally
npm start

# Deploy to Vercel
vercel --prod
```

### Important URLs

- Firebase Console: https://console.firebase.google.com/
- Vercel Dashboard: https://vercel.com/dashboard
- Next.js Docs: https://nextjs.org/docs
- Tailwind CSS: https://tailwindcss.com/docs

### Support Resources

- Firebase Support: https://firebase.google.com/support
- Vercel Support: https://vercel.com/support
- Next.js Discord: https://nextjs.org/discord

---

🎉 Congratulations! Your Eventra application is now live in production!
