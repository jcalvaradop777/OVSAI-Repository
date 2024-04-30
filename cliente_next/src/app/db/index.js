import mysql from "mysql2/promise";

export async function iniciarDB() {
  try {
    const pool = mysql.createPool({
      host: "localhost",
      database: "ovsai",
      user: "root",
      password: "",
    });
    pool.on("acquire", () => {
      console.log(`Conectado a base de datos ovsai`);
    });
    return pool;
  } catch (error) {
    console.error("Error connecting to database:", error);
    throw error;
  }
}
