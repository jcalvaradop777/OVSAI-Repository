import { initTables } from "@/app/db/tables/initTables";
import { insertDataIntoTable } from "@/app/db/tables/insert";
import { NextResponse } from "next/server";

export async function POST(req) {
  // Iniciamos las base de datos
  // Solo si no están creadas, de lo contrario es para asegurarse
  await initTables();

  try {
    const data = await req.json();
    const names = Object.keys(data);
    const values = Object.values(data);

    console.log(data);

    await insertDataIntoTable("dispositivos", names, values);

    return NextResponse.json({
      success: true,
      message: "El dispositivo se ha creado correctamente!",
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: error.message,
    });
  }
}
