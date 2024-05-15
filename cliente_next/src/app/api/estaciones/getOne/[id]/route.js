import { initTables } from "@/app/db/tables/initTables";
import { getDataFromTable } from "@/app/db/tables/read";
import { NextResponse } from "next/server";

export async function GET(req, ctx) {

  const { id } = ctx.params;
  // Iniciamos las base de datos solo si no están creadas, es para asegurarse
  await initTables();

  const estaciones = await getDataFromTable('estaciones', ["*"], `id='${id}'`);

  return NextResponse.json(estaciones);
}