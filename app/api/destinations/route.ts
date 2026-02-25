import { NextRequest, NextResponse } from "next/server";
import {
  getAllDestinations,
  addDestination,
  createSlug,
  generateId,
} from "@/lib/db";
import type { Destination } from "@/lib/types";

export async function GET() {
  try {
    const destinations = getAllDestinations();
    return NextResponse.json(destinations);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch destinations" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    if (!body.name || !body.description || !body.image) {
      return NextResponse.json(
        { error: "Missing required fields: name, description, image" },
        { status: 400 }
      );
    }

    const newDestination = addDestination({
      name: body.name,
      slug: createSlug(body.name),
      description: body.description,
      image: body.image,
      tours: [],
    });

    return NextResponse.json(newDestination, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create destination" },
      { status: 500 }
    );
  }
}
