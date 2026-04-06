# Eventra Testing Guide

Complete testing checklist to ensure all features work correctly.

## Pre-Testing Setup

1. Ensure Firebase is configured
2. Run `npm install`
3. Create `.env.local` with Firebase credentials
4. Run `npm run dev`
5. Open http://localhost:3000

## Test Scenarios

### 1. Authentication Flow

#### Test 1.1: User Sign Up
- [ ] Navigate to `/signup`
- [ ] Fill in all fields (name, email, password, confirm password)
- [ ] Select "Book Services" role
- [ ] Click "Create Account"
- [ ] Verify redirect to homepage
- [ ] Verify user name appears in navbar
- [ ] Check Firebase Console > Authentication for new user

#### Test 1.2: Vendor Sign Up
- [ ] Sign out if logged in
- [ ] Navigate to `/signup`
- [ ] Fill in all fields
- [ ] Select "Offer Services" role
- [ ] Click "Create Account"
- [ ] Verify redirect to homepage
- [ ] Verify "Dashboard" link appears in navbar
- [ ] Check Firebase Console > Authentication for new user

#### Test 1.3: Login
- [ ] Sign out
- [ ] Navigate to `/login`
- [ ] Enter valid credentials
- [ ] Click "Sign In"
- [ ] Verify redirect to homepage
- [ ] Verify user is logged in

#### Test 1.4: Login Error Handling
- [ ] Try login with invalid email format
- [ ] Try login with wrong password
- [ ] Try login with non-existent account
- [ ] Verify error messages display correctly

#### Test 1.5: Sign Out
- [ ] Click "Sign Out" in navbar
- [ ] Verify redirect to homepage
- [ ] Verify navbar shows "Login" and "Sign Up"
- [ ] Verify "Dashboard" link is hidden

### 2. Vendor Dashboard

#### Test 2.1: Create Vendor Profile
- [ ] Sign in as vendor (without existing profile)
- [ ] Navigate to `/dashboard`
- [ ] Fill in vendor profile form:
  - Business Name: "Elite Events Co"
  - Description: "Premium event planning services"
  - Categories: "Wedding, Birthday, Corporate"
  - Location: "New York, NY"
  - Price Range: "$$$"
- [ ] Click "Create Vendor Profile"
- [ ] Verify profile created successfully
- [ ] Check Firebase Console > Firestore > vendors collection

#### Test 2.2: Add Service
- [ ] In dashboard, click "Add Service"
- [ ] Fill in service form:
  - Service Name: "Wedding Planning Package"
  - Description: "Complete wedding planning from start to finish"
  - Price: 5000
  - Category: "Wedding"
  - Duration: "6 months"
- [ ] Click "Add Service"
- [ ] Verify service appears in list
- [ ] Check Firebase Console > Firestore > services collection

#### Test 2.3: Edit Service
- [ ] Click edit icon on a service
- [ ] Modify service details
- [ ] Click "Update Service"
- [ ] Verify changes saved
- [ ] Refresh page and verify changes persist

#### Test 2.4: Delete Service
- [ ] Click delete icon on a service
- [ ] Confirm deletion in alert
- [ ] Verify service removed from list
- [ ] Check Firebase Console to confirm deletion

### 3. Browse & Search

#### Test 3.1: Homepage
- [ ] Navigate to homepage
- [ ] Verify hero section displays
- [ ] Verify stats section shows
- [ ] Verify event categories display (6 categories)
- [ ] Verify featured vendors section
- [ ] Click "Explore Services" button
- [ ] Verify redirect to `/explore`

#### Test 3.2: Category Navigation
- [ ] On homepage, click a category (e.g., "Wedding")
- [ ] Verify redirect to `/explore?category=Wedding`
- [ ] Verify category filter is pre-selected
- [ ] Verify only wedding vendors show

#### Test 3.3: Explore Page - Search
- [ ] Navigate to `/explore`
- [ ] Enter search term in search bar (e.g., "Elite")
- [ ] Verify vendors filter in real-time
- [ ] Clear search
- [ ] Verify all vendors show again

#### Test 3.4: Explore Page - Category Filter
- [ ] Click different category buttons
- [ ] Verify vendors filter by category
- [ ] Click "All" category
- [ ] Verify all vendors show

