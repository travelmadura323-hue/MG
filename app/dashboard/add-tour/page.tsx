'use client'

import { useState, useEffect } from 'react'
import { useDashboardData } from '@/hooks/use-dashboard-data'
import { DashboardNav } from '@/components/dashboard-nav'
import { AddTourForm } from '@/components/add-tour-form'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Package, MapPin, Users, DollarSign } from 'lucide-react'

export default function AddTourPage() {
  const { data, isLoaded, addTour } = useDashboardData()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted || !isLoaded) {
    return (
      <div className="min-h-screen bg-gray-50">
        <DashboardNav />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center text-gray-500">Loading...</div>
        </div>
      </div>
    )
  }

  const toursCount = data.tours.length
  const totalPrice = data.tours.reduce((sum, t) => {
    const price = parseInt(t.price.replace(/[^0-9]/g, '')) || 0
    return sum + price
  }, 0)
  const locations = new Set(data.tours.map((t) => t.location)).size

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <DashboardNav />

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2 flex items-center gap-2">
            <Package className="w-8 h-8 text-purple-600" />
            Create Tour Package
          </h1>
          <p className="text-gray-600 mb-4">
            Design and manage comprehensive tour packages with detailed itineraries and pricing
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card className="bg-white">
              <CardContent className="pt-4">
                <div className="text-2xl font-bold text-purple-600">{toursCount}</div>
                <p className="text-xs text-gray-600 mt-1">Total Tours</p>
              </CardContent>
            </Card>
            <Card className="bg-white">
              <CardContent className="pt-4">
                <div className="text-2xl font-bold text-blue-600">{locations}</div>
                <p className="text-xs text-gray-600 mt-1">Locations</p>
              </CardContent>
            </Card>
            <Card className="bg-white">
              <CardContent className="pt-4">
                <div className="text-xl font-bold text-green-600">
                  ${(totalPrice / (toursCount || 1)).toLocaleString()}
                </div>
                <p className="text-xs text-gray-600 mt-1">Avg Price</p>
              </CardContent>
            </Card>
            <Card className="bg-white">
              <CardContent className="pt-4">
                <div className="text-2xl font-bold text-orange-600">
                  {Math.round(
                    data.tours.reduce((sum, t) => sum + t.itinerary.length, 0) / (toursCount || 1) * 10
                  ) / 10}
                </div>
                <p className="text-xs text-gray-600 mt-1">Days Avg</p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Main Form */}
        <AddTourForm onSubmit={addTour} />

        {/* Info Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center text-purple-600">📋</div>
                Complete Information
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-gray-600">
              Include all details like itinerary, prices, inclusions, and exclusions
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">🗺️</div>
                Tailor Your Offering
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-gray-600">
              Create packages for different travel styles and customer segments
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center text-yellow-600">⭐</div>
                Best Seller Material
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-gray-600">
              Tour packages appear in popular tours and trending sections
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
