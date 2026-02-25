# Data Models & Structure Documentation

## 📐 Complete Data Models

### Core TypeScript Interfaces

For type safety and IDE autocomplete, reference: `lib/types.ts`

---

## 🗂️ Destination Model

```typescript
interface Destination {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  tours: TourPackage[];
  createdAt: string;
  updatedAt: string;
}
```

### Field Descriptions

| Field | Type | Required | Example | Notes |
|-------|------|----------|---------|-------|
| `id` | string | ✅ | "dest-1" | Auto-generated GUID |
| `name` | string | ✅ | "France" | Display name |
| `slug` | string | ✅ | "france" | URL-friendly, auto-generated |
| `description` | string | ✅ | "Experience the charm..." | 50-500 characters recommended |
| `image` | string | ✅ | "https://..." | Public image URL |
| `tours` | TourPackage[] | ⚠️ | [] | Empty array on creation |
| `createdAt` | string | ✅ | "2026-02-25T..." | ISO 8601 timestamp |
| `updatedAt` | string | ✅ | "2026-02-25T..." | ISO 8601 timestamp |

### Example Destination Object

```json
{
  "id": "dest-1",
  "name": "France",
  "slug": "france",
  "description": "Experience the charm of Paris, the romance of the countryside, and the beauty of the French Riviera.",
  "image": "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&h=600&fit=crop",
  "tours": [
    {
      "id": "tour-1",
      "name": "Paris City Tour",
      "slug": "paris-city-tour",
      "description": "Explore the iconic landmarks of Paris...",
      "duration": 4,
      "price": 1299,
      "image": "https://...",
      "highlights": ["Eiffel Tower", "Louvre Museum"],
      "includes": ["Hotel (3 nights)", "Breakfast"],
      "itinerary": [...],
      "createdAt": "2026-02-25T10:00:00.000Z",
      "updatedAt": "2026-02-25T10:00:00.000Z"
    }
  ],
  "createdAt": "2026-02-25T10:00:00.000Z",
  "updatedAt": "2026-02-25T10:00:00.000Z"
}
```

---

## 🎫 Tour Package Model

```typescript
interface TourPackage {
  id: string;
  name: string;
  slug: string;
  description: string;
  duration: number;
  price: number;
  image: string;
  highlights: string[];
  includes: string[];
  itinerary: ItineraryItem[];
  createdAt: string;
  updatedAt: string;
}

interface ItineraryItem {
  day: number;
  title: string;
  description: string;
}
```

### Field Descriptions

| Field | Type | Required | Example | Constraints |
|-------|------|----------|---------|-------------|
| `id` | string | ✅ | "tour-1" | Auto-generated GUID |
| `name` | string | ✅ | "Paris City Tour" | 3-100 characters |
| `slug` | string | ✅ | "paris-city-tour" | Auto-generated, URL-friendly |
| `description` | string | ✅ | "Explore iconic landmarks..." | 20-500 characters |
| `duration` | number | ✅ | 4 | Integer, 1-365 days |
| `price` | number | ✅ | 1299 | Numeric, per person |
| `image` | string | ✅ | "https://..." | Public image URL |
| `highlights` | string[] | ⚠️ | ["Eiffel Tower", "Louvre"] | Array of strings, min 1 |
| `includes` | string[] | ⚠️ | ["Hotel", "Breakfast"] | Array of strings, min 1 |
| `itinerary` | ItineraryItem[] | ⚠️ | [{day:1,...}] | Array, min 1 item |
| `createdAt` | string | ✅ | "2026-02-25T..." | ISO 8601 |
| `updatedAt` | string | ✅ | "2026-02-25T..." | ISO 8601 |

### Example Tour Package Object

