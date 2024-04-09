// Se encarga de la visualización con Plotly

"use client";

import Plot from "react-plotly.js";

export default function Traza({dx, dy, dtitulo}) {

  return (
    <div className="w-full h-full">
        <Plot
          data={[
            {
              x: dx != null ? ( 
                dx
              ) : (""),
              y: dy != null ? (
                dy
              ) : (""),
              mode: 'lines',
              type: 'scatter',
              orientation: "v",
              marker: { color: "blue" },
              template: 'plotly_white'
            },
          ]}
          layout={{ width: 1000, height: 400, title: dtitulo }}
        />
    </div>
  );
}
