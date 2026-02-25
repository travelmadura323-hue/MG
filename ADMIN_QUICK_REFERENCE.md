# Admin Dashboard - Quick Reference

## 🚀 Getting Started

### Access Points
- **Dashboard**: `https://yourdomain.com/admin/dashboard`
- **Create Destination**: `https://yourdomain.com/admin/create-destination`
- **Edit Destination**: `https://yourdomain.com/admin/edit-destination/[id]`

## 📋 Dashboard Pages Overview

### 1. Main Dashboard (`/admin/dashboard`)

**What You See:**
- Grid of all destinations
- Each destination shows: name, description, tour count, preview tours
- Action buttons: Edit, Delete, Tours

**Actions:**
| Button | Purpose |
|--------|---------|
| `+ Add Destination` | Create new destination |
| `Edit` | Update destination details |
| `Delete` | Remove destination (⚠️ also removes tours) |
| `Tours` | Manage tour packages |

### 2. Create Destination (`/admin/create-destination`)

**Form Fields:**
```
- Destination Name * (required)
  Example: "France"
  
- Description * (required)
  Example: "Experience the charm of Paris, the romance of the countryside..."
  
- Image URL * (required)
  Example: "https://images.unsplash.com/photo-1..."
```

**After Submission:**
→ Redirects to edit page to add tours

### 3. Edit Destination (`/admin/edit-destination/[id]`)

**Tabs:**

#### Details Tab
Update:
- Destination name
- Description
- Image URL
- Preview image displayed

#### Tours Tab
- View all tours for this destination
- `+ Add Tour Package` button
- For each tour: Edit, Delete buttons

### 4. Add/Edit Tour

**Form Sections:**

**Basic Information**
```
- Tour Name
  Example: "Paris City Tour"
  
- Description
  Example: "Explore iconic landmarks..."
  
- Duration (days)
  Example: 4
  
- Price ($)
  Example: 1299
  
- Image URL
  Example: "https://..."
```

**Highlights**
```
- Add key attractions/features
- Plus/minus buttons to add/remove
Examples:
  • Eiffel Tower
  • Louvre Museum
  • Notre-Dame Cathedral
```

**What's Included**
```
- List what's in the package
Examples:
  • Hotel (3 nights)
  • Breakfast
  • City tours
  • Museum tickets
```

**Itinerary**
```
- Day number (auto-numbered)
- Title of the day
- Description of activities

Example:
Day 1: Arrival in Paris
"Welcome to Paris! Settle into your hotel and explore nearby streets."
```

## 💾 Saving Changes

All changes are automatically saved to your browser's local storage.

### Data Persistence
- ✅ Changes saved immediately
- ✅ Persists across page refreshes
- ✅ Reflects on public pages instantly

### Making Changes Effective
1. **Edit in dashboard** → Changes saved
2. **Navigate to public page** → See updated content
3. **Check `/destinations/[slug]`** → Updated destination info
4. **Check `/tours/[slug]`** → Updated tour details

## 📊 What Appears Where

### Destination Edit Page
- Destination: `/destinations/france`
- All tours for that destination displayed

### Tour Detail Page
- Tour: `/tours/paris-city-tour`
- Full tour info, itinerary, pricing, booking form
- Related tours shown

### Public Listing
- `/destinations` - All destinations with tour counts
- `/tours` - All tours across all destinations

## 🎯 Common Tasks

### Task: Add a New Destination

```
1. Go to /admin/dashboard
2. Click "+ Add Destination"
3. Fill in:
   - Name: "Spain"
   - Description: "Experience Spanish culture..."
   - Image URL: "https://..."
4. Click "Create Destination"
5. You'll be redirected to edit page
```

### Task: Add a Tour to Destination

```
1. Go to /admin/dashboard
2. Find destination card
3. Click "Tours" button
4. Click "+ Add Tour Package"
5. Fill in tour details (name, duration, price, image, etc.)
6. Add highlights, includes, itinerary
7. Click "Create Tour"
```

### Task: Update Tour Details

```
1. Go to /admin/dashboard
2. Click destination "Tours" or "Edit"
3. Find tour in list
4. Click "Edit" button on tour card
5. Update details in modal
6. Click "Update Tour"
```

### Task: Delete Tour

```
1. Go to /admin/dashboard → destination
2. Go to Tours tab
3. Find tour you want to delete
4. Click "Delete" button
5. Confirm deletion
```

### Task: Delete Destination

```
1. Go to /admin/dashboard
2. Find destination card
3. Click "Delete" button
4. Confirm deletion (⚠️ removes all tours too)
```

## 🔍 How Data Updates Appear

### When You Edit a Destination

Before:
```
destination.name = "France"
destination.image = "old-image.jpg"
```

Edit:
```
Update name → "France Paradise"
Update image → "new-image.jpg"
```

After:
```
/destinations/france-paradise → Shows new name and image
/destinations → Lists show updated info
```

### When You Add a Tour

Dashboard:
```
Tours count changes from 2 → 3
```

Public Pages:
```
/destinations/france → Shows new tour in list
/tours/new-tour-slug → Tour detail page works
```

### When You Delete a Tour

Dashboard:
```
Tour removed from management list
Tour count decreases
```

Public Pages:
```
Tour no longer appears on destination page
/tours/tour-slug → Shows 404 not found
```

## 📱 Mobile Dashboard

- ✅ Fully responsive
- ✅ Touch-friendly buttons
- ✅ Stack layout on mobile
- ✅ Full form functionality

## 🎨 Customization Tips

### Change Brand Colors

In forms and cards:
```
Primary (headings, buttons): #191973
Secondary (highlights, CTAs): #ec2127
```

### Add Custom Fields

Modify the tour form in:
```
components/admin/tour-form.tsx
```

Add new fields to `TourPackage` type in:
```
lib/types.ts
```

## 📊 Data Structure Reminder

```
Destination
├── Name
├── Slug (auto-generated from name)
├── Description
├── Image
└── Tours[] (multiple)
    ├── Name
    ├── Slug
    ├── Description
    ├── Duration
    ├── Price
    ├── Image
    ├── Highlights[]
    ├── Includes[]
    └── Itinerary[]
        ├── Day
        ├── Title
        └── Description
```

## ⚠️ Important Notes

1. **Slug Generation**
   - Automatically generated from names
   - Used in URLs
   - Cannot be manually changed (yet)

2. **Image URLs**
   - Must be publicly accessible
   - HTTPS recommended for production
   - Direct links work best

3. **Data Storage**
   - Currently stored in browser localStorage
   - Data persists per browser/device
   - Should migrate to database for production

4. **Backup**
   - Export data regularly
   - Keep copies on external storage

## 🆘 Quick Troubleshooting

| Problem | Solution |
|---------|----------|
| Changes not saving | Check browser localStorage is enabled |
| Images not showing | Verify URL is publicly accessible |
| Destination not appearing | Refresh page, clear cache |
| Tour not linked to destination | Check you added it to correct destination |
| Slug looks wrong | Slugs are auto-generated from names |

## 📚 More Information

- Full Guide: See `DASHBOARD_GUIDE.md`
- API Endpoints: POST/PUT/DELETE to `/api/destinations` and `/api/tours`
- Data Types: Check `lib/types.ts`

---

**Last Updated**: 2026-02-25
