import { connectDB } from "@/app/db/mongo";
import Estacion from "@/app/db/schemes/Estacion";
import { NextResponse } from "next/server";

export async function POST(req) {
  await connectDB();
  const data = await req.json();
  console.log(data);
  try {
    const nuevaEstacion = new Estacion(data);
    const estacionGuardada = await nuevaEstacion.save();
    return NextResponse.json({
      success: true,
      estacionGuardada,
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: error.message,
    });
  }
}
