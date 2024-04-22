// captura los datos CFG provenientes del servidor Django y los envía a los compontentes para ser

"use client";

import Traza from '../components/Traza';
import TrazaAgrupada from '../components/TrazaAgrupada';
import BoxPlot from '../components/BoxPlot';
import SidebarTrazas from '../components/SidebarTrazas';
import { useEffect, useState } from "react";

export default function RenderTrazaGuralp() {

  const [trazasRecibidas, setTrzasRecibidas] = useState("");

  const handleRecibirDatos = (datos) => { // esta función es pasada como parametro (onEnviarDatos) al componente SidebarTrazas
    setTrzasRecibidas(datos); // recibe la traza enviada por SidebarTrazas y la setea a la variable trazasRecibidas, que es utilizada abajo en los controloes graficos
    //setTrzasRecibidas(datos[0]);
  };

  return (
    <div className="flex">
      <SidebarTrazas onEnviarDatos={handleRecibirDatos}/> {/*esto es el lado izquierdo que obtiene los subfolders y los respectivos nombres de archivos */}
      <div className="flex-1">
        <div className="p-1">
          {/* <Traza dx={trazasRecibidas.idx} dy={trazasRecibidas.valores} dtitulo={"Traza individual: " + trazasRecibidas.titulo} />
          <Traza dx={trazasRecibidas.tiempo} dy={trazasRecibidas.estacionalidad} dtitulo={"Componente estacional: " + trazasRecibidas.titulo} />
          <Traza dx={trazasRecibidas.tiempo} dy={trazasRecibidas.ruido} dtitulo={"Componente residual: " + trazasRecibidas.titulo} />
          <Traza dx={trazasRecibidas.tiempo} dy={trazasRecibidas.tendencia} dtitulo={"Tendencia: " + trazasRecibidas.titulo} />
          <BoxPlot dy={trazasRecibidas.valores} dtitulo={"Box-plot: " + trazasRecibidas.titulo} />   */}
          <TrazaAgrupada trazasRecibidas={trazasRecibidas} /> 
        </div>
      </div>
    </div>
  );
}
