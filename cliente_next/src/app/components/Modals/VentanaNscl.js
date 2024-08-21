import { useEffect, useState } from "react";
import "@/app/styles/table-list.css";
import CrudDNscl from "../Nscl/CrudNscl";
import { XMarkIcon } from "@heroicons/react/20/solid";
import { ArrowsPointingInIcon } from "@heroicons/react/20/solid";
import { ArrowsPointingOutIcon } from "@heroicons/react/20/solid";

export default function VentanaIngresarDispositivo({ id, mostrar, setMostrar, element }) {
  const [load, setLoad] = useState(false);
  const [nscls, setNscls] = useState([]);
  const [actualizarNscls, setActualizarNscls] = useState(false);
  const [pantallaCompleta, setPantallaCompleta] = useState(false);

  const obtenerNscls = async () => {
    const response = await fetch("/api/nscl/get/" + id);  // el id es el identificador de la estación
    await response
      .json()
      .then((res) => {
        console.log("res", res);
        setNscls(res.results);
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    if (!load) {
      setMostrar(mostrar);
      setLoad(true);
    }

    if (!actualizarNscls) {
      obtenerNscls();
      setActualizarNscls(true);
    }
  }, [load, nscls, actualizarNscls]);

  return (
    <>
      {mostrar ? (
        <div className="fixed block w-full h-full m-0 p-0 z-[100] top-0 left-0 bg-[rgba(0,0,0,0.5)] overflow-y-auto mb-10">

          <div
            className={`block ml-auto mr-auto p-0 relative ${pantallaCompleta ? "w-full h-full" : "top-1/4 max-w-sm min-w-44 bottom-10"
              } rounded-xl`}
          >

            <div className="flex items-center justify-center bg-[#82A53D]">
              <h5 className="block antialiased tracking-normal font-sans text-xl font-semibold leading-snug text-white ml-auto">
                <b>NSCL</b>
              </h5>

              <button
                type="button"
                className="btn-maximiza"
                onClick={() => {
                  setPantallaCompleta(!pantallaCompleta);
                }}
              >
                {pantallaCompleta
                  ? <ArrowsPointingInIcon className="h-5 w-5" /> // iciono maximiza o maximiza
                  : <ArrowsPointingOutIcon className="h-5 w-5" />}
              </button>

              <button
                type="button"
                className="btn-close"
                onClick={() => {
                  setMostrar(false);
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
              <div className="grid grid-cols-1 overflow-y-auto">
                <section>
                  <CrudDNscl
                    nscls={nscls}
                    setNscls={setNscls}
                    id={id} // el id es el identificador de la estación
                    element={element}
                  />
                </section>
              </div>
            </section>

          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
}