```json
{
  "id": "tour-1",
  "name": "Paris City Tour",
  "slug": "paris-city-tour",
  "description": "Explore the iconic landmarks of Paris including the Eiffel Tower, Louvre Museum, and Notre-Dame Cathedral.",
  "duration": 4,
  "price": 1299,
  "image": "https://images.unsplash.com/photo-1511739001486-6bfe966ce51b?w=800&h=600&fit=crop",
  "highlights": [
    "Eiffel Tower",
    "Louvre Museum",
    "Notre-Dame",
    "Arc de Triomphe"
  ],
  "includes": [
    "Hotel (3 nights)",
    "Breakfast",
    "City tours",
    "Museum tickets"
  ],
  "itinerary": [
    {
      "day": 1,
      "title": "Arrival in Paris",
      "description": "Welcome to Paris! Settle into your hotel and explore the nearby streets."
    },
    {
      "day": 2,
      "title": "Famous Landmarks",
      "description": "Visit the Eiffel Tower and Arc de Triomphe with private guided tours."
    },
    {
      "day": 3,
      "title": "Museum Day",
      "description": "Explore the world-famous Louvre Museum and Notre-Dame Cathedral."
    },
    {
      "day": 4,
      "title": "Departure",
      "description": "Enjoy breakfast and depart for the airport."
    }
  ],
  "createdAt": "2026-02-25T10:00:00.000Z",
  "updatedAt": "2026-02-25T10:00:00.000Z"
}
```

---

## 📦 Dashboard Data Container

```typescript
interface DashboardData {
  destinations: Destination[];
}
```

### Example Complete Dashboard Data

```json
{
  "destinations": [
    {
      "id": "dest-1",
      "name": "France",
      "slug": "france",
      "description": "Experience the charm of Paris...",
      "image": "https://...",
      "tours": [
        {
          "id": "tour-1",
          "name": "Paris City Tour",
          "slug": "paris-city-tour",
          ...
        }
      ],
      "createdAt": "2026-02-25T10:00:00.000Z",
      "updatedAt": "2026-02-25T10:00:00.000Z"
    },
    {
      "id": "dest-2",
      "name": "Australia",
      "slug": "australia",
      ...
    }
  ]
}
```

---

## 📋 Form Data Models

### DestinationFormData

Used in destination creation/editing forms:

```typescript
interface DestinationFormData {
  name: string;           // e.g., "France"
  description: string;    // e.g., "Experience the charm..."
  image: string;          // e.g., "https://..."
}
```

### TourPackageFormData

Used in tour creation/editing forms:

```typescript
interface TourPackageFormData {
  name: string;                           // e.g., "Paris City Tour"
  description: string;                    // e.g., "Explore iconic..."
  duration: number;                       // e.g., 4
  price: number;                          // e.g., 1299
  image: string;                          // e.g., "https://..."
  highlights: string[];                   // e.g., ["Eiffel Tower"]
  includes: string[];                     // e.g., ["Hotel (3 nights)"]
  itinerary: {                           // Day by day plan
    day: number;
    title: string;
    description: string;
  }[];
}
```

---

## 🔄 Database Storage Format

### LocalStorage Key

```
Key: "mg_dashboard_data"
```

### Data Stored

```typescript
{
  destinations: [
    {
      id: string;
      name: string;
      slug: string;
      description: string;
      image: string;
      tours: [
        {
          id: string;
          name: string;
          slug: string;
          description: string;
          duration: number;
          price: number;
          image: string;
          highlights: string[];
          includes: string[];
          itinerary: [
            { day: number; title: string; description: string; }
          ];
          createdAt: string;
          updatedAt: string;
        }
      ];
      createdAt: string;
      updatedAt: string;
    }
  ]
}
```

---

## 🔢 Data Validation Rules

### Destination Validation

```typescript
{
  name: {
    type: "string",
    minLength: 1,
    maxLength: 100,
    required: true
  },
  description: {
    type: "string",
    minLength: 10,
    maxLength: 1000,
    required: true
  },
  image: {
    type: "string",
    format: "url",
    required: true
  }
}
```

### Tour Package Validation

