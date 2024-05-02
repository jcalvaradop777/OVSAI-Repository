import { iniciarDB } from "@/app/db/index";

export async function updateDataInTable(tableName, updateSet, whereClause) {
    const pool = await iniciarDB();
  
    try {
      const query = `
        UPDATE ${tableName}
        SET ${updateSet.join(", ")}
        ${whereClause ? `WHERE ${whereClause}` : ""};
      `;
  
      await pool.query(query);
      console.log(`Datos actualizados en la tabla ${tableName}`);
    } catch (error) {
      console.error("Error al actualizar datos:", error);
      throw error;
    } finally {
      
      pool.end()
    }
  }