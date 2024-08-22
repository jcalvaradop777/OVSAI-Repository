"use client";

import {
  BuildingLibraryIcon,
  HomeIcon,
  InboxIcon,
} from "@heroicons/react/20/solid";
import Link from "next/link";
import { usePathname } from "next/navigation";

// Componentes
import Estacion from "./Estaciones/FrmIngresarEstacion";
import FiltrosEstaciones from "./Estaciones/FiltrosEstaciones";
import { ENV } from "@/config/env";
import { useEffect, useState } from "react";
export default function Sidebar({
  Modal,
  setModal,
  _Map,
  _setMap,
  selected,
  setSelected,
  setShow,
}) {
  const pathname = usePathname();

  const seleccionarHerramienta = (e) => {
    setShow(false);
    const valorSeleccionado = parseInt(e.target.getAttribute("data-type"));
    if (valorSeleccionado !== selected) {
      // Guardamos la herramienta seleccionada en un estado
      setSelected((value) => (value = valorSeleccionado));
    }
    if (valorSeleccionado === selected) {
      // Si vuelve a dar clic y es igual al valor guardado, se deselecciona
      setSelected((value) => (value = 0));
    }
  };

  const obtenerEstaciones = async () => {
    const res = await fetch(`${ENV.URLBASE}api/estaciones/get/`);
    return res.json();
  };

  const [last, setLast] = useState(null);
  const [estaciones, setEstaciones] = useState([]);

  useEffect(() => {
    if (_Map != null || _Map != undefined) {
      if (last != _Map.markers.length) {
        obtenerEstaciones()
          .then((res) => {
            setEstaciones(res);
            if (Array.isArray(res)) setLast(res.length);
          })
          .catch((err) => console.error(err));
      }
    }
  }, [_Map, last]);

  return (
    <>
      <div className="fixed flex flex-col bg-clip-border bg-white text-gray-700 h-[calc(100vh)] max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5 z-50">
        <div className="flex items-center justify-center">
          <img src="logoSgc2.jpg" className="w-64 h-auto" />
        </div>

        <div className="flex items-center justify-center bg-[#82A53D]">
          <h5 className="block antialiased tracking-normal font-sans text-xl font-semibold leading-snug text-white">
            <b>OVSAI</b>
          </h5>
        </div>

        <nav className="flex flex-col gap-1 w-full p-2 font-sans text-base font-normal text-gray-700">

          {pathname === "/volcan" ? (
            <>
              {/* Estaciones*/}
              <details>
                <summary>
                  <span>Estaciones</span>
                </summary>
                <ul className="grid grid-cols-3 relative p-0 m-0 list-none gap-1">
                  {/* Icono gris de estación (casita) de la barra izquierda */}
                  <li
                    className={`relative cursor-pointer select-none p-2 border-solid border-slate-400 border-[1px] rounded-xl shadow-md ${selected === 2
                        ? "border-solid border-2 border-slate-900"
                        : ""
                      }`}
                    onClick={(e) => {
                      seleccionarHerramienta(e);
                      // Mostramos el formulario para crear estación
                      setModal({
                        ...Modal,
                        //title: "Crear Estación",
                        content: (
                          <Estacion
                            emplazamiento={null}
                            _Map={_Map}
                            _setMap={_setMap}
                            setSelected={setSelected}
                            setShow={setShow}
                          />
                        ),
                      });
                    }}
                    title={
                      "Haga clic aquí y posteriormente en el mapa para crear una Estación"
                    }
                    data-type="2"
                  >
                    <div
                      className="w-full h-full absolute z-50 bg-transparent border-none p-0 m-0 left-0 top-0"
                      data-type="2"
                    ></div>
                    <span style={{ color: "gray" }}>
                      <HomeIcon className="w-full h-auto" />
                      <div style={{ textAlign: "center" }}>
                        <span className="text-black">Crear</span>
                      </div>
                    </span>
                  </li>
                </ul>

                <FiltrosEstaciones
                  datos={estaciones}
                  setEstaciones={setEstaciones}
                  campos={["id", "nombre"]}
                />
              </details>
            </>
          ) : (
            <Link
              href={"/volcan"}
              className="flex w-full justify-between rounded-lg bg-purple-100 px-4 py-2 text-left text-sm font-medium text-purple-900 hover:bg-purple-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500/75"
            >
              Volcan
            </Link>
          )}
        </nav>

        {/* para llamar rapidamente a una pagina y hacer pruebas
        <div className="flex items-center justify-center">
          <Link
            href={"/anomalias"}
            className="flex w-full justify-between rounded-lg bg-purple-100 px-4 py-2 text-left text-sm font-medium text-purple-900 hover:bg-purple-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500/75"
          >
            Anomalias
          </Link>
        </div>
        */}

        <Link
          href={"/"}
          className="flex w-full justify-between rounded-lg bg-purple-100 px-4 py-2 text-left text-sm font-medium text-purple-900 hover:bg-purple-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500/75"
        >
          Visualizador
        </Link>

        <Link
          href={"/chat"}
          className="flex w-full justify-between rounded-lg bg-purple-100 px-4 py-2 text-left text-sm font-medium text-purple-900 hover:bg-purple-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500/75"
        >
          Chat
        </Link>
      </div>
    </>
  );
}
