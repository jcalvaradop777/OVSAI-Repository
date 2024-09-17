import { initTables } from "@/app/db/tables/initTables";
import { getDataFromTable } from "@/app/db/tables/read";
import { NextResponse } from "next/server";

export async function GET(req, ctx) {
  const { id } = ctx.params;
  // Iniciamos las base de datos solo si no están creadas, es para asegurarse

  try {
    await initTables();

    const snmp = await getDataFromTable(
      "oids_snmp",
      ["*"],
      `id_dispositivo='${id}'`
    ); // el id es el identificador del dispositivo al que se le está haciendo la consulta SNMP mediante su IP, asociado a los OIDS
    return NextResponse.json({
      success: true,
      results: snmp,
    });
  } catch (err) {
    return NextResponse.json({
      success: false,
      message: "Ha ocurrido un error",
    });
  }
}
