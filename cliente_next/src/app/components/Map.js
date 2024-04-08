"use client";

import { useEffect, useRef, useState } from "react";
import * as maptilersdk from "@maptiler/sdk";
import { ENV } from "@/config/env";
import "@maptiler/sdk/dist/maptiler-sdk.css";

export default function Map({ _selected, _setSelected, emplazamientos }) {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const tokyo = { lng: 139.753, lat: 35.6844 };

  const [zoom] = useState(14);
  const [markers, setMarkers] = useState([]);

  maptilersdk.config.apiKey = "blsofM73XhY4O2Ko7yXr";

  useEffect(() => {
    /*
    markers.forEach((mark) => {
        const marker = new maptilersdk.Marker({
          color: mark.color || "#FF0000",
        })
          .setLngLat([mark.lng, mark.lat])
          .setPopup(new maptilersdk.Popup().setHTML(mark.text))
          .addTo(map.current);
        marker.togglePopup();
      });
    */

    if (Array.isArray(emplazamientos) && emplazamientos.length > 0) {
      // Comprobamos que los datos sean validos
      emplazamientos.forEach((em) => {
        const marker = new maptilersdk.Marker({ color: em.color || "#FF0000" })
          .setLngLat([em.pos.long, em.pos.lat])
          .setPopup(new maptilersdk.Popup().setHTML(em.name))
          .addTo(map.current);
        marker.togglePopup();

        if (markers.length < 2) setMarkers([...markers, marker]);
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

    map.current.on("click", (e) => {
      console.log(_selected);
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
      }
    });
  }, [tokyo.lng, tokyo.lat, zoom, markers, _selected]);

  return (
    <div className="w-full h-screen absolute top-0 m-0">
      <div ref={mapContainer} className="w-full h-screen relative" />
    </div>
  );
}
