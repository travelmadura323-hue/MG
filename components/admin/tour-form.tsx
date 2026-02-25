"use client";

import { useEffect, useState } from "react";
import type { TourPackage } from "@/lib/types";

interface TourFormProps {
  destinationId: string;
  tour?: TourPackage | null;
  onSuccess?: () => void;
}

export default function TourForm({ destinationId, tour, onSuccess }: TourFormProps) {
  const [name, setName] = useState(tour?.name ?? "");
  const [description, setDescription] = useState(tour?.description ?? "");
  const [duration, setDuration] = useState<number>(tour?.duration ?? 1);
  const [price, setPrice] = useState<number>(tour?.price ?? 0);
  const [highlights, setHighlights] = useState<string>((tour?.highlights ?? []).join(", "));
  const [image, setImage] = useState(tour?.image ?? "");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (tour) {
      setName(tour.name);
      setDescription(tour.description);
      setDuration(tour.duration);
      setPrice(tour.price);
      setHighlights(tour.highlights.join(", "));
      setImage(tour.image ?? "");
    }
  }, [tour]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    const payload = {
      name,
      description,
      duration,
      price,
      highlights: highlights.split(",").map(h => h.trim()).filter(Boolean),
      image: image || null,
    };

    try {
      const url = `/api/destinations/${destinationId}/tours${tour?.id ? `/${tour.id}` : ""}`;
      const method = tour?.id ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Request failed");
      onSuccess?.();
    } catch (err) {
      console.error("Failed to save tour:", err);
      // optionally show UI error
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium">Name</label>
        <input value={name} onChange={(e) => setName(e.target.value)} required className="w-full border rounded px-2 py-1" />
      </div>

      <div>
        <label className="block text-sm font-medium">Description</label>
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} required className="w-full border rounded px-2 py-1" />
      </div>

      <div className="grid grid-cols-2 gap-2">
        <div>
          <label className="block text-sm font-medium">Duration (days)</label>
          <input type="number" min={1} value={duration} onChange={(e) => setDuration(Number(e.target.value))} required className="w-full border rounded px-2 py-1" />
        </div>
        <div>
          <label className="block text-sm font-medium">Price (USD)</label>
          <input type="number" min={0} step="0.01" value={price} onChange={(e) => setPrice(Number(e.target.value))} required className="w-full border rounded px-2 py-1" />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium">Highlights (comma separated)</label>
        <input value={highlights} onChange={(e) => setHighlights(e.target.value)} className="w-full border rounded px-2 py-1" />
      </div>

      <div>
        <label className="block text-sm font-medium">Image URL</label>
        <input value={image} onChange={(e) => setImage(e.target.value)} className="w-full border rounded px-2 py-1" />
      </div>

      <div className="flex justify-end">
        <button type="submit" disabled={submitting} className="bg-[#ec2127] text-white px-4 py-2 rounded">
          {submitting ? "Saving..." : tour ? "Update Tour" : "Create Tour"}
        </button>
      </div>
    </form>
  );
}
