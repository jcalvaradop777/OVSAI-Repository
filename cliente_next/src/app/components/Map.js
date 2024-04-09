"use client";

import { useEffect, useRef, useState } from "react";
import * as maptilersdk from "@maptiler/sdk";
import { ENV } from "@/config/env";
import "@maptiler/sdk/dist/maptiler-sdk.css";
import Emplazamiento from "./Forms/Emplazamiento";
import Estacion from "./Forms/Estacion";
import Sensor from "./Forms/Sensor";
import {
  BuildingLibraryIcon,
  HomeIcon,
  InboxIcon,
} from "@heroicons/react/20/solid";
import MenuContext from "./Map/MenuCtx";

export default function Map({
  emplazamientos,
  setE,
  setShow,
  _setData,
  selected,
  setSelected,
  _data,
  setContent,
  markers,
  setMarkers,
  reload,
  setReload,
}) {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const tokyo = { lng: 139.753, lat: 35.6844 };
  const [Mposition, setMposition] = useState({
    x: 0,
    y: 0,
    visible: false
  })

  const [zoom] = useState(14);

  maptilersdk.config.apiKey = "blsofM73XhY4O2Ko7yXr";

  useEffect(() => {
    console.log(reload);

    if (reload) {
      // Eliminar marcadores

      if (Array.isArray(markers) && markers.length > 0) {
        markers.forEach((mark) => {
          mark.remove();
        });
      }

      //setMarkers([]);
      if (Array.isArray(emplazamientos) && emplazamientos.length > 0) {
        // Crear nuevo marcador por cada emplazamiento
        emplazamientos.forEach((em) => {
          const marker = new maptilersdk.Marker({
            color: em.state ? "green" : "gray",
          })
            .setLngLat([em.long, em.lat])
            .setPopup(
              new maptilersdk.Popup().setHTML(`
            Nombre: ${em.name}<br>
            Posición: [lng: ${em.long}, lat: ${em.lat}]          
            `)
            )
            .addTo(map.current);

            // Opciones al hacer clic derecho a los marcadores
            marker.getElement().addEventListener("contextmenu", (e) => {
              const {x, y} = e;

              setMposition({
                x: x,
                y: y,
                visible: true
              })
            })

          setMarkers([...markers, marker]);
        });

        setReload(false);
      }
    }
  }, [markers, emplazamientos, reload]);

  useEffect(() => {
    if (selected === 1) {
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
    } else if (selected === 2) {
      setContent(<Estacion _data={_data} _setData={_setData} />);
    } else if (selected === 3) {
      setContent(<Sensor _data={_data} _setData={_setData} />);
    }

    // ---

    if (map.current) {
      map.current.on("click", (e) => {
        // Desactivar el menú o contextMenu de los marcadores
        setMposition({
          ...Mposition,
          visible: false
        })

        if (selected !== 0) {
          _setData({
            lat: e.lngLat.lat,
            long: e.lngLat.lng,
          });

          //setE([]);

          openModal();
        }

        /*console.log(_selected);
        if (_selected.id != null) {
          const newMarker = {
            id: markers.length + 1,
            lng: e.lngLat.lng,
            lat: e.lngLat.lat,
            text: `
            Nombre: ${_selected.name}<br>
            Posición: [lng: ${_selected.lng}, lat: ${_selected.lat}]          
            `,
            color: _selected.color,
          };
  
          setMarkers([...markers, newMarker]);
  
          _setSelected({});
        }*/
      });
    }

    if (map.current) return; // stops map from intializing more than once

    //console.log(_selected);

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
  }, [tokyo.lng, tokyo.lat, zoom, selected, _data]);

  const openModal = (type) => {
    setShow(true);
  };

  const chooseIcon = (n) => {
    const _ = {
      1: <BuildingLibraryIcon className="w-5 h-auto" />,
      2: <HomeIcon className="w-5 h-auto" />,
      3: <InboxIcon className="w-5 h-auto" />,
    };

    return _[n];
  };

  const createMarker = ({ svg, width, height, lat, long, map }) => {
    let markerElement = <div>{svg}</div>;
    markerElement.style.width = width + "px";
    markerElement.style.height = height + "px";

    new maptilersdk.Marker({ element: markerElement })
      .setLngLat([long, lat])
      .addTo(map);
  };

  return (
    <div className="w-full h-screen absolute top-0 m-0">
      {(Mposition.visible) ? <MenuContext Mposition={Mposition} setMPosition={setMposition} /> : <></>}
      <div ref={mapContainer} className={`w-full h-screen relative`} />
    </div>
  );
}
