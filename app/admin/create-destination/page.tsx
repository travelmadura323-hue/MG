"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useDashboard } from "@/lib/dashboard-context";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Save } from "lucide-react";
import Link from "next/link";
import { createSlug } from "@/lib/db";

export default function CreateDestinationPage() {
  const router = useRouter();
  const { addDestination } = useDashboard();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    image: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      if (!formData.name.trim()) {
        setError("Destination name is required");
        setIsLoading(false);
        return;
      }

      if (!formData.description.trim()) {
        setError("Description is required");
        setIsLoading(false);
        return;
      }

      if (!formData.image.trim()) {
        setError("Image URL is required");
        setIsLoading(false);
        return;
      }

      const newDestination = await addDestination({
        name: formData.name,
        slug: createSlug(formData.name),
        description: formData.description,
        image: formData.image,
        tours: [],
      });

      router.push(`/admin/edit-destination/${newDestination.id}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create destination");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex items-center gap-4">
          <Link href="/admin/dashboard">
            <Button variant="outline" size="icon" className="border-[#191973] text-[#191973] hover:bg-blue-50">
              <ArrowLeft size={20} />
            </Button>
          </Link>
          <div>
            <h1 className="text-4xl font-bold text-[#191973]">Create Destination</h1>
            <p className="text-gray-600">Add a new destination to your collection</p>
          </div>
        </div>

        {/* Form Card */}
        <Card className="p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Error Message */}
            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                {error}
              </div>
            )}

            {/* Name */}
            <div className="space-y-2">
              <Label htmlFor="name" className="text-base font-semibold text-[#191973]">
                Destination Name *
              </Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g., France, Australia, India"
                required
                disabled={isLoading}
                className="border-gray-300 focus:border-[#191973] focus:ring-[#191973]"
              />
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label htmlFor="description" className="text-base font-semibold text-[#191973]">
                Description *
              </Label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Write a compelling description about this destination..."
                required
                disabled={isLoading}
                rows={6}
                className="border-gray-300 focus:border-[#191973] focus:ring-[#191973] resize-none"
              />
              <p className="text-xs text-gray-500">
                This will appear on the destination page and in search results.
              </p>
            </div>

            {/* Image URL */}
            <div className="space-y-2">
              <Label htmlFor="image" className="text-base font-semibold text-[#191973]">
                Image URL *
              </Label>
              <Input
                id="image"
                name="image"
                type="url"
                value={formData.image}
                onChange={handleChange}
                placeholder="https://example.com/image.jpg"
                required
                disabled={isLoading}
                className="border-gray-300 focus:border-[#191973] focus:ring-[#191973]"
              />
              <p className="text-xs text-gray-500">
                Provide a direct link to a high-quality image (JPG, PNG, etc.)
              </p>

              {/* Image Preview */}
              {formData.image && (
                <div className="mt-4">
                  <p className="text-sm text-gray-600 mb-2">Preview:</p>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={formData.image}
                    alt="Preview"
                    onError={() => setError("Failed to load image. Please check the URL.")}
                    className="w-full h-64 object-cover rounded-lg border border-gray-300"
                  />
                </div>
              )}
            </div>

            {/* Submit Buttons */}
            <div className="flex gap-4 pt-6 border-t">
              <Link href="/admin/dashboard" className="flex-1">
                <Button type="button" variant="outline" className="w-full border-gray-300 text-gray-700">
                  Cancel
                </Button>
              </Link>
              <Button
                type="submit"
                disabled={isLoading}
                className="flex-1 bg-[#ec2127] hover:bg-red-700 text-white gap-2"
              >
                <Save size={18} />
                {isLoading ? "Creating..." : "Create Destination"}
              </Button>
            </div>

            {/* Info Box */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-sm text-[#191973] font-semibold mb-2">💡 Tip:</p>
              <p className="text-sm text-gray-700">
                After creating your destination, you'll be able to add tour packages to it. Each destination can have multiple tour options.
              </p>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
}
