import { createTable } from "@/app/db/tables/create/index";

export async function initTables() {
  await createTable("emplazamientos", [
    "id int(11) AUTO_INCREMENT PRIMARY KEY",
    "name VARCHAR(100) NOT NULL",
    "latitude VARCHAR(50) NOT NULL",
    "longitude VARCHAR(50) NOT NULL",
    "type INT(11) NOT NULL",
    "creation_time DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP",
  ]);
  await createTable("estaciones", [
    "id int(11) AUTO_INCREMENT PRIMARY KEY",
  "name VARCHAR(100) NOT NULL",
  "latitude VARCHAR(50)NOT NULL",
  "longitude VARCHAR(50) NOT NULL",
  "type INT(11) NOT NULL",
  "creation_time DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP",
  "emplazamiento INT(11)",
  "FOREIGN KEY (emplazamiento) REFERENCES emplazamientos(id)"
  ]);
  await createTable("trazas", [
    "id_traza int(11) AUTO_INCREMENT PRIMARY KEY",
    "nombre_traza VARCHAR(50) NOT NULL",
    "tipo_traza VARCHAR(50) NOT NULL",
    "nivel_traza VARCHAR(50) NOT NULL"
  ]);
}
