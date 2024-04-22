import { ENV } from "@/config/env";
import { useState } from "react";

// Componente/Formulario para crear estación
export default function Estacion({
  emplazamiento,
  _Map,
  _setMap,
  setSelected,
  setShow,
}) {
  const [data, setData] = useState({
    name: "",
    _emplazamiento: emplazamiento ? emplazamiento._id : "",
    state: false,
    lat: _Map._data.lat,
    long: _Map._data.long,
  });

  const crear = (e) => {
    e.preventDefault();

    if (data.name.length > 0) {
      // Agregar estación a base de datos

      fetch(ENV.URLBASE + "api/estaciones/create", {
        method: "POST",
        body: JSON.stringify({
          name: data.name,
          emplazamiento: data._emplazamiento,
          state: data.state,
          type: 2,
          lat: _Map._data.lat,
          long: _Map._data.long,
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
      setSelected((value) => (value = 0));
      setData({}); // Borramos datos innecesarios
      setShow(false);
    } else {
      alert("Debe llenar todos los campos");
    }
  };

  return (
    <form onSubmit={crear}>
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
                name: e.target.value,
              });
            }
          }}
          required
        />
      </label>
      {emplazamiento === null ? (
        <>
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
                    lat: parseFloat(e.target.value),
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
                    long: parseFloat(e.target.value),
                  });
                }
              }}
              required
            />
          </label>
        </>
      ) : (
        <></>
      )}
      {emplazamiento != null ? (
        <label htmlFor="emplazamiento">
          <span className="block mb-2 text-sm font-medium text-gray-900">
            Enlazado a <b>Emplazamiento</b>:
          </span>
          <input
            type="text"
            id="disabled-input"
            aria-label="disabled input"
            className="mb-6 bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 cursor-not-allowed"
            defaultValue={emplazamiento.name || ""}
            disabled
          />
        </label>
      ) : (
        <></>
      )}
      <label className="inline-flex items-center cursor-pointer">
        <input
          type="checkbox"
          className="sr-only peer"
          onChange={(e) => {
            setData({
              ...data,
              state: e.target.checked,
            });
          }}
        />
        <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
        <span className="ms-3 text-sm font-medium text-gray-900">
          Deshabilitar/Habilitar
        </span>
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
