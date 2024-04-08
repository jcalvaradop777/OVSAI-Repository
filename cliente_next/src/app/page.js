"use client";

import { useEffect, useState } from "react";
import Sidebar from "./components/Sidebar";
import { FunnelIcon, HomeIcon, MapPinIcon } from "@heroicons/react/20/solid";
import Map from "./components/Map";
import ListSearch from "./components/ListSearch";

import { usePathname, useRouter } from "next/navigation";
//import Guralp from "./guralp/page";

export default function Home() {
  const [emplazamientos, setE] = useState([]); // Almacenar emplazamientos
  const [estaciones, setES] = useState([]); // Almacenar estaciones
  const [sensores, setS] = useState([]); // Almacenar sensores

  // Item seleccionado
  const [_selected, _setSelected] = useState({}); //  Objeto con la información del icono seleccionado

  const [Loading, setLoading] = useState(true);
  const [volcanes] = useState([
    //  Volcanes de prueba para el mapa
    { name: "Volcán Galeras", lat: 1.2166666666667, long: -77.366666666667 },
    { name: "Volcán Chiles", lat: 0.82111111, long: -77.935 },
    { name: "Volcán Cumbal", lat: 0.95583333333333, long: -77.883333333333 },
  ]);

  useEffect(() => {
    if (Loading) {
      // Emplazamientos
      setE([
        {
          id: 1,
          name: "Emplazamiento 1",
          type: 1,
          pos: { lat: 1.21955094115755, long: -77.3578839888642 },
          icon: <HomeIcon className="w-full h-auto" />,
          color: "green",
        },
      ]);
      // Estaciones
      setES([
        {
          id: 1,
          name: "Estación 1",
          type: 2,
          emplazamiento: 1,
          icon: <HomeIcon className="w-full h-auto" />,
          color: "green",
        },
      ]);
      // Sensores
      setS([
        {
          id: 1,
          name: "Sensor 1",
          type: 3,
          emplazamiento: 1,
          estacion: 1,
          icon: <MapPinIcon className="w-full h-auto" />,
          color: "green",
        },
      ]);
      setLoading(false);
    }

    const adMap = document.querySelector(".maplibregl-control-container");

    if (adMap) {
      //adMap.remove();
    }
  }, [Loading, emplazamientos, estaciones, sensores]);

  const router = useRouter();

  const getContent = () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const pathname = usePathname();
    switch (pathname) {
      case "/":
        return (
          <Map
            _selected={_selected}
            _setSelected={_setSelected}
            emplazamientos={emplazamientos}
          />
        );
      //case "/guralp":
      //  return <Guralp />;
      default:
        return <h1>No encontrado</h1>;
    }
  };
  return (
    <>
      {/*
        <div className="w-full h-full">
        <Sidebar emplazamientos={emplazamientos} estaciones={estaciones} sensores={sensores} setE={setE} setES={setES} setS={setS} _selected={_selected} _setSelected={_setSelected} />
        <ListSearch volcanes={volcanes} />
        <Map _selected={_selected} _setSelected={_setSelected} />
      </div>
      */}

      <div className="w-full h-full">
        <Sidebar
          emplazamientos={emplazamientos}
          estaciones={estaciones}
          sensores={sensores}
          setE={setE}
          setES={setES}
          setS={setS}
          _selected={_selected}
          _setSelected={_setSelected}
        />
        <ListSearch volcanes={volcanes} />
        {getContent()}
      </div>
    </>
  );
}
