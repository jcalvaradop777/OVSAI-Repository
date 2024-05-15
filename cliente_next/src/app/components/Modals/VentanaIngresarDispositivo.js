import { useEffect, useState } from "react";
import "@/app/styles/table-list.css";

export default function VentanaIngresarDispositivo({ id, mostrar }) {
  const [show, setShow] = useState(false);
  const [load, setLoad] = useState(false);
  const [dispositivos, setDispositivos] = useState([]);

  const obtenerDispositivos = async () => {
    const response = await fetch("/api/dispositivos/get/" + id);
    await response
      .json()
      .then((res) => {
        console.log("res", res)
        setDispositivos(res.results); 
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    if (!load) {
      setShow(mostrar);
      obtenerDispositivos();
      setLoad(true);
    }
  }, [load, dispositivos]);

  return (
    <>
      {show ? (
        <div className="fixed block w-full h-full m-0 p-0 z-[100] top-0 left-0 bg-[rgba(0,0,0,0.5)] overflow-y-auto mb-10">
          <div className="table ml-auto mr-auto top-1/4 p-0 relative max-w-80 min-w-60 rounded-xl bottom-10">
            <section
              className="relative p-2 block bg-slate-100 text-slate-800 rounded-tl-[inherit] rounded-tr-[inherit]"
              role="heading"
            >
              Dispositivos
            </section>
            <section
              role="main"
              className="p-2 relative block bg-slate-100 text-slate-800"
            >
              {dispositivos !=null && dispositivos.length > 0 ? (
                <table>
                <thead>
                  <tr> {/* filas */}
                    <th>Serial</th>  {/* th encabezados */}
                    <th>Grupo</th>
                    <th>Subgrupo</th>
                    <th>Placa</th>
                    <th>Código bidimensional</th>
                    <th>Número de secuencia</th>
                    <th>Marca</th>
                    <th>Modelo</th>
                    <th>Estado</th>
                    <th>Propietario</th>
                    <th>Proveeor</th>
                    <th>Responsable</th>
                    <th>Lugar</th>
                    <th>Estación</th>
                    <th>Fecha de mantenimiento</th>
                    <th>Fecha de instalacion</th>
                    <th>Fecha de retiro</th>
                    <th>Fecha de baja</th>
                    <th>Propietario</th>
                    <th>Inventariado</th>
                    <th>Fecha de inventario</th>
                    <th>Comentarios</th>             
                  </tr>
                </thead>
                <tbody>
                  {dispositivos.map((dispositivo, i) => (
                    <tr key={"dispositivo-" + i}>
                      <td> {/* filas de datos */}
                        {dispositivo.serial}
                      </td>
                      <td>
                        {dispositivo.grupo}
                      </td>
                      <td>
                        {dispositivo.subgrupo}
                      </td>
                      <td>
                        {dispositivo.placa}
                      </td>
                      <td>
                        {dispositivo.codigo_bidimensional}
                      </td>
                      <td>
                        {dispositivo.secuencia}
                      </td>
                      <td>
                        {dispositivo.marca}
                      </td>
                      <td>
                        {dispositivo.modelo}
                      </td>
                      <td>
                        {dispositivo.estado}
                      </td>
                      <td>
                        {dispositivo.propietario}
                      </td>
                      <td>
                        {dispositivo.proveedor}
                      </td>
                      <td>
                        {dispositivo.responsable}
                      </td>
                      <td>
                        {dispositivo.lugar}
                      </td>
                      <td>
                        {dispositivo.estacion}
                      </td>
                      <td>
                        {dispositivo.fecha_mantenimiento}
                      </td>
                      <td>
                        {dispositivo.fecha_instalacion}
                      </td>
                      <td>
                        {dispositivo.fecha_retiro}
                      </td>
                      <td>
                        {dispositivo.fecha_recepcion}
                      </td>
                      <td>
                        {dispositivo.fecha_baja}
                      </td>
                      <td>
                        {dispositivo.inventariado}
                      </td>
                      <td>
                        {dispositivo.fecha_inventariado}
                      </td>
                      <td>
                        {dispositivo.comentarios}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              ) : (
                <h3>No hay dispositivos.</h3>
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
