'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { AlertCircle, Loader2, Plus, Trash2, CheckCircle } from 'lucide-react'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

interface AddDestinationFormProps {
  regions: string[]
  destinations: Record<string, string[]>
  onAddDestination: (region: string, destination: string) => void
  onAddRegion: (region: string, destinations: string[]) => void
}

export function AddDestinationForm({
  regions,
  destinations,
  onAddDestination,
  onAddRegion,
}: AddDestinationFormProps) {
  const [mode, setMode] = useState<'add-to-region' | 'new-region'>('add-to-region')
  const [selectedRegion, setSelectedRegion] = useState(regions[0] || '')
  const [destinationName, setDestinationName] = useState('')
  const [newRegion, setNewRegion] = useState('')
  const [newDestinations, setNewDestinations] = useState<string[]>([''])
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [success, setSuccess] = useState('')

  const handleAddDestination = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSuccess('')

    if (!selectedRegion || !destinationName.trim()) {
      setError('Please select a region and enter a destination name')
      return
    }

    setIsLoading(true)
    try {
      onAddDestination(selectedRegion, destinationName)
      setDestinationName('')
      setSuccess(`✓ ${destinationName} has been added to ${selectedRegion}`)
      setTimeout(() => setSuccess(''), 4000)
    } finally {
      setIsLoading(false)
    }
  }

  const handleAddRegion = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSuccess('')

    if (!newRegion.trim()) {
      setError('Please enter a region name')
      return
    }

    const validDestinations = newDestinations.filter((d) => d.trim())
    if (validDestinations.length === 0) {
      setError('Please add at least one destination')
      return
    }

    setIsLoading(true)
    try {
      onAddRegion(newRegion, validDestinations)
      setNewRegion('')
      setNewDestinations([''])
      setSuccess(`✓ Region "${newRegion}" with ${validDestinations.length} destinations created successfully!`)
      setTimeout(() => setSuccess(''), 4000)
    } finally {
      setIsLoading(false)
    }
  }

  const handleAddDestinationField = () => {
    setNewDestinations([...newDestinations, ''])
  }

  const handleRemoveDestinationField = (index: number) => {
    setNewDestinations(newDestinations.filter((_, i) => i !== index))
  }

  const handleDestinationFieldChange = (index: number, value: string) => {
    const updated = [...newDestinations]
    updated[index] = value
    setNewDestinations(updated)
  }

  return (
    <Card className="w-full">
      <CardHeader className="bg-gradient-to-r from-green-50 to-blue-50 border-b">
        <CardTitle>Add Destinations</CardTitle>
        <CardDescription>Expand your destination portfolio by adding new cities and regions</CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        <Tabs value={mode} onValueChange={(v) => setMode(v as typeof mode)}>
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="add-to-region">Add to Existing Region</TabsTrigger>
            <TabsTrigger value="new-region">Create New Region</TabsTrigger>
          </TabsList>

          <TabsContent value="add-to-region" className="space-y-4">
            <form onSubmit={handleAddDestination} className="space-y-4">
              {error && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              {success && (
                <Alert className="bg-green-50 border-green-200">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <AlertDescription className="text-green-800 font-medium">{success}</AlertDescription>
                </Alert>
              )}

              <div>
                <Label htmlFor="region" className="font-semibold">
                  Select Region *
                </Label>
                <select
                  id="region"
                  value={selectedRegion}
                  onChange={(e) => setSelectedRegion(e.target.value)}
                  className="w-full px-4 py-2.5 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white"
                >
                  <option value="">Choose a region...</option>
                  {regions.sort().map((region) => (
                    <option key={region} value={region}>
                      {region} ({destinations[region]?.length || 0} destinations)
                    </option>
                  ))}
                </select>
              </div>

              {selectedRegion && (
                <div className="bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 p-4 rounded-lg">
                  <p className="text-sm font-semibold text-gray-700 mb-3">
                    Current destinations in <span className="text-green-600">{selectedRegion}</span>:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {destinations[selectedRegion]?.sort().map((dest) => (
                      <span
                        key={dest}
                        className="bg-green-100 text-green-800 text-sm px-3 py-1.5 rounded-full font-medium"
                      >
                        ✓ {dest}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div>
                <Label htmlFor="destination" className="font-semibold">
                  Destination Name *
                </Label>
                <Input
                  id="destination"
                  value={destinationName}
                  onChange={(e) => setDestinationName(e.target.value)}
                  placeholder="e.g., Goa, Maldives, Bangkok"
                  className="mt-2"
                  autoFocus
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold"
                disabled={isLoading}
              >
                {isLoading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                {isLoading ? 'Adding...' : 'Add Destination'}
              </Button>
            </form>
          </TabsContent>

          <TabsContent value="new-region" className="space-y-4">
            <form onSubmit={handleAddRegion} className="space-y-4">
              {error && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              {success && (
                <Alert className="bg-green-50 border-green-200">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <AlertDescription className="text-green-800 font-medium">{success}</AlertDescription>
                </Alert>
              )}

              <div>
                <Label htmlFor="new-region" className="font-semibold">
                  Region Name *
                </Label>
                <Input
                  id="new-region"
                  value={newRegion}
                  onChange={(e) => setNewRegion(e.target.value)}
                  placeholder="e.g., South America, Caribbean, Scandinavia"
                  className="mt-2"
                  autoFocus
                />
                <p className="text-xs text-gray-500 mt-1">
                  This will create a new region grouping in your destination list
                </p>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <Label className="font-semibold">Destinations in this Region *</Label>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={handleAddDestinationField}
                    className="border-green-300 text-green-600 hover:bg-green-50"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Destination
                  </Button>
                </div>
                <p className="text-xs text-gray-500">Add multiple destinations that belong to this region</p>

                <div className="space-y-2">
                  {newDestinations.map((dest, index) => (
                    <div key={index} className="flex gap-2">
                      <Input
                        value={dest}
                        onChange={(e) =>
                          handleDestinationFieldChange(index, e.target.value)
                        }
                        placeholder={`Destination ${index + 1}`}
                        className="bg-blue-50 border-blue-200"
                      />
                      {index > 0 && (
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => handleRemoveDestinationField(index)}
                          className="text-red-600 hover:bg-red-50"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <Button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold"
                disabled={isLoading}
              >
                {isLoading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                {isLoading ? 'Creating Region...' : 'Create New Region'}
              </Button>
            </form>
          </TabsContent>
        </Tabs>

        <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <h4 className="font-semibold text-blue-900 mb-2">💡 Quick Tips</h4>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• Use tab "Add to Existing" to quickly add a destination to a region</li>
            <li>• Use tab "Create New" to establish a new region with multiple destinations</li>
            <li>• Organize destinations by geography, continent, or travel distance</li>
            <li>• Keep destination names clear and consistent with global naming conventions</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  )
}
