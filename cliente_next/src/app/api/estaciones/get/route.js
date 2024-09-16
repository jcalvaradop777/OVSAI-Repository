import { initTables } from "@/app/db/tables/initTables";
import { getDataFromTable } from "@/app/db/tables/read";
import { NextResponse } from "next/server";

export async function GET() {
  // Iniciamos las base de datos solo si no están creadas, es para asegurarse
  try {
    await initTables();
    const estaciones = await getDataFromTable("estaciones");

    return NextResponse.json(estaciones);
  } catch (err) {
    return NextResponse.json([]);
  }
}
