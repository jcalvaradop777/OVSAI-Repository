import { deleteDataFromTable } from "@/app/db/tables/delete";
import { initTables } from "@/app/db/tables/initTables";
import { NextResponse } from "next/server";

export async function DELETE(req) {
    try {
      // Iniciamos las base de datos
      // Solo si no están creadas, de lo contrario es para asegurarse
      await initTables();
  
      const _object = await req.json();
      await deleteDataFromTable("nscl", `WHERE id_nscl='${_object.id_nscl}'`);  
  
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