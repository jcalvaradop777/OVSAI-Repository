// captura los datos CFG provenientes del servidor Django y los envía a los compontentes para ser

"use client";

import Traza from '../components/Traza';
import BoxPlot from '../components/BoxPlot';
import SidebarTrazas from '../components/SidebarTrazas';
import { useEffect, useState } from "react";

export default function Pagina() {

  const [data, setData] = useState(null);

  const fetchData = async () => {
    const response = await fetch("http://127.0.0.1:8000/api/data/"); // recibe a la URL los datos de las trazas y sus descomposition
    const jsonData = await response.json();

    console.log(jsonData);
    setData(jsonData);
  };

  useEffect(() => {
    fetchData();
  }, []);


  if (data == null) {
    return <p>Cargando...</p>
  }

  return (
    <div className="flex">
      <SidebarTrazas />
      <div className="flex-1">
        <div className="p-1">
          <Traza dx={data.idx} dy={data.valores} dtitulo={"Traza individual: " + data.titulo} />
          <Traza dx={data.tiempo} dy={data.estacionalidad} dtitulo={"Componente estacional: " + data.titulo} />
          <Traza dx={data.tiempo} dy={data.ruido} dtitulo={"Componente residual: " + data.titulo} />
          <Traza dx={data.tiempo} dy={data.tendencia} dtitulo={"Tendencia: " + data.titulo} />
          <BoxPlot dy={data.valores} dtitulo={"Box-plot: " + data.titulo} />
        </div>
      </div>
    </div>
  );
}
