"use client";

import React, { useEffect, useRef, useState } from "react";
import * as maptilersdk from "@maptiler/sdk";
import { ENV } from "@/config/env";
import "@maptiler/sdk/dist/maptiler-sdk.css";
import IngresarEstacion from "./Estaciones/FrmIngresarEstacion";
import MenuContext from "./Estaciones/MenuCtx";
import Image from "next/image";
import { Tooltip } from "@nextui-org/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import { TemperatureLayer, WindLayer } from "@maptiler/weather";

export default function Map({
  Modal,
  setModal,
  _Map,
  _setMap,
  selected,
  setSelected,
  setShow,
  show,
}) {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const ovspa = { lng: -77.253837, lat: 1.209139 }; // posición del observatorio vulcanológico de Pasto
  const [Mposition, setMposition] = useState({
    x: 0,
    y: 0,
    visible: false,
    element: null,
  });

  const [zoom] = useState(14);
  const [showCapas, setShowCapas] = useState(false);
  const [capas] = useState([
    { style: "Básico", src: "/layers-map/basic-style.jpeg", setStyle: "basic" },
    {
      style: "Híbrido",
      src: "/layers-map/hybrid-style.jpeg",
      setStyle: "hybrid",
    },
    {
      style: "Outdoor",
      src: "/layers-map/outdoor-style.jpeg",
      setStyle: "outdoor",
    },
    {
      style: "Satélite",
      src: "/layers-map/satellite-style.jpeg",
      setStyle: "satellite",
    },
    {
      style: "Calles",
      src: "/layers-map/streets-style.jpeg",
      setStyle: "streets",
    },
    {
      style: "Invierno/Winter",
      src: "/layers-map/winter-style.jpeg",
      setStyle: "winter",
    },
    {
      style: "Temperatura",
      src: "/layers-map/temperature-style.PNG",
      setStyle: "temperature",
    },
    {
      style: "Clima",
      src: "/layers-map/weather-style.PNG",
      setStyle: "weather",
    },
  ]);
  const [mapStyle, setMapStyle] = useState("hybrid");

  maptilersdk.config.apiKey = ENV.API_KEY;

  const obtenerEstaciones = async () => {
    const res = await fetch(`${ENV.URLBASE}api/estaciones/get/`);
    return res.json();
  };

  // Obtener icono marcador

  const obtenerIconoMarcador = () => {
    const icon =
      // icono de la casa que representa la estación
      `<svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke=#82A53D
          class="w-10 h-10"
        >
        <circle cx="12" cy="12" r="14" stroke="red" fill="none" />
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
          />
        </svg>`;

    return icon;
  };

  useEffect(() => {
    if (_Map.reload) {
      // Eliminar marcadores

      if (Array.isArray(_Map.markers) && _Map.markers.length > 0) {
        _setMap({
          ...Map,
          markers: [],
        });
      }
      const getMarkers = document.querySelectorAll(".maplibregl-marker");
      if (getMarkers.length > 0) {
        for (let m of getMarkers) {
          if (m) m.remove();
        }
      }

      // Obtener marcadores con api

      // Obtener estaciones
      setTimeout(() => {
        obtenerEstaciones()
          .then((res) => {
            if (Array.isArray(res)) {
              if (res.length > 0) {
                res.forEach((mark) => {
                  if (mark.longitud && mark.latitud) {
                    // Creamos marcador para insertar en mapa
                    //  función para agregar imagen al marcador (icono)
                    var el = document.createElement("div");
                    el.className = "w-auto h-auto";
                    el.innerHTML = obtenerIconoMarcador();
                    el.style.borderRadius = "50%";
                    el.style.backgroundColor = "#fff"; // aqui se cambia el color de fondo de los iconos de cada estación
                    el.style.padding = "5px";
                    el.setAttribute("data-id", mark.id);

                    // Información emergente del icono de cada estación
                    const marker = new maptilersdk.Marker({ element: el })
                      .setLngLat([mark.longitud, mark.latitud])
                      .setPopup(
                        new maptilersdk.Popup().setHTML(
                          `Estación: ${mark.nombre}<br> Longitud: ${mark.longitud}<br> Latitud: ${mark.latitud}`
                        )
                      )
                      .addTo(map.current);

                    // Opciones al hacer clic derecho a los marcadores
                    marker.getElement().addEventListener("contextmenu", (e) => {
                      const { x, y } = e;

                      if (mark.type === 1) {
                        setModal({
                          ...Modal,
                          show: false,
                        });
                      }

                      setMposition({
                        x: x,
                        y: y,
                        visible: true,
                        element: mark,
                      });
                    });
                    // ---

                    _setMap({
                      ..._Map,
                      markers: [marker, ..._Map.markers],
                      reload: false,
                    });
                  }
                });
              }
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }, 1000); // el 2000 es depués de 2 segundos

      // ---
    }
  });

  useEffect(() => {
    if (selected === 2) {
      setModal({
        ...Modal,
        content: (
          <IngresarEstacion
            emplazamiento={null}
            _Map={_Map}
            _setMap={_setMap}
            setSelected={setSelected}
            setShow={setShow}
          />
        ),
      });
    }

    // ---

    if (map.current) {
      /* window.addEventListener("click", () => {
        setMposition({
          ...Mposition,
          visible: false,
          element: null,
        });
      }) */

      map.current.on("click", (e) => {
        // Desactivar el menú o contextMenu de los marcadores
        setMposition({
          ...Mposition,
          visible: false,
          element: null,
        });

        //if (selected !== 0) {
        _setMap({
          ..._Map,
          _data: {
            lat: e.lngLat.lat,
            long: e.lngLat.lng,
          },
        });

        openModal();
        //}

        if (selected === 0) {
          setShow(false);
        }
      });
    }

    if (map.current) return; // stops map from intializing more than once

    // Aqui se ponen los controles de la derecha en el mapa
    map.current = new maptilersdk.Map({
      container: mapContainer.current,
      style: mapStyle === "temperature" || mapStyle === "weather" ? "backdrop" : mapStyle,
      center: [ovspa.lng, ovspa.lat],
      zoom: zoom,
      hash: true,
      terrainControl: true,
      scaleControl: true,
      fullscreenControl: "top-right",
      geolocateControl: true,
      navigationControl: true,
    });

    if (mapStyle === "temperature") {
      map.current.on("load", () => {
        const temperatureLayer = new TemperatureLayer();

        map.current.setPaintProperty(
          "Water",
          "fill-color",
          "rgba(0, 0, 0, 0.4)"
        );
        map.current.addLayer(temperatureLayer, "Water");
      });
      //weatherLayer.animateByFactor(3600);
    }

    if(mapStyle === "weather") {
      const weatherLayer = new WindLayer();

      map.current.on('load', function () {
        map.current.setPaintProperty("Water", 'fill-color', "rgba(0, 0, 0, 0.4)");
        map.current.addLayer(weatherLayer, 'Water');
      });
    }
  }, [ovspa.lng, ovspa.lat, zoom, show, _Map, selected]);

  const openModal = () => {
    setShow(true);
  };

  return (
    <div className="w-full h-screen absolute top-0 m-0">
      <MenuContext
        Mposition={Mposition}
        setMPosition={setMposition}
        Modal={Modal}
        setModal={setModal}
        _Map={_Map}
        _setMap={_setMap}
        setSelected={setSelected}
        setShow={setShow}
      />
      <div ref={mapContainer} className={`w-full h-screen relative`} />
      <Tooltip className="text-[16px]" placement="right" content="Capas">
        <button
          onClick={() => {
            setShowCapas(!showCapas);
          }}
          className="z-[500] p-0 rounded-lg bg-white left-[300px] bottom-14 fixed cursor-pointer select-none"
        >
          <Image
            src={"/layers-map/satellite-style.jpeg"}
            width={60}
            className="rounded-lg"
            height={60}
            alt="Satellite image"
          />
        </button>
      </Tooltip>
      {showCapas ? (
        <ul
          id="capas-box"
          className="left-[365px] list-none p-2 rounded-lg bottom-14 fixed w-64 h-20 overflow-x-hidden flex flex-row gap-2 overflow-y-hidden bg-white"
        >
          {capas.map((capa) => {
            return (
              <Tooltip placement="top" content={capa.style}>
                <Image
                  onClick={() => {
                    setMapStyle(capa.setStyle);

                    map.current = null;
                    _setMap({
                      ..._Map,
                      reload: true,
                    });
                  }}
                  src={capa.src}
                  width={160}
                  height={120}
                  className="rounded-lg cursor-pointer select-none"
                  alt={capa.style}
                />
              </Tooltip>
            );
          })}
          <Tooltip placement="top" content="Siguiente">
            <ChevronRightIcon
              onClick={() => {
                const scrollCapas = document.querySelector("#capas-box");
                const scrollPos = scrollCapas.scrollLeft;

                const scrollTotal = scrollCapas.scrollWidth;
                const scrollInteract =
                  scrollCapas.scrollLeft + scrollCapas.clientWidth;

                console.log(scrollTotal);
                console.log(scrollInteract);

                if (scrollTotal >= scrollInteract) {
                  scrollCapas.scrollTo({
                    left: scrollPos + 10,
                    behavior: "smooth",
                  });
                }
              }}
              onMouseDown={(e) => {
                if (e.button == 0) {
                  /* setInterval(() => {
                    console.log(e);
                  }, 500); */
                  /*
                    setInterval(() => {
                    const scrollCapas = document.querySelector("#capas-box");
                    const scrollPos = scrollCapas.scrollLeft;

                    const scrollTotal = scrollCapas.scrollWidth;
                    const scrollInteract =
                      scrollCapas.scrollLeft + scrollCapas.clientWidth;

                    console.log(scrollTotal);
                    console.log(scrollInteract);

                    if (scrollTotal >= scrollInteract) {
                      scrollCapas.scrollTo({
                        left: scrollPos + 10,
                        behavior: "smooth",
                      });
                    }
                  }, 500);
                  */
                }
              }}
              onMouseUp={(e) => {
                if (e.button == 0) {
                }
              }}
              width={70}
              height={120}
              className="cursor-pointer select-none text-black fixed bottom-[35px] left-[560px]"
            />
          </Tooltip>
          <Tooltip placement="top" content="Anterior">
            <ChevronLeftIcon
              onClick={() => {
                const scrollCapas = document.querySelector("#capas-box");
                const scrollPos = scrollCapas.scrollLeft;

                const scrollTotal = scrollCapas.scrollWidth;
                const scrollInteract =
                  scrollCapas.scrollLeft + scrollCapas.clientWidth;

                console.log(scrollTotal);
                console.log(scrollInteract);

                if (scrollTotal >= scrollInteract) {
                  scrollCapas.scrollTo({
                    left: scrollPos - 10,
                    behavior: "smooth",
                  });
                }
              }}
              width={70}
              height={120}
              className="cursor-pointer select-none text-black fixed bottom-[35px] left-[360px]"
            />
          </Tooltip>
        </ul>
      ) : (
        <></>
      )}
    </div>
  );
}
