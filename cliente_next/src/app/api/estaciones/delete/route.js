import { deleteDataFromTable } from "@/app/db/tables/delete";
import { initTables } from "@/app/db/tables/initTables";
import { getDataFromTable } from "@/app/db/tables/read";
import { NextResponse } from "next/server";

export async function DELETE(req) {
    try {
      // Iniciamos las base de datos
      // Solo si no están creadas, de lo contrario es para asegurarse
      await initTables();

      // Obtener datos de req
      const _object = await req.json();

      // Antes de eliminar la estación, se comprueba si tiene dispositivos
      // Si es así, se los elimina

      const getDispositivos = await getDataFromTable("dispositivos", ["*"], `estacion='${_object.id}'`)

      // Procedemos a eliminar, las estaciones      
      await deleteDataFromTable("estaciones", `WHERE id = '${_object.id}'`);
  
      return NextResponse.json({
        success: true,
      });
    } catch (err) {
      console.error("Ha ocurrido un error: ", err);
      return NextResponse.json({
        success: false,
        message: err,
      });
    }
  }