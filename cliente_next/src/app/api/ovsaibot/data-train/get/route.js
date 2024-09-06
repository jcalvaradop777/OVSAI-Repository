import { initTables } from "@/app/db/tables/initTables";
import { getDataFromTable } from "@/app/db/tables/read";
import { NextResponse } from "next/server";

export async function GET() {
  // Iniciamos las base de datos solo si no están creadas, es para asegurarse
  await initTables();
  const ovsaiDatos = await getDataFromTable("ovsaibotdatos");

  return NextResponse.json(ovsaiDatos);
}
