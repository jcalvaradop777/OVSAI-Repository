import { useEffect, useState } from "react";
import SidebarTrazas from "../SidebarTrazas";
import Traza from "../Traza";
import BoxPlot from "../BoxPlot";

// Este componente es una ventana modal que muestra los datos de Guralp como trazas

export default function VentanaGuralp({ mostrarVentana, setVentana }) {
  const [data, setData] = useState(null);
  const [pantallaCompleta, setPantallaCompleta] = useState(false);

  const fetchData = async () => {
    const response = await fetch("http://127.0.0.1:8000/api/data/"); // recibe a la URL los datos de las trazas y sus descomposition
    const jsonData = await response.json();

    console.log(jsonData);
    setData(jsonData);
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (data == null) {
    return <p>Cargando...</p>;
  }

  return (
    <div className="fixed block w-full h-full m-0 p-0 z-[100] top-0 left-0 bg-[rgba(0,0,0,0.5)] overflow-y-auto mb-10">
      <div
        className={`block ml-auto mr-auto p-0 relative ${
          pantallaCompleta ? "w-full h-full" : "top-1/4 max-w-sm min-w-44 bottom-10"
        } rounded-xl`}
      >
        <section
          className="relative p-2 block bg-slate-100 text-slate-800 rounded-tl-[inherit] rounded-tr-[inherit]"
          role="heading"
        >
          Trazas |
          <button
            type="button"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            onClick={() => {
              setPantallaCompleta(!pantallaCompleta);
            }}
          >
            {pantallaCompleta
              ? "Desactivar pantalla completa"
              : "Activar pantalla completa"}
          </button>
        </section>
        <section
          role="main"
          className="p-2 relative block bg-slate-100 text-slate-800"
        >
          <div className="flex">
            <SidebarTrazas />
            <div className="flex-1">
              <div className="p-1">
                <Traza
                  dx={data.idx}
                  dy={data.valores}
                  dtitulo={"Traza individual: " + data.titulo}
                />
                <Traza
                  dx={data.tiempo}
                  dy={data.estacionalidad}
                  dtitulo={"Componente estacional: " + data.titulo}
                />
                <Traza
                  dx={data.tiempo}
                  dy={data.ruido}
                  dtitulo={"Componente residual: " + data.titulo}
                />
                <Traza
                  dx={data.tiempo}
                  dy={data.tendencia}
                  dtitulo={"Tendencia: " + data.titulo}
                />
                <BoxPlot
                  dy={data.valores}
                  dtitulo={"Box-plot: " + data.titulo}
                />
              </div>
            </div>
          </div>
        </section>
        <section
          role="footer"
          className="p-2 relative block bg-slate-100 text-slate-800 rounded-bl-[inherit] rounded-br-[inherit]"
        >
          <button
            type="button"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            onClick={() => {
              setVentana(false);
            }}
          >
            Cerrar
          </button>
        </section>
      </div>
    </div>
  );
}
