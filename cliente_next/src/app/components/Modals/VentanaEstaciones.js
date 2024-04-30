import { useEffect, useState } from "react";
import "@/app/styles/table-list.css";

export default function VentanaEstaciones({ emplazamiento, mostrar }) {
  const [show, setShow] = useState(false);
  const [load, setLoad] = useState(false);
  const [estaciones, setEstaciones] = useState([]);

  const obtenerEstaciones = async () => {
    const response = await fetch("/api/emplazamiento/" + emplazamiento.id);
    //setEstaciones(await response.json());
    await response
      .json()
      .then((res) => {
        setEstaciones(res.results);
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    if (!load) {
      setShow(mostrar);
      obtenerEstaciones();
      setLoad(true);
    }
  }, [load, estaciones]);

  return (
    <>
      {show ? (
        <div className="fixed block w-full h-full m-0 p-0 z-[100] top-0 left-0 bg-[rgba(0,0,0,0.5)] overflow-y-auto mb-10">
          <div className="table ml-auto mr-auto top-1/4 p-0 relative max-w-80 min-w-60 rounded-xl bottom-10">
            <section
              className="relative p-2 block bg-slate-100 text-slate-800 rounded-tl-[inherit] rounded-tr-[inherit]"
              role="heading"
            >
              Estaciones | {emplazamiento.name}
            </section>
            <section
              role="main"
              className="p-2 relative block bg-slate-100 text-slate-800"
            >
              {estaciones.length > 0 ? (
                <table>
                <thead>
                  <tr>
                    <th>Estación</th>
                    <th>Latitud</th>
                    <th>Longitud</th>
                    <th>Fecha creación</th>
                  </tr>
                </thead>
                <tbody>
                  {estaciones.map((estacion, i) => (
                    <tr key={"estacion-" + i}>
                      <td>
                        {estacion.name}
                      </td>
                      <td>
                        {estacion.latitude}
                      </td>
                      <td>
                        {estacion.longitude}
                      </td>
                      <td>
                        {estacion.creation_time}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              ) : (
                <h3>No hay estaciones.</h3>
              )}
            </section>
            <section
              role="footer"
              className="p-2 relative block bg-slate-100 text-slate-800 rounded-bl-[inherit] rounded-br-[inherit]"
            >
              <button
                type="button"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                onClick={() => {
                  setShow(false);
                }}
              >
                Cerrar
              </button>
            </section>
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
}
