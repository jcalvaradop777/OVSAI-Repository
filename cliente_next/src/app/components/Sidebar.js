"use client";

import {
  BuildingLibraryIcon,
  HomeIcon,
  InboxIcon,
} from "@heroicons/react/20/solid";
import Basic from "./Modals/Basic";
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
// Componentes
import Emplazamiento from "./Forms/Emplazamiento";
import Estacion from "./Forms/Estacion";
import Sensor from "./Forms/Sensor";

export default function Sidebar({
  emplazamientos,
  estaciones,
  sensores,
  setContent,
  setTitle,
  _setData,
  _data,
  selected,
  setSelected,
  setShow,
  setE,
  markers,
  setMarkers,
  _em,
  _setEm,
  reload,
  setReload
}) {
  const pathname = usePathname();

  const seleccionarHerramienta = (e) => {
    setShow(false);
    const valorSeleccionado = parseInt(e.target.getAttribute("data-type"));
    if (valorSeleccionado !== selected) setSelected(valorSeleccionado); // Guardamos la herramienta seleccionada en un estado
    if (valorSeleccionado === selected) setSelected(0); // Si vuelve a dar clic y es igual al valor guardado, se deselecciona
    // Luego mostraremos una ventana modal para crear una de las herramientas
    //openModal();
  };

  return (
    <>
      <div className="relative flex flex-col bg-clip-border bg-white text-gray-700 h-[calc(100vh)] w-full max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5 z-50">
        <div className="mb-2 p-4">
          <h5 className="block antialiased tracking-normal font-sans text-xl font-semibold leading-snug text-gray-900">
            <b>Servicio Geológico Colombiano</b>
          </h5>
        </div>
        <nav className="flex flex-col gap-1 min-w-[240px] p-2 font-sans text-base font-normal text-gray-700">
          {pathname === "/volcan" ? (
            <>
              {/* Emplazamientos, estaciones y sensores */}
              <details>
                <summary>
                  <span>Elementos</span>
                </summary>
                <ul className="grid grid-cols-3 relative p-0 m-0 list-none gap-1">
                  <li
                    className={`relative cursor-pointer select-none p-2 border-solid border-slate-400 border-[1px] rounded-xl shadow-md ${
                      selected === 1
                        ? "border-solid border-2 border-slate-900"
                        : ""
                    }`}
                    onClick={(e) => {
                      seleccionarHerramienta(e);
                      // Mostramos el formulario para crear emplazamiento
                      setContent(
                        <Emplazamiento
                          setSelected={setSelected}
                          setShow={setShow}
                          _data={_data}
                          _setData={_setData}
                          emplazamientos={emplazamientos}
                          setE={setE}
                          markers={markers}
                          setMarkers={setMarkers}
                          reload={reload}
                          setReload={setReload}
                        />
                      );
                      setTitle("Crear emplazamiento");
                    }}
                    title={"Crear emplazamiento"}
                    data-type="1"
                  >
                    <div
                      className="w-full h-full absolute z-50 bg-transparent border-none p-0 m-0 left-0 top-0"
                      data-type="1"
                    ></div>
                    <span style={{ color: "gray" }}>
                      <BuildingLibraryIcon className="w-full h-auto" />
                      <span className="text-black">Emplaza...</span>
                    </span>
                  </li>
                  <li
                    className={`relative cursor-pointer select-none p-2 border-solid border-slate-400 border-[1px] rounded-xl shadow-md ${
                      selected === 2
                        ? "border-solid border-2 border-slate-900"
                        : ""
                    }`}
                    onClick={(e) => {
                      seleccionarHerramienta(e);
                      // Mostramos el formulario para crear estación
                      setContent(
                        <Estacion _data={_data} _setData={_setData} />
                      );
                      setTitle("Crear estación");
                    }}
                    title={"Crear estación"}
                    data-type="2"
                  >
                    <div
                      className="w-full h-full absolute z-50 bg-transparent border-none p-0 m-0 left-0 top-0"
                      data-type="2"
                    ></div>
                    <span style={{ color: "gray" }}>
                      <HomeIcon className="w-full h-auto" />
                      <span className="text-black">Estación</span>
                    </span>
                  </li>
                  <li
                    className={`relative cursor-pointer select-none p-2 border-solid border-slate-400 border-[1px] rounded-xl shadow-md ${
                      selected === 3
                        ? "border-solid border-2 border-slate-900"
                        : ""
                    }`}
                    onClick={(e) => {
                      seleccionarHerramienta(e);
                      // Mostramos el formulario para crear sensor
                      setContent(<Sensor _data={_data} _setData={_setData} />);
                      setTitle("Crear sensor");
                    }}
                    title={"Crear sensor"}
                    data-type="3"
                  >
                    <div
                      className="w-full h-full absolute z-50 bg-transparent border-none p-0 m-0 left-0 top-0"
                      data-type="3"
                    ></div>
                    <span style={{ color: "gray" }}>
                      <InboxIcon className="w-full h-auto" />
                      <span className="text-black">Sensor</span>
                    </span>
                  </li>
                </ul>
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
          {/* Enlaces */}
          <Link
            href={"/guralp"}
            className="flex w-full justify-between rounded-lg bg-purple-100 px-4 py-2 text-left text-sm font-medium text-purple-900 hover:bg-purple-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500/75"
          >
            Guralp
          </Link>
        </nav>
      </div>
    </>
  );
}
