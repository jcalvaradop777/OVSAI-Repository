"use client";

import { useRef, useState } from "react";
import Sidebar from "../components/Sidebar";
import Map from "../components/Map";
import ListSearch from "../components/ListSearch";
import { usePathname } from "next/navigation";
import Basic from "../components/Modals/Basic";

export default function Volcan() {
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

  // Estilo del mapa
  const [mapStyle, setMapStyle] = useState("hybrid");

  const map = useRef(null);

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
            mapStyle={mapStyle}
            setMapStyle={setMapStyle}
            map={map}
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
          mapStyle={mapStyle}
          setMapStyle={setMapStyle}
          map={map}
        />
        <ListSearch />
        {getContent()}
      </div>
    </>
  );
}
