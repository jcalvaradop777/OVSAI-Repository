import { useState } from "react";

export default function EmplazamientoEdit({
    data
}) {
    const [data, setData] = useState({
        name: "",
        latitud: "",
        longitud: ""
    })

    const enviarDatos = () => {

    }

    return (
        <form onSubmit={enviarDatos}>
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
          value={data.name}
          onChange={(e) => {
            setData({
                ...data,
                name: e.target.value
            })
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
          value={data.latitud}
          onChange={(e) => {
            setData({
                ...data,
                latitud: e.target.value
            })
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
          value={data.longitud}
          onChange={(e) => {
            setData({
                ...data,
                longitud: e.target.value
            })
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
    )
}