```typescript
{
  name: {
    type: "string",
    minLength: 3,
    maxLength: 150,
    required: true
  },
  description: {
    type: "string",
    minLength: 20,
    maxLength: 2000,
    required: true
  },
  duration: {
    type: "number",
    min: 1,
    max: 365,
    required: true
  },
  price: {
    type: "number",
    min: 0,
    required: true
  },
  image: {
    type: "string",
    format: "url",
    required: true
  },
  highlights: {
    type: "array",
    items: "string",
    minItems: 1,
    maxItems: 10
  },
  includes: {
    type: "array",
    items: "string",
    minItems: 1,
    maxItems: 15
  },
  itinerary: {
    type: "array",
    items: {
      day: "number",
      title: "string",
      description: "string"
    },
    minItems: 1
  }
}
```

---

## 📊 Data Relationships

### One-to-Many: Destination → Tours

```
┌─────────────────────┐
│   Destination       │
│  ─────────────────  │
│ • id: "dest-1"      │
│ • name: "France"    │
│ • tours: [...]      │◄──┐
└─────────────────────┘   │
                          │
                     ┌────┴───────────────┐
                     │                    │
            ┌────────┴─────────┐ ┌────────┴────────┐
            │  Tour Package 1  │ │  Tour Package 2 │
            │  ──────────────  │ │  ───────────────│
            │ • id: "tour-1"   │ │ • id: "tour-2"  │
            │ • name: "Paris"  │ │ • name: "Lyon"  │
            └──────────────────┘ └─────────────────┘
```

---

## 🗄️ Sample Data Set

### Minimal Dataset

```json
{
  "destinations": [
    {
      "id": "1",
      "name": "France",
      "slug": "france",
      "description": "Beautiful country in Europe",
      "image": "https://example.com/france.jpg",
      "tours": [
        {
          "id": "t1",
          "name": "Paris Tour",
          "slug": "paris-tour",
          "description": "Tour of Paris",
          "duration": 3,
          "price": 1000,
          "image": "https://example.com/paris.jpg",
          "highlights": ["Eiffel Tower"],
          "includes": ["Hotel"],
          "itinerary": [
            {
              "day": 1,
              "title": "Day 1",
              "description": "Arrival"
            }
          ],
          "createdAt": "2026-02-25T10:00:00.000Z",
          "updatedAt": "2026-02-25T10:00:00.000Z"
        }
      ],
      "createdAt": "2026-02-25T10:00:00.000Z",
      "updatedAt": "2026-02-25T10:00:00.000Z"
    }
  ]
}
```

---

## 🔀 Data Conversion & Migration

### Exporting from LocalStorage

```typescript
const data = localStorage.getItem('mg_dashboard_data');
const parsed = JSON.parse(data);
// Use JSON.stringify(parsed, null, 2) for readable export
```

### Importing to New Database

```typescript
// Algorithm:
// 1. Read all destinations
// 2. For each destination:
//    a. Create destination record
//    b. For each tour in destination:
//       - Create tour record linked to destination
```

---

## 📈 Growth Considerations

### Expected Data Volume

| Metric | Small | Medium | Large |
|--------|-------|--------|-------|
| Destinations | 1-10 | 10-50 | 50+ |
| Tours/Destination | 2-5 | 5-10 | 10+ |
| Total Records | <50 | 50-500 | 500+ |
| Storage Size | <1MB | 1-10MB | 10-50MB |

### Scaling Options

- **LocalStorage**: ✅ Good for <100 records
- **IndexedDB**: ✅ Good for <1000 records
- **Database**: ✅ Required for production

---

## 🔐 Data Security Considerations

### Client-Side Storage

⚠️ **Not recommended for production** because:
- Not encrypted
- Accessible from browser console
- Lost on browser clear
- Single device only

### Production Recommendations

1. Move to backend database
2. Add authentication/authorization
3. Implement access controls
4. Add audit logging
5. Regular backups

---

## 📚 Reference

For implementation details, see:
- Type definitions: `lib/types.ts`
- Data functions: `lib/db.ts`
- Storage context: `lib/dashboard-context.tsx`
- API routes: `app/api/`

---

**Document Version**: 1.0  
**Last Updated**: 2026-02-25
