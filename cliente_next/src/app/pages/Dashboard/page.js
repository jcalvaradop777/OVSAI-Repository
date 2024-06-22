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

export default function Dashboard() {
  let tiposTraza = [
    {
      value: "1",
      label: "Traza geofísica",
    },
    {
      value: "2",
      label: "Traza de teledetección",
    },
  ];

  return (
    <div className="absolute top-0 m-0 flex flex-row w-full">
      <div className="w-[20rem] h-dvh inline-block"></div>
      <div className="container inline-grid grid-cols-2 gap-1">
        <div className="w-full flex shadow-lg p-2 place-content-center place-items-center items-center">
          <Plot
            data={[
              {
                type: "pie", // Change type to 'pie' for pie charts
                values: [40, 60], // Array of data values for pie slices
                labels: ["Category 1", "Category 2"], // Labels for each slice
                // Add these properties to customize the pie chart
                hole: 0.4, // Set hole size (0 for no hole, 1 for full hole)
                marker: {
                  colors: ["blue", "orange"], // Set colors for each slice
                },
                textposition: "inside", // Position text labels inside slices
                textinfo: "text+percent", // Display slice percentages as text
              },
            ]}
            layout={{ width: 500, height: 500, title: "Pie Chart" }}
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
                x: ["Category 1", "Category 2", "Category 3"], // Array of category labels
                y: [40, 60, 80], // Array of data values for each category
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
              title: "Número de trazas según su tipo",
            }}
          />
        </div>
        <div className="w-full flex shadow-lg p-2 place-content-center place-items-center">
          <Plot
            className="me-auto"
            data={[
              {
                type: "line", // Change type to 'line' for line charts
                x: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10], // Array of x-axis values
                y: [2, 5, 3, 7, 2, 1, 4, 6, 3, 5], // Array of y-axis values (mountain-like pattern)
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
            layout={{ width: 500, height: 500, title: "Pie Chart" }}
          />
        </div>
        <div className="w-full flex flex-col shadow-lg p-2 place-content-center place-items-center">
          <DateRangePicker label="Rango de fechas" className="max-w-xs" />
          <Plot
            className="me-auto"
            data={[
              {
                type: "line",
                x: [1, 2, 3, 6, 9, 12, 17, 1000], // Increased number of x-axis values
                y: [2, 5, 3, 5, 4, 2, 8, 4], // Repeat y-axis values for larger scale
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
              title: "Anomalias",
              xaxis: {
                range: [1, 1000], // Set x-axis range to match data
              },
              yaxis: {
                range: [0, 10], // Set y-axis range to accommodate y-values
              },
            }}
          />
        </div>
        <div className="w-full flex flex-col shadow-lg p-2 place-content-center place-items-center">
          <Table aria-label="Example static collection table">
            <TableHeader>
              <TableColumn>Estación</TableColumn>
              <TableColumn>Clasificación</TableColumn>
              <TableColumn>Estado</TableColumn>
            </TableHeader>
            <TableBody>
              <TableRow key="1">
                <TableCell>Estación 1</TableCell>
                <TableCell>Tipo 1</TableCell>
                <TableCell>
                  <Chip color="success">Activo</Chip>
                </TableCell>
              </TableRow>
              <TableRow key="2">
                <TableCell>Estación 2</TableCell>
                <TableCell>Tipo 2</TableCell>
                <TableCell>
                  <Chip color="default">Inactivo</Chip>
                </TableCell>
              </TableRow>
              <TableRow key="3">
                <TableCell>Estación 3</TableCell>
                <TableCell>Tipo 3</TableCell>
                <TableCell>
                  <Chip color="danger">Problema</Chip>
                </TableCell>
              </TableRow>
              <TableRow key="4">
                <TableCell>Estación 4</TableCell>
                <TableCell>Tipo 4</TableCell>
                <TableCell>
                  <Chip color="success">Activo</Chip>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
