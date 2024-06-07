import { initTables } from "@/app/db/tables/initTables";
import { updateDataInTable } from "@/app/db/tables/update";
import { NextResponse } from "next/server";


export async function PUT(req) {

  await initTables();

  try {
    const _object = await req.json();
    const updateSet = [];

    for (let user in _object) {
      if(!user.includes("id")) {
        updateSet.push(user + " = '" + _object[user] + "'");
      }
    }

    const id = _object.id_nscl
    await updateDataInTable("nscl", updateSet, `id_nscl='${id}'`);

    return NextResponse.json({
      success: true,
    });
  } catch (err) {
    console.log("Ocurrió un error: ", err);
  }
}
