import { useState } from "react";
import RenderTrazaGuralp from "@/app/guralp/page";
import { XMarkIcon } from "@heroicons/react/20/solid";
import { ArrowsPointingInIcon } from "@heroicons/react/20/solid";
import { ArrowsPointingOutIcon } from "@heroicons/react/20/solid";

// Este componente es una ventana modal que muestra los datos de Guralp como trazas

export default function VentanaGuralp({ mostrarVentana, setVentana }) {
  
  const [pantallaCompleta, setPantallaCompleta] = useState(false);

  return (
    <div className="fixed block w-full h-full m-0 p-0 z-[100] top-0 left-0 bg-[rgba(0,0,0,0.5)] overflow-y-auto mb-10">
      <div
        className={`block ml-auto mr-auto p-0 relative ${pantallaCompleta ? "w-full h-full" : "top-1/4 max-w-sm min-w-44 bottom-10"
          } rounded-xl`}
      >

        <div className="flex items-center justify-center bg-[#82A53D]">
          <h5 className="block antialiased tracking-normal font-sans text-xl font-semibold leading-snug text-white ml-auto">
            <b>Series de tiempo Guralp</b>
          </h5>

          <button
            type="button"
            className="btn-maximiza"
            onClick={() => {
              setPantallaCompleta(!pantallaCompleta);
            }}
          >
            {pantallaCompleta
              ? <ArrowsPointingInIcon className="h-5 w-5"/> // iciono maximiza
              : <ArrowsPointingOutIcon className="h-5 w-5"/>} 
          </button>

          <button
            type="button"
            className="btn-close"
            onClick={() => {
              setVentana(false);
            }}
          >
            <XMarkIcon  // icono cerrar
              width="20"
              height="20"
            />
          </button>
        </div>

        <section
          role="main"
          className="p-2 relative block bg-slate-100 text-slate-800"
        >
          <div className="flex">
            <RenderTrazaGuralp />
          </div>
        </section>

      </div>
    </div>
  );
}
