import { iniciarDB } from "@/app/db/index";

export async function createTable(tableName, tableDefinition) {
    const pool = await iniciarDB();
  
    try {
      const query = `
        CREATE TABLE IF NOT EXISTS ${tableName} (
          ${tableDefinition.join(", ")}
        );
      `;
  
      await pool.query(query);
      console.log(`Tabla ${tableName} creada exitosamente`);
    } catch (error) {
      console.error("Error al crear la tabla:", error);
      throw error; // Handle the error appropriately (e.g., retry, notify admins)
    } finally {
      pool.end();
    }
  }
