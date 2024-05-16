import { ENV } from "@/config/env";
import { useState } from "react";

// Componente/Formulario para crear estación  :  Tipo ventana modal, llena los 4 elementos mas importantes: id, nombre, longitud y latitud. 
// Para ingresar los demás datos de la tabla estaciones, se lo hace mediante el fomulario: EstacionTotal.
export default function IngresarEstacion({
  _Map,
  _setMap,
  setSelected,
  setShow,
}) {
  const [data, setData] = useState({
    id: "",
    nombre: "",
    state: false,
    latitud: _Map._data.lat,
    longitud: _Map._data.long,
  });

  const crear = (e) => {
    e.preventDefault();

    if (data.nombre.length > 0 && data.id.length > 0) {
      // Agregar estación a base de datos

      fetch(ENV.URLBASE + "api/estaciones/create", {
        method: "POST",
        body: JSON.stringify({  // Esto es lo que se envia a la base de datos
          id: data.id,
          nombre: data.nombre,
          latitud: _Map._data.lat,
          longitud: _Map._data.long,
        }),
        headers:{
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });

      // ---
      _setMap({
        ..._Map,
        _data: {},
        reload: true,
      });

      setSelected((value) => (value = 0));
      setData({}); // Borramos datos innecesarios
      setShow(false);

    } else {
      alert("Debe llenar todos los campos");
    }
  };

  return (
    <form onSubmit={crear}>

      <label htmlFor="id">
        <span className="block mb-2 text-sm font-medium text-gray-900">
          Identificador
        </span>
        <input
          type="text"
          id="id"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
          placeholder="Identificador"
          onChange={(e) => {
            if (e.target.value.trim().length > 0) {
              setData({
                ...data,
                id: e.target.value,
              });
            }
          }}
          required
        />
      </label>

      <label htmlFor="name">
        <span className="block mb-2 text-sm font-medium text-gray-900">
          Nombre estación
        </span>
        <input
          type="text"
          id="name"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
          placeholder="Nombre estación"
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

      {<>
        <label htmlFor="lat">
          <span className="block mb-2 text-sm font-medium text-gray-900">
            Latitud
          </span>
          <input
            type="text"
            id="lat"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
            placeholder="Latitud emplazamiento"
            autoComplete={"off"}
            defaultValue={_Map._data.lat || ""}
            onChange={(e) => {
              if (e.target.value.trim().length > 0) {
                setData({
                  ...data,
                  latitud: parseFloat(e.target.value),
                });
              }
            }}
            required
          />
        </label>
        <label htmlFor="long">
          <span className="block mb-2 text-sm font-medium text-gray-900">
            Longitud
          </span>
          <input
            type="text"
            id="long"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
            placeholder="Longitud emplazamiento"
            autoComplete={"off"}
            defaultValue={_Map._data.long || ""}
            onChange={(e) => {
              if (e.target.value.trim().length > 0) {
                setData({
                  ...data,
                  longitud: parseFloat(e.target.value),
                });
              }
            }}
            required
          />
        </label>
      </>}

      <div className="block mt-2">
        <button
          type="submit"
          className="text-white bg-[#82A53D] hover:bg-[#C4D92E] hover:text-[#8A8C8E] focus:ring-4 focus:text-white focus:ring-red-500 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        >
          Crear
        </button>
      </div>
    </form>
  );
}
