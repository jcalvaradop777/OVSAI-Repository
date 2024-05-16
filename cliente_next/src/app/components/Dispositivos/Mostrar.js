import {
  MagnifyingGlassIcon,
  PencilSquareIcon,
  TrashIcon,
  TvIcon,
} from "@heroicons/react/20/solid";
import { useEffect, useState } from "react";
import SaveIcon from "./SaveIcon";
import { ENV } from "@/config/env";

export default function MostrarDispositivos({ dispositivos, setDispositivos, id }) {
  const [busqueda, setBusqueda] = useState("");
  const [load, setLoad] = useState(false);
  const [filtro, setFiltro] = useState([]);
  const [editando, setEditando] = useState({
    estado: false,
    serial: 0, // El serial es como el id, en este caso para identificar a que dispositivo estamos editando
  });
  const [datos, setDatos] = useState({
    grupo: "",
    subgrupo: "",
    placa: "",
    serial: "",
    codigo_bidimensional: "",
    secuencia: "",
    marca: "",
    modelo: "",
    estado: "",
    propietario: "",
    proveedor: "",
    responsable: "",
    lugar: "",
    estacion: "",
    fecha_mantenimiento: "",
    fecha_instalacion: "",
    fecha_retiro: "",
    fecha_recepcion: "",
    fecha_baja: "",
    inventariado: "",
    fecha_inventariado: "",
    comentarios: "",
  });
  const [nuevaFila, setNuevaFila] = useState(false);

  // Función buscar
  const handleSearch = (e) => {
    if (busqueda.length > 0) {
      setFiltro([
        ...dispositivos.filter((q) =>
          q.grupo.toLowerCase().includes(busqueda.toLowerCase())
        ),
      ]);
    }
  };

  // Función para hacer cambios, mientras se edita
  const handleHacerCambios = (e) => {
    setDatos({
      ...datos,
      [e.target.name]: e.target.value,
    });
  };

  // Función para activar la edición de un dispositivo
  const handleEditar = (serial) => {
    setEditando({
      estado: !editando.estado,
      serial: serial,
    });
  };

  // Función para llamar a los dispositivos en base de datos
  const obtenerDispositivos = async () => {
    const response = await fetch("/api/dispositivos/get/" + id);
    await response
      .json()
      .then((res) => {
        console.log("res", res);
        setDispositivos(res.results);
      })
      .catch((err) => console.error(err));
  };

  // Función para crear nuevo dispositivo
  const handleNuevoDispositivo = () => {
    setNuevaFila(true);
    // Comprobamos que hay datos para insertar
    const comprobar = comprobarDatosGuardar();

    if (comprobar) {
      const preguntar = confirm("¿Deseas guardar los datos?");
      if (preguntar) {
        const comprobarDatosVacios = comprobarCamposVacios();

        if (comprobarDatosVacios) {
          // Crear dispositivo

          const response = fetch(ENV.URLBASE + "api/dispositivos/create", {
            method: "POST",
            body: JSON.stringify({
              grupo: datos.grupo,
              subgrupo: datos.subgrupo,
              placa: datos.placa,
              serial: datos.serial,
              codigo_bidimensional: datos.codigo_bidimensional,
              secuencia: datos.secuencia,
              marca: datos.marca,
              modelo: datos.modelo,
              estado: datos.estado,
              propietario: datos.propietario,
              proveedor: datos.proveedor,
              responsable: datos.responsable,
              lugar: datos.lugar,
              estacion: datos.estacion,
              fecha_mantenimiento: datos.fecha_mantenimiento,
              fecha_instalacion: datos.fecha_instalacion,
              fecha_retiro: datos.fecha_retiro,
              fecha_recepcion: datos.fecha_recepcion,
              fecha_baja: datos.fecha_baja,
              inventariado: datos.inventariado,
              fecha_inventariado: datos.fecha_inventariado,
              comentarios: datos.comentarios,
            }),
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
          });

          response
            .then((res) => {
              console.log(res);
              obtenerDispositivos();
            })
            .catch((err) => {
              console.error(err);
            });

          setNuevaFila(false);

          // ---
        } else {
          alert("Debe llenar todos los campos");
        }
      } else {
        setNuevaFila(false);

        LimpiarCampos();
      }
    } else {
      setNuevaFila(!nuevaFila);
    }
  };

  // Función para comprobar si hay datos para guardar
  function comprobarDatosGuardar() {
    let comprobar = false;
    if (Object.keys(datos).length > 0) {
      for (let dato in datos) {
        if (typeof datos[dato] === "string" && datos[dato].length > 0) {
          comprobar = true;
        }
      }
    }

    return comprobar;
  }

  // Función para comprobar si hay campos vacios
  function comprobarCamposVacios() {
    let comprobar = false;
    if (Object.keys(datos).length > 0) {
      for (let dato in datos) {
        if (typeof datos[dato] === "string" && datos[dato].length == 0) {
          comprobar = true;
        }
      }
    }

    return comprobar;
  }

  // Función para limpiar campos
  function LimpiarCampos() {
    let comprobar = false;
    if (Object.keys(datos).length > 0) {
      for (let dato in datos) {
        if (typeof datos[dato] === "string" && datos[dato].length > 0) {
          setDatos({
            ...datos,
            [dato]: "",
          });
        }
      }
    }

    return comprobar;
  }

  useEffect(() => {
    console.log(dispositivos);

    if (!load) {
      setBusqueda("");
      setLoad(true);
    }

    if (busqueda.length == 0) {
      setFiltro([...dispositivos.filter((q) => q !== busqueda)]);
    }
  }, [busqueda, load, dispositivos]);

  return (
    <>
      {/* Buscador dispositivos */}
      <label
        htmlFor="default-search"
        className="mb-2 text-sm font-medium text-gray-900 sr-only"
      >
        Buscar
      </label>
      <div className="relative w-full inline-block">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
          <MagnifyingGlassIcon className="w-5 h-5" />
        </div>
        <input
          type="search"
          id="default-search"
          className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Buscar dispositivos"
          value={busqueda}
          onChange={(e) => {
            setBusqueda(e.target.value);
            handleSearch();
          }}
          required
        />
      </div>
      <button className="btn-create" onClick={handleNuevoDispositivo}>
        Crear dispositivo
      </button>

      {/* Buscador dispositivos fin */}
      {dispositivos != null && dispositivos.length > 0 ? (
        <table>
          <thead>
            <tr>
              {" "}
              {/* filas */}
              <th>Editar/Guardar</th>
              <th>Eliminar</th>
              <th>Serial</th> {/* th encabezados */}
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
              <th>Inventariado</th>
              <th>Fecha de inventario</th>
              <th>Comentarios</th>
            </tr>
          </thead>
          <tbody>
            {filtro.map((dispositivo, i) => (
              <tr key={"dispositivo-" + i}>
                <td>
                  {editando.estado && editando.serial === dispositivo.serial ? (
                    <button
                      className="btn-save"
                      onClick={() => handleEditar(dispositivo.serial)}
                      title="Editar/Guardar"
                    >
                      <SaveIcon className="w-5 h-5 text-white" />
                    </button>
                  ) : (
                    <button
                      className="btn-edit"
                      onClick={() => handleEditar(dispositivo.serial)}
                      title="Editar/Guardar"
                    >
                      <PencilSquareIcon className="w-5 h-5" />
                    </button>
                  )}
                </td>
                <td>
                  <button
                    className={`btn-remove ${
                      editando.estado && editando.serial === dispositivo.serial
                        ? "btn-disabled"
                        : ""
                    }`}
                  >
                    <TrashIcon className="w-5 h-5" />
                  </button>
                </td>
                <td>
                  {" "}
                  {/* filas de datos */}
                  {editando.estado && editando.serial === dispositivo.serial ? (
                    <input
                      type="text"
                      name="serial"
                      value={dispositivo.serial}
                      onChange={handleHacerCambios}
                    />
                  ) : (
                    <>{dispositivo.serial}</>
                  )}
                </td>
                <td>
                  {editando.estado && editando.serial === dispositivo.serial ? (
                    <input
                      type="text"
                      name="serial"
                      value={dispositivo.grupo}
                      onChange={handleHacerCambios}
                    />
                  ) : (
                    <>{dispositivo.grupo}</>
                  )}
                </td>
                <td>
                  {editando.estado && editando.serial === dispositivo.serial ? (
                    <input
                      type="text"
                      name="serial"
                      value={dispositivo.subgrupo}
                      onChange={handleHacerCambios}
                    />
                  ) : (
                    <>{dispositivo.subgrupo}</>
                  )}
                </td>
                <td>
                  {editando.estado && editando.serial === dispositivo.serial ? (
                    <input
                      type="text"
                      name="serial"
                      value={dispositivo.placa}
                      onChange={handleHacerCambios}
                    />
                  ) : (
                    <>{dispositivo.placa}</>
                  )}
                </td>
                <td>{dispositivo.codigo_bidimensional}</td>
                <td>{dispositivo.secuencia}</td>
                <td>{dispositivo.marca}</td>
                <td>{dispositivo.modelo}</td>
                <td>{dispositivo.estado}</td>
                <td>{dispositivo.propietario}</td>
                <td>{dispositivo.proveedor}</td>
                <td>{dispositivo.responsable}</td>
                <td>{dispositivo.lugar}</td>
                <td>{dispositivo.estacion}</td>
                <td>{dispositivo.fecha_mantenimiento}</td>
                <td>{dispositivo.fecha_instalacion}</td>
                <td>{dispositivo.fecha_retiro}</td>
                <td>{dispositivo.fecha_recepcion}</td>
                <td>{dispositivo.fecha_baja}</td>
                <td>{dispositivo.inventariado}</td>
                <td>{dispositivo.fecha_inventariado}</td>
                <td>{dispositivo.comentarios}</td>
              </tr>
            ))}
            {nuevaFila ? (
              <>
                <tr>
                  <td>
                    <button
                      className="btn-save"
                      onClick={handleNuevoDispositivo}
                      title="Editar/Guardar"
                    >
                      <SaveIcon className="w-5 h-5 text-white" />
                    </button>
                  </td>
                  <td>
                  {" "}
                  </td>
                  <td>
                    <input
                      type="text"
                      name="serial"
                      onChange={handleHacerCambios}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      name="grupo"
                      onChange={handleHacerCambios}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      name="subgrupo"
                      onChange={handleHacerCambios}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      name="placa"
                      onChange={handleHacerCambios}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      name="codigo_bidimensional"
                      onChange={handleHacerCambios}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      name="secuencia"
                      onChange={handleHacerCambios}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      name="marca"
                      onChange={handleHacerCambios}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      name="modelo"
                      onChange={handleHacerCambios}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      name="estado"
                      onChange={handleHacerCambios}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      name="propietario"
                      onChange={handleHacerCambios}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      name="proveedor"
                      onChange={handleHacerCambios}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      name="responsable"
                      onChange={handleHacerCambios}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      name="lugar"
                      onChange={handleHacerCambios}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      name="estacion"
                      onChange={handleHacerCambios}
                    />
                  </td>
                  <td>
                    <input
                      type="datetime-local"
                      name="fecha_mantenimiento"
                      onChange={handleHacerCambios}
                    />
                  </td>
                  <td>
                    <input
                      type="datetime-local"
                      name="fecha_instalacion"
                      onChange={handleHacerCambios}
                    />
                  </td>
                  <td>
                    <input
                      type="datetime-local"
                      name="fecha_retiro"
                      onChange={handleHacerCambios}
                    />
                  </td>
                  <td>
                    <input
                      type="datetime-local"
                      name="fecha_baja"
                      onChange={handleHacerCambios}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      name="inventariado"
                      onChange={handleHacerCambios}
                    />
                  </td>
                  <td>
                    <input
                      type="datetime-local"
                      name="fecha_inventariado"
                      onChange={handleHacerCambios}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      name="comentarios"
                      onChange={handleHacerCambios}
                    />
                  </td>
                </tr>
              </>
            ) : (
              <></>
            )}
          </tbody>
        </table>
      ) : (
        <h3>No hay dispositivos.</h3>
      )}
    </>
  );
}
