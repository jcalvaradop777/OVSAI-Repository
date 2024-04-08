import { useEffect, useRef, useState } from "react";
import InputError from "../Inputs/Error";

// Componente/Formulario para crear emplazamiento
export default function Emplazamiento({
  _data,
  _setData,
  emplazamientos,
  setE,
  markers,
  setMarkers,
  setShow,
  setSelected,
  reload,
  setReload
}) {
  const [data, setData] = useState({
    name: "",
    lat: _data.lat,
    long: _data.long,
    state: false,
  });
  const latInput = useRef(null);
  const longInput = useRef(null);

  const crear = (e) => {
    e.preventDefault();

    // Agregar a los emplazamientos

    if (!_data.status)
      _setData({
        ..._data,
        status: false,
      });

    if (_data.name && _data.lat && _data.long && _data.status) {
      setE([
        {
          ...data,
          id: emplazamientos.length + 1,
          lat: _data.lat || latInput.current.value,
          long: _data.long || longInput.current.value,
        },
        ...emplazamientos,
      ]);

      setReload(true);
      setSelected((value) => (value = 0));
      _setData({});
      setShow(false);
    } else {
      alert("Ha ocurrido un error al crear el emplazamiento");
    }
  };

  return (
    <form onSubmit={crear}>
      <InputError
        label={"name"}
        textLabel={"Nombre emplazamiento"}
        type={"text"}
        placeholder={"Nombre emplazamiento"}
        required
        autoComplete={"off"}
        _data={_data}
        _setData={_setData}
        Change={(e) => {
          if (e.target.value.trim().length > 0) {
            setData({
              ...data,
              name: e.target.value,
            });
          }
        }}
        message={"Debe llenar los campos vacios"}
      />
      <InputError
        label={"lat"}
        textLabel={"Latitud"}
        type={"text"}
        placeholder={"Latitud emplazamiento"}
        required
        autoComplete={"off"}
        _data={_data}
        _setData={_setData}
        defaultValue={_data.lat || ""}
        onChange={(e) => {
          if (e.target.value.trim().length > 0) {
            setData({
              ...data,
              lat: parseFloat(e.target.value),
            });
          }
        }}
        message={"Debe llenar los campos vacios"}
      />
      <InputError
        label={"long"}
        textLabel={"Longitud"}
        type={"text"}
        placeholder={"Longitud emplazamiento"}
        required
        autoComplete={"off"}
        _data={_data}
        _setData={_setData}
        defaultValue={_data.long || ""}
        onChange={(e) => {
          if (e.target.value.trim().length > 0) {
            setData({
              ...data,
              long: parseFloat(e.target.value),
            });
          }
        }}
        message={"Debe llenar los campos vacios"}
      />
      <label className="inline-flex items-center cursor-pointer">
        <input
          type="checkbox"
          className="sr-only peer"
          onChange={(e) => {
            setData({
              ...data,
              state: e.target.checked,
            });

            _setData({
              ..._data,
              status: true,
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
