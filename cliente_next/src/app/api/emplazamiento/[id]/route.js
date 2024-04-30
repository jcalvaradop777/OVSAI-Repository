import { initTables } from "@/app/db/tables/initTables";
import { getDataFromTable } from "@/app/db/tables/read";
import { NextResponse } from "next/server";

export async function GET(req, ctx) {
  const { id } = ctx.params;

  // Iniciamos las base de datos
  // Solo si no están creadas, de lo contrario es para asegurarse
  await initTables();
  const estaciones = await getDataFromTable(
    "estaciones",
    ["*"],
    "emplazamiento = " + id
  );

  return NextResponse.json({
    success: true,
    results: estaciones,
  });
}
