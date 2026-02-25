import { NextRequest, NextResponse } from "next/server";
import {
  getTourById,
  updateTour,
  deleteTourFromDestination,
  getStoredData,
  createSlug,
} from "@/lib/db";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const tour = getTourById(id);

    if (!tour) {
      return NextResponse.json({ error: "Tour not found" }, { status: 404 });
    }

    return NextResponse.json(tour);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch tour" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();

    const updated = updateTour(id, {
      name: body.name,
      slug: body.name ? createSlug(body.name) : undefined,
      description: body.description,
      duration: body.duration,
      price: body.price,
      image: body.image,
      highlights: body.highlights,
      includes: body.includes,
      itinerary: body.itinerary,
    });

    if (!updated) {
      return NextResponse.json({ error: "Tour not found" }, { status: 404 });
    }

    return NextResponse.json(updated);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update tour" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    // Find the tour to get its destination ID
    const data = getStoredData();
    let destinationId: string | null = null;

    for (const destination of data.destinations) {
      if (destination.tours.find((t) => t.id === id)) {
        destinationId = destination.id;
        break;
      }
    }

    if (!destinationId) {
      return NextResponse.json({ error: "Tour not found" }, { status: 404 });
    }

    const success = deleteTourFromDestination(destinationId, id);

    if (!success) {
      return NextResponse.json({ error: "Tour not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete tour" },
      { status: 500 }
    );
  }
}
