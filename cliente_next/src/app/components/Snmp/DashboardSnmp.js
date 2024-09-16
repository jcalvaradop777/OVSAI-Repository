import { useEffect, useState } from "react";
import RenderTrazaGuralp from "@/app/guralp/page";
import { XMarkIcon } from "@heroicons/react/20/solid";
import { ArrowsPointingInIcon } from "@heroicons/react/20/solid";
import { ArrowsPointingOutIcon } from "@heroicons/react/20/solid";

import {
  Autocomplete,
  AutocompleteItem,
  Chip,
  DateRangePicker,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import Plot from "react-plotly.js";

// Este componente es una ventana modal que muestra los datos SNMP de los dispositivos de una estacón

let tiposTraza = [
  {
    value: "1",
    label: "Anomalias",
  },
  {
    value: "2",
    label: "Telemetría",
  },
];

export default function VentanaSnmp({ setVentana, id_serial }) {

  const [datos, setDatos] = useState([]);

  useEffect(() => {
    window.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        setVentana(false);
      }
    })
  })

  useEffect(() => {
    obtenerSnmp();
  }, []); // los corchetes vacios, es para que sólo se ejecuta una sola vez, cuando se cargue el componente. 


  // Función para llamar a los SNMP de la base de datos
  const obtenerSnmp = async () => {
    const response = await fetch("/api/snmp/get/" + id_serial); // el id es el identificador de la estación
    await response
      .json()
      .then((res) => {
        console.log("resSNMP", res.results);
        //console.log("resSNMP - upstream_signal:", res.results[0]?.date);
        setDatos(res.results);
        //console.log("datos", datos);
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="fixed block w-full h-full m-0 p-0 z-[100] top-0 left-0 bg-[rgba(0,0,0,0.5)] overflow-y-auto mb-10">
      <div
        className={`block ml-auto mr-auto p-0 relative "w-full h-full" rounded-xl`}
      >

        <div className="flex items-center justify-center bg-[#82A53D] p-4">
          <h5 className="text-center antialiased tracking-normal font-sans text-xl font-semibold leading-snug text-white">
            <b>DashBoard de metadatos SNMP</b>
          </h5>

          <button
            type="button"
            className="btn-close absolute right-4"
            onClick={() => {
              setVentana(false);
            }}
          >
            <XMarkIcon  // icono cerrar
              width="20"
              height="20"
            />
          </button>
        </div>

        <section
          role="main"
          className="p-2 relative block bg-slate-100 text-slate-800"
        >
          <div className="flex">
            ${id_serial}
            ${datos[0]?.date}
          </div>

          {/* DashBoard */}

          <div className="container inline-grid grid-cols-3 gap-1">
            <div className="w-full flex shadow-lg p-2 place-content-center place-items-center items-center">
              <Plot
                data={[
                  {
                    type: "pie", // Change type to 'pie' for pie charts
                    values: [81, 19], // Array of data values for pie slices
                    labels: ["Funcional", "Anomalía"], // Labels for each slice
                    // Add these properties to customize the pie chart
                    hole: 0.4, // Set hole size (0 for no hole, 1 for full hole)
                    marker: {
                      colors: ["blue", "orange"], // Set colors for each slice
                    },
                    textposition: "inside", // Position text labels inside slices
                    textinfo: "text+percent", // Display slice percentages as text
                  },
                ]}
                layout={{ width: 500, height: 500, title: "Porcentaje de funcionamiento: Arles" }}
              />
            </div>

            <div className="w-full flex flex-col shadow-lg p-2 place-content-center place-items-center items-center">
              <Autocomplete label="Seleccionar tipo" className="max-w-xs me-auto">
                {tiposTraza.map((tipo) => (
                  <AutocompleteItem key={tipo.value} value={tipo.value}>
                    {tipo.label}
                  </AutocompleteItem>
                ))}
              </Autocomplete>
              <Plot
                className="me-auto"
                data={[
                  {
                    type: "bar", // Change type to 'bar' for bar charts
                    x: ["Nulo", "Atípico 2", "Salto", "Disperso", "Intermitente", "Desplazado"], // Array of category labels
                    y: [40, 12, 60, 72, 38, 56], // Array of data values for each category
                    // Add these properties to customize the bar chart
                    marker: {
                      color: "blue", // Set bar color (optional)
                      line: {
                        color: "black", // Set bar outline color (optional)
                        width: 2, // Set bar outline width (optional)
                      },
                    },
                  },
                ]}
                layout={{
                  width: 500,
                  height: 500,
                  title: "Número de trazas con anomalía",
                }}
              />
            </div>

            <div className="w-full flex shadow-lg p-2 place-content-center place-items-center">
              <Plot
                className="me-auto"
                data={[
                  {
                    type: "line", // Change type to 'line' for line charts
                    x: [...datos?.map(d=>d.date)], // mapeo de fechas, con los ... se le dice que todas las fechas van en esa matriz
                    y: [...datos?.map(t=>t.temperature)], // Array of y-axis values (mountain-like pattern)
                    // Add these properties to customize the line chart
                    line: {
                      color: "green", // Set line color (optional)
                      width: 2, // Set line width (optional)
                    },
                    marker: {
                      color: "none", // Hide markers (optional)
                    },
                  },
                ]}
                layout={{ width: 500, height: 500, title: "Temperatura" }}
              />
            </div>

            <div className="w-full flex flex-col shadow-lg p-2 place-content-center place-items-center">
              <DateRangePicker label="Rango de fechas" className="max-w-xs" />
              <Plot
                className="me-auto"
                data={[
                  {
                    type: "line",
                    x: [1, 2, 3, 4, 5, 6, 7, 8], // Increased number of x-axis values
                    y: [20, 25, 13, 35, 24, 22, 38, 14], // Repeat y-axis values for larger scale
                    line: {
                      color: "green",
                      width: 3, // Increased line width
                    },
                    marker: {
                      color: "none",
                    },
                  },
                ]}
                layout={{
                  width: 500,
                  height: 500,
                  title: "Anomalias por rango de tiempo",
                  xaxis: {
                    range: [0, 9], // Set x-axis range to match data
                  },
                  yaxis: {
                    range: [0, 40], // Set y-axis range to accommodate y-values
                  },
                }}
              />
            </div>

            <div className="w-full flex flex-col shadow-lg p-2 place-content-center place-items-center">
              <Table aria-label="Example static collection table">
                <TableHeader>
                  <TableColumn>Estación</TableColumn>
                  <TableColumn>Sensor</TableColumn>
                  <TableColumn>Estado</TableColumn>
                </TableHeader>
                <TableBody>
                  <TableRow key="1">
                    <TableCell>Arlés</TableCell>
                    <TableCell>Inclinómetro 7376</TableCell>
                    <TableCell>
                      <Chip color="success">Activo</Chip>
                    </TableCell>
                  </TableRow>
                  <TableRow key="2">
                    <TableCell>Arlés</TableCell>
                    <TableCell>Digitalizador A4907</TableCell>
                    <TableCell>
                      <Chip color="default">Inactivo</Chip>
                    </TableCell>
                  </TableRow>
                  <TableRow key="3">
                    <TableCell>Arléss</TableCell>
                    <TableCell>Antena</TableCell>
                    <TableCell>
                      <Chip color="danger">Problema</Chip>
                    </TableCell>
                  </TableRow>
                  <TableRow key="4">
                    <TableCell>Arlés</TableCell>
                    <TableCell>Radio Modem</TableCell>
                    <TableCell>
                      <Chip color="success">Activo</Chip>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>

          </div>

        </section>

      </div>
    </div>
  );
}
