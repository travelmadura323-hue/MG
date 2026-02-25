# Admin Dashboard System - Complete Guide

## 📋 Overview

This comprehensive admin dashboard system allows you to manage destinations and tour packages with a full CRUD interface. Changes made in the dashboard automatically reflect across your website.

## 🎯 Key Features

- ✅ Manage multiple destinations
- ✅ Add/Edit/Delete tour packages per destination
- ✅ Dynamic slug-based routing
- ✅ Responsive UI with Tailwind CSS
- ✅ Real-time data synchronization
- ✅ RESTful API endpoints
- ✅ Brand color integration (#191973, #ec2127)
- ✅ Smooth animations and transitions

## 📁 Project Structure

```
app/
├── admin/                              # Admin dashboard area
│   ├── dashboard/
│   │   └── page.tsx                   # Main dashboard showing all destinations
│   ├── create-destination/
│   │   └── page.tsx                   # Create new destination form
│   └── edit-destination/
│       └── [id]/page.tsx              # Edit destination & manage tours
├── api/                                # REST API endpoints
│   ├── destinations/
│   │   ├── route.ts                   # GET all, POST new
│   │   └── [id]/route.ts              # GET by ID, PUT, DELETE
│   └── tours/
│       ├── route.ts                   # GET all, POST new
│       └── [id]/route.ts              # GET by ID, PUT, DELETE
├── destinations/                       # Public views
│   ├── page.tsx                       # All destinations listing
│   └── [slug]/page.tsx                # Individual destination with its tours
└── tours/
    └── [slug]/page.tsx                # Tour detail page

components/
├── admin/                              # Admin-specific components
│   ├── destination-form.tsx           # Edit destination details
│   ├── tour-form.tsx                  # Add/Edit tour package
│   └── tour-management.tsx            # Manage tours for a destination
├── ui/                                 # UI components

lib/
├── types.ts                           # TypeScript types & interfaces
├── db.ts                              # Data storage & CRUD functions
└── dashboard-context.tsx              # React context for data management
```

## 🚀 Quick Start

### Access the Dashboard

1. **Main Dashboard**: `/admin/dashboard`
   - View all destinations in card format
   - Quick actions: Edit, Delete, Manage Tours
   - Button to create new destination

2. **Create Destination**: `/admin/create-destination`
   - Form to add a new destination
   - Name, description, and image URL required
   - Redirects to edit page after creation

3. **Edit Destination**: `/admin/edit-destination/[destinationId]`
   - Update destination details
   - Manage tour packages (add, edit, delete)
   - Tab-based interface

## 📊 Data Structure

### TypeScript Types

```typescript
// Destination
interface Destination {
  id: string;                    // Unique identifier
  name: string;                  // e.g., "France"
  slug: string;                  // e.g., "france"
  description: string;           // Destination overview
  image: string;                 // Image URL
  tours: TourPackage[];          // Array of tour packages
  createdAt: string;             // ISO timestamp
  updatedAt: string;             // ISO timestamp
}

// Tour Package
interface TourPackage {
  id: string;                    // Unique identifier
  name: string;                  // e.g., "Paris City Tour"
  slug: string;                  // e.g., "paris-city-tour"
  description: string;           // Tour description
  duration: number;              // Days (e.g., 4)
  price: number;                 // Per person (e.g., 1299)
  image: string;                 // Tour image URL
  highlights: string[];          // Key attractions
  includes: string[];            // What's included in package
  itinerary: {                   // Day-by-day breakdown
    day: number;
    title: string;
    description: string;
  }[];
  createdAt: string;
  updatedAt: string;
}
```

## 🗄️ Data Storage

Data is stored in **browser localStorage** using the key `mg_dashboard_data`. For production:

```typescript
// Option 1: Use a real database (MongoDB, PostgreSQL, etc.)
// Option 2: Use a BaaS (Firebase, Supabase, etc.)
// Option 3: Use a headless CMS (Sanity, Strapi, etc.)
```

### Default Dummy Data

The system comes with pre-loaded dummy data:
- **France** (2 tours)
- **Australia** (2 tours)
- **India** (1 tour)

To reset to default data, use:
```typescript
import { resetToDefaultData } from "@/lib/db";
resetToDefaultData();
```

## 🔌 API Endpoints

### Destinations

```bash
# Get all destinations
GET /api/destinations

# Get single destination
GET /api/destinations/[id]

# Create destination
POST /api/destinations
Body: { name, description, image }

# Update destination
PUT /api/destinations/[id]
Body: { name, description, image }

# Delete destination
DELETE /api/destinations/[id]
```

### Tours

```bash
# Get all tours
GET /api/tours

# Get single tour
GET /api/tours/[id]

# Create tour
POST /api/tours
Body: { destinationId, name, description, duration, price, image, highlights, includes, itinerary }

# Update tour
PUT /api/tours/[id]
Body: { name, description, duration, price, image, highlights, includes, itinerary }

# Delete tour
DELETE /api/tours/[id]
```

## 🎨 Brand Colors

Used throughout the dashboard:

```typescript
primary: '#191973'      // Deep blue (buttons, headings)
secondary: '#ec2127'    // Red (accents, CTAs)
black: '#000000'
white: '#ffffff'
```

## 🔄 State Management

### DashboardProvider Context

Wraps the entire app in `layout.tsx`:

```typescript
<DashboardProvider>
  <EnquiryProviderWrapper>
    <SiteHeader />
    <main>{children}</main>
    <SiteFooter />
  </EnquiryProviderWrapper>
</DashboardProvider>
```

### Using Dashboard Data

```typescript
import { useDashboard } from "@/lib/dashboard-context";

export default function MyComponent() {
  const {
    destinations,        // All destinations
    isLoading,          // Loading state
    error,              // Error message
    addDestination,     // Function
    updateDestination,  // Function
    deleteDestination,  // Function
    addTour,           // Function
    updateTour,        // Function
    deleteTour,        // Function
  } = useDashboard();

  // Use data in component
}
```

## 📝 CRUD Operations Examples

### Create a Destination

```typescript
const { addDestination } = useDashboard();

await addDestination({
  name: "Spain",
  slug: "spain",
  description: "Experience Spanish culture and beaches",
  image: "https://...",
  tours: []
});
```

### Add a Tour

```typescript
const { addTour } = useDashboard();

await addTour(destinationId, {
  name: "Madrid City Tour",
  slug: "madrid-city-tour",
  description: "Explore Spain's capital",
  duration: 3,
  price: 899,
  image: "https://...",
  highlights: ["Prado Museum", "Royal Palace"],
  includes: ["Hotel", "Breakfast"],
  itinerary: [
    {
      day: 1,
      title: "Arrival",
      description: "Welcome to Madrid"
    }
  ]
});
```

### Update a Destination

```typescript
const { updateDestination } = useDashboard();

await updateDestination(destinationId, {
  name: "Updated Name",
  description: "Updated description",
  image: "new-image-url"
});
```

### Delete a Tour

```typescript
const { deleteTour } = useDashboard();

await deleteTour(destinationId, tourId);
```

## 🌐 Public Pages

### Destinations Listing
- **Route**: `/destinations`
- **Shows**: All destinations with tour counts
- **Features**: Search cards, links to detail pages

### Destination Detail
- **Route**: `/destinations/[slug]`
- **Shows**: Destination info + all its tour packages
- **Features**: Images, descriptions, prices, highlights

### Tour Detail
- **Route**: `/tours/[slug]`
- **Shows**: Complete tour information
- **Features**: Itinerary, highlights, pricing, booking form, related tours

## 📱 Responsive Design

- ✅ Mobile-first approach
- ✅ Tablet-optimized layouts
- ✅ Desktop full experience
- ✅ Touch-friendly buttons and forms
- ✅ Optimized images

## 🔐 Database Options (Production)

### Option 1: MongoDB + Mongoose
```typescript
// Install: npm install mongodb mongoose
// Perfect for scalable, document-based storage
```

### Option 2: Supabase (PostgreSQL)
```typescript
// Install: npm install @supabase/supabase-js
// Easy-to-use PostgreSQL backend
```

### Option 3: Firebase
```typescript
// Install: npm install firebase
// Google-managed, real-time database
```

### Option 4: Prisma ORM
```typescript
// Install: npm install @prisma/client
// Works with any SQL or NoSQL database
```

## 🛠️ Configuration & Customization

### Change Storage Key

In `lib/db.ts`:
```typescript
const STORAGE_KEY = "mg_dashboard_data"; // Change this
```

### Modify Default Data

In `lib/db.ts`:
```typescript
const DEFAULT_DESTINATIONS: Destination[] = [
  // Add/modify destinations here
];
```

### UI Customization

All components use Tailwind CSS classes. Modify:
- Colors in `tailwind.config.ts`
- Component styles in individual `.tsx` files
- Animations in `globals.css`

## 📊 Analytics & Monitoring

Track:
- Destination views
- Tour bookings
- User engagement
- Popular destinations
- Revenue by destination

## 🧪 Testing the System

1. **Start the app**
   ```bash
   npm run dev
   ```

2. **Navigate to dashboard**
   ```
   http://localhost:3000/admin/dashboard
   ```

3. **Create a test destination**
   - Click "Add Destination"
   - Fill in details
   - Submit

4. **Add test tours**
   - Click "Tours" on the destination card
   - Click "Add Tour Package"
   - Fill in details
   - Submit

5. **Verify changes appear on public pages**
   - Visit `/destinations`
   - Visit `/destinations/[slug]`
   - Visit `/tours/[slug]`

## 🐛 Troubleshooting

### Data Not Persisting?
- Check browser localStorage is enabled
- Clear cache and reload page
- Check browser console for errors

### Images Not Loading?
- Verify image URLs are publicly accessible
- Check CORS settings if external images
- Use HTTPS URLs

### Slugs Not Generated?
- Ensure destination/tour names are not empty
- Slugs are auto-generated from names

### Tours Not Showing?
- Verify tours are added to correct destination
- Check destination ID matches
- Clear cache and refresh

## 📚 Additional Resources

- [Next.js App Router Documentation](https://nextjs.org/docs/app)
- [React Context API](https://react.dev/reference/react/useContext)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [TypeScript](https://www.typescriptlang.org/docs/)

## ✨ Best Practices

1. **Always validate data** before saving
2. **Use TypeScript** for type safety
3. **Handle loading/error states** in components
4. **Optimize images** before uploading
5. **Test on mobile** before production
6. **Backup data** regularly
7. **Use environment variables** for sensitive data
8. **Implement authentication** for admin access

## 🚀 Deployment

### Vercel (Recommended)
```bash
npm run build
vercel
```

### Docker
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY . .
RUN npm install && npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

## 📞 Support

For issues or questions:
1. Check the troubleshooting section
2. Review the code comments
3. Check Next.js documentation
4. Open an issue on GitHub

---

**Created**: 2026-02-25  
**Version**: 1.0.0  
**License**: MIT
