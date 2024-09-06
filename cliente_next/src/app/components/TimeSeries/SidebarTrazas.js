import { useState } from "react";

const SidebarTrazas = ({ onEnviarDatos, element, id }) => {
  // onEnviarDatos es un parametro que recibe una funcion creada en la pagina de guralp que setea la variable "trazasRecibidas" con la información recibida desde Django y pueda grafiar las trazas en el lado derecho
  // el id es el id de la estación 

  console.log(`id, ${id}`);

  const [ruta, setRuta] = useState(null);
  const [filesNames, setfilesNames] = useState(null);
  const [canal, setCanal] = useState(null);
  //const [trazasObox, setTrazasObox] = useState(null);

  const [datos, setdatos] = useState({
    fecha: "",
    canal: "",
    archivoGCF: "",
    tipoTraza: "",
  }); // para base de datos

  const [estacionesGuralp, setEstacionesGuralp] = useState({
    ROCP: "ovsp_aroc",
    LIMP: "ovsp_clim",
    MESP: "ovsp_cmes",
    ARLP: "ovsp_garl",
    COBP: "ovsp_gcob",
    CONP: "ovsp_gcon",
    CHIP: "ovsp_ichi",
    CERP: "ovsp_ncer",
  });

  const handleDateChange = (event) => {
    // función llamada en el onChange del imput Calenario cuando se selecciona una fecha
    fecha2Split(event.target.value); // envía la fecha (event.target.value tiene la fecha seleccionada en el calendario)
    setdatos({ ...datos, fecha: event.target.value });

    // Cargar canal y filtrar

    // const resultadoFiltro = Object.keys(estacionesGuralp).find((estacion) => estacion.includes(element.id));
    // if (resultadoFiltro != undefined || resultadoFiltro != null) {
    //   handleSubfolderChange(estacionesGuralp[resultadoFiltro]);
    // }
  };

  const handleCanalChange = (event) => {
    const estacion = estacionesGuralp[id];
    console.log(`id2estacion, ${estacion}`);
    const rutaC = ruta + estacion + event.target.value

    console.log(rutaC);
    nombresArchivos(rutaC);
    setdatos({ ...datos, canal: event.target.value });
  };

  // const handleSubfolderChange = (canal) => {
  //   nombresArchivos(canal);
  //   setdatos({ ...datos, canal: canal });
  // };

  const handleFileNamesChange = (event) => {
    //setTrazasObox("trazas");
    const selectedValues =
      event.target.selectedOptions != undefined
        ? Array.from(event.target.selectedOptions).map((option) => option.value)
        : null;
    console.log(`selectedValues, ${selectedValues}`);
    if (selectedValues != null) {
      getTrazas(selectedValues, "trazas");
      setdatos({ ...datos, archivoGCF: selectedValues });
    }
  };


  const handleFileNamesChangeBox = (event) => {
    //setTrazasObox("box");
    const selectedValues = Array.from(event.target.selectedOptions).map(
      (option) => option.value
    );
    getTrazas(selectedValues, "box");
  };

  const fecha2Split = async (selectedDate) => {
    // envia la fecha del calendario a la url para que sea procesada en Python
    console.log(`selectedDate, ${selectedDate}`);
    try {
      const response = await fetch(
        "http://127.0.0.1:8000/api/fecha2Subfolders/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ selectedDate }), // con post, en el body va el mensaje a la páginga
        }
      );

      if (!response.ok) {
        throw new Error("Error al procesar la solicitud");
      }

      const data = await response.json(); // respuesta de django que trae los subfolders
      setRuta(data.rutaGcfFecha); // subfolder_names es el nombre dado en Django en el modulo angenteInclometroGuralp.py en la función getFilesNames
      console.log(`fechaSplit, ${data.rutaGcfFecha}`);
    } catch (error) {
      console.error("Error al obtener la ruta:", error);
    }
  };

  const nombresArchivos = async (selectedSubfolder) => {
    // envia el subfolder seleccionado para que sea procesado en Python y retorno el nombre de sus archivos
    console.log(`selectedSubfolder, ${selectedSubfolder}`);
    try {
      const response = await fetch(
        "http://127.0.0.1:8000/api/nombresArchivos/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ selectedSubfolder }),
        }
      );

      if (!response.ok) {
        throw new Error("Error al procesar la solicitud");
      }

      const data = await response.json(); // respuesta de django que trae los nombres de los archivos
      setfilesNames(data.file_names); // files_names es el nombre dado en Django en el modulo angenteInclometroGuralp.py en la función getFilesNames
      console.log(`filesNames, ${filesNames}`);
    } catch (error) {
      console.error(
        "Error en obtener los nombres de los archivos de los subfolders:",
        error
      );
    }
  };

  const getTrazas = async (fileNamesSelected, trazasObox) => {
    // envia la el nombre del archivo seleccionado para que sea procesada en Python y retorno las trazas
    console.log(`selectedfileName, ${fileNamesSelected}`);
    try {
      const response = await fetch("http://127.0.0.1:8000/api/trazas/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ fileNamesSelected }),
      });

      if (!response.ok) {
        throw new Error("Error al procesar la solicitud");
      }

      const trazas = await response.json(); // respuesta de django que trae los nombres de los archivos
      console.log(`trazas, ${trazas}`);
      onEnviarDatos(trazas, trazasObox); // esta función es pasada como parametro a este componente, por aqui envío las trazas al lado derecho de la pagina
      // trazasObox es una variable envida a lado dererecho por la función onEnviarDatos que permite dibujar las trazas o los boxPolts
    } catch (error) {
      console.error(
        "Error en obtener los nombres de los archivos de los subfolders:",
        error
      );
    }
  };

  const handleTipoChange = (event) => {
    setdatos({ ...datos, tipoTraza: event.target.value });
  };

  const handleCrearAnomalia = () => {
    fetch("/api/anomalias/create", {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(datos),
    }); // envia una petición
  };

  return (
    <div className="relative flex flex-col bg-clip-border bg-gray-200 text-gray-700 h-[calc(100vh)] w-full max-w-[15rem] p-4 shadow-xl shadow-blue-gray-900/5 z-50">
      <div className="flex items-center justify-center bg-[#8A8C8E]">
        <h2 className="text-2xl font-bold text-white mt-8 mb-8">Gráficas</h2>
      </div>

      <details>
        <summary className="mt-8">
          <span>Seleccione el mes</span>
        </summary>
        <ul className="grid grid-cols-3 relative p-0 m-0 list-none gap-1">
          <li>
            <input
              type="month"
              id="fecha"
              name="fecha"
              onChange={handleDateChange}
            />
          </li>
        </ul>
      </details>

      {/* <details>
        <summary>
          <span>Seleccione el canal</span>
        </summary>
        <ul className="grid grid-cols-3 relative p-0 m-0 list-none gap-1">
          <li>
            <div>
              {subfolders ? (
                <select onChange={handleSubfolderChange}>
                  {subfolders.map((folder, index) => (
                    <option key={index} value={folder}>
                      {folder}
                    </option>
                  ))}
                </select>
              ) : (
                <p>-----</p>
              )}
            </div>
          </li>
        </ul>
      </details> */}

      <details>
        <summary>
          <span>Canales:</span>
        </summary>
        <ul className="grid grid-cols-3 relative p-0 m-0 list-none gap-1">
          <li>
            <div>
              <select onChange={handleCanalChange}>
                <option value="mb">mb</option>
                <option value="mc">mc</option>
                <option value="md">md</option>
                <option value="me">me</option>
              </select>
            </div>
          </li>
        </ul>
      </details>

      <details>
        <summary>
          <span>Trazas:</span>
        </summary>
        <ul className="grid grid-cols-3 relative p-0 m-0 list-none gap-1">
          <li>
            <div>
              {filesNames ? (
                <select
                  //onClick={handleFileNamesChange}
                  onChange={handleFileNamesChange}
                  size="10"
                  multiple
                >
                  {filesNames.map((file, index) => (
                    <option key={index} value={file}>
                      {file}
                    </option>
                  ))}
                </select>
              ) : (
                <p>-----</p>
              )}
            </div>
          </li>
        </ul>
      </details>

      <details>
        <summary>
          <span>BoxPlot:</span>
        </summary>
        <ul className="grid grid-cols-3 relative p-0 m-0 list-none gap-1">
          <li>
            <div>
              {filesNames ? (
                <select onChange={handleFileNamesChangeBox}>
                  {filesNames.map((file, index) => (
                    <option key={index} value={file}>
                      {file}
                    </option>
                  ))}
                </select>
              ) : (
                <p>-----</p>
              )}
            </div>
          </li>
        </ul>
      </details>

      <details>
        <summary>
          <span>Entrenamiento:</span>
        </summary>
        <div>
          <ul className="grid grid-cols-3 relative p-0 m-0 list-none gap-1">
            <li>
              <div>
                <select onChange={handleTipoChange}>
                  <option value="normal">normal</option>
                  <option value="nulo">nulo</option>
                  <option value="salto">salto</option>
                  <option value="offset">offset</option>
                  <option value="atípico">atípico</option>
                  <option value="disperso">disperso</option>
                  <option value="sismo">sismo</option>
                  <option value="intermitente">intermitente</option>
                </select>
              </div>
            </li>
          </ul>
        </div>
        <div>
          <button
            type="button"
            className="text-white bg-[#82A53D] hover:bg-[#C4D92E] hover:text-[#8A8C8E] focus:ring-4 focus:text-white focus:ring-red-500 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            onClick={handleCrearAnomalia}
          >
            Etiquetar
          </button>
        </div>
      </details>
    </div>
  );
};

export default SidebarTrazas;

// --sgcHoja: #C4D92E;
// 	--sgcPasto: #9FBC2E;
// 	--sgcArbol: #82A53D;  class="bg-[#82A53D]"
// 	--sgcGris: #8A8C8E;   bg-gray-400
