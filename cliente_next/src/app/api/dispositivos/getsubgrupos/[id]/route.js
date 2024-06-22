import { initTables } from "@/app/db/tables/initTables";
import { getDataDistinctFromTable } from "@/app/db/tables/readdistinct";
import { NextResponse } from "next/server";

export async function GET(req, ctx) {

  const { id } = ctx.params;
  // Iniciamos las base de datos solo si no están creadas, es para asegurarse

  await initTables();

  const subgrupo = await getDataDistinctFromTable('dispositivos', ["subgrupo"], `estacion='${id}'`);  // el id es el identificador de la estación

  return NextResponse.json({
    success: true,
    results: subgrupo,
  });
}