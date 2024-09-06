// Envía a createTble el nombre de latabla y sus campos

import { createTable } from "@/app/db/tables/create/index";  // en tables esta toda la estructura CRUD con setencias sql a base de datos

export async function initTables() {

  await createTable("estaciones", [
    "id VARCHAR(5) PRIMARY KEY",
    "nombre VARCHAR(100) NOT NULL",
    "latitud VARCHAR(50)NOT NULL",
    "longitud VARCHAR(50) NOT NULL",
    "clasificacion VARCHAR(50)",
    "elevacion VARCHAR(50)",
    "departamento VARCHAR(50)", 
    "municipio VARCHAR(50)",
    "estado VARCHAR(50)",
    "red_monitoreo VARCHAR(50)",
    "codigo_localizacion VARCHAR(50)",
    "subred VARCHAR(50)",
    "agencia VARCHAR(50)",
    "fecha_instalacion VARCHAR(50)",
    "fecha_retiro VARCHAR(50)",
    "energia VARCHAR(50)",
    "geologia VARCHAR(50)",
    "topografia VARCHAR(50)",
    "responsable VARCHAR(50)",
    "acceso VARCHAR(200)"
  ]);

  await createTable("dispositivos", [
    "id_dispositivo int(11) AUTO_INCREMENT PRIMARY KEY",
    "grupo VARCHAR(50)",
    "subgrupo VARCHAR(50)",
    "placa VARCHAR(50)",
    "serial VARCHAR(50)",
    "codigo_bidimensional VARCHAR(10)",
    "secuencia VARCHAR(10)",
    "marca VARCHAR(50)",
    "modelo VARCHAR(50)",
    "estado VARCHAR(50)",
    "propietario VARCHAR(50)",
    "proveedor VARCHAR(50)",
    "responsable VARCHAR(50)",
    "lugar VARCHAR(50)",
    "estacion VARCHAR(50) NOT NULL",
    "fecha_mantenimiento VARCHAR(50)",
    "fecha_instalacion VARCHAR(50)",
    "fecha_retiro VARCHAR(50)",
    "fecha_recepcion VARCHAR(50)",
    "fecha_baja VARCHAR(50)",
    "inventariado VARCHAR(50)",
    "fecha_inventariado VARCHAR(50)", 
    "comentarios VARCHAR(200)",
    "FOREIGN KEY (estacion) REFERENCES estaciones(id)" 
  ]);

  await createTable("anomaliasguralp", [
    "id_anomalia int(11) AUTO_INCREMENT PRIMARY KEY",
    "fecha VARCHAR(50) NOT NULL",
    "canal VARCHAR(50) NOT NULL",
    "archivoGCF VARCHAR(50) NOT NULL",
    "tipoTraza VARCHAR(50) NOT NULL"
  ]);

  await createTable("nscl", [
    "id_nscl VARCHAR(50)",
    "codigo_localizacion VARCHAR(50)",
    "instrumento VARCHAR(50)",
    "fecha_inicio VARCHAR(50)",
    "fecha_finalizacion VARCHAR(50)",
    "sensor VARCHAR(10)",
    "digitalizador VARCHAR(10)",
    "almacenamiento VARCHAR(50)",
    "condicion_instalacion VARCHAR(50)",
    "transmision VARCHAR(50)",
    "descarga VARCHAR(50)",
    "alcance VARCHAR(50)",
    "tipo_estacion VARCHAR(50)",
    "tipo_adquisicion VARCHAR(50)",
    "estado VARCHAR(50) NOT NULL",
    "comentarios VARCHAR(50)",
    "estacion VARCHAR(50)",
    "FOREIGN KEY (estacion) REFERENCES estaciones(id)" 
  ]);

  await createTable("ovsaibotdatos", [
    "id_dato int(11) AUTO_INCREMENT PRIMARY KEY",
    "fecha_creacion VARCHAR(50) NOT NULL",
    "input VARCHAR(500) NOT NULL",
  ]);
 
} // las tablas, dentro de esta llave
