// Sidebar.js
import React, { useState } from 'react';
import axios from 'axios';

const SidebarTrazas = () => {

  const [selectedDate, setSelectedDate] = useState(''); // variable selectedDate que contiene el mes seleccionado del caldenario de trazas

  const handleDateChange = (event) => { // función llamada en el onChange del imput Calenario
    setSelectedDate(event.target.value);
  };


  const handleSubmit = async () => {  // envia la fecha del calendario a la url para que sea procesada en Python
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

  return (
    <div className="relative flex flex-col bg-clip-border bg-white text-gray-700 h-[calc(100vh)] w-full max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5 z-50">
      <h2 className="text-xl font-bold mb-4">Trazas</h2>
      <input type="month"  id="fecha" name="fecha" onChange={handleDateChange}/>
      <nav className="flex flex-col gap-1 min-w-[240px] p-2 font-sans text-base font-normal text-gray-700">
        <select className="w-full p-2 bg-white border border-gray-300 rounded">
          <option value="opcion1">Opción 1</option>
          <option value="opcion2">Opción 2</option>
          <option value="opcion3">Opción 3</option>
        </select>
      </nav>
      <p>Fecha seleccionada: {selectedDate}</p>
      <button onClick={handleSubmit}>Enviar Fecha</button>
    </div>
  );
};

export default SidebarTrazas;