import { useState } from "react";
import { ENV } from "@/config/env";

// Componente/Formulario para crear emplazamiento
export default function Emplazamiento({
  _Map,
  _setMap,
  setSelected,
  setShow,
}) {
  // Estado para guardar los datos del formulario
  const [data, setData] = useState({
    name: "",
    lat: _Map._data.lat,
    long: _Map._data.long,
  });

  // Función para crear el emplazamiento al enviar el formulario
  const crear = (e) => {
    e.preventDefault();

    // Agregar a los emplazamientos

    if (data.name && _Map._data.lat && _Map._data.long) {
      // Agregar emplazamiento a base de datos

      fetch(ENV.URLBASE + "api/emplazamientos/create", {
        method: "POST",
        body: JSON.stringify({
          name: data.name,
          latitude: _Map._data.lat + "",
          longitude: _Map._data.long + "",
          type: 1,
        }),
        headers: {
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
      setSelected((value) => value = 0);
      setData({}); // Borramos datos innecesarios
      setShow(false);
    } else {
      alert("Ha ocurrido un error al crear el emplazamiento");
    }
  };

  return (
    <form onSubmit={crear}>
      <label htmlFor="name">
        <span className="block mb-2 text-sm font-medium text-gray-900">
          Nombre emplazamiento
        </span>
        <input
          type="text"
          id="name"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
          placeholder="Nombre emplazamiento"
          autoComplete={"off"}
          onChange={(e) => {
            if (e.target.value.trim().length > 0) {
              setData({
                ...data,
                name: e.target.value,
              });
            }
          }}
          required
        />
      </label>
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
                lat: e.target.value,
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
                long: e.target.value,
              });
            }
          }}
          required
        />
      </label>
      <div className="block mt-2">
        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
        >
          Crear
        </button>
      </div>
    </form>
  );
}
