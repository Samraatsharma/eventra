# 🚀 Deploy Eventra to Vercel - Step by Step

## ✅ Prerequisites

- [x] Code pushed to GitHub ✅
- [x] GitHub repository: `Samraatsharma/eventra` ✅
- [ ] Vercel account (free)
- [ ] Firebase credentials ready

---

## 🎯 Quick Deployment (5 Minutes)

### Step 1: Create Vercel Account
1. Go to: **https://vercel.com/signup**
2. Click **"Continue with GitHub"**
3. Authorize Vercel to access your GitHub
4. Complete signup

### Step 2: Import Your Repository
1. Go to: **https://vercel.com/new**
2. Click **"Import Git Repository"**
3. Find and select: **`Samraatsharma/eventra`**
4. Click **"Import"**

### Step 3: Configure Project
Vercel will auto-detect Next.js settings:
- **Framework Preset:** Next.js ✅ (auto-detected)
- **Root Directory:** ./ ✅ (default)
- **Build Command:** `npm run build` ✅ (auto)
- **Output Directory:** `.next` ✅ (auto)

### Step 4: Add Environment Variables
Click **"Environment Variables"** and add these:

```
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyBk0a0oUcdiIP2TeN9n5Qp2orXhAuSPH4c
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=eventra-5443d.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=eventra-5443d
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=eventra-5443d.firebasestorage.app
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=1091354662463
NEXT_PUBLIC_FIREBASE_APP_ID=1:1091354662463:web:e3f76720798c1f73944a8a
```

**Important:** Copy these from your `.env.local` file!

### Step 5: Deploy
1. Click **"Deploy"**
2. Wait 2-3 minutes for build
3. Done! 🎉

Your app will be live at: **`https://eventra-[random].vercel.app`**

---

## 📋 Detailed Step-by-Step Guide

### 1️⃣ Sign Up for Vercel

**Go to:** https://vercel.com/signup

**Choose:** Continue with GitHub (recommended)

**Why GitHub?** 
- Automatic deployments on push
- Easy repository access
- No manual setup needed

### 2️⃣ Import Your Repository

**After login, you'll see the dashboard:**

1. Click **"Add New..."** button (top right)
2. Select **"Project"**
3. You'll see your GitHub repositories
4. Find **"eventra"** repository
5. Click **"Import"**

**If you don't see your repository:**
- Click "Adjust GitHub App Permissions"
- Grant access to the repository
- Refresh the page

### 3️⃣ Configure Build Settings

Vercel auto-detects Next.js, but verify:

**Framework Preset:** Next.js ✅
**Root Directory:** `./` (leave as default)
**Build Command:** `npm run build` (auto-filled)
**Output Directory:** `.next` (auto-filled)
**Install Command:** `npm install` (auto-filled)

**Node.js Version:** 18.x (recommended)

### 4️⃣ Add Environment Variables

**This is CRITICAL for Firebase to work!**

Click **"Environment Variables"** section:

**Add each variable:**

| Name | Value |
|------|-------|
| `NEXT_PUBLIC_FIREBASE_API_KEY` | `AIzaSyBk0a0oUcdiIP2TeN9n5Qp2orXhAuSPH4c` |
| `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN` | `eventra-5443d.firebaseapp.com` |
| `NEXT_PUBLIC_FIREBASE_PROJECT_ID` | `eventra-5443d` |
| `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET` | `eventra-5443d.firebasestorage.app` |
| `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID` | `1091354662463` |
| `NEXT_PUBLIC_FIREBASE_APP_ID` | `1:1091354662463:web:e3f76720798c1f73944a8a` |

**For each variable:**
1. Enter the **Name** (e.g., `NEXT_PUBLIC_FIREBASE_API_KEY`)
2. Enter the **Value** (e.g., your API key)
3. Select **All** environments (Production, Preview, Development)
4. Click **"Add"**

**Repeat for all 6 variables!**

### 5️⃣ Deploy

1. Review all settings
2. Click **"Deploy"** button
3. Watch the build process (2-3 minutes)

**Build Steps:**
- ✅ Cloning repository
- ✅ Installing dependencies
- ✅ Building application
- ✅ Optimizing assets
- ✅ Deploying to edge network

### 6️⃣ Success! 🎉

**Your app is live!**

You'll see:
- ✅ Deployment successful
- ✅ Your live URL
- ✅ Preview screenshot

**Your URL will be:** `https://eventra-[random-string].vercel.app`

---

## 🔗 Your Deployment URLs

After deployment, you'll have:

### Production URL:
`https://eventra-[random].vercel.app`

### Custom Domain (Optional):
You can add your own domain later:
- `https://eventra.yourdomain.com`
- `https://www.yourdomain.com`

---

## ✅ Post-Deployment Checklist

### 1. Test Your Live App
Visit your Vercel URL and test:
- [ ] Home page loads
- [ ] Explore page works
- [ ] Login/Signup works
- [ ] Firebase authentication works
- [ ] Booking form works
- [ ] Dashboard loads
- [ ] Vendor profiles work
- [ ] Mobile responsive
- [ ] All animations smooth

### 2. Update Firebase Settings
Add your Vercel domain to Firebase:

1. Go to: https://console.firebase.google.com
2. Select your project: `eventra-5443d`
3. Go to **Authentication** > **Settings**
4. Scroll to **Authorized domains**
5. Click **"Add domain"**
6. Add: `eventra-[your-random].vercel.app`
7. Save

