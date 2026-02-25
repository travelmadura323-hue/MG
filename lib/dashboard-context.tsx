"use client";

import React, { createContext, useContext, useState, useCallback, ReactNode } from "react";
import type { Destination, TourPackage } from "@/lib/types";
import {
  getStoredData,
  saveStoredData,
  addDestination as dbAddDestination,
  updateDestination as dbUpdateDestination,
  deleteDestination as dbDeleteDestination,
  addTourToDestination as dbAddTourToDestination,
  updateTour as dbUpdateTour,
  deleteTourFromDestination as dbDeleteTourFromDestination,
  getAllDestinations,
  getDestinationById as dbGetDestinationById,
  getTourById as dbGetTourById,
} from "@/lib/db";

interface DashboardContextType {
  destinations: Destination[];
  isLoading: boolean;
  error: string | null;

  // Destination operations
  addDestination: (destination: Omit<Destination, "id" | "createdAt" | "updatedAt">) => Promise<Destination>;
  updateDestination: (id: string, updates: Partial<Destination>) => Promise<Destination | undefined>;
  deleteDestination: (id: string) => Promise<boolean>;
  getDestinationById: (id: string) => Destination | undefined;

  // Tour operations
  addTour: (destinationId: string, tour: Omit<TourPackage, "id" | "createdAt" | "updatedAt">) => Promise<TourPackage | undefined>;
  updateTour: (tourId: string, updates: Partial<TourPackage>) => Promise<TourPackage | undefined>;
  deleteTour: (destinationId: string, tourId: string) => Promise<boolean>;
  getTourById: (tourId: string) => TourPackage | undefined;

  // Refresh data
  refreshData: () => Promise<void>;
}

const DashboardContext = createContext<DashboardContextType | undefined>(undefined);

export function DashboardProvider({ children }: { children: ReactNode }) {
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Initial load and refresh
  const refreshData = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = getAllDestinations();
      setDestinations(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Initialize data on mount
  React.useEffect(() => {
    refreshData();
  }, [refreshData]);

  // Destination operations
  const addDestination = useCallback(
    async (destination: Omit<Destination, "id" | "createdAt" | "updatedAt">) => {
      try {
        const newDestination = dbAddDestination(destination);
        setDestinations((prev) => [...prev, newDestination]);
        return newDestination;
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to add destination");
        throw err;
      }
    },
    []
  );

  const updateDestination = useCallback(async (id: string, updates: Partial<Destination>) => {
    try {
      const updated = dbUpdateDestination(id, updates);
      if (updated) {
        setDestinations((prev) => prev.map((d) => (d.id === id ? updated : d)));
      }
      return updated;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update destination");
      throw err;
    }
  }, []);

  const deleteDestination = useCallback(async (id: string) => {
    try {
      const success = dbDeleteDestination(id);
      if (success) {
        setDestinations((prev) => prev.filter((d) => d.id !== id));
      }
      return success;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete destination");
      throw err;
    }
  }, []);

  const getDestinationById = useCallback(
    (id: string) => {
      return destinations.find((d) => d.id === id);
    },
    [destinations]
  );

  // Tour operations
  const addTour = useCallback(
    async (destinationId: string, tour: Omit<TourPackage, "id" | "createdAt" | "updatedAt">) => {
      try {
        const newTour = dbAddTourToDestination(destinationId, tour);
        if (newTour) {
          setDestinations((prev) =>
            prev.map((d) =>
              d.id === destinationId
                ? {
                    ...d,
                    tours: [...d.tours, newTour],
                  }
                : d
            )
          );
        }
        return newTour;
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to add tour");
        throw err;
      }
    },
    []
  );

  const updateTour = useCallback(async (tourId: string, updates: Partial<TourPackage>) => {
    try {
      const updated = dbUpdateTour(tourId, updates);
      if (updated) {
        setDestinations((prev) =>
          prev.map((d) => ({
            ...d,
            tours: d.tours.map((t) => (t.id === tourId ? updated : t)),
          }))
        );
      }
      return updated;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update tour");
      throw err;
    }
  }, []);

  const deleteTour = useCallback(async (destinationId: string, tourId: string) => {
    try {
      const success = dbDeleteTourFromDestination(destinationId, tourId);
      if (success) {
        setDestinations((prev) =>
          prev.map((d) =>
            d.id === destinationId
              ? {
                  ...d,
                  tours: d.tours.filter((t) => t.id !== tourId),
                }
              : d
          )
        );
      }
      return success;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete tour");
      throw err;
    }
  }, []);

  const getTourById = useCallback(
    (tourId: string) => {
      for (const destination of destinations) {
        const tour = destination.tours.find((t) => t.id === tourId);
        if (tour) return tour;
      }
      return undefined;
    },
    [destinations]
  );

  const value: DashboardContextType = {
    destinations,
    isLoading,
    error,
    addDestination,
    updateDestination,
    deleteDestination,
    getDestinationById,
    addTour,
    updateTour,
    deleteTour,
    getTourById,
    refreshData,
  };

  return <DashboardContext.Provider value={value}>{children}</DashboardContext.Provider>;
}

export function useDashboard() {
  const context = useContext(DashboardContext);
  if (context === undefined) {
    throw new Error("useDashboard must be used within a DashboardProvider");
  }
  return context;
}
