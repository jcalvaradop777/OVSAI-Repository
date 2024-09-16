const SidebarAnomalias = ({ onEnviarDatos }) => { // para pasarle datos a otra pagina

  const handleDateChange = (event) => { // función llamada en el onChange del imput Calenario cuando se selecciona una fecha
    getAnomalias(event.target.value); // envía la fecha (event.target.value tiene la fecha seleccionada en el calendario)
  };

  const getAnomalias = async (selectedDate) => {  // envia la fecha del calendario a la url para que sea procesada en Python
    console.log(`selectedDate, ${selectedDate}`);
    try {
      const response = await fetch('http://127.0.0.1:8000/api/anomalias/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ selectedDate }) // con post, en el body va el mensaje a la páginga
      });

      if (!response.ok) {
        throw new Error('Error al procesar la solicitud');
      }

      const anomalias = await response.json(); // respuesta de django que trae las anomalias
      onEnviarDatos(anomalias);

    } catch (error) {
      console.error('Error en obtener las anomalías:', error);
    }
  };

  return (

    <div className="relative flex flex-col bg-clip-border bg-gray-200 text-gray-700 h-[calc(100vh)] w-full max-w-[15rem] p-4 shadow-xl shadow-blue-gray-900/5 z-50">

      <div className="flex items-center justify-center bg-[#9FBC2E]">
        <h2 className="text-2xl font-bold text-white mt-8 mb-8">Anomalías</h2>
      </div>

      <details>
        <summary className="mt-8">
          <span>Seleccione el mes</span>
        </summary>
        <ul className="grid grid-cols-3 relative p-0 m-0 list-none gap-1">
          <li>
            <input type="month" id="fecha" name="fecha" onChange={handleDateChange} />
          </li>
        </ul>
      </details>

    </div>
  );
};

export default SidebarAnomalias;