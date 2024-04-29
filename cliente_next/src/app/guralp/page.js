// captura los datos CFG provenientes del servidor Django y los envía a los compontentes para ser

"use client";

import Traza from '../components/Traza';
import TrazaAgrupada from '../components/TrazaAgrupada';
import BoxPlot from '../components/BoxPlot';
import SidebarTrazas from '../components/SidebarTrazas';
import { useEffect, useState } from "react";

export default function RenderTrazaGuralp() {

  const [trazasRecibidas, setTrzasRecibidas] = useState("");
  const [trazasObox, setTrazasObox] = useState("");

  const handleRecibirDatos = (datos, tob) => { // esta función es pasada como parametro (onEnviarDatos) al componente SidebarTrazas
    setTrazasObox(tob); // tob y si está graficando trazas o boxplot
    setTrzasRecibidas(datos); // recibe la traza enviada por SidebarTrazas y la setea a la variable trazasRecibidas, que es utilizada abajo en los controloes graficos
  };

  return (
    <div className="flex">
      <SidebarTrazas onEnviarDatos={handleRecibirDatos} /> {/*esto es el lado izquierdo que obtiene los subfolders y los respectivos nombres de archivos */}
      <div className="flex-1">
        <div className="p-1">
          {/* <Traza dx={trazasRecibidas.idx} dy={trazasRecibidas.valores} dtitulo={"Traza individual: " + trazasRecibidas.titulo} />
          <Traza dx={trazasRecibidas.tiempo} dy={trazasRecibidas.estacionalidad} dtitulo={"Componente estacional: " + trazasRecibidas.titulo} />
          <Traza dx={trazasRecibidas.tiempo} dy={trazasRecibidas.ruido} dtitulo={"Componente residual: " + trazasRecibidas.titulo} />
          <Traza dx={trazasRecibidas.tiempo} dy={trazasRecibidas.tendencia} dtitulo={"Tendencia: " + trazasRecibidas.titulo} />
          <BoxPlot dy={trazasRecibidas.valores} dtitulo={"Box-plot: " + trazasRecibidas.titulo} />   
          */}

          {trazasObox === "trazas" ? (
            <TrazaAgrupada trazasRecibidas={trazasRecibidas} />
          ) : trazasObox === "box" ? (
            <BoxPlot dy={trazasRecibidas[0].valores} dtitulo={"Box-plot: " + trazasRecibidas[0].titulo} />
          ) : (
            <div className="text-center mx-auto"> Seleccione los archivos GCF a graficar... </div>
          )}

        </div>
      </div>
    </div>
  );
}
