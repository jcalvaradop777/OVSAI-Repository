"use client";

import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Map from "../components/Map";
import ListSearch from "../components/ListSearch";

import { usePathname, useRouter } from "next/navigation";
import Basic from "../components/Modals/Basic";

export default function Volcan() {
  const [volcanes] = useState([
    //  Volcanes de prueba para el mapa
    { name: "Volcán Galeras", lat: 1.2166666666667, long: -77.366666666667 },
    { name: "Volcán Chiles", lat: 0.82111111, long: -77.935 },
    { name: "Volcán Cumbal", lat: 0.95583333333333, long: -77.883333333333 },
  ]);

  // Estado para manejar ventana modal de estación
  const [Modal, setModal] = useState({
    title: null,
    content: null,
  });

  // Estado para manejar la vista de ventana modal de crear estación
  const [show, setShow] = useState(false);

  // Estado para manejar el menú de elementos/herramientas
  const [selected, setSelected] = useState(0);

  // Estado para manejar la configuración del mapa
  const [_Map, _setMap] = useState({
    _data: {},
    markers: [],
    reload: true,
  });

  useEffect(() => {
    const adMap = document.querySelector(".maplibregl-control-container");

    if (adMap) {
      //adMap.remove();
    }
  }, [_Map]);

  const router = useRouter();

  const getContent = () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const pathname = usePathname();
    switch (pathname) {
      case "/volcan":
        return (
          <Map
            Modal={Modal}
            setModal={setModal}
            _Map={_Map}
            _setMap={_setMap}
            selected={selected}
            setSelected={setSelected}
            setShow={setShow}
            show={show}
          />
        );
      default:
        return <h1>No encontrado</h1>;
    }
  };
  return (
    <>
      <div className="w-full h-full">
        <Basic
          Modal={Modal}
          setModal={setModal}
          show={show}
          setShow={setShow}
          selected={selected}
          setSelected={setSelected}
        />
        <Sidebar
          Modal={Modal}
          setModal={setModal}
          _Map={_Map}
          _setMap={_setMap}
          setShow={setShow}
          selected={selected}
          setSelected={setSelected}
        />
        <ListSearch volcanes={volcanes} />
        {getContent()}
      </div>
    </>
  );
}
