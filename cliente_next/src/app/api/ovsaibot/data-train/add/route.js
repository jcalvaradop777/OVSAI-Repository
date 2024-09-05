import { initTables } from "@/app/db/tables/initTables";
import { insertDataIntoTable } from "@/app/db/tables/insert";
import { NextResponse } from "next/server";

export async function POST(req) {
  // los datos del formulario de anomalias los enviamos mediante el parametro req (request)
  // Iniciamos las base de datos
  // Solo si no están creadas, de lo contrario es para asegurarse que exista
  await initTables();

  try {
    const data = await req.json(); // en data tenemos los datos del formulario de anomalias

    const names = Object.keys(data); // en maysql se tiene el nombre (del campo) y el valor
    const values = Object.values(data);

    console.log(data);

    await insertDataIntoTable("ovsaibotdatos", names, values); // tabla, campo, valor

    return NextResponse.json({
      success: true,
      message: "Los datos se han agregado correctamente!",
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: error.message,
    });
  }
}
