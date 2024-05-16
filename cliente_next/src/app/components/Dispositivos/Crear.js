import { useEffect, useState } from "react"

export default function CrearDispositivo() {

    const [dispositivos, setDispositivos] = useState([]);
    const [filtro, setFiltro] = useState([]);
    const [busqueda, setBusqueda] = useState("");
    const [load, setLoad] = useState(false);

    // Obtener dispositivos que no han sido agregados
    const obtenerDispositivos = () => {
        setDispositivos([
            "DIGITALIZADOR",
            "SISMÓMETRO DE BANDA ANCHA",
            "INCLINÓMETRO",
            "PANEL SOLAR",
            "RADIO MODEM",
            "ANTENA GNSS",
            "RECEPTOR GNSS",
            "REGULADOR DC",
            "CONTROLADOR DE CARGA",
            "ANTENA",
            "SWITCH",
            "SENSOR DE INFRASONIDO",
            "CÁMARA WEB",
            "TERMOCUPLA",
            "GABINETE DE ACERO",
            "TELESCOPIO",
            "FIBRA ÓPTICA",
            "ESPECTRÓMETRO",
            "PC INTEGRADO",
            "ANTENA DE GPS",
            "SISMOMETRO/DIGITALIZADOR"
        ]);
    }

    // Función buscar
    const handleSearch = (e) => {
        e.preventDefault();
        if(busqueda.length > 0) {
            setFiltro([
                ...dispositivos.filter((q) => q.includes(busqueda))
            ])
        }
    }

    useEffect(() => {
        if(!load) {
            obtenerDispositivos();
            setLoad(true);
        }
    }, [load]);

    return (
        <>
            {/* Buscador dispositivos */}
            <form class="w-full mx-auto" method="POST" onSubmit={handleSearch}>
                <label
                  for="default-search"
                  class="mb-2 text-sm font-medium text-gray-900 sr-only"
                >
                  Buscar
                </label>
                <div class="relative w-full block">
                  <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                    <svg
                      class="w-4 h-4 text-gray-500"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 20 20"
                    >
                      <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                      />
                    </svg>
                  </div>
                  <input
                    type="search"
                    id="default-search"
                    class="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Buscar dispositivos"
                    value={busqueda}
                    onChange={(e) => {
                        setBusqueda(e.target.value);
                    }}
                    required
                  />
                  <button
                    type="submit"
                    class="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2"
                  >
                    Buscar
                  </button>
                </div>
              </form>

              {/* Buscador dispositivos fin */}

              <ul className="grid">

                {filtro.map((d) => (
                    <li>{d}</li>
                ))}
              </ul>
        </>
    )
}