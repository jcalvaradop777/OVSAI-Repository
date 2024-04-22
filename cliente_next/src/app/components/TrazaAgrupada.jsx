
import React from 'react';
import Plot from 'react-plotly.js';

export default function TrazaAgrupada ({ trazasRecibidas }) {

  console.log(`trazasRecibidas, ${trazasRecibidas}`);

  if (!trazasRecibidas || trazasRecibidas.length === 0) {
         return <div>No hay datos de trazas disponibles</div>;
  }

  const trazasOriginales = [];
  const trazasEstacionales = [];
  const trazasRuido = [];
  const trazasTendencias = [];
  const boxsPlots = [];

  for (let i = 0; i < trazasRecibidas.length; i++) {

    const clr = `rgb(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255})`
    
    trazasOriginales.push({
      x: trazasRecibidas[i].indices, 
      y: trazasRecibidas[i].valores,
      type: 'scatter',
      mode: 'lines',
      line: { color: clr }, 
      name: `Traza ${i + 1}`
    });

    trazasEstacionales.push({
      x: trazasRecibidas[i].indices, 
      y: trazasRecibidas[i].estacionalidad,
      type: 'scatter',
      mode: 'lines',
      line: { color: clr }, 
      name: `Estacional ${i + 1}`
    });

    trazasRuido.push({
      x: trazasRecibidas[i].indices, 
      y: trazasRecibidas[i].ruido,
      type: 'scatter',
      mode: 'lines',
      line: { color: clr }, 
      name: `Ruido ${i + 1}`
    });

    trazasTendencias.push({
      x: trazasRecibidas[i].indices, 
      y: trazasRecibidas[i].tendencia,
      type: 'scatter',
      mode: 'lines',
      line: { color: clr }, 
      name: `Tendencia ${i + 1}`
    });

    boxsPlots.push({
      x: trazasRecibidas[i].indices, 
      y: trazasRecibidas[i].valores,
      type: 'box',
      boxpoints: 'all',
      jitter: 0.3,
      pointpos: -1.8,
      template: 'plotly_white',
      marker: {color: clr},
      name: `Box ${i + 1}`
    });

  }

 
  return (
    <div>
    <Plot
      data={trazasOriginales}
      layout={{ width: 800, height: 400, title: "Traza original: " + trazasRecibidas[0].titulo }}
    />

    <Plot
      data={trazasEstacionales}
      layout={{ width: 800, height: 400, title: "Componente estacional: " + trazasRecibidas[0].titulo }}
    />

    <Plot
      data={trazasRuido}
      layout={{ width: 800, height: 400, title: "Componente residual: " + trazasRecibidas[0].titulo }}
    />

    <Plot
      data={boxsPlots}
      layout={{ width: 800, height: 400, title: "Dispersión: " + trazasRecibidas[0].titulo }}
    />

    <Plot
      data={trazasTendencias}
      layout={{ width: 800, height: 400, title: "Tendencia: " + trazasRecibidas[0].titulo }}
    />
   
    </div>
  );
};