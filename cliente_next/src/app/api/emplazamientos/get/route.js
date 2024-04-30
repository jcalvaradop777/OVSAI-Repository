import { NextResponse } from "next/server";
import { initTables } from "@/app/db/tables/initTables";
import { getDataFromTable } from "@/app/db/tables/read";

export async function GET() {
  // Iniciamos las base de datos
  // Solo si no están creadas, de lo contrario es para asegurarse
  await initTables();
  const emplazamientos = await getDataFromTable('emplazamientos');

  return NextResponse.json(emplazamientos);
}
