import { iniciarDB } from "@/app/db/index";

export async function deleteDataFromTable(tableName, whereClause) {
    const pool = await iniciarDB();
  
    try {
      const query = `
        DELETE FROM ${tableName}
        ${whereClause ? ` ${whereClause}` : ""};
      `;
  
      await pool.query(query);
      console.log(`Datos eliminados de la tabla ${tableName}`);
    } catch (error) {
      console.error("Error al eliminar datos:", error);
      throw error;
    } finally {
      pool.end();
    }
  }