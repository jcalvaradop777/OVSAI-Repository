import { ENV } from "@/config/env";
import { connect, connection } from "mongoose";

const conn = {
  isConnected: false,
};

export async function connectDB() {
  if (conn.isConnected) return;
  const db = await connect(ENV.URL_MONGOOSE);
  console.log(db.connection.db.databaseName);
  conn.isConnected = db.connections[0].readyState;
}

connection.on("connected", () => {
  console.log("Base de datos está conectada");
});

connection.on("error", (err) => {
  console.log("Base de datos tuvo un error", err);
});