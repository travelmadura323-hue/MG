"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useDashboard } from "@/lib/dashboard-context";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Save } from "lucide-react";
import Link from "next/link";
import TourManagement from "@/components/admin/tour-management";
import DestinationForm from "@/components/admin/destination-form";

export default function EditDestinationPage() {
  const params = useParams();
  const router = useRouter();
  const { getDestinationById, isLoading } = useDashboard();

  const destinationId = params.id as string;
  const destination = getDestinationById(destinationId);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8">
        <div className="max-w-4xl mx-auto">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-gray-300 rounded w-1/4"></div>
            <div className="h-96 bg-gray-300 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!destination) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8">
        <div className="max-w-4xl mx-auto">
          <Card className="p-8 text-center">
            <h2 className="text-2xl font-bold text-[#191973] mb-4">Destination Not Found</h2>
            <p className="text-gray-600 mb-6">The destination you're looking for doesn't exist.</p>
            <Link href="/admin/dashboard">
              <Button className="bg-[#ec2127] hover:bg-red-700 text-white">Back to Dashboard</Button>
            </Link>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex items-center gap-4">
          <Link href="/admin/dashboard">
            <Button variant="outline" size="icon" className="border-[#191973] text-[#191973] hover:bg-blue-50">
              <ArrowLeft size={20} />
            </Button>
          </Link>
          <div>
            <h1 className="text-4xl font-bold text-[#191973]">Edit Destination</h1>
            <p className="text-gray-600">{destination.name}</p>
          </div>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="details" className="space-y-6">
          <TabsList className="bg-white border-b">
            <TabsTrigger value="details" className="text-base">
              Details
            </TabsTrigger>
            <TabsTrigger value="tours" className="text-base">
              Tours ({destination.tours.length})
            </TabsTrigger>
          </TabsList>

          {/* Details Tab */}
          <TabsContent value="details" className="space-y-6">
            <DestinationForm destination={destination} />
          </TabsContent>

          {/* Tours Tab */}
          <TabsContent value="tours" className="space-y-6">
            <TourManagement destinationId={destinationId} tours={destination.tours} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
