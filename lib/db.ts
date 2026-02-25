// Utility functions to convert names to slugs
export function createSlug(name: string): string {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export function generateId(): string {
  return Math.random().toString(36).substring(2, 11);
}

// Data storage - In a real app, this would be a database
// For now, we'll use a combination of localStorage and mock data
import type { Destination, TourPackage, DashboardData } from "./types";

const STORAGE_KEY = "mg_dashboard_data";

// Default/dummy data
const DEFAULT_DESTINATIONS: Destination[] = [
  {
    id: "dest-1",
    name: "France",
    slug: "france",
    description: "Experience the charm of Paris, the romance of the countryside, and the beauty of the French Riviera.",
    image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&h=600&fit=crop",
    tours: [
      {
        id: "tour-1",
        name: "Paris City Tour",
        slug: "paris-city-tour",
        description: "Explore the iconic landmarks of Paris including the Eiffel Tower, Louvre Museum, and Notre-Dame Cathedral.",
        duration: 4,
        price: 1299,
        image: "https://images.unsplash.com/photo-1511739001486-6bfe966ce51b?w=800&h=600&fit=crop",
        highlights: ["Eiffel Tower", "Louvre Museum", "Notre-Dame", "Arc de Triomphe"],
        includes: ["Hotel (3 nights)", "Breakfast", "City tours", "Museum tickets"],
        itinerary: [
          {
            day: 1,
            title: "Arrival in Paris",
            description: "Welcome to Paris! Settle into your hotel and explore the nearby streets.",
          },
          {
            day: 2,
            title: "Famous Landmarks",
            description: "Visit the Eiffel Tower and Arc de Triomphe with private guided tours.",
          },
          {
            day: 3,
            title: "Museum Day",
            description: "Explore the world-famous Louvre Museum and Notre-Dame Cathedral.",
          },
          {
            day: 4,
            title: "Departure",
            description: "Enjoy breakfast and depart for the airport.",
          },
        ],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: "tour-2",
        name: "France Honeymoon Package",
        slug: "france-honeymoon-package",
        description: "A romantic getaway in the most romantic country in the world. Experience wine, culture, and romance.",
        duration: 7,
        price: 2499,
        image: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&h=600&fit=crop",
        highlights: ["Champagne Region", "Provence", "Romantic Dinners", "Spa Treatments"],
        includes: ["Luxury Hotel (6 nights)", "Breakfast & Dinner", "Wine tasting", "Spa treatments"],
        itinerary: [
          {
            day: 1,
            title: "Arrival",
            description: "Arrive in Paris and transfer to a luxury hotel.",
          },
          {
            day: 2,
            title: "Paris Romance",
            description: "Romantic dinner cruise on the Seine River.",
          },
          {
            day: 3,
            title: "Champagne Region",
            description: "Visit champagne vineyards and enjoy tastings.",
          },
          {
            day: 4,
            title: "Provence",
            description: "Explore the lavender fields and quaint villages of Provence.",
          },
          {
            day: 5,
            title: "Wine & Spa",
            description: "Wine tasting and romantic spa day.",
          },
          {
            day: 6,
            title: "Lyon",
            description: "Explore the food capital of France.",
          },
          {
            day: 7,
            title: "Departure",
            description: "Return to Paris and depart.",
          },
        ],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "dest-2",
    name: "Australia",
    slug: "australia",
    description: "Discover the land down under with stunning beaches, unique wildlife, and vibrant cities.",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
    tours: [
      {
        id: "tour-3",
        name: "Sydney Tour",
        slug: "sydney-tour",
        description: "Explore Sydney's famous landmarks and beautiful coastal areas.",
        duration: 3,
        price: 899,
        image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
        highlights: ["Sydney Opera House", "Bondi Beach", "Blue Mountains", "Manly Beach"],
        includes: ["Hotel (2 nights)", "Breakfast", "City tour", "Beach visits"],
        itinerary: [
          {
            day: 1,
            title: "Sydney Highlights",
            description: "Visit Opera House, Harbour Bridge, and explore Circular Quay.",
          },
          {
            day: 2,
            title: "Beach Day",
            description: "Bondi Beach and coastal walk to Coogee.",
          },
          {
            day: 3,
            title: "Departure",
            description: "Last-minute shopping and departure.",
          },
        ],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: "tour-4",
        name: "Melbourne Family Package",
        slug: "melbourne-family-package",
        description: "A perfect family vacation in Melbourne with theme parks, wildlife, and city attractions.",
        duration: 5,
        price: 1599,
        image: "https://images.unsplash.com/photo-1506973404872-a4a50e48ae53?w=800&h=600&fit=crop",
        highlights: ["Taronga Zoo", "Theme Parks", "Great Ocean Road", "Wildlife Park"],
        includes: ["Hotel (4 nights)", "Breakfast & Dinner", "Theme park tickets", "Wildlife encounters"],
        itinerary: [
          {
            day: 1,
            title: "Melbourne City",
            description: "Explore Melbourne's laneways and street art.",
          },
          {
            day: 2,
            title: "Wildlife Park",
            description: "Visit Taronga Zoo and interact with Australian animals.",
          },
          {
            day: 3,
            title: "Great Ocean Road",
            description: "Drive along the scenic Great Ocean Road to the Twelve Apostles.",
          },
          {
            day: 4,
            title: "Theme Parks",
            description: "Fun day at Dreamworld theme park.",
          },
          {
            day: 5,
            title: "Departure",
            description: "Depart with amazing memories.",
          },
        ],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "dest-3",
    name: "India",
    slug: "india",
    description: "Experience the vibrant culture, ancient temples, and diverse landscapes of India.",
    image: "https://images.unsplash.com/photo-1582552938357-32b46cf3a655?w=800&h=600&fit=crop",
    tours: [
      {
        id: "tour-5",
        name: "Taj Mahal & Golden Triangle",
        slug: "taj-mahal-golden-triangle",
        description: "Explore India's most iconic monuments including the Taj Mahal, Delhi, and Agra.",
        duration: 6,
        price: 899,
        image: "https://images.unsplash.com/photo-1564507592333-c60657eea523?w=800&h=600&fit=crop",
        highlights: ["Taj Mahal", "Red Fort", "Jama Masjid", "Agra Fort"],
        includes: ["Hotel (5 nights)", "Breakfast & Lunch", "Guide services", "Monument tours"],
        itinerary: [
          {
            day: 1,
            title: "Delhi Arrival",
            description: "Arrive in Delhi and explore Old and New Delhi.",
          },
          {
            day: 2,
            title: "Delhi Monuments",
            description: "Visit Red Fort, Jama Masjid, and India Gate.",
          },
          {
            day: 3,
            title: "Travel to Agra",
            description: "Drive to Agra and settle in.",
          },
          {
            day: 4,
            title: "Taj Mahal",
            description: "Sunrise visit to the Taj Mahal.",
          },
          {
            day: 5,
            title: "Agra Fort & Local Culture",
            description: "Explore Agra Fort and experience local crafts.",
          },
          {
            day: 6,
            title: "Departure",
            description: "Return to Delhi and depart.",
          },
        ],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

// Get all data
export function getStoredData(): DashboardData {
  if (typeof window === "undefined") {
    // Server-side: return default data
    return { destinations: DEFAULT_DESTINATIONS };
  }

  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.error("Error reading from localStorage:", error);
  }

  return { destinations: DEFAULT_DESTINATIONS };
}

// Save all data
export function saveStoredData(data: DashboardData): void {
  if (typeof window === "undefined") return;

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (error) {
    console.error("Error saving to localStorage:", error);
  }
}

// Get a single destination by ID
export function getDestinationById(id: string): Destination | undefined {
  const data = getStoredData();
  return data.destinations.find((d) => d.id === id);
}

// Get a single destination by slug
export function getDestinationBySlug(slug: string): Destination | undefined {
  const data = getStoredData();
  return data.destinations.find((d) => d.slug === slug);
}

// Get a single tour by ID
export function getTourById(tourId: string): TourPackage | undefined {
  const data = getStoredData();
  for (const destination of data.destinations) {
    const tour = destination.tours.find((t) => t.id === tourId);
    if (tour) return tour;
  }
  return undefined;
}

// Get a single tour by slug
export function getTourBySlug(slug: string): TourPackage | undefined {
  const data = getStoredData();
  for (const destination of data.destinations) {
    const tour = destination.tours.find((t) => t.slug === slug);
    if (tour) return tour;
  }
  return undefined;
}

// Add a new destination
export function addDestination(destination: Omit<Destination, "id" | "createdAt" | "updatedAt">): Destination {
  const data = getStoredData();
  const newDestination: Destination = {
    ...destination,
    id: generateId(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  data.destinations.push(newDestination);
  saveStoredData(data);
  return newDestination;
}

// Update a destination
export function updateDestination(id: string, updates: Partial<Destination>): Destination | undefined {
  const data = getStoredData();
  const destinationIndex = data.destinations.findIndex((d) => d.id === id);

  if (destinationIndex === -1) return undefined;

  const updated: Destination = {
    ...data.destinations[destinationIndex],
    ...updates,
    id: data.destinations[destinationIndex].id,
    createdAt: data.destinations[destinationIndex].createdAt,
    updatedAt: new Date().toISOString(),
  };

  data.destinations[destinationIndex] = updated;
  saveStoredData(data);
  return updated;
}

// Delete a destination
export function deleteDestination(id: string): boolean {
  const data = getStoredData();
  const initialLength = data.destinations.length;
  data.destinations = data.destinations.filter((d) => d.id !== id);

  if (data.destinations.length < initialLength) {
    saveStoredData(data);
    return true;
  }
  return false;
}

// Add a tour to a destination
export function addTourToDestination(
  destinationId: string,
  tour: Omit<TourPackage, "id" | "createdAt" | "updatedAt">
): TourPackage | undefined {
  const data = getStoredData();
  const destination = data.destinations.find((d) => d.id === destinationId);

  if (!destination) return undefined;

  const newTour: TourPackage = {
    ...tour,
    id: generateId(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  destination.tours.push(newTour);
  saveStoredData(data);
  return newTour;
}

// Update a tour
export function updateTour(tourId: string, updates: Partial<TourPackage>): TourPackage | undefined {
  const data = getStoredData();

  for (const destination of data.destinations) {
    const tourIndex = destination.tours.findIndex((t) => t.id === tourId);
    if (tourIndex !== -1) {
      const updated: TourPackage = {
        ...destination.tours[tourIndex],
        ...updates,
        id: destination.tours[tourIndex].id,
        createdAt: destination.tours[tourIndex].createdAt,
        updatedAt: new Date().toISOString(),
      };
      destination.tours[tourIndex] = updated;
      saveStoredData(data);
      return updated;
    }
  }
  return undefined;
}

// Delete a tour
export function deleteTourFromDestination(destinationId: string, tourId: string): boolean {
  const data = getStoredData();
  const destination = data.destinations.find((d) => d.id === destinationId);

  if (!destination) return false;

  const initialLength = destination.tours.length;
  destination.tours = destination.tours.filter((t) => t.id !== tourId);

  if (destination.tours.length < initialLength) {
    saveStoredData(data);
    return true;
  }
  return false;
}

// Get all destinations
export function getAllDestinations(): Destination[] {
  return getStoredData().destinations;
}

// Reset to default data
export function resetToDefaultData(): void {
  saveStoredData({ destinations: DEFAULT_DESTINATIONS });
}
