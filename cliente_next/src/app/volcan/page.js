"use client";

import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import { FunnelIcon, HomeIcon, MapPinIcon } from "@heroicons/react/20/solid";
import Map from "../components/Map";
import ListSearch from "../components/ListSearch";

import { usePathname, useRouter } from "next/navigation";
import Guralp from "../guralp/page";
import Basic from "../components/Modals/Basic";

export default function Volcan() {
  const [Loading, setLoading] = useState(true);
  const [volcanes] = useState([
    //  Volcanes de prueba para el mapa
    { name: "Volcán Galeras", lat: 1.2166666666667, long: -77.366666666667 },
    { name: "Volcán Chiles", lat: 0.82111111, long: -77.935 },
    { name: "Volcán Cumbal", lat: 0.95583333333333, long: -77.883333333333 },
  ]);

  const [show, setShow] = useState(false); // Muestra/Oculta la ventana modal para agregar una herramienta al mapa
  const [title, setTitle] = useState(null);
  const [content, setContent] = useState(null);

  const [selected, setSelected] = useState(0); // Guarda elemento seleccionado
  const [_data, _setData] = useState({}); // Manejar datos formulario
  const [markers, setMarkers] = useState([]);

  const [emplazamientos, setE] = useState([]); // Almacenar emplazamientos
  const [estaciones, setES] = useState([]); // Almacenar estaciones
  const [sensores, setS] = useState([]); // Almacenar sensores

  const [_em, _setEm] = useState([]);
  const [reload, setReload] = useState(true);

  useEffect(() => {
    if (Loading) {
      setE([]);

      setLoading(false);
    }

    const adMap = document.querySelector(".maplibregl-control-container");

    if (adMap) {
      //adMap.remove();
    }
  }, [_data, emplazamientos]);

  const router = useRouter();

  const getContent = () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const pathname = usePathname();
    switch (pathname) {
      case "/volcan":
        return (
          <Map
            emplazamientos={emplazamientos}
            setE={setE}
            setShow={setShow}
            _setData={_setData}
            selected={selected}
            setSelected={setSelected}
            setContent={setContent}
            _data={_data}
            markers={markers}
            setMarkers={setMarkers}
            reload={reload}
            setReload={setReload}
          />
        );
      case "/guralp":
        return <Guralp />;
      default:
        return <h1>No encontrado</h1>;
    }
  };
  return (
    <>
      <div className="w-full h-full">
        <Basic
          show={show}
          setShow={setShow}
          title={title}
          content={content}
          setSelected={setSelected}
          selected={selected}
          emplazamientos={emplazamientos}
          setE={setE}
        />
        <Sidebar
          emplazamientos={emplazamientos}
          estaciones={estaciones}
          sensores={sensores}
          setContent={setContent}
          setShow={setShow}
          setTitle={setTitle}
          _setData={_setData}
          _data={_data}
          selected={selected}
          setSelected={setSelected}
          setE={setE}
          markers={markers}
          setMarkers={setMarkers}
          _em={_em}
          _setEm={_setEm}
          reload={reload}
          setReload={setReload}
        />
        <ListSearch volcanes={volcanes} />
        {getContent()}
      </div>
    </>
  );
}
