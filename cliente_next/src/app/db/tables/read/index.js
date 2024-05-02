import { iniciarDB } from "@/app/db/index";

export async function getDataFromTable(
  tableName,
  columns = ["*"],
  whereClause = null,
) {
  const pool = await iniciarDB();

  try {
    const query = `
        SELECT ${columns.join(", ")}
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
