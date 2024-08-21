"use client";

import React, { useEffect, useRef, useState } from "react";
import * as maptilersdk from "@maptiler/sdk";
import { ENV } from "@/config/env";
import "@maptiler/sdk/dist/maptiler-sdk.css";
import IngresarEstacion from "./Estaciones/FrmIngresarEstacion";
import MenuContext from "./Estaciones/MenuCtx";

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

  maptilersdk.config.apiKey = ENV.API_KEY;

  const obtenerEstaciones = async () => {
    const res = await fetch(`${ENV.URLBASE}api/estaciones/get/`);
    return res.json();
  };

  // Obtener icono marcador

  const obtenerIconoMarcador = () => {
    const icon =
      // icono de lacasia que representa la estación
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
      style: "hybrid",
      center: [ovspa.lng, ovspa.lat],
      zoom: zoom,
      hash: true,
      terrainControl: true,
      scaleControl: true,
      fullscreenControl: "top-right",
      geolocateControl: true,
      navigationControl: true,
    });
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
    </div>
  );
}
