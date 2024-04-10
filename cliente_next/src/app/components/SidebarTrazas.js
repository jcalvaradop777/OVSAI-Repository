// Sidebar.js
import { useEffect, useState } from "react";

const SidebarTrazas = () => {

  const [selectedDate, setSelectedDate] = useState(''); // variable selectedDate que contiene el mes seleccionado del caldenario de trazas
  const [subfolders, setSubfolders] = useState(null);

  const handleDateChange = (event) => { // función llamada en el onChange del imput Calenario cuando se selecciona una fecha
    setSelectedDate(event.target.value);  // selecciona la fecha
    envioFecha(); // envía la fecha
    recibeSubfolders(); // recibe subfolders
    // otra función que llene los options de la lista con la varialbe subfolders
  };

  const envioFecha = async () => {  // envia la fecha del calendario a la url para que sea procesada en Python
    try {
      const response = await fetch('http://127.0.0.1:8000/api/procesar_fecha/',{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ selectedDate })
      });
      
      if (!response.ok) {
        throw new Error('Error al procesar la solicitud');
      }

      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error('Error al enviar la fecha:', error);
    }
  };

  const recibeSubfolders = async () => {  // envia la fecha del calendario a la url para que sea procesada en Python
    const response = await fetch("http://127.0.0.1:8000/api/procesar_fecha/"); // recibe a la URL los datos de las trazas y sus descomposition
    const jsonData = await response.json();
    console.log(`subfolders, ${jsonData}`);
    setSubfolders(jsonData);
  };

 
  // const fetchSubfolders = async () => {
  //   const response = await fetch("http://127.0.0.1:8000/api/procesar_fecha/"); // recibe a la URL los datos de las trazas y sus descomposition
  //   const jsonData = await response.json();

  //   console.log(`subfolders, ${jsonData}`);
  //   setSubfolders(jsonData);
  // };

  // useEffect(() => {
  //   fetchSubfolders();
  // }, []);

  return (
    <div className="relative flex flex-col bg-clip-border bg-white text-gray-700 h-[calc(100vh)] w-full max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5 z-50">
      <h2 className="text-xl font-bold mb-4">Trazas</h2>
      <input type="month"  id="fecha" name="fecha" onChange={handleDateChange}/>
      <p>Fecha seleccionada: {selectedDate}</p>
      <button class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded" onClick={envioFecha}>Enviar Fecha</button>     
      <nav className="flex flex-col gap-1 min-w-[240px] p-2 font-sans text-base font-normal text-gray-700">
        <select className="w-full p-2 bg-white border border-gray-300 rounded">
          <option value="opcion1">Opción 1</option>
          <option value="opcion2">Opción 2</option>
          <option value="opcion3">Opción 3</option>
        </select>
      </nav>
    </div>
  );
};

export default SidebarTrazas;