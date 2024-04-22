import { connectDB } from "@/app/db/mongo";
import Emplazamiento from "@/app/db/schemes/Emplazamiento";
import { NextResponse } from "next/server";

export async function POST(req) {
  await connectDB();
  const data = await req.json();
  console.log(data);
  try {
    const nuevoEmplazamiento = new Emplazamiento(data);
    const emplazamientoGuardado = await nuevoEmplazamiento.save();
    return NextResponse.json({
      success: true,
      emplazamientoGuardado,
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: error.message,
    });
  }
}
