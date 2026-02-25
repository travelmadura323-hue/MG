"use client";

import { useState } from "react";
import Link from "next/link";
import { useDashboard } from "@/lib/dashboard-context";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Plus, Edit2, Trash2, ChevronRight } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export default function DashboardPage() {
  const { destinations, deleteDestination, isLoading } = useDashboard();
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (!deleteId) return;

    setIsDeleting(true);
    try {
      await deleteDestination(deleteId);
      setDeleteId(null);
    } catch (error) {
      console.error("Failed to delete destination:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8">
        <div className="max-w-7xl mx-auto">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-300 rounded w-1/4 mb-8"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-96 bg-gray-300 rounded-lg"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-[#191973] mb-2">Admin Dashboard</h1>
            <p className="text-gray-600">Manage destinations and tour packages</p>
          </div>
          <Link href="/admin/create-destination">
            <Button className="bg-[#ec2127] hover:bg-red-700 text-white gap-2">
              <Plus size={20} />
              Add Destination
            </Button>
          </Link>
        </div>

        {/* Destinations Grid */}
        {destinations.length === 0 ? (
          <Card className="p-12 text-center">
            <p className="text-gray-500 mb-4">No destinations found</p>
            <Link href="/admin/create-destination">
              <Button className="bg-[#ec2127] hover:bg-red-700 text-white">
                Create First Destination
              </Button>
            </Link>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {destinations.map((destination) => (
              <Card key={destination.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                {/* Image */}
                <div className="relative h-48 bg-gray-200 overflow-hidden">
                  {destination.image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={destination.image}
                      alt={destination.name}
                      className="w-full h-full object-cover hover:scale-105 transition-transform"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#191973] to-[#ec2127]">
                      <span className="text-white text-lg font-semibold">{destination.name}</span>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-6">
                  <h2 className="text-xl font-bold text-[#191973] mb-2">{destination.name}</h2>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">{destination.description}</p>

                  {/* Tour Count Badge */}
                  <div className="mb-4 inline-block bg-blue-100 text-[#191973] px-3 py-1 rounded-full text-sm font-semibold">
                    {destination.tours.length} tour{destination.tours.length !== 1 ? "s" : ""}
                  </div>

                  {/* Tour List Preview */}
                  {destination.tours.length > 0 && (
                    <div className="mb-4 space-y-2 max-h-32 overflow-y-auto">
                      {destination.tours.slice(0, 3).map((tour) => (
                        <div key={tour.id} className="text-xs text-gray-600 flex items-center">
                          <span className="inline-block w-1.5 h-1.5 bg-[#ec2127] rounded-full mr-2"></span>
                          {tour.name}
                        </div>
                      ))}
                      {destination.tours.length > 3 && (
                        <div className="text-xs text-gray-500 italic">+{destination.tours.length - 3} more tours</div>
                      )}
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex gap-2 pt-4 border-t">
                    <Link href={`/admin/edit-destination/${destination.id}`} className="flex-1">
                      <Button variant="outline" size="sm" className="w-full gap-2 border-[#191973] text-[#191973] hover:bg-blue-50">
                        <Edit2 size={16} />
                        Edit
                      </Button>
                    </Link>
                    <Button
                      variant="destructive"
                      size="sm"
                      className="flex-1 gap-2"
                      onClick={() => setDeleteId(destination.id)}
                    >
                      <Trash2 size={16} />
                      Delete
                    </Button>
                    <Link href={`/admin/edit-destination/${destination.id}`} className="flex-1">
                      <Button size="sm" className="w-full bg-[#ec2127] hover:bg-red-700 text-white gap-2">
                        <ChevronRight size={16} />
                        Tours
                      </Button>
                    </Link>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteId !== null} onOpenChange={(open) => !open && setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Destination?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the destination and all associated tour packages.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="flex gap-4">
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              disabled={isDeleting}
              className="bg-red-600 hover:bg-red-700"
            >
              {isDeleting ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
