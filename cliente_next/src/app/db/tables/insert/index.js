import { iniciarDB } from "@/app/db/index";

export async function insertDataIntoTable(tableName, columns, values) {
    const pool = await iniciarDB();
  
    try {
      const query = `
        INSERT INTO ${tableName} (${columns.join(", ")})
        VALUES (${values.map((value) => `"${value}"`).join(", ")});
      `;
  
      await pool.query(query);
      console.log(`Datos insertados exitosamente en la tabla ${tableName}`);
    } catch (error) {
      console.error("Error al insertar datos:", error);
      throw error;
    } finally {
      pool.end();
    }
  }