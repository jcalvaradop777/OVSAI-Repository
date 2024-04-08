// Se encarga de la visualización con Plotly

"use client";

import Plot from "react-plotly.js";

export default function BoxPlot({dy, dtitulo}) {

  return (
    <div className="w-full h-full">
        <Plot
          data={[
            {
              y: dy != null ? (
                dy
              ) : (""),
              type: 'box',
              boxpoints: 'all',
              jitter: 0.3,
              pointpos: -1.8,
              template: 'plotly_white'
            },
          ]}
          layout={{ width: 500, height: 400, title: dtitulo }}
        />
    </div>
  );
}