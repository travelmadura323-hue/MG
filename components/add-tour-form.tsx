'use client'

import { useState } from 'react'
import { Tour } from '@/lib/data'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { AlertCircle, Loader2, Plus, Trash2, CheckCircle } from 'lucide-react'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

interface AddTourFormProps {
  onSubmit: (tour: Tour) => void
}

interface ItineraryItem {
  day: string
  title: string
  description: string
}

export function AddTourForm({ onSubmit }: AddTourFormProps) {
  const [title, setTitle] = useState('')
  const [slug, setSlug] = useState('')
  const [location, setLocation] = useState('')
  const [duration, setDuration] = useState('')
  const [price, setPrice] = useState('')
  const [image, setImage] = useState('')
  const [description, setDescription] = useState('')
  const [minAge, setMinAge] = useState('')
  const [travelers, setTravelers] = useState('')
  const [startingPlace, setStartingPlace] = useState('')
  const [overview, setOverview] = useState('')
  const [itinerary, setItinerary] = useState<ItineraryItem[]>([
    { day: 'Day 1', title: '', description: '' },
  ])
  const [included, setIncluded] = useState<string[]>([''])
  const [excluded, setExcluded] = useState<string[]>([''])
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleAddItinerary = () => {
    setItinerary([
      ...itinerary,
      { day: `Day ${itinerary.length + 1}`, title: '', description: '' },
    ])
  }

  const handleRemoveItinerary = (index: number) => {
    setItinerary(itinerary.filter((_, i) => i !== index))
  }

  const handleItineraryChange = (
    index: number,
    field: keyof ItineraryItem,
    value: string
  ) => {
    const updated = [...itinerary]
    updated[index][field] = value
    setItinerary(updated)
  }

  const handleAddIncluded = () => {
    setIncluded([...included, ''])
  }

  const handleRemoveIncluded = (index: number) => {
    setIncluded(included.filter((_, i) => i !== index))
  }

  const handleIncludedChange = (index: number, value: string) => {
    const updated = [...included]
    updated[index] = value
    setIncluded(updated)
  }

  const handleAddExcluded = () => {
    setExcluded([...excluded, ''])
  }

  const handleRemoveExcluded = (index: number) => {
    setExcluded(excluded.filter((_, i) => i !== index))
  }

  const handleExcludedChange = (index: number, value: string) => {
    const updated = [...excluded]
    updated[index] = value
    setExcluded(updated)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSuccess(false)

    // Validation
    if (!title || !slug || !location || !duration || !price) {
      setError('Please fill in all required fields (marked with *)')
      return
    }

    if (!itinerary.some((i) => i.title && i.description)) {
      setError('Please add at least one complete itinerary day with title and description')
      return
    }

    setIsLoading(true)

    try {
      const newTour: Tour = {
        slug,
        title,
        location,
        duration,
        price,
        image,
        description,
        minAge,
        travelers,
        startingPlace,
        overview,
        itinerary: itinerary.filter((i) => i.title && i.description),
        included: included.filter((i) => i.trim()),
        excluded: excluded.filter((i) => i.trim()),
      }

      onSubmit(newTour)

      // Reset form
      setTitle('')
      setSlug('')
      setLocation('')
      setDuration('')
      setPrice('')
      setImage('')
      setDescription('')
      setMinAge('')
      setTravelers('')
      setStartingPlace('')
      setOverview('')
      setItinerary([{ day: 'Day 1', title: '', description: '' }])
      setIncluded([''])
      setExcluded([''])
      setSuccess(true)

      setTimeout(() => setSuccess(false), 5000)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="w-full">
      <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50 border-b">
        <CardTitle>Create New Tour Package</CardTitle>
        <CardDescription>Fill in all details to create a complete tour package with itinerary</CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {success && (
            <Alert className="bg-green-50 border-green-200">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <AlertDescription className="text-green-800 font-medium">
                ✓ Tour package "{title}" has been added successfully!
              </AlertDescription>
            </Alert>
          )}

          <Tabs defaultValue="basic" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="basic">Basic Info</TabsTrigger>
              <TabsTrigger value="details">Details</TabsTrigger>
              <TabsTrigger value="itinerary">Itinerary</TabsTrigger>
              <TabsTrigger value="inclusions">Inclusions</TabsTrigger>
            </TabsList>

            {/* Tab 1: Basic Information */}
            <TabsContent value="basic" className="space-y-4 mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="title" className="font-semibold">Tour Title *</Label>
                  <Input
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g., Enchanting Bali Getaway"
                    className="mt-2"
                  />
                  <p className="text-xs text-gray-500 mt-1">The main name of your tour</p>
                </div>
                <div>
                  <Label htmlFor="slug" className="font-semibold">URL Slug *</Label>
                  <Input
                    id="slug"
                    value={slug}
                    onChange={(e) => setSlug(e.target.value)}
                    placeholder="e.g., enchanting-bali"
                    className="mt-2"
                  />
                  <p className="text-xs text-gray-500 mt-1">URL-friendly identifier (no spaces, lowercase)</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="location" className="font-semibold">Location *</Label>
                  <Input
                    id="location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="e.g., Bali, Indonesia"
                    className="mt-2"
                  />
                </div>
                <div>
                  <Label htmlFor="duration" className="font-semibold">Duration *</Label>
                  <Input
                    id="duration"
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    placeholder="e.g., 7 Days / 6 Nights"
                    className="mt-2"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="price" className="font-semibold">Price *</Label>
                  <Input
                    id="price"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder="e.g., $1,299"
                    className="mt-2"
                  />
                  <p className="text-xs text-gray-500 mt-1">Price per person</p>
                </div>
                <div>
                  <Label htmlFor="image" className="font-semibold">Image URL</Label>
                  <Input
                    id="image"
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                    placeholder="e.g., /images/tours/bali.jpg"
                    className="mt-2"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="description" className="font-semibold">Short Description</Label>
                <Textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Brief 1-2 line description for listings"
                  rows={2}
                  className="mt-2"
                />
              </div>
            </TabsContent>

            {/* Tab 2: Details */}
            <TabsContent value="details" className="space-y-4 mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="minAge" className="font-semibold">Minimum Age</Label>
                  <Input
                    id="minAge"
                    value={minAge}
                    onChange={(e) => setMinAge(e.target.value)}
                    placeholder="e.g., 10"
                    className="mt-2"
                  />
                </div>
                <div>
                  <Label htmlFor="travelers" className="font-semibold">Group Size</Label>
                  <Input
                    id="travelers"
                    value={travelers}
                    onChange={(e) => setTravelers(e.target.value)}
                    placeholder="e.g., 2-15"
                    className="mt-2"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="startingPlace" className="font-semibold">Starting Place</Label>
                <Input
                  id="startingPlace"
                  value={startingPlace}
                  onChange={(e) => setStartingPlace(e.target.value)}
                  placeholder="e.g., Ngurah Rai International Airport"
                  className="mt-2"
                />
              </div>

              <div>
                <Label htmlFor="overview" className="font-semibold">Detailed Overview</Label>
                <Textarea
                  id="overview"
                  value={overview}
                  onChange={(e) => setOverview(e.target.value)}
                  placeholder="Comprehensive description of the entire tour experience"
                  rows={5}
                  className="mt-2"
                />
                <p className="text-xs text-gray-500 mt-1">This will be shown on the tour detail page</p>
              </div>
            </TabsContent>

            {/* Tab 3: Itinerary */}
            <TabsContent value="itinerary" className="space-y-4 mt-6">
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <Label className="font-semibold">Daily Itinerary *</Label>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={handleAddItinerary}
                    className="border-purple-300 text-purple-600 hover:bg-purple-50"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Day
                  </Button>
                </div>
                <p className="text-xs text-gray-500">Add at least one complete day with title and description</p>

                <div className="space-y-3">
                  {itinerary.map((item, index) => (
                    <div key={index} className="border-l-4 border-purple-300 bg-purple-50 rounded-lg p-4 space-y-3">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 items-end">
                        <div>
                          <Label htmlFor={`day-${index}`} className="text-xs font-semibold">
                            Day
                          </Label>
                          <Input
                            id={`day-${index}`}
                            value={item.day}
                            onChange={(e) =>
                              handleItineraryChange(index, 'day', e.target.value)
                            }
                            placeholder="Day 1"
                            className="mt-1"
                          />
                        </div>
                        <div className="md:col-span-2">
                          <Label htmlFor={`itinerary-title-${index}`} className="text-xs font-semibold">
                            Activity Title
                          </Label>
                          <div className="flex gap-2 mt-1">
                            <Input
                              id={`itinerary-title-${index}`}
                              value={item.title}
                              onChange={(e) =>
                                handleItineraryChange(index, 'title', e.target.value)
                              }
                              placeholder="e.g., Arrival & Welcome Dinner"
                            />
                            {index > 0 && (
                              <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                onClick={() => handleRemoveItinerary(index)}
                                className="text-red-600 hover:bg-red-50"
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                      <div>
                        <Label htmlFor={`itinerary-desc-${index}`} className="text-xs font-semibold">
                          Description
                        </Label>
                        <Textarea
                          id={`itinerary-desc-${index}`}
                          value={item.description}
                          onChange={(e) =>
                            handleItineraryChange(index, 'description', e.target.value)
                          }
                          placeholder="Detailed description of activities for this day"
                          rows={3}
                          className="mt-1"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>

            {/* Tab 4: Inclusions & Exclusions */}
            <TabsContent value="inclusions" className="space-y-6 mt-6">
              {/* Included */}
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <Label className="font-semibold">What's Included</Label>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={handleAddIncluded}
                    className="border-green-300 text-green-600 hover:bg-green-50"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Item
                  </Button>
                </div>
                <div className="space-y-2">
                  {included.map((item, index) => (
                    <div key={index} className="flex gap-2">
                      <div className="flex-1">
                        <Input
                          value={item}
                          onChange={(e) => handleIncludedChange(index, e.target.value)}
                          placeholder="e.g., Hotel accommodation"
                          className="bg-green-50 border-green-200"
                        />
                      </div>
                      {index > 0 && (
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => handleRemoveIncluded(index)}
                          className="text-red-600 hover:bg-red-50"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Excluded */}
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <Label className="font-semibold">What's Excluded</Label>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={handleAddExcluded}
                    className="border-red-300 text-red-600 hover:bg-red-50"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Item
                  </Button>
                </div>
                <div className="space-y-2">
                  {excluded.map((item, index) => (
                    <div key={index} className="flex gap-2">
                      <div className="flex-1">
                        <Input
                          value={item}
                          onChange={(e) => handleExcludedChange(index, e.target.value)}
                          placeholder="e.g., Travel insurance"
                          className="bg-red-50 border-red-200"
                        />
                      </div>
                      {index > 0 && (
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => handleRemoveExcluded(index)}
                          className="text-red-600 hover:bg-red-50"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>
          </Tabs>

          <div className="flex gap-4 pt-6 border-t">
            <Button
              type="submit"
              className="flex-1 bg-purple-600 hover:bg-purple-700 text-white font-semibold"
              disabled={isLoading}
            >
              {isLoading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
              {isLoading ? 'Creating Tour...' : 'Create Tour Package'}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
