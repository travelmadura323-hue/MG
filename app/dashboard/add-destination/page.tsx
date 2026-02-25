'use client'

import { useState, useEffect } from 'react'
import { useDashboardData } from '@/hooks/use-dashboard-data'
import { DashboardNav } from '@/components/dashboard-nav'
import { AddDestinationForm } from '@/components/add-destination-form'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Globe, TrendingUp } from 'lucide-react'

export default function AddDestinationPage() {
  const { data, isLoaded, addDestination, addRegion } = useDashboardData()
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

  const regions = Object.keys(data.destinations)
  const totalDestinations = Object.values(data.destinations).reduce((sum, dests) => sum + dests.length, 0)

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <DashboardNav />

      <div className="container mx-auto px-4 py-8 max-w-3xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2 flex items-center gap-2">
            <Globe className="w-8 h-8 text-green-600" />
            Add Destinations
          </h1>
          <p className="text-gray-600 mb-4">
            Expand your travel offerings by adding new cities and regions to your catalog
          </p>
          <div className="grid grid-cols-3 gap-4">
            <Card className="bg-white">
              <CardContent className="pt-6">
                <div className="text-2xl font-bold text-green-600">{regions.length}</div>
                <p className="text-sm text-gray-600">Regions</p>
              </CardContent>
            </Card>
            <Card className="bg-white">
              <CardContent className="pt-6">
                <div className="text-2xl font-bold text-blue-600">{totalDestinations}</div>
                <p className="text-sm text-gray-600">Destinations</p>
              </CardContent>
            </Card>
            <Card className="bg-white">
              <CardContent className="pt-6">
                <div className="text-2xl font-bold text-purple-600">
                  {Math.round((totalDestinations / regions) * 10) / 10}
                </div>
                <p className="text-sm text-gray-600">Avg per region</p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Main Form */}
        <AddDestinationForm
          regions={regions}
          destinations={data.destinations}
          onAddDestination={addDestination}
          onAddRegion={addRegion}
        />

        {/* Info Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center text-green-600 font-bold">1</div>
                Quick Add
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-gray-600">
              Add single destinations directly to existing regions for faster updates
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold">2</div>
                Bulk Import
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-gray-600">
              Create entire regions with multiple destinations at once
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
