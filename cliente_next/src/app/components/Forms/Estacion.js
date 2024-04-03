// Componente/Formulario para crear estación
export default function Estacion({ _data, _setData }) {
  const crear = (e) => {
    e.preventDefault();
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
          required
        />
      </label>
      <label htmlFor="emplazamiento">
        <span className="block mb-2 text-sm font-medium text-gray-900">
          Enlazado a: <b>Emplazamiento</b>
        </span>
        <input
          type="text"
          id="disabled-input"
          aria-label="disabled input"
          className="mb-6 bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 cursor-not-allowed"
          defaultValue={_data.emplazamiento || ""}
          disabled
        />
      </label>
      <label className="inline-flex items-center cursor-pointer">
        <input type="checkbox" className="sr-only peer" />
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
