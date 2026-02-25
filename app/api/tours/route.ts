import { NextRequest, NextResponse } from "next/server";
import {
  getAllDestinations,
  addTourToDestination,
  createSlug,
} from "@/lib/db";
import type { TourPackage } from "@/lib/types";

export async function GET() {
  try {
    const destinations = getAllDestinations();
    const allTours = destinations.flatMap((d) =>
      d.tours.map((t) => ({
        ...t,
        destinationId: d.id,
        destinationName: d.name,
      }))
    );

    return NextResponse.json(allTours);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch tours" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { destinationId } = body;

    if (!destinationId) {
      return NextResponse.json(
        { error: "destinationId is required" },
        { status: 400 }
      );
    }

    if (!body.name || !body.description || body.duration === undefined || body.price === undefined) {
      return NextResponse.json(
        { error: "Missing required fields: name, description, duration, price" },
        { status: 400 }
      );
    }

    const newTour = addTourToDestination(destinationId, {
      name: body.name,
      slug: createSlug(body.name),
      description: body.description,
      duration: body.duration,
      price: body.price,
      image: body.image || "",
      highlights: body.highlights || [],
      includes: body.includes || [],
      itinerary: body.itinerary || [],
    });

    if (!newTour) {
      return NextResponse.json(
        { error: "Destination not found or failed to add tour" },
        { status: 400 }
      );
    }

    return NextResponse.json(newTour, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create tour" },
      { status: 500 }
    );
  }
}
