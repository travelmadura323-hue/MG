"use client";

import { notFound } from "next/navigation";
import { useDashboard } from "@/lib/dashboard-context";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, MapPin } from "lucide-react";
import Link from "next/link";

export default function DestinationPage({ params }: { params: Promise<{ slug: string }> }) {
  const { destinations, isLoading } = useDashboard();
  const slug = "";

  // Get destination from params
  const resolvedParams = params as any;
  const resolvedSlug = resolvedParams?.slug || slug;

  const destination = destinations.find((d) => d.slug === resolvedSlug);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8">
        <div className="max-w-6xl mx-auto">
          <div className="animate-pulse space-y-8">
            <div className="h-96 bg-gray-300 rounded-lg"></div>
            <div className="h-12 bg-gray-300 rounded w-1/3"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-64 bg-gray-300 rounded-lg"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!destination) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-white pt-28 pb-20">
      <div className="max-w-6xl mx-auto px-6">
        {/* Hero Section */}
        <div className="mb-16">
          <div className="relative h-96 rounded-2xl overflow-hidden mb-8">
            {destination.image && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={destination.image}
                alt={destination.name}
                className="w-full h-full object-cover"
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-[#191973]/60 via-transparent to-transparent"></div>
            <div className="absolute bottom-8 left-8 right-8">
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">{destination.name}</h1>
              <p className="text-xl text-gray-100 max-w-2xl">{destination.description}</p>
            </div>
          </div>
        </div>

        {/* Tour Packages Section */}
        <div className="mb-20">
          <div className="mb-12">
            <h2 className="text-4xl font-bold text-[#191973] mb-4">Explore Tour Packages</h2>
            <p className="text-gray-600 text-lg">
              {destination.tours.length} amazing{" "}
              {destination.tours.length === 1 ? "experience" : "experiences"} waiting for you in{" "}
              {destination.name}
            </p>
          </div>

          {destination.tours.length === 0 ? (
            <Card className="p-12 text-center">
              <p className="text-gray-500 text-lg">No tour packages available for this destination yet.</p>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {destination.tours.map((tour) => (
                <Link key={tour.id} href={`/tours/${tour.slug}`}>
                  <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 h-full cursor-pointer group">
                    {/* Image */}
                    <div className="relative h-48 bg-gray-200 overflow-hidden">
                      {tour.image ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={tour.image}
                          alt={tour.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#191973] to-[#ec2127]">
                          <span className="text-white text-lg font-semibold text-center px-4">{tour.name}</span>
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-[#191973] mb-3 group-hover:text-[#ec2127] transition-colors">
                        {tour.name}
                      </h3>

                      <p className="text-gray-600 text-sm mb-4 line-clamp-2">{tour.description}</p>

                      {/* Duration and Price */}
                      <div className="flex justify-between items-center mb-4 pb-4 border-b">
                        <div className="text-sm">
                          <span className="text-gray-600">Duration: </span>
                          <span className="font-bold text-[#191973]">{tour.duration} days</span>
                        </div>
                        <div className="text-sm">
                          <span className="text-gray-600">From </span>
                          <span className="font-bold text-[#ec2127]">${tour.price}</span>
                        </div>
                      </div>

                      {/* Highlights */}
                      {tour.highlights.length > 0 && (
                        <div className="mb-4">
                          <p className="text-xs font-semibold text-gray-600 mb-2">Highlights:</p>
                          <div className="flex flex-wrap gap-2">
                            {tour.highlights.slice(0, 2).map((highlight, idx) => (
                              <span
                                key={idx}
                                className="text-xs bg-blue-100 text-[#191973] px-2 py-1 rounded"
                              >
                                {highlight}
                              </span>
                            ))}
                            {tour.highlights.length > 2 && (
                              <span className="text-xs text-gray-500">
                                +{tour.highlights.length - 2} more
                              </span>
                            )}
                          </div>
                        </div>
                      )}

                      {/* View Details Button */}
                      <Button className="w-full bg-[#ec2127] hover:bg-red-700 text-white gap-2">
                        View Details
                        <ArrowRight size={16} />
                      </Button>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Back Link */}
        <div className="text-center">
          <Link href="/destinations" className="text-[#191973] hover:text-[#ec2127] font-semibold flex items-center justify-center gap-2">
            ← Back to All Destinations
          </Link>
        </div>
      </div>
    </div>
  );
}
