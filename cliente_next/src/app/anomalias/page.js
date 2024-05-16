// captura los datos CFG provenientes del servidor Django y los envía a los compontentes para ser

"use client";

import SidebarAnomalias from '../components/TimeSeries/SidebarAnomalias';
import { useEffect, useState } from "react"; 

export default function RenderAnomalias() {

  const [anomaliasRecibidas, setAnomaliasRecibidas] = useState("");

  const handleRecibirDatos = (anomalias) => { // esta función es pasada como parametro (onEnviarDatos) al componente SidebarTrazas
    setAnomaliasRecibidas(anomalias);
    console.log("Longitud de anomalías recibidas: ", anomalias.senal0.length);
  };

  return (
    <div className="flex">
      <SidebarAnomalias onEnviarDatos={handleRecibirDatos} /> {/*esto es el lado izquierdo */}
      <div className="flex-1">
        <div className="p-1">
          senal0
          {anomaliasRecibidas.senal0} 
          saltos
          {anomaliasRecibidas.saltos} 
        </div>
      </div>
    </div>
  );
}
