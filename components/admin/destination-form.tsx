"use client";

import { useState } from "react";
import { useDashboard } from "@/lib/dashboard-context";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Save } from "lucide-react";
import type { Destination } from "@/lib/types";

interface DestinationFormProps {
  destination: Destination;
}

export default function DestinationForm({ destination }: DestinationFormProps) {
  const { updateDestination } = useDashboard();
  const [isLoading, setIsLoading] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const [formData, setFormData] = useState({
    name: destination.name,
    description: destination.description,
    image: destination.image,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setIsSaved(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await updateDestination(destination.id, {
        name: formData.name,
        description: formData.description,
        image: formData.image,
        slug: formData.name
          .toLowerCase()
          .trim()
          .replace(/[^\w\s-]/g, "")
          .replace(/\s+/g, "-"),
      });

      setIsSaved(true);
      setTimeout(() => setIsSaved(false), 3000);
    } catch (error) {
      console.error("Failed to update destination:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="p-8">
      <form onSubmit={handleSubmit} className="space-y-6">
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
            placeholder="e.g., France"
            required
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
            rows={6}
            className="border-gray-300 focus:border-[#191973] focus:ring-[#191973] resize-none"
          />
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
            className="border-gray-300 focus:border-[#191973] focus:ring-[#191973]"
          />
          {formData.image && (
            <div className="mt-4">
              <p className="text-sm text-gray-600 mb-2">Preview:</p>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={formData.image}
                alt={formData.name}
                className="w-full h-64 object-cover rounded-lg border border-gray-300"
              />
            </div>
          )}
        </div>

        {/* Submit Button */}
        <div className="flex gap-4 pt-6 border-t">
          <Button
            type="submit"
            disabled={isLoading}
            className="bg-[#ec2127] hover:bg-red-700 text-white gap-2 flex-1"
          >
            <Save size={18} />
            {isLoading ? "Saving..." : "Save Changes"}
          </Button>

          {isSaved && (
            <div className="flex-1 bg-green-100 text-green-800 rounded-lg flex items-center justify-center font-semibold">
              ✓ Saved Successfully
            </div>
          )}
        </div>
      </form>
    </Card>
  );
}
