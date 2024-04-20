import { connectDB } from "@/app/db/mongo";
import Estacion from "@/app/db/schemes/Estacion";
import { NextResponse } from "next/server";

export async function GET() {
  await connectDB();
  const estaciones = await Estacion.find();

  return NextResponse.json(estaciones);
}
