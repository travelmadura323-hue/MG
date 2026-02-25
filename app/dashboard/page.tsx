'use client'

import { useDashboardData } from '@/hooks/use-dashboard-data'
import { DashboardNav } from '@/components/dashboard-nav'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Package, Map, Globe, TrendingUp, Trash2, Edit2 } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function DashboardPage() {
  const { data, isLoaded, removeTour } = useDashboardData()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted || !isLoaded) {
    return (
      <div className="min-h-screen bg-gray-50">
        <DashboardNav />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center text-gray-500">Loading dashboard...</div>
        </div>
      </div>
    )
  }

  const regionsCount = Object.keys(data.destinations).length
  const destinationsCount = Object.values(data.destinations).reduce(
    (sum, dests) => sum + dests.length,
    0
  )
  const toursCount = data.tours.length

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <DashboardNav />

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">Dashboard</h1>
              <p className="text-gray-600">Manage destinations and tour packages for your travel business</p>
            </div>
            <div className="text-sm text-gray-500">
              Last updated: {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Globe className="w-4 h-4 text-blue-600" />
                Total Regions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-blue-600">{regionsCount}</div>
              <p className="text-xs text-blue-600 mt-1">destination regions</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Map className="w-4 h-4 text-green-600" />
                Destinations
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-600">{destinationsCount}</div>
              <p className="text-xs text-green-600 mt-1">total destinations</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Package className="w-4 h-4 text-purple-600" />
                Tour Packages
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-purple-600">{toursCount}</div>
              <p className="text-xs text-purple-600 mt-1">custom packages</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-orange-600" />
                Avg Price
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-orange-600">
                {toursCount > 0
                  ? `$${Math.round(data.tours.reduce((sum, t) => {
                      const price = parseInt(t.price.replace(/[^0-9]/g, '')) || 0
                      return sum + price
                    }, 0) / toursCount).toLocaleString()}`
                  : '$0'}
              </div>
              <p className="text-xs text-orange-600 mt-1">per tour</p>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <Link href="/dashboard/add-destination">
            <Card className="cursor-pointer hover:shadow-lg transition-all hover:border-blue-300 bg-white">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Map className="w-5 h-5 text-blue-600" />
                  Add Destination
                </CardTitle>
                <CardDescription>Add new destinations to regions or create new regions</CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full bg-blue-600 hover:bg-blue-700">Add New Destination</Button>
              </CardContent>
            </Card>
          </Link>

          <Link href="/dashboard/add-tour">
            <Card className="cursor-pointer hover:shadow-lg transition-all hover:border-purple-300 bg-white">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Package className="w-5 h-5 text-purple-600" />
                  Add Tour Package
                </CardTitle>
                <CardDescription>Create new tour packages with itinerary and pricing</CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full bg-purple-600 hover:bg-purple-700">Add New Tour</Button>
              </CardContent>
            </Card>
          </Link>
        </div>

        {/* Destinations Section */}
        <Card className="mb-8">
          <CardHeader className="bg-gradient-to-r from-green-50 to-blue-50 border-b">
            <CardTitle className="flex items-center gap-2">
              <Globe className="w-5 h-5 text-green-600" />
              Destinations by Region
            </CardTitle>
            <CardDescription>All available destinations in your system ({destinationsCount} total)</CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-6">
              {Object.entries(data.destinations).map(([region, destinations]) => (
                <div key={region} className="border-l-4 border-blue-500 pl-4">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold text-lg text-gray-900">{region}</h3>
                    <Badge variant="outline" className="bg-blue-50">
                      {destinations.length} destinations
                    </Badge>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {destinations.sort().map((dest) => (
                      <Badge key={dest} variant="secondary" className="bg-gray-100 text-gray-800">
                        {dest}
                      </Badge>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Tour Packages Section */}
        {toursCount > 0 && (
          <Card>
            <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50 border-b">
              <CardTitle className="flex items-center gap-2">
                <Package className="w-5 h-5 text-purple-600" />
                Custom Tour Packages
              </CardTitle>
              <CardDescription>Tour packages you have created ({toursCount} total)</CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-4">
                {data.tours.map((tour) => (
                  <div
                    key={tour.slug}
                    className="border rounded-lg p-4 hover:shadow-md transition-shadow bg-gradient-to-r from-white to-purple-50"
                  >
                    <div className="flex justify-between items-start gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold text-lg">{tour.title}</h3>
                          <Badge className="bg-purple-100 text-purple-800">{tour.slug}</Badge>
                        </div>
                        <p className="text-sm text-gray-600 mb-3">{tour.location}</p>
                        <div className="flex flex-wrap gap-4 text-sm">
                          <span className="flex items-center gap-1">
                            <span className="text-gray-500">Duration:</span>
                            <span className="font-medium">{tour.duration}</span>
                          </span>
                          <span className="flex items-center gap-1">
                            <span className="text-gray-500">Travelers:</span>
                            <span className="font-medium">{tour.travelers}</span>
                          </span>
                          <span className="text-green-600 font-bold">{tour.price}</span>
                        </div>
                        <div className="mt-2 text-xs text-gray-500">
                          <span>Days: {tour.itinerary.length}</span> • 
                          <span> Includes {tour.included.length} items</span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-gray-500 hover:bg-gray-100"
                          title="Delete tour"
                        >
                          <Edit2 className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeTour(tour.slug)}
                          className="text-red-600 hover:bg-red-50"
                          title="Delete tour"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {toursCount === 0 && (
          <Card className="text-center py-12">
            <CardContent>
              <Package className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <h3 className="font-semibold text-gray-700 mb-2">No Custom Tour Packages Yet</h3>
              <p className="text-gray-500 mb-4">Start by adding your first tour package</p>
              <Link href="/dashboard/add-tour">
                <Button className="bg-purple-600 hover:bg-purple-700">Add First Tour Package</Button>
              </Link>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