#### Test 3.5: Explore Page - Price Filter
- [ ] Click different price range buttons
- [ ] Verify vendors filter by price
- [ ] Click "All" price range
- [ ] Verify all vendors show

#### Test 3.6: Explore Page - Rating Filter
- [ ] Click different rating buttons (3+, 4+, 4.5+)
- [ ] Verify vendors filter by rating
- [ ] Click "All" rating
- [ ] Verify all vendors show

#### Test 3.7: Combined Filters
- [ ] Select category: "Wedding"
- [ ] Select price: "$$$"
- [ ] Select rating: "4+"
- [ ] Verify only matching vendors show
- [ ] Verify result count updates
- [ ] Click "Clear Filters"
- [ ] Verify all filters reset

### 4. Vendor Profile Page

#### Test 4.1: View Vendor Profile
- [ ] Click on a vendor card
- [ ] Verify redirect to `/vendor/[id]`
- [ ] Verify vendor details display:
  - Business name
  - Categories
  - Rating and reviews
  - Location
  - Price range
  - Description
- [ ] Verify services section displays

#### Test 4.2: View Services
- [ ] Scroll to services section
- [ ] Verify all services display
- [ ] Verify each service shows:
  - Name
  - Category
  - Description
  - Price
  - Duration
  - "Book Now" button

### 5. Booking Flow

#### Test 5.1: Book as Guest (Not Logged In)
- [ ] Sign out if logged in
- [ ] Navigate to vendor profile
- [ ] Click "Book Now" on a service
- [ ] Verify redirect to `/login`

#### Test 5.2: Book as Logged In User
- [ ] Sign in as user (not vendor)
- [ ] Navigate to vendor profile
- [ ] Click "Book Now" on a service
- [ ] Verify redirect to `/booking` page
- [ ] Verify vendor details display
- [ ] Select a future date
- [ ] Enter notes: "Need services for 100 guests"
- [ ] Click "Submit Booking Request"
- [ ] Verify success message displays
- [ ] Verify auto-redirect to homepage after 3 seconds
- [ ] Check Firebase Console > Firestore > bookings collection

#### Test 5.3: Booking Validation
- [ ] Try to submit without selecting date
- [ ] Verify error message
- [ ] Try to select past date
- [ ] Verify date picker prevents it

### 6. Vendor Booking Management

#### Test 6.1: View Booking Requests
- [ ] Sign in as vendor
- [ ] Navigate to `/dashboard`
- [ ] Scroll to "Booking Requests" section
- [ ] Verify pending bookings display
- [ ] Verify booking shows:
  - Status badge
  - Date
  - Booking ID
  - Notes

#### Test 6.2: Confirm Booking
- [ ] Click "Confirm" on a pending booking
- [ ] Verify status changes to "CONFIRMED"
- [ ] Verify status badge turns green
- [ ] Verify action buttons disappear
- [ ] Check Firebase Console for status update

#### Test 6.3: Decline Booking
- [ ] Click "Decline" on a pending booking
- [ ] Verify status changes to "CANCELLED"
- [ ] Verify status badge turns red
- [ ] Verify action buttons disappear

### 7. Responsive Design

#### Test 7.1: Mobile View (375px)
- [ ] Resize browser to 375px width
- [ ] Test homepage layout
- [ ] Test navbar (hamburger menu)
- [ ] Test explore page
- [ ] Test vendor profile
- [ ] Test booking form
- [ ] Test dashboard
- [ ] Verify all elements are readable
- [ ] Verify no horizontal scroll

#### Test 7.2: Tablet View (768px)
- [ ] Resize browser to 768px width
- [ ] Test all pages
- [ ] Verify grid layouts adjust
- [ ] Verify navigation works

#### Test 7.3: Desktop View (1920px)
- [ ] Resize browser to 1920px width
- [ ] Test all pages
- [ ] Verify max-width containers work
- [ ] Verify content is centered

### 8. UI/UX Testing

#### Test 8.1: Animations
- [ ] Verify page transitions are smooth
- [ ] Verify hover effects on cards
- [ ] Verify button hover effects
- [ ] Verify floating background elements
- [ ] Verify form input focus states

#### Test 8.2: Loading States
- [ ] Check loading states on:
  - Homepage vendor fetch
  - Explore page vendor fetch
  - Vendor profile page
  - Dashboard data fetch
- [ ] Verify skeleton loaders or loading text

