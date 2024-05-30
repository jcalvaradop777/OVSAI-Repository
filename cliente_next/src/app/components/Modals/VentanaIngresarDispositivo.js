import { useEffect, useState } from "react";
import "@/app/styles/table-list.css";
import MostrarDispositivos from "../Dispositivos/Mostrar";

export default function VentanaIngresarDispositivo({ id, mostrar }) {
  const [show, setShow] = useState(false);
  const [load, setLoad] = useState(false);
  const [dispositivos, setDispositivos] = useState([]);
  const [actualizarDispositivos, setActualizarDispositivos] = useState(false);

  const obtenerDispositivos = async () => {
    const response = await fetch("/api/dispositivos/get/" + id);
    await response
      .json()
      .then((res) => {
        console.log("res", res);
        setDispositivos(res.results);
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    if (!load) {
      setShow(mostrar);
      setLoad(true);
    }

    if (!actualizarDispositivos) {
      obtenerDispositivos();
      setActualizarDispositivos(true);
    }

    window.addEventListener("keydown", (e) => {
      if(e.key === "Escape") {
        setShow(false);
      }
    })
  }, [load, dispositivos, actualizarDispositivos]);

  return (
    <>
      {show ? (
        <div className="fixed block w-full h-full m-0 p-0 z-[100] top-0 left-0 bg-[rgba(0,0,0,0.5)] overflow-y-auto mb-10">
          <div className="table ml-auto mr-auto top-1/4 p-0 relative w-7/12 rounded-xl bottom-10">
            <section
              className="relative p-2 block bg-slate-100 text-slate-800 rounded-tl-[inherit] rounded-tr-[inherit]"
              role="heading"
            >
              Dispositivos
            </section>
            <section
              role="main"
              className="p-2 relative block bg-slate-100 text-slate-800"
            >
              <div className="grid grid-cols-1 overflow-y-auto">
                <section>
                  <MostrarDispositivos
                    dispositivos={dispositivos}
                    setDispositivos={setDispositivos}
                    id={id}                   
                  />
                </section>
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
                  setShow(false);
                }}
              >
                Cerrar
              </button>
            </section>
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
}
