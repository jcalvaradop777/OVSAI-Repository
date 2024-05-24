import { ENV } from "@/config/env";
import { useEffect, useState } from "react";

// Componente/Formulario para crear estación  :  Tipo ventana modal, llena los 4 elementos mas importantes: id, nombre, longitud y latitud. 
// Para ingresar los demás datos de la tabla estaciones, se lo hace mediante el fomulario: EstacionTotal.
export default function EditarEstacion({ id }) {

  const [load, setLoad] = useState(false); // para que solo carque la primera vez

  // Datos para actualizar la BD
  const [data, setData] = useState({});

  // Para mostrar los datos previamente guardados en el formulario
  const obtenerDataEstacion = async (_id) => {
    const res = await fetch(`${ENV.URLBASE}api/estaciones/getOne/${_id}`)
    await res.json().then((datos) => {  // Promesa: una vez existe una respuesta a la promesa, en THEN capturo dicha respuesta asincrona en variable datos
      setData(datos[0])
    }).catch((error) => { console.error(error) })
  };

  useEffect(() => {
    if (!load) {
      obtenerDataEstacion(id);
      setLoad(true);
    }
  })


  // Esto es lo que se envia a la base de datos
  const actualizar = (e) => {
    e.preventDefault();

    if (data.nombre.length > 0 && data.id.length > 0) {
      // Agregar estación a base de datos

      fetch(ENV.URLBASE + "api/estaciones/update", {
        method: "PUT",
        body: JSON.stringify({
          id: data.id,
          nombre: data.nombre,
          clasificacion: data.clasificacion,
          departamento: data.departamento,
          municipio: data.municipio,
          estado: data.estado,
          red_monitoreo: data.red_monitoreo,
          codigo_localizacion: data.codigo_localizacion,
          subred: data.subred,
          agencia: data.agencia,
          fecha_instalacion: data.fecha_instalacion,
          fecha_retiro: data.fecha_retiro,
          energia: data.energia,
          geologia: data.geologia,
          topografia: data.topografia,
          responsable: data.responsable,
          acceso: data.acceso
        }),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });

      alert("Se ha actualizado la información");
    } else {
      alert("Debe llenar todos los campos");
    }
  };

  return (
    <form onSubmit={actualizar} className="w-full">

      <br />
      <div className="font-bold">Identificador</div>
      <div className="ml-4">{(data != null) ? data.id : ""}</div> <br />

      <div className="font-bold">Longitud</div>
      <div className="ml-4">{(data != null) ? data.longitud : ""}</div> <br />

      <div className="font-bold">Latitud</div>
      <div className="ml-4">{(data != null) ? data.latitud : ""}</div> <br />

      <div className="font-bold">Elevación</div>
      <div className="ml-4">{(data != null) ? data.elevacion : ""}</div> <br />


      <label htmlFor="name">
        <span className="block mb-2 text-sm font-medium text-gray-900">
          Nombre estación
        </span>
        <input
          type="text"
          id="name"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
          placeholder="Ingrese el nombre estación"
          value={(data != null) ? data.nombre : ""}
          onChange={(e) => {
            if (e.target.value.trim().length > 0) {
              setData({
                ...data,
                nombre: e.target.value,
              });
            }
          }}
          required
        />
      </label>

      <label htmlFor="clasificacionl">
        <span className="block mb-2 text-sm font-medium text-gray-900 mt-5">
          Clasificación
        </span>
        <select
          className="selection:bg-#82A53D"
          name="clasificacion"
          value={(data != null) ? data.clasificacion : ""}
          onChange={(e) => {
            if (e.target.value.trim().length > 0) {
              setData({
                ...data,
                clasificacion: e.target.value,
              });
            }
          }}
          required 
        >
          <option value="0">..........................................</option>
          <option value="Sísmica">Sísmica</option>
          <option value="Repetidora">Repetidora</option>
          <option value="Multiparamétrica">Multiparamétrica</option>
          <option value="GNSS">GNSS</option>
          <option value="Cámara">Cámara</option>
          <option value="Acelerómetro">Acelerómetro</option>
          <option value="Inclinómetro">Inclinómetro</option>
          <option value="Dioxido de Azufre">Dioxido de Azufre</option>
          <option value="Temperatura">Temperatura</option>
          <option value="Radón">Radón</option>
        </select>
      </label>

      <label htmlFor="departamentol">
        <span className="block mb-2 text-sm font-medium text-gray-900 mt-5">
        Departamento
        </span>
        <select
          className="selection:bg-#82A53D"
          name="departamento"
          value={(data != null) ? data.departamento : ""}
          onChange={(e) => {
            if (e.target.value.trim().length > 0) {
              setData({
                ...data,
                departamento: e.target.value,
              });
            }
          }}
          required 
        >
          <option value="0">..........................................</option>
          <option value="NARIÑO">NARIÑO</option>
          <option value="PUTUMAYO">PUTUMAYO</option>
        </select>
      </label>

      <label htmlFor="municipiol">
        <span className="block mb-2 text-sm font-medium text-gray-900 mt-5">
        Municipio
        </span>
        <select
          className="selection:bg-#82A53D"
          name="municipio"
          value={(data != null) ? data.municipio : ""}
          onChange={(e) => {
            if (e.target.value.trim().length > 0) {
              setData({
                ...data,
                municipio: e.target.value,
              });
            }
          }}
          required 
        >
          <option value="0">..........................................</option>
          <option value="NARIÑO">NARIÑO</option>
          <option value="CUMBAL">CUMBAL</option>
          <option value="LINARES">LINARES</option>
          <option value="LA CRUZ">LA CRUZ</option>
          <option value="CONSACÁ">CONSACÁ</option>
          <option value="SANTIAGO">SANTIAGO</option>
          <option value="TÚQUERRES">TÚQUERRES</option>
          <option value="PASTO">PASTO</option>
          <option value="YACUANQUER">YACUANQUER</option>
          <option value="TANGUA">TANGUA</option>
          <option value="COLÓN">COLÓN</option>
          <option value="SAN BERNARDO">SAN BERNARDO</option>
          <option value="LA FLORIDA">LA FLORIDA</option>
          <option value="SANDONÁ">SANDONÁ</option>
          <option value="EL TABLÓN DE GÓMEZ">EL TABLÓN DE GÓMEZ</option>
          <option value="SAPUYES">SAPUYES</option>
          <option value="MALLAMA">MALLAMA</option>
          <option value="BELÉN">BELÉN</option>
          <option value="BUESACO">BUESACO</option>
          <option value="SAN PABLO">SAN PABLO</option>
          <option value="SAN FRANCISCO">SAN FRANCISCO</option>
          <option value="SANTACRUZ">SANTACRUZ</option>
          <option value="ALDANA">ALDANA</option>
        </select>
      </label>

      <label htmlFor="estadol">
        <span className="block mb-2 text-sm font-medium text-gray-900 mt-5">
        Estado
        </span>
        <select
          className="selection:bg-#82A53D"
          name="estado"
          value={(data != null) ? data.estado : ""}
          onChange={(e) => {
            if (e.target.value.trim().length > 0) {
              setData({
                ...data,
                estado: e.target.value,
              });
            }
          }}
          required 
        >
          <option value="0">..........................................</option>
          <option value="ACTIVA">ACTIVA</option>
          <option value="INACTIVA">INACTIVA</option>
          <option value="RETIRADA">RETIRADA</option>
        </select>
      </label>

      <label htmlFor="red_monitoreol">
        <span className="block mb-2 text-sm font-medium text-gray-900 mt-5">
        Red monitoreo
        </span>
        <select
          className="selection:bg-#82A53D"
          name="red_monitoreo"
          value={(data != null) ? data.red_monitoreo : ""}
          onChange={(e) => {
            if (e.target.value.trim().length > 0) {
              setData({
                ...data,
                red_monitoreo: e.target.value,
              });
            }
          }}
          required 
        >
          <option value="0">..........................................</option>
          <option value="OVS PASTO">OVS PASTO</option>
          <option value="GEORED">GEORED</option>
        </select>
      </label>

      <label htmlFor="localizacionl">
        <span className="block mb-2 text-sm font-medium text-gray-900 mt-5">
          Código de localización
        </span>
        <input
          type="text"
          id="localizacion"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
          placeholder="Ingrese el código de localización"
          value={(data != null) ? data.codigo_localizacion : ""}
          onChange={(e) => {
            if (e.target.value.trim().length > 0) {
              setData({
                ...data,
                codigo_localizacion: e.target.value,
              });
            }
          }}
          required
        />
      </label>

      <label htmlFor="subredl">
        <span className="block mb-2 text-sm font-medium text-gray-900 mt-5">
        Sub-red
        </span>
        <select
          className="selection:bg-#82A53D"
          name="subred"
          value={(data != null) ? data.subred : ""}
          onChange={(e) => {
            if (e.target.value.trim().length > 0) {
              setData({
                ...data,
                subred: e.target.value,
              });
            }
          }}
          required 
        >
          <option value="0">..........................................</option>
          <option value="Galeras">Galeras</option>
          <option value="Cumbal">Cumbal</option>
          <option value="Las Animas">Las Animas</option>
          <option value="Cerro Negro">Cerro Negro</option>
          <option value="Azufral">Azufral</option>
          <option value="Chiles">Chiles</option>
          <option value="RNAC">RNAC</option>
          <option value="Doña Juana">Doña Juana</option>
          <option value="Comunicaciones Voz">Comunicaciones Voz</option>
        </select>
      </label>

      <label htmlFor="agencial">
        <span className="block mb-2 text-sm font-medium text-gray-900 mt-5">
        Agencia
        </span>
        <select
          className="selection:bg-#82A53D"
          name="agencia"
          value={(data != null) ? data.agencia : ""}
          onChange={(e) => {
            if (e.target.value.trim().length > 0) {
              setData({
                ...data,
                agencia: e.target.value,
              });
            }
          }}
          required 
        >
          <option value="0">..........................................</option>
          <option value="SERVICIO GEOLOGICO COLOMBIANO">SERVICIO GEOLOGICO COLOMBIANO</option>
          <option value="ALCALDIA DE PASTO">ALCALDIA DE PASTO</option>
        </select>
      </label>

      <label htmlFor="energial">
        <span className="block mb-2 text-sm font-medium text-gray-900 mt-5">
        Energía
        </span>
        <select
          className="selection:bg-#82A53D"
          name="energia"
          value={(data != null) ? data.energia : ""}
          onChange={(e) => {
            if (e.target.value.trim().length > 0) {
              setData({
                ...data,
                energia: e.target.value,
              });
            }
          }}
          required 
        >
          <option value="0">..........................................</option>
          <option value="PANEL SOLAR">PANEL SOLAR</option>
          <option value="HIBRIDA">HIBRIDA</option>
        </select>
      </label>
      
      <label htmlFor="geologial">
        <span className="block mb-2 text-sm font-medium text-gray-900 mt-5">
        Geología
        </span>
        <select
          className="selection:bg-#82A53D"
          name="geologia"
          value={(data != null) ? data.geologia : ""}
          onChange={(e) => {
            if (e.target.value.trim().length > 0) {
              setData({
                ...data,
                geologia: e.target.value,
              });
            }
          }}
          required 
        >
          <option value="0">..........................................</option>
          <option value="LAVA">LAVA</option>
          <option value="ROCA">ROCA</option>
          <option value="ROCA METAMÓRFICA">ROCA METAMÓRFICA</option>
          <option value="DEPOSITO VOLCÁNICO">DEPOSITO VOLCÁNICO</option>
          <option value="SUELO">PANEL SUELO</option>
          <option value="EDIFICIO O INFRAESTRUCTURA">EDIFICIO O INFRAESTRUCTURA</option>
          <option value="DEPOSITO LACUSTRE">DEPOSITO LACUSTRE</option>
        </select>
      </label>

      <label htmlFor="topografial">
        <span className="block mb-2 text-sm font-medium text-gray-900 mt-5">
        Topografía
        </span>
        <select
          className="selection:bg-#82A53D"
          name="topografia"
          value={(data != null) ? data.topografia : ""}
          onChange={(e) => {
            if (e.target.value.trim().length > 0) {
              setData({
                ...data,
                topografia: e.target.value,
              });
            }
          }}
          required 
        >
          <option value="0">..........................................</option>
          <option value="MONTAÑOSO">MONTAÑOSO</option>
          <option value="ONDULADA">ONDULADA</option>
          <option value="ESCARPADA">ESCARPADA</option>
          <option value="PLANA">PLANA</option>
        </select>
      </label>

      <label htmlFor="responsablel">
        <span className="block mb-2 text-sm font-medium text-gray-900 mt-5">
          Responsable
        </span>
        <input
          type="text"
          id="responsable"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
          placeholder="Ingrese el responsable"
          value={(data != null) ? data.responsable : ""}
          onChange={(e) => {
            if (e.target.value.trim().length > 0) {
              setData({
                ...data,
                responsable: e.target.value,
              });
            }
          }}
          required
        />
      </label>

      <label htmlFor="accesol">
        <span className="block mb-2 text-sm font-medium text-gray-900 mt-5">
          Acceso
        </span>
        <textarea name="acceso" rows="4" cols="40"
          type="text"
          id="acceso"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
          placeholder="Ingrese la ruta de acceso"
          value={(data != null) ? data.acceso : ""}
          onChange={(e) => {
            if (e.target.value.trim().length > 0) {
              setData({
                ...data,
                acceso: e.target.value,
              });
            }
          }} 
          required
        />
      </label>

      <label htmlFor="instalacion">
        <span className="block mb-2 text-sm font-medium text-gray-900 mt-5">
          Fecha de instalación
        </span>
        <input
          type="date"
          id="fechaI"
          name="fechaI"
          value={(data != null) ? data.fecha_instalacion : ""}
          onChange={(e) => {
            if (e.target.value.trim().length > 0) {
              setData({
                ...data,
                fecha_instalacion: e.target.value,
              });
            }
          }}
          required
        />
      </label>

      <label htmlFor="retiro">
        <span className="block mb-2 text-sm font-medium text-gray-900 mt-5">
          Fecha de retiro
        </span>
        <input
          type="date"
          id="fechaR"
          name="fechaR"
          value={(data != null) ? data.fecha_retiro : ""}
          onChange={(e) => {
            if (e.target.value.trim().length > 0) {
              setData({
                ...data,
                fecha_retiro: e.target.value,
              });
            }
          }}
        />
      </label><br />

      <div className="flex justify-center mt-7">
        <button
          type="submit"
          className="btn-normal"
        >
          Actualizar BD
        </button>
      </div>

    </form>
  );
}