#### Test 8.3: Empty States
- [ ] Create new vendor without services
- [ ] Verify "No services" message
- [ ] Create vendor without bookings
- [ ] Verify "No bookings" message
- [ ] Search for non-existent vendor
- [ ] Verify "No vendors found" message

#### Test 8.4: Error States
- [ ] Test with invalid Firebase config
- [ ] Verify error messages display
- [ ] Test network offline
- [ ] Verify graceful degradation

### 9. Navigation Testing

#### Test 9.1: Navbar Links
- [ ] Click "Home" - verify redirect to `/`
- [ ] Click "Explore" - verify redirect to `/explore`
- [ ] Click "Dashboard" (as vendor) - verify redirect to `/dashboard`
- [ ] Click "Login" - verify redirect to `/login`
- [ ] Click "Sign Up" - verify redirect to `/signup`

#### Test 9.2: Back Navigation
- [ ] Navigate through multiple pages
- [ ] Use browser back button
- [ ] Verify correct page history
- [ ] Verify state is preserved

#### Test 9.3: Direct URL Access
- [ ] Access `/dashboard` without login
- [ ] Verify redirect to `/login`
- [ ] Access `/dashboard` as regular user
- [ ] Verify redirect to homepage
- [ ] Access `/vendor/invalid-id`
- [ ] Verify "Vendor not found" message

### 10. Data Persistence

#### Test 10.1: Refresh Page
- [ ] Create vendor profile
- [ ] Refresh page
- [ ] Verify data persists
- [ ] Add service
- [ ] Refresh page
- [ ] Verify service persists

#### Test 10.2: Multiple Sessions
- [ ] Sign in on one browser
- [ ] Sign in on another browser (incognito)
- [ ] Create booking on first browser
- [ ] Refresh dashboard on second browser
- [ ] Verify booking appears

### 11. Security Testing

#### Test 11.1: Route Protection
- [ ] Try accessing `/dashboard` without login
- [ ] Verify redirect to login
- [ ] Try accessing `/booking` without login
- [ ] Verify redirect to login

#### Test 11.2: Role-Based Access
- [ ] Sign in as regular user
- [ ] Try accessing `/dashboard`
- [ ] Verify redirect or access denied
- [ ] Sign in as vendor
- [ ] Verify dashboard access granted

#### Test 11.3: Data Access
- [ ] Create vendor as User A
- [ ] Sign in as User B
- [ ] Try to edit User A's vendor profile
- [ ] Verify Firestore rules prevent it

### 12. Performance Testing

#### Test 12.1: Page Load Speed
- [ ] Use browser DevTools > Network tab
- [ ] Measure page load times
- [ ] Verify < 3 seconds on good connection
- [ ] Check Lighthouse score (aim for 90+)

#### Test 12.2: Image Optimization
- [ ] Check if images are optimized
- [ ] Verify lazy loading works
- [ ] Check for proper image formats

#### Test 12.3: Bundle Size
- [ ] Run `npm run build`
- [ ] Check bundle sizes in output
- [ ] Verify no huge bundles (> 500KB)

## Bug Tracking Template

When you find a bug, document it:

```
Bug ID: BUG-001
Title: [Brief description]
Severity: Critical / High / Medium / Low
Steps to Reproduce:
1. 
2. 
3. 
Expected Result: 
Actual Result: 
Browser: 
Screenshot: [if applicable]
```

## Test Results Summary

After completing all tests, fill this out:

```
Total Tests: [number]
Passed: [number]
Failed: [number]
Blocked: [number]
Pass Rate: [percentage]

Critical Issues: [list]
High Priority Issues: [list]
Medium Priority Issues: [list]
Low Priority Issues: [list]
```

## Automated Testing (Future)

Consider adding:
- Jest for unit tests
- React Testing Library for component tests
- Cypress for E2E tests
- Firebase Emulator for testing without production data

## Production Testing Checklist

Before going live:
- [ ] All tests pass
- [ ] No console errors
- [ ] No console warnings
- [ ] Lighthouse score > 90
- [ ] Mobile responsive
- [ ] Cross-browser tested (Chrome, Firefox, Safari, Edge)
- [ ] Firebase security rules tested
- [ ] Environment variables configured
- [ ] Error tracking setup (Sentry, etc.)
- [ ] Analytics setup (Google Analytics, etc.)

---

Happy Testing! 🧪
