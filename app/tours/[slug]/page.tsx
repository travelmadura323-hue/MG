"use client";

import { notFound } from "next/navigation";
import Link from "next/link";
import { useDashboard } from "@/lib/dashboard-context";
import { BookingForm } from "@/components/booking-form";
import { TourItinerary } from "@/components/tour-itinerary";
import { Clock, MapPin, Check, Loader } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function TourDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { destinations, isLoading } = useDashboard();
  const slug = "";

  // Get tour from params
  const resolvedParams = params as any;
  const resolvedSlug = resolvedParams?.slug || slug;

  let tour = null;
  let destination = null;

  for (const dest of destinations) {
    const foundTour = dest.tours.find((t) => t.slug === resolvedSlug);
    if (foundTour) {
      tour = foundTour;
      destination = dest;
      break;
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen pt-28 pb-20 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader className="animate-spin text-[#191973]" size={40} />
          <p className="text-gray-600">Loading tour details...</p>
        </div>
      </div>
    );
  }

  if (!tour || !destination) {
    notFound();
  }

  // Get related tours (other tours from the same destination and similar tours from other destinations)
  const relatedTours = destinations
    .flatMap((d) =>
      d.tours.map((t) => ({
        ...t,
        destinationName: d.name,
        destinationSlug: d.slug,
      }))
    )
    .filter((t) => t.slug !== resolvedSlug)
    .slice(0, 3);

  return (
    <div className="pt-28 pb-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Hero Banner */}
        <div className="relative h-[50vh] min-h-[400px] rounded-2xl overflow-hidden mb-12">
          {tour.image && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={tour.image} alt={tour.name} className="w-full h-full object-cover" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-[#191973]/80 via-[#191973]/40 to-transparent"></div>
          <div className="absolute bottom-8 left-0 right-0">
            <div className="mx-auto max-w-7xl px-6">
              <span className="inline-block rounded-lg bg-[#ec2127] px-4 py-2 text-sm font-semibold text-white">
                {destination.name}
              </span>
              <h1 className="mt-4 text-5xl md:text-6xl font-bold text-white">{tour.name}</h1>
              <p className="mt-3 max-w-2xl text-lg text-gray-100">{tour.description}</p>
            </div>
          </div>
        </div>

        <div className="grid gap-10 lg:grid-cols-3">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-12">
            {/* Key Info Cards */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <Card className="p-6 text-center border-gray-200">
                <Clock className="w-6 h-6 text-[#ec2127] mx-auto mb-2" />
                <p className="text-sm text-gray-600">Duration</p>
                <p className="text-2xl font-bold text-[#191973]">{tour.duration} days</p>
              </Card>
              <Card className="p-6 text-center border-gray-200">
                <MapPin className="w-6 h-6 text-[#ec2127] mx-auto mb-2" />
                <p className="text-sm text-gray-600">Destination</p>
                <p className="text-2xl font-bold text-[#191973]">{destination.name}</p>
              </Card>
              <Card className="p-6 text-center border-gray-200">
                <span className="text-2xl mb-2 block">💰</span>
                <p className="text-sm text-gray-600">Starting from</p>
                <p className="text-2xl font-bold text-[#ec2127]">${tour.price}</p>
              </Card>
            </div>

            {/* Tour Plan */}
            {tour.itinerary.length > 0 && (
              <div>
                <h2 className="text-3xl font-bold text-[#191973] mb-6">Itinerary</h2>
                <TourItinerary
                  itinerary={tour.itinerary.map((item) => ({
                    day: item.day.toString(),
                    title: item.title,
                    description: item.description,
                  }))}
                />
              </div>
            )}

            {/* Highlights and Includes */}
            <div className="grid md:grid-cols-2 gap-8">
              {tour.highlights.length > 0 && (
                <div>
                  <h3 className="text-2xl font-bold text-[#191973] mb-6">Highlights</h3>
                  <ul className="space-y-3">
                    {tour.highlights.map((highlight, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <span className="inline-block w-2 h-2 bg-[#ec2127] rounded-full mt-2 flex-shrink-0"></span>
                        <span className="text-gray-700">{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {tour.includes.length > 0 && (
                <div>
                  <h3 className="text-2xl font-bold text-[#191973] mb-6">What's Included</h3>
                  <ul className="space-y-3">
                    {tour.includes.map((include, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-[#ec2127] flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700">{include}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Destination Map */}
            {destination && (
              <div>
                <h2 className="text-3xl font-bold text-[#191973] mb-6">Destination Map</h2>
                <div className="overflow-hidden rounded-2xl border border-gray-300 h-96">
                  <iframe
                    title={`Map of ${destination.name}`}
                    src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=${encodeURIComponent(destination.name)}`}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-32 space-y-6">
              {/* Price Card */}
              <Card className="p-8 bg-gradient-to-br from-[#191973] to-[#2a2a4a] text-white text-center border-0">
                <p className="text-sm opacity-80">Starting Price</p>
                <div className="text-4xl font-bold my-2">${tour.price}</div>
                <p className="text-sm opacity-80">per person</p>
              </Card>

              {/* Booking Form */}
              <BookingForm tourTitle={tour.name} />

              {/* Info Box */}
              <Card className="p-4 border border-[#191973]/20 bg-blue-50">
                <p className="text-sm text-[#191973]">
                  <span className="font-semibold">Duration:</span> {tour.duration} days<br />
                  <span className="font-semibold">Package:</span> {tour.name}<br />
                  <span className="font-semibold">Location:</span> {destination.name}
                </p>
              </Card>

              {/* Back to Destination */}
              <Link href={`/destinations/${destination.slug}`}>
                <Button variant="outline" className="w-full border-[#191973] text-[#191973] hover:bg-blue-50">
                  ← Back to {destination.name}
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Related Tours */}
        {relatedTours.length > 0 && (
          <div className="mt-20 pt-12 border-t">
            <h2 className="text-3xl font-bold text-[#191973] mb-8">Other Popular Tours</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {relatedTours.map((relatedTour) => (
                <Link key={relatedTour.slug} href={`/tours/${relatedTour.slug}`}>
                  <Card className="overflow-hidden hover:shadow-xl transition-all group">
                    <div className="relative h-48 bg-gray-200 overflow-hidden">
                      {relatedTour.image && (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={relatedTour.image}
                          alt={relatedTour.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform"
                        />
                      )}
                    </div>
                    <div className="p-6">
                      <p className="text-xs text-[#ec2127] font-semibold mb-2">
                        {relatedTour.destinationName}
                      </p>
                      <h3 className="text-lg font-bold text-[#191973] group-hover:text-[#ec2127] transition-colors mb-2">
                        {relatedTour.name}
                      </h3>
                      <p className="text-sm text-gray-600 line-clamp-2 mb-4">{relatedTour.description}</p>
                      <div className="flex justify-between items-center">
                        <span className="text-[#ec2127] font-bold">${relatedTour.price}</span>
                        <span className="text-sm font-semibold text-[#191973]">
                          {relatedTour.duration}d
                        </span>
                      </div>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
