import { useEffect, useState } from "react";

const SidebarTrazas = ({ onEnviarDatos }) => { // onEnviarDatos es un parametro que recibe una funcion creada en la pagina de guralp que setea la variable "trazasRecibidas" con la información recibida desde Django y pueda grafiar las trazas en el lado derecho

  const [subfolders, setSubfolders] = useState(null);
  const [filesNames, setfilesNames] = useState(null);

  const handleDateChange = (event) => { // función llamada en el onChange del imput Calenario cuando se selecciona una fecha
    fecha2Subfolders(event.target.value); // envía la fecha (event.target.value tiene la fecha seleccionada en el calendario)
  };

  const handleSubfolderChange = (event) => {
    nombresArchivos(event.target.value);
  };

  const handleFileNamesChange = (event) => {
    getTrazas(event.target.value);
  };

  const fecha2Subfolders = async (selectedDate) => {  // envia la fecha del calendario a la url para que sea procesada en Python
    console.log(`selectedDate, ${selectedDate}`);
    try {
      const response = await fetch('http://127.0.0.1:8000/api/fecha2Subfolders/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ selectedDate })
      });

      if (!response.ok) {
        throw new Error('Error al procesar la solicitud');
      }

      const data = await response.json(); // respuesta de django que trae los subfolders
      setSubfolders(data.subfolder_names); // subfolder_names es el nombre dado en Django en el modulo angenteInclometroGuralp.py en la función getFilesNames
      console.log(`subfolders, ${ subfolders }`);

    } catch (error) {
      console.error('Error en obtener los subfolders:', error);
    }
  };
  

  const nombresArchivos = async (selectedSubfolder) => {  // envia el subfolder seleccionado para que sea procesado en Python y retorno el nombre de sus archivos
    console.log(`selectedSubfolder, ${selectedSubfolder}`);
    try {
      const response = await fetch('http://127.0.0.1:8000/api/nombresArchivos/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ selectedSubfolder })
      });

      if (!response.ok) {
        throw new Error('Error al procesar la solicitud');
      }

      const data = await response.json(); // respuesta de django que trae los nombres de los archivos
      setfilesNames(data.file_names); // files_names es el nombre dado en Django en el modulo angenteInclometroGuralp.py en la función getFilesNames
      console.log(`filesNames, ${ filesNames }`);

    } catch (error) {
      console.error('Error en obtener los nombres de los archivos de los subfolders:', error);
    }
  };


  const getTrazas = async (fileName) => {  // envia la el nombre del archivo seleccionado para que sea procesada en Python y retorno las trazas
    console.log(`selectedfileName, ${fileName}`);
    try {
      const response = await fetch('http://127.0.0.1:8000/api/trazas/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ fileName })
      });

      if (!response.ok) {
        throw new Error('Error al procesar la solicitud');
      }

      const trazas = await response.json(); // respuesta de django que trae los nombres de los archivos
      onEnviarDatos(trazas); // esta función es pasada como parametro a este componente, por aqui envío las trazas al lado derecho de la pagina
      console.log(`trazas, ${ trazas }`);

    } catch (error) {
      console.error('Error en obtener los nombres de los archivos de los subfolders:', error);
    }
  };

  return (
    <div className="relative flex flex-col bg-clip-border bg-white text-gray-700 h-[calc(100vh)] w-full max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5 z-50">
      <h2 className="text-xl font-bold mb-4">Trazas</h2>
      <input type="month" id="fecha" name="fecha" onChange={handleDateChange} />
      <nav className="flex flex-col gap-1 min-w-[240px] p-2 font-sans text-base font-normal text-gray-700">
        
        <div>
          {subfolders ? (
            <select onChange={handleSubfolderChange}>
              {subfolders.map((folder, index) => (
                <option key={index} value={folder}>{folder}</option>
              ))}
            </select>
          ) : (
            <p>Cargando subfolders...</p>
          )}
        </div>

        <div>
          {filesNames ? (
            <select onChange={handleFileNamesChange}>
              {filesNames.map((file, index) => (
                <option key={index} value={file}>{file}</option>
              ))}
            </select>
          ) : (
            <p>Cargando los nombres de los archivos GCF...</p>
          )}
        </div>

      </nav>
    </div>
  );
};

export default SidebarTrazas;