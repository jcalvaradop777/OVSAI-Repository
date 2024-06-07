import { iniciarDB } from "@/app/db/index";

export async function getDataDistinctFromTable(tableName, columns=["*"], whereClause=null) {

  const pool = await iniciarDB();

  try {
    const query = `
        SELECT DISTINCT ${columns.join(", ")}
        FROM ${tableName}
        ${whereClause ? `WHERE ${whereClause}` : ""};
      `;

    const [results] = await pool.query(query);
    console.log("Datos obtenidos exitosamente:", results);
    return results;
  } catch (error) {
    console.error("Error al obtener datos:", error);
    throw error;
  } finally {
    pool.end();
  }
}
