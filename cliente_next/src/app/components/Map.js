"use client";

import React, { useEffect, useRef, useState } from "react";
import * as maptilersdk from "@maptiler/sdk";
import { ENV } from "@/config/env";
import "@maptiler/sdk/dist/maptiler-sdk.css";
import Emplazamiento from "./Forms/Emplazamiento";
import Estacion from "./Forms/Estacion";
import Sensor from "./Forms/Sensor";
import MenuContext from "./Map/MenuCtx";

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
  // const tokyo = { lng: 139.753, lat: 35.6844 };
  const tokyo = { lng: -77.253837, lat: 1.209139 }; // posición del observatorio vulcanológico de Pasto
  const [Mposition, setMposition] = useState({
    x: 0,
    y: 0,
    visible: false,
    element: null,
  });

  const [zoom] = useState(14);

  maptilersdk.config.apiKey = ENV.API_KEY;

  const obtenerEmplazamientos = async () => {
    const res = await fetch(`${ENV.URLBASE}api/emplazamientos/get/`);
    return res.json();
  };

  const obtenerEstaciones = async () => {
    const res = await fetch(`${ENV.URLBASE}api/estaciones/get/`);
    return res.json();
  };

  // Obtener icono marcador

  const obtenerIconoMarcador = (tipo) => {
    const icons = {
      1: `<svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-10 h-10"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0 0 12 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75Z"
          />
        </svg>`,
      2: `<svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-10 h-10"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
          />
        </svg>`,
      3: `<svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="10 h-10"
        >
          <path
            stroke.linecap="round"
            stroke-linejoin="round"
            d="M2.25 13.5h3.86a2.25 2.25 0 0 1 2.012 1.244l.256.512a2.25 2.25 0 0 0 2.013 1.244h3.218a2.25 2.25 0 0 0 2.013-1.244l.256-.512a2.25 2.25 0 0 1 2.013-1.244h3.859m-19.5.338V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18v-4.162c0-.224-.034-.447-.1-.661L19.24 5.338a2.25 2.25 0 0 0-2.15-1.588H6.911a2.25 2.25 0 0 0-2.15 1.588L2.35 13.177a2.25 2.25 0 0 0-.1.661Z"
          />
        </svg>`,
    };

    return icons[parseInt(tipo)];
  };

  useEffect(() => {
    if (_Map.reload) {
      // Eliminar marcadores

      if (Array.isArray(_Map.markers) && _Map.markers.length > 0) {
        _Map.markers.forEach((mark) => {
          mark.remove();
        });
      }

      // Obtener marcadores con api

      // Obtener emplazamientos

      setTimeout(() => {
        obtenerEmplazamientos()
          .then((res) => {
            if (Array.isArray(res)) {
              if (res.length > 0) {
                res.forEach((mark) => {
                  // Creamos marcador para insertar en mapa
                  // Crear función para agregar imagen al marcador

                  var el = document.createElement("div");
                  el.className = "w-auto h-auto";
                  el.innerHTML = obtenerIconoMarcador(mark.type);
                  el.style.borderRadius = "50%";
                  el.style.backgroundColor = "#fff";
                  el.style.padding = "5px";

                  const marker = new maptilersdk.Marker({ element: el })
                    .setLngLat([mark.longitude, mark.latitude])
                    .setPopup(
                      new maptilersdk.Popup().setHTML(`
                  Nombre: ${mark.name}<br>
                  Posición: [lng: ${mark.longitude}, lat: ${mark.latitude}]          
                  `)
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
                      element: mark.type === 1 ? mark : null,
                    });
                  });
                  // ---

                  _setMap({
                    ..._Map,
                    markers: [marker, ..._Map.markers],
                    reload: false,
                  });
                });
              }
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }, 2000);

      // ---

      // Obtener estaciones

      setTimeout(() => {
        obtenerEstaciones()
          .then((res) => {
            if (Array.isArray(res)) {
              if (res.length > 0) {
                res.forEach((mark) => {
                  if (mark.longitude && mark.latitude) {
                    // Creamos marcador para insertar en mapa
                    // Crear función para agregar imagen al marcador

                    var el = document.createElement("div");
                    el.className = "w-auto h-auto";
                    el.innerHTML = obtenerIconoMarcador(mark.type);
                    el.style.borderRadius = "50%";
                    el.style.backgroundColor = "#fff";
                    el.style.padding = "5px";

                    const marker = new maptilersdk.Marker({ element: el })
                      .setLngLat([mark.longitude, mark.latitude])
                      .setPopup(
                        new maptilersdk.Popup().setHTML(`
                Nombre: ${mark.name}<br>
                Posición: [lng: ${mark.longitude}, lat: ${mark.latitude}]          
                `)
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
                        element: mark.type >= 1 ? mark : null,
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
      }, 2000);

      // ---
    }
  }, [_Map.markers, _Map.reload, selected]);

  useEffect(() => {
    if (selected === 1) {
      setModal({
        ...Modal,
        content: (
          <Emplazamiento
            _Map={_Map}
            _setMap={_setMap}
            setSelected={setSelected}
            setShow={setShow}
          />
        ),
      });
    } else if (selected === 2) {
      setModal({
        ...Modal,
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
    } else if (selected === 3) {
      setModal({
        ...Modal,
        content: (
          <Sensor
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

        if (selected !== 0) {
          _setMap({
            ..._Map,
            _data: {
              lat: e.lngLat.lat,
              long: e.lngLat.lng,
            },
          });

          openModal();
        }

        if (selected === 0) {
          setShow(false);
        }
      });
    }

    if (map.current) return; // stops map from intializing more than once

    map.current = new maptilersdk.Map({
      container: mapContainer.current,
      style: "hybrid",
      center: [tokyo.lng, tokyo.lat],
      zoom: zoom,
      hash: true,
      terrainControl: true,
      scaleControl: true,
      fullscreenControl: "top-right",
      geolocateControl: true,
      navigationControl: true,
    });
  }, [tokyo.lng, tokyo.lat, zoom, show, _Map, selected]);

  const openModal = () => {
    setShow(true);
  };

  return (
    <div className="w-full h-screen absolute top-0 m-0">
      {Mposition.visible ? (
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
      ) : (
        <></>
      )}
      <div ref={mapContainer} className={`w-full h-screen relative`} />
    </div>
  );
}