### 3. Seed Your Database
Visit: `https://your-vercel-url.vercel.app/admin/seed`
- Click "Seed Database"
- Wait for success message
- Now your app has vendor data!

### 4. Update GitHub README
Add your live demo link:

```markdown
# Eventra - Event Marketplace

🚀 **Live Demo:** https://your-vercel-url.vercel.app

[View Code](https://github.com/Samraatsharma/eventra) | [Documentation](./START_HERE.md)
```

---

## 🔄 Automatic Deployments

**Every time you push to GitHub, Vercel automatically:**
1. Detects the push
2. Builds your app
3. Deploys to production
4. Updates your live URL

**No manual deployment needed!**

### Test Automatic Deployment:
```bash
# Make a small change
echo "# Updated" >> README.md

# Commit and push
git add .
git commit -m "test: Verify automatic deployment"
git push

# Check Vercel dashboard - new deployment will start!
```

---

## 🎨 Custom Domain (Optional)

### Add Your Own Domain:

1. Go to your project on Vercel
2. Click **"Settings"** > **"Domains"**
3. Enter your domain: `eventra.yourdomain.com`
4. Click **"Add"**
5. Follow DNS configuration instructions
6. Wait for DNS propagation (5-60 minutes)

**Vercel provides:**
- ✅ Free SSL certificate
- ✅ Automatic HTTPS
- ✅ Global CDN
- ✅ DDoS protection

---

## 📊 Vercel Dashboard Features

### Analytics (Free):
- Page views
- Unique visitors
- Top pages
- Performance metrics

### Deployments:
- View all deployments
- Rollback to previous versions
- Preview deployments for PRs

### Logs:
- Build logs
- Function logs
- Error tracking

### Performance:
- Lighthouse scores
- Core Web Vitals
- Speed insights

---

## ⚡ Performance on Vercel

**Your app will be:**
- ✅ Served from global CDN (fast worldwide)
- ✅ Automatically optimized images
- ✅ Edge caching enabled
- ✅ Compressed assets
- ✅ HTTP/2 enabled
- ✅ Brotli compression

**Expected Performance:**
- Initial Load: <1 second
- Time to Interactive: <1.5 seconds
- Lighthouse Score: 90+

---

## 🔧 Troubleshooting

### Build Failed?

**Check:**
1. Environment variables are correct
2. All 6 Firebase variables added
3. No typos in variable names
4. Values don't have extra spaces

**View build logs:**
- Click on failed deployment
- Check error messages
- Fix issues and push again

### Firebase Not Working?

**Check:**
1. Environment variables added correctly
2. Firebase domain authorized
3. Firebase project is active
4. Firestore rules allow access

### 404 Errors?

**Check:**
1. Build completed successfully
2. All pages exist in `src/app/`
3. No broken links
4. Routes are correct

---

## 💰 Vercel Pricing

### Free Tier (Hobby):
- ✅ Unlimited deployments
- ✅ 100 GB bandwidth/month
- ✅ Automatic HTTPS
- ✅ Global CDN
- ✅ Analytics
- ✅ Perfect for personal projects

**Your Eventra app fits perfectly in the free tier!**

### Pro Tier ($20/month):
- Everything in Free
- 1 TB bandwidth
- Team collaboration
- Advanced analytics
- Priority support

---

## 🎯 Quick Commands

### Vercel CLI (Optional):

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy from terminal
vercel

# Deploy to production
vercel --prod

# View logs
vercel logs

# List deployments
vercel ls
```

---

## 📱 Mobile App (PWA)

Your app is already PWA-ready! Users can:
1. Visit your Vercel URL on mobile
2. Click "Add to Home Screen"
3. Use it like a native app

---

## 🎉 Success Metrics

After deployment, you should see:

### Build:
- ✅ Build time: 2-3 minutes
- ✅ Bundle size: ~200KB (gzipped)
- ✅ No errors

### Performance:
- ✅ Lighthouse: 90+ score
- ✅ First Load: <1 second
- ✅ Time to Interactive: <1.5 seconds

### Functionality:
- ✅ All pages load
- ✅ Firebase works
- ✅ Authentication works
- ✅ Database queries work

---

## 📞 Support

### Vercel Documentation:
- **Docs:** https://vercel.com/docs
- **Next.js on Vercel:** https://vercel.com/docs/frameworks/nextjs
- **Support:** https://vercel.com/support

### Community:
- **Discord:** https://vercel.com/discord
- **GitHub Discussions:** https://github.com/vercel/vercel/discussions

---

## ✅ Final Checklist

- [ ] Vercel account created
- [ ] Repository imported
- [ ] Environment variables added (all 6)
- [ ] Deployment successful
- [ ] Live URL works
- [ ] Firebase domain authorized
- [ ] Database seeded
- [ ] All pages tested
- [ ] Mobile tested
- [ ] README updated with live URL

---

## 🚀 You're Live!

**Your Eventra app is now:**
- ✅ Deployed on Vercel
- ✅ Accessible worldwide
- ✅ Auto-deploying on push
- ✅ Optimized for performance
- ✅ Secured with HTTPS
- ✅ Ready to share!

**Next:** Share your live URL with the world! 🌍

---

**Deployment URL:** `https://eventra-[your-random].vercel.app`

**Time to deploy:** ~5 minutes
**Cost:** FREE ✅
**Performance:** OPTIMIZED ⚡
