'use client'

import { useState, useEffect } from 'react'
import { Tour, Destination, destinations as defaultDestinations } from '@/lib/data'

export interface DashboardData {
  destinations: Destination[]
  tours: Tour[]
}

const STORAGE_KEY = 'dashboard-data'

export function useDashboardData() {
  const [data, setData] = useState<DashboardData>({
    destinations: [],
    tours: [],
  })
  const [isLoaded, setIsLoaded] = useState(false)

  // Load data from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      try {
        const parsed = JSON.parse(stored)
        setData(parsed)
      } catch (error) {
        console.error('Failed to parse stored data:', error)
      }
    }
    setIsLoaded(true)
  }, [])

  // Save data to localStorage whenever it changes
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
    }
  }, [data, isLoaded])

  const addTour = (tour: Tour) => {
    setData((prev) => ({
      ...prev,
      tours: [...prev.tours, tour],
    }))
  }

  const removeTour = (slug: string) => {
    setData((prev) => ({
      ...prev,
      tours: prev.tours.filter((t) => t.slug !== slug),
    }))
  }

  const addDestination = (destination: Destination) => {
    setData((prev) => ({
      ...prev,
      destinations: [...prev.destinations, destination],
    }))
  }

  const removeDestination = (slug: string) => {
    setData((prev) => ({
      ...prev,
      destinations: prev.destinations.filter((d) => d.slug !== slug),
    }))
  }

  const getDestinationsByRegion = (region: string) => {
    return data.destinations.filter((d) => d.region === region)
  }

  const getAllRegions = () => {
    return Array.from(new Set(data.destinations.map((d) => d.region))).sort()
  }

  return {
    data,
    isLoaded,
    addTour,
    removeTour,
    addDestination,
    removeDestination,
    getDestinationsByRegion,
    getAllRegions,
  }
}
