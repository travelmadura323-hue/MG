// Data types and models for destinations and tours

export interface TourPackage {
  id: string;
  name: string;
  slug: string;
  description: string;
  duration: number; // in days
  price: number;
  image: string;
  highlights: string[];
  includes: string[];
  itinerary: {
    day: number;
    title: string;
    description: string;
  }[];
  createdAt: string;
  updatedAt: string;
}

export interface Destination {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  tours: TourPackage[];
  createdAt: string;
  updatedAt: string;
}

export interface DashboardData {
  destinations: Destination[];
}

// Form data types
export interface DestinationFormData {
  name: string;
  description: string;
  image: string;
}

export interface TourPackageFormData {
  name: string;
  description: string;
  duration: number;
  price: number;
  image: string;
  highlights: string[];
  includes: string[];
  itinerary: {
    day: number;
    title: string;
    description: string;
  }[];
}
