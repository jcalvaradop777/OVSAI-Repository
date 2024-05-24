import { useState } from "react";
import EditarEstacion from "../Estaciones/FrmEditarEstacionTotal";
import { XMarkIcon } from "@heroicons/react/20/solid";

// Este componente es una ventana modal que muestra los datos de Guralp como trazas

export default function VentanaEditarEstacion({ mostrar, setMostrar, id }) {

  return (
    <div className="fixed block w-full h-full m-0 p-0 z-[100] top-0 left-0 bg-[rgba(0,0,0,0.5)] overflow-y-auto mb-10">

      <div
        className={`block ml-auto mr-auto p-0 relative mt-10 "top-1/4 max-w-sm min-w-44 bottom-10" mb-10 rounded-xl`}
      >

        <div className="flex items-center justify-center bg-[#82A53D]">
          <h5 className="block antialiased tracking-normal font-sans text-xl font-semibold leading-snug text-white ml-auto">
            <b>  Datos de la estación</b>
          </h5>

          <button
            type="button"
            className="btn-close ml-auto"
            onClick={() => {
              setMostrar(false);
            }}
          >
            <XMarkIcon
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
            <EditarEstacion id={id} />
          </div>
        </section>
      </div>
    </div>
  );
}
