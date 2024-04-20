import { connectDB } from "@/app/db/mongo";
import Emplazamiento from "@/app/db/schemes/Emplazamiento";
import { NextResponse } from "next/server";

export async function GET() {
  await connectDB();
  const emplazamientos = await Emplazamiento.find();

  return NextResponse.json(emplazamientos);
}
