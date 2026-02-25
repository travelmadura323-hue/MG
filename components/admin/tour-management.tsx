"use client";

import { useState } from "react";
import { useDashboard } from "@/lib/dashboard-context";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Plus, Edit2, Trash2 } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import TourForm from "./tour-form";
import type { TourPackage } from "@/lib/types";

interface TourManagementProps {
  destinationId: string;
  tours: TourPackage[];
}

export default function TourManagement({ destinationId, tours }: TourManagementProps) {
  const { deleteTour } = useDashboard();
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [editingTour, setEditingTour] = useState<TourPackage | null>(null);
  const [isAddingNewTour, setIsAddingNewTour] = useState(false);

  const handleDeleteTour = async () => {
    if (!deleteId) return;

    setIsDeleting(true);
    try {
      await deleteTour(destinationId, deleteId);
      setDeleteId(null);
    } catch (error) {
      console.error("Failed to delete tour:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Add Tour Button */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-[#191973]">Tour Packages</h2>
        <Dialog open={isAddingNewTour} onOpenChange={setIsAddingNewTour}>
          <DialogTrigger asChild>
            <Button className="bg-[#ec2127] hover:bg-red-700 text-white gap-2">
              <Plus size={20} />
              Add Tour Package
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Add New Tour Package</DialogTitle>
              <DialogDescription>Create a new tour package for this destination</DialogDescription>
            </DialogHeader>
            <TourForm
              destinationId={destinationId}
              onSuccess={() => setIsAddingNewTour(false)}
            />
          </DialogContent>
        </Dialog>
      </div>

      {/* Tours List */}
      {tours.length === 0 ? (
        <Card className="p-12 text-center">
          <p className="text-gray-500 mb-4">No tour packages for this destination</p>
          <Dialog open={isAddingNewTour} onOpenChange={setIsAddingNewTour}>
            <DialogTrigger asChild>
              <Button className="bg-[#ec2127] hover:bg-red-700 text-white">
                Create First Tour
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Add New Tour Package</DialogTitle>
                <DialogDescription>Create a new tour package for this destination</DialogDescription>
              </DialogHeader>
              <TourForm
                destinationId={destinationId}
                onSuccess={() => setIsAddingNewTour(false)}
              />
            </DialogContent>
          </Dialog>
        </Card>
      ) : (
        <div className="space-y-4">
          {tours.map((tour) => (
            <Card key={tour.id} className="p-6 hover:shadow-md transition-shadow">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {/* Image */}
                <div className="md:col-span-1">
                  {tour.image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={tour.image}
                      alt={tour.name}
                      className="w-full h-32 object-cover rounded-lg"
                    />
                  ) : (
                    <div className="w-full h-32 bg-gradient-to-br from-[#191973] to-[#ec2127] rounded-lg flex items-center justify-center text-white font-semibold text-center p-2">
                      {tour.name}
                    </div>
                  )}
                </div>

                {/* Details */}
                <div className="md:col-span-2 space-y-2">
                  <h3 className="text-lg font-bold text-[#191973]">{tour.name}</h3>
                  <p className="text-gray-600 text-sm line-clamp-2">{tour.description}</p>

                  <div className="flex gap-4 text-sm">
                    <div>
                      <span className="text-gray-600">Duration:</span>
                      <span className="ml-2 font-semibold text-[#191973]">{tour.duration} days</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Price:</span>
                      <span className="ml-2 font-semibold text-[#ec2127]">${tour.price}</span>
                    </div>
                  </div>

                  {/* Highlights Preview */}
                  {tour.highlights.length > 0 && (
                    <div className="text-sm">
                      <span className="text-gray-600">Highlights:</span>
                      <div className="flex gap-2 mt-1 flex-wrap">
                        {tour.highlights.slice(0, 3).map((highlight, idx) => (
                          <span key={idx} className="bg-blue-100 text-[#191973] px-2 py-1 rounded text-xs">
                            {highlight}
                          </span>
                        ))}
                        {tour.highlights.length > 3 && (
                          <span className="text-gray-500 text-xs">+{tour.highlights.length - 3} more</span>
                        )}
                      </div>
                    </div>
                  )}
                </div>

                {/* Actions */}
                <div className="md:col-span-1 flex flex-col gap-2">
                  <Dialog open={editingTour?.id === tour.id} onOpenChange={(open) => !open && setEditingTour(null)}>
                    <DialogTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        className="gap-2 border-[#191973] text-[#191973] hover:bg-blue-50 w-full"
                        onClick={() => setEditingTour(tour)}
                      >
                        <Edit2 size={16} />
                        Edit
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle>Edit Tour Package</DialogTitle>
                        <DialogDescription>Update tour details</DialogDescription>
                      </DialogHeader>
                      <TourForm
                        destinationId={destinationId}
                        tour={editingTour}
                        onSuccess={() => setEditingTour(null)}
                      />
                    </DialogContent>
                  </Dialog>

                  <Button
                    variant="destructive"
                    size="sm"
                    className="gap-2 w-full"
                    onClick={() => setDeleteId(tour.id)}
                  >
                    <Trash2 size={16} />
                    Delete
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteId !== null} onOpenChange={(open) => !open && setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Tour Package?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete this tour package.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="flex gap-4">
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteTour}
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
