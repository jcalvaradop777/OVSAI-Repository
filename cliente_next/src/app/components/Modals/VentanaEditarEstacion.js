import {useEffect } from "react";
import EditarEstacion from "../Estaciones/FrmEditarEstacionTotal";

// Este componente es una ventana modal que muestra los datos de Guralp como trazas

export default function VentanaEditarEstacion({ mostrar, setMostrar, id }) {
  
  useEffect(() => {
    window.addEventListener("keydown", (e) => {
      if(e.key === "Escape") {
        setMostrar(false);
      }
    })
  })

  return (
    <div className="fixed block w-full h-full m-0 p-0 z-[100] top-0 left-0 bg-[rgba(0,0,0,0.5)] overflow-y-auto mb-10">
      
      <div
        className={`block ml-auto mr-auto p-0 relative mt-10 "top-1/4 max-w-sm min-w-44 bottom-10" mb-10 rounded-xl`}
      >

        <div className="flex items-center justify-center bg-[#82A53D]">
          <h5 className="block antialiased tracking-normal font-sans text-xl font-semibold leading-snug text-white">
            <b>Datos de la estación</b>
          </h5>
        </div>

        <section
          role="main"
          className="p-2 relative block bg-slate-100 text-slate-800"
        >
          <div className="flex">
            <EditarEstacion id={id}/> 
          </div>
        </section>
        
        <section
          role="footer"
          className="p-2 relative block bg-slate-100 text-slate-800 rounded-bl-[inherit] rounded-br-[inherit]"
        >
          <button
            type="button"
            className="text-white bg-[#82A53D] hover:bg-[#C4D92E] hover:text-[#8A8C8E] focus:ring-4 focus:text-white focus:ring-red-500 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            onClick={() => {
              setMostrar(false);
            }}
          >
            Cerrar
          </button>
        </section>

      </div>
    </div>
  );
}
