"use client";

import { useDashboard } from "@/lib/dashboard-context";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, MapPin, Package } from "lucide-react";

export default function DestinationsPage() {
  const { destinations, isLoading } = useDashboard();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 pt-28 pb-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="animate-pulse space-y-8">
            <div className="h-12 bg-gray-300 rounded w-1/3"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 pt-28 pb-20">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="mb-16 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-[#191973] mb-6">
            Explore Destinations
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover amazing travel experiences around the world. Each destination offers unique tour packages tailored to your preferences.
          </p>
        </div>

        {/* Destinations Grid */}
        {destinations.length === 0 ? (
          <Card className="p-16 text-center">
            <p className="text-gray-500 text-lg mb-4">No destinations available yet.</p>
            <p className="text-gray-400">Check back soon for amazing travel experiences!</p>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {destinations.map((destination) => (
              <Link key={destination.id} href={`/destinations/${destination.slug}`}>
                <Card className="overflow-hidden hover:shadow-2xl transition-all duration-300 h-full cursor-pointer group">
                  {/* Image */}
                  <div className="relative h-64 bg-gray-200 overflow-hidden">
                    {destination.image ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={destination.image}
                        alt={destination.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#191973] to-[#ec2127]">
                        <span className="text-white text-2xl font-bold text-center px-4">
                          {destination.name}
                        </span>
                      </div>
                    )}

                    {/* Tour Count Badge */}
                    <div className="absolute top-4 right-4 bg-[#ec2127] text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                      {destination.tours.length} tour{destination.tours.length !== 1 ? "s" : ""}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h2 className="text-2xl font-bold text-[#191973] mb-3 group-hover:text-[#ec2127] transition-colors flex items-center gap-2">
                      <MapPin size={24} />
                      {destination.name}
                    </h2>

                    <p className="text-gray-600 text-sm mb-6 line-clamp-2">
                      {destination.description}
                    </p>

                    {/* Tour Packages Preview */}
                    {destination.tours.length > 0 && (
                      <div className="mb-6 pb-6 border-b border-gray-200">
                        <p className="text-xs font-semibold text-gray-600 mb-3 flex items-center gap-2">
                          <Package size={16} />
                          Featured Packages
                        </p>
                        <div className="space-y-2">
                          {destination.tours.slice(0, 2).map((tour) => (
                            <div
                              key={tour.id}
                              className="text-sm text-gray-700 bg-gray-50 p-2 rounded"
                            >
                              <div className="font-semibold text-[#191973]">{tour.name}</div>
                              <div className="text-xs text-gray-600">
                                {tour.duration} days • ${tour.price}
                              </div>
                            </div>
                          ))}
                          {destination.tours.length > 2 && (
                            <div className="text-xs text-[#ec2127] font-semibold italic">
                              +{destination.tours.length - 2} more packages
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    {/* View Details Button */}
                    <Button className="w-full bg-[#ec2127] hover:bg-red-700 text-white gap-2 group">
                      Explore Packages
                      <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        )}

        {/* CTA Section */}
        {destinations.length > 0 && (
          <div className="mt-20 bg-gradient-to-r from-[#191973] to-[#ec2127] rounded-2xl p-12 text-center text-white">
            <h2 className="text-4xl font-bold mb-4">Ready to Start Your Journey?</h2>
            <p className="text-lg mb-8 opacity-90">
              Browse our carefully curated tour packages and book your dream vacation today.
            </p>
            <Link href="/contact">
              <Button className="bg-white text-[#191973] hover:bg-gray-100 text-base px-8 py-6">
                Contact Us for Details
                <ArrowRight size={20} />
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
