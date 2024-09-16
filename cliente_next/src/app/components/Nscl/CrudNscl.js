import {
  MagnifyingGlassIcon,
  PencilSquareIcon,
  TrashIcon,
  TvIcon,
} from "@heroicons/react/20/solid";
import { useEffect, useState } from "react";
import SaveIcon from "./SaveIcon";
import { ENV } from "@/config/env";
import VentanaGuralp from "../Modals/VentanaGuralp";

export default function CrudNscl({ nscls, setNscls, id, element }) {
  // el id es el identificador de la estación

  const [busqueda, setBusqueda] = useState("");
  const [load, setLoad] = useState(false);
  const [filtro, setFiltro] = useState([]);
  const [editando, setEditando] = useState({
    estado: false,
    id: 0, // Identifica el NSCL estamos editando
  });

  const [instrumentos, setInstrumentos] = useState("");

  const [datos, setDatos] = useState({
    // de un solo registro en cuestión
    id_nscl: "",
    codigo_localizacion: "",
    instrumento: "",
    fecha_inicio: "",
    fecha_finalizacion: "",
    codigo_bidimensional: "",
    sensor: "",
    digitalizador: "",
    almacenamiento: "",
    condicion_instalacion: "",
    transmision: "",
    descarga: "",
    alcance: "",
    tipo_estacion: "",
    tipo_adquisicion: "",
    estado: "",
    comentarios: "",
    estacion: id, // llave foranea que conecta al nscl con la estación
  });

  const [nuevaFila, setNuevaFila] = useState(false);
  // Función buscar
  const handleSearch = (e) => {
    if (busqueda.length > 0) {
      setFiltro([
        ...nscls.filter((q) =>
          q.instrumento.toLowerCase().includes(busqueda.toLowerCase())
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

  // Función para activar la edición de un nscl
  const handleEditar = (nscl) => {
    setEditando({
      estado: !editando.estado,
      id: nscl.id_nscl,
    });

    setDatos({
      id_nscl: nscl.id_nscl,
      codigo_localizacion: nscl.codigo_localizacion,
      instrumento: nscl.instrumento,
      fecha_inicio: nscl.fecha_inicio,
      fecha_finalizacion: nscl.fecha_finalizacion,
      codigo_bidimensional: nscl.codigo_bidimensional,
      sensor: nscl.sensor,
      digitalizador: nscl.digitalizador,
      almacenamiento: nscl.almacenamiento,
      condicion_instalacion: nscl.condicion_instalacion,
      transmision: nscl.transmision,
      descarga: nscl.descarga,
      alcance: nscl.alcance,
      tipo_estacion: nscl.tipo_estacion,
      tipo_adquisicion: nscl.tipo_adquisicion,
      estado: nscl.estado,
      comentarios: nscl.comentarios,
      estacion: nscl.estacion,
    });
  };

  //Función para llamar a los distintos tipos de instrumentos de la tabla de dispositivos de la base de datos
  const obtenerInstrumentos = async () => {
    const response = await fetch("/api/dispositivos/getsubgrupos/" + id); // el id es el identificador de la estación
    await response
      .json()
      .then((res) => {
        //console.log("res", res.results);
        setInstrumentos(res.results);
      })
      .catch((err) => console.error(err));
  };

  // Función para llamar a los Nscls de la base de datos
  const obtenerNscls = async () => {
    const response = await fetch("/api/nscl/get/" + id); // el id es el identificador de la estación
    await response
      .json()
      .then((res) => {
        //console.log("res", res);
        setNscls(res.results);
      })
      .catch((err) => console.error(err));
  };

  // Nueva Fila
  const handleNuevaFila = () => {
    setNuevaFila((prev) => (prev = true));
    console.log(nuevaFila);
  };

  const resetearDatos = () => {
    setDatos({
      id_nscl: "",
      codigo_localizacion: "",
      instrumento: "",
      fecha_inicio: "",
      fecha_finalizacion: "",
      codigo_bidimensional: "",
      sensor: "",
      digitalizador: "",
      almacenamiento: "",
      condicion_instalacion: "",
      transmision: "",
      descarga: "",
      alcance: "",
      tipo_estacion: "",
      tipo_adquisicion: "",
      estado: "",
      comentarios: "",
      estacion: id, // llave foranea que conecta al dispositivo con la estación
    });
  };

  // Función para eliminar dispostivos de la base de datos
  const handleEliminar = (nscl) => {
    const confirm = window.confirm(
      `¿Estás seguro que deseas eliminar el nscl ${nscl.id_nscl}?`
    );
    if (confirm) {
      const response = fetch(ENV.URLBASE + "/api/nscl/delete", {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id_nscl: nscl.id_nscl,
        }),
      });

      response
        .then((res) => {
          console.log(res);
          obtenerNscls();
          alert("Nscl eliminado");
        })
        .catch((err) => {
          console.error(err);
        });
      resetearDatos();
    }
  };

  // Función para actulizar la base de datos
  const handleUpdateBD = async (e) => {
    await fetch(ENV.URLBASE + "api/nscl/update", {
      method: "PUT",
      body: JSON.stringify({
        id_nscl: datos.id_nscl,
        codigo_localizacion: datos.codigo_localizacion,
        instrumento: datos.instrumento,
        fecha_inicio: datos.fecha_inicio,
        fecha_finalizacion: datos.fecha_finalizacion,
        codigo_bidimensional: datos.codigo_bidimensional,
        sensor: datos.sensor,
        digitalizador: datos.digitalizador,
        almacenamiento: datos.almacenamiento,
        condicion_instalacion: datos.condicion_instalacion,
        transmision: datos.transmision,
        descarga: datos.descarga,
        alcance: datos.alcance,
        tipo_estacion: datos.tipo_estacion,
        tipo_adquisicion: datos.tipo_adquisicion,
        estado: datos.estado,
        comentarios: datos.comentarios,
        estacion: datos.estacion,
      }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then(async (res) => {
        console.log(await res.json());
      })
      .catch((err) => {
        console.error(err);
      });

    obtenerNscls();
    resetearDatos();
    setEditando({
      estado: false,
      id: 0,
    });
    alert("Información actualizada");
  };

  // Función para crear nuevo NSCL en la Base de datos
  const handleNuevoNscl = () => {
    // Comprobamos que hay datos para insertar
    const comprobar = comprobarDatosGuardar();
    if (comprobar) {
      const comprobarDatosNoVacios = comprobarCamposVacios();
      if (comprobarDatosNoVacios) {
        const guadar = confirm("¿Deseas guardar los datos?");
        if (guadar) {
          // Crear NSCL en la BD
          const response = fetch(ENV.URLBASE + "api/nscl/create", {
            method: "POST",
            body: JSON.stringify({
              id_nscl: datos.id_nscl,
              codigo_localizacion: datos.codigo_localizacion,
              instrumento: datos.instrumento,
              fecha_inicio: datos.fecha_inicio,
              fecha_finalizacion: datos.fecha_finalizacion,
              codigo_bidimensional: datos.codigo_bidimensional,
              sensor: datos.sensor,
              digitalizador: datos.digitalizador,
              almacenamiento: datos.almacenamiento,
              condicion_instalacion: datos.condicion_instalacion,
              transmision: datos.transmision,
              descarga: datos.descarga,
              alcance: datos.alcance,
              tipo_estacion: datos.tipo_estacion,
              tipo_adquisicion: datos.tipo_adquisicion,
              estado: datos.estado,
              comentarios: datos.comentarios,
              estacion: datos.estacion,
            }),
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
          });

          response
            .then((res) => {
              console.log(res);
              obtenerNscls();
              alert("Nscl ingresado");
            })
            .catch((err) => {
              console.error(err);
            });

          setNuevaFila(false);
          resetearDatos();
        } else {
          // Pregunta Guardar Datos
          setNuevaFila(false);
          LimpiarCampos();
        }
      } else {
        // --- Datos no vacios
        alert(
          "Los campos: Instrumento, Sensor y Digitalizador, son requeridos."
        );
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

    //  NO ESTA GUARDANDO ES COMO SI NO LLEGARA NADA A datos
    //  HAY QUE HACER EL DELETE TAMBIÉN

    console.log("datos instrumentooooooo", datos.instrumento);

    if (
      datos.instrumento != "" &&
      datos.sensor != "" &&
      datos.digitalizador != "" &&
      datos.transmision != ""
    ) {
      comprobar = true;
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
    obtenerInstrumentos();
  }, []);

  useEffect(() => {
    console.log(nscls);

    if (!load) {
      setBusqueda("");
      setLoad(true);
    }

    if (busqueda.length == 0) {
      setFiltro([...nscls.filter((q) => q !== busqueda)]);
    }
  }, [busqueda, load, nscls]);

  const [mostrarVentana, setVentana] = useState(false);

  const handleAbrirTrazas = () => {
    setVentana(true);
  };

  return (
    <>
      {/* Buscador nscls */}
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
          placeholder="Buscar NSCL por instrumento"
          value={busqueda}
          onChange={(e) => {
            setBusqueda(e.target.value);
            handleSearch();
          }}
          required
        />
      </div>

      {/* Tabla */}
      <table>
        <thead>
          <tr>
            {" "}
            {/* Cabeceras */}
            <th>Editar/Guardar</th>
            <th>Eliminar</th>
            {/* <th>ID</th> */}
            <th>Código de localización</th>
            <th>Instrumento</th>
            {/* <th>Fecha de inicio</th>
              <th>Fecha de finalización</th> */}
            <th>Sensor</th>
            <th>Digitalizador</th>
            <th>Transmisión</th>
            {/* <th>Almacenamiento</th>
              <th>Condición de instalación</th>
              <th>Transmisión</th>
              <th>Descarga</th>
              <th>Alcance</th>
              <th>Tipo de estación</th>
              <th>Tipo de adquisición</th> */}
            <th>Estado</th>
            <th>Comentarios</th>
            {/* <th>Estación</th> */}
          </tr>
        </thead>

        <tbody>
          {nscls != null && nscls.length > 0 ? (
            filtro.map((nscl, i) => (
              <tr key={"nscl-" + i}>
                <td>
                  {editando.estado && editando.id === nscl.id_nscl ? (
                    <button
                      className="btn-save" // boton guardar
                      onClick={() => handleUpdateBD()}
                      title="Editar/Guardar"
                    >
                      <SaveIcon className="w-5 h-5 text-white" />
                    </button>
                  ) : (
                    <button // boton editar
                      className="btn-edit"
                      onClick={() => handleEditar(nscl)}
                      title="Editar/Guardar"
                    >
                      <PencilSquareIcon className="w-5 h-5" />
                    </button>
                  )}
                </td>

                {/* boton eliminar */}
                <td>
                  <button
                    className={`btn-remove ${
                      editando.estado && editando.id === nscl.id_nscl
                        ? "btn-disabled"
                        : ""
                    }`}
                    onClick={() => handleEliminar(nscl)}
                  >
                    <TrashIcon className="w-5 h-5" />
                  </button>
                </td>

                {/* Registros */}

                <td>
                  {editando.estado && editando.id === nscl.id_nscl ? (
                    <input
                      className="text-gray-700 bg-gray-100 border border-[#C4D92E] rounded p-2 focus:outline-none focus:ring-2 focus:ring-[#82A53D]"
                      type="text"
                      name="codigo_localizacion"
                      value={datos.codigo_localizacion}
                      onChange={handleHacerCambios}
                    />
                  ) : (
                    <>{nscl.codigo_localizacion}</>
                  )}
                </td>

                <td>
                  {editando.estado && editando.id === nscl.id_nscl ? (
                    <select
                      className="text-gray-700 bg-gray-100 border border-[#C4D92E] rounded p-2 focus:outline-none focus:ring-2 focus:ring-[#82A53D]"
                      name="instrumento"
                      value={datos != null ? datos.instrumento : ""}
                      onChange={handleHacerCambios}
                    >
                      {/* options */}
                      {instrumentos.map((inst, index) => (
                        <option key={index} value={inst.subgrupo}>
                          {inst.subgrupo}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <>{nscl.instrumento}</>
                  )}
                </td>

                <td>
                  {editando.estado && editando.id === nscl.id_nscl ? (
                    <input
                      className="text-gray-700 bg-gray-100 border border-[#C4D92E] rounded p-2 focus:outline-none focus:ring-2 focus:ring-[#82A53D]"
                      type="text"
                      name="sensor"
                      value={datos.sensor}
                      onChange={handleHacerCambios}
                    />
                  ) : (
                    <>{nscl.sensor}</>
                  )}
                </td>

                <td>
                  {editando.estado && editando.id === nscl.id_nscl ? (
                    <input
                      className="text-gray-700 bg-gray-100 border border-[#C4D92E] rounded p-2 focus:outline-none focus:ring-2 focus:ring-[#82A53D]"
                      type="text"
                      name="digitalizador"
                      value={datos.digitalizador}
                      onChange={handleHacerCambios}
                    />
                  ) : (
                    <>{nscl.digitalizador}</>
                  )}
                </td>

                <td>
                  {editando.estado && editando.id === nscl.id_nscl ? (
                    <input
                      className="text-gray-700 bg-gray-100 border border-[#C4D92E] rounded p-2 focus:outline-none focus:ring-2 focus:ring-[#82A53D]"
                      type="text"
                      name="transmision"
                      value={datos.transmision}
                      onChange={handleHacerCambios}
                    />
                  ) : (
                    <>{nscl.transmision}</>
                  )}
                </td>

                <td>
                  {editando.estado && editando.id === nscl.id_nscl ? (
                    <select
                      className="text-gray-700 bg-gray-100 border border-[#C4D92E] rounded p-2 focus:outline-none focus:ring-2 focus:ring-[#82A53D]"
                      name="estado"
                      value={datos != null ? datos.estado : ""}
                      onChange={handleHacerCambios}
                    >
                      <option value="0">
                        ..........................................
                      </option>
                      <option value="Activa">Activa</option>
                      <option value="Inactiva">Inactiva</option>
                    </select>
                  ) : (
                    <>{nscl.estado}</>
                  )}
                </td>

                <td>
                  {editando.estado && editando.id === nscl.id_nscl ? (
                    <textarea
                      name="comentarios"
                      rows="4"
                      cols="40"
                      className="text-gray-700 bg-gray-100 border border-[#C4D92E] rounded p-2 focus:outline-none focus:ring-2 focus:ring-[#82A53D]"
                      type="text"
                      value={datos.comentarios}
                      onChange={handleHacerCambios}
                    />
                  ) : (
                    <>{nscl.comentarios}</>
                  )}
                </td>
              </tr>
            ))
          ) : (
            <></>
          )}

          {/* para nuevo NSCL */}
          {nuevaFila ? (
            <>
              <tr>
                <td>
                  <button
                    className="btn-save"
                    onClick={handleNuevoNscl}
                    title="Editar/Guardar"
                  >
                    <SaveIcon className="w-5 h-5 text-white" />
                  </button>
                </td>

                <td> </td>

                <td>
                  <input
                    className="text-gray-700 bg-gray-100 border border-[#C4D92E] rounded p-2 focus:outline-none focus:ring-2 focus:ring-[#82A53D]"
                    type="text"
                    name="codigo_localizacion"
                    onChange={handleHacerCambios}
                  />
                </td>

                <td>
                  <select
                    className="text-gray-700 bg-gray-100 border border-[#C4D92E] rounded p-2 focus:outline-none focus:ring-2 focus:ring-[#82A53D]"
                    name="instrumento"
                    onChange={handleHacerCambios}
                  >
                    {/* options */}
                    {instrumentos.map((inst, index) => (
                      <option key={index} value={inst.subgrupo}>
                        {inst.subgrupo}
                      </option>
                    ))}
                  </select>
                </td>

                <td>
                  <input
                    className="text-gray-700 bg-gray-100 border border-[#C4D92E] rounded p-2 focus:outline-none focus:ring-2 focus:ring-[#82A53D]"
                    type="text"
                    name="sensor"
                    onChange={handleHacerCambios}
                  />
                </td>

                <td>
                  <input
                    className="text-gray-700 bg-gray-100 border border-[#C4D92E] rounded p-2 focus:outline-none focus:ring-2 focus:ring-[#82A53D]"
                    type="text"
                    name="digitalizador"
                    onChange={handleHacerCambios}
                  />
                </td>

                <td>
                  <input
                    className="text-gray-700 bg-gray-100 border border-[#C4D92E] rounded p-2 focus:outline-none focus:ring-2 focus:ring-[#82A53D]"
                    type="text"
                    name="transmision"
                    onChange={handleHacerCambios}
                  />
                </td>

                <td>
                  <select
                    className="text-gray-700 bg-gray-100 border border-[#C4D92E] rounded p-2 focus:outline-none focus:ring-2 focus:ring-[#82A53D]"
                    name="estado"
                    onChange={handleHacerCambios}
                  >
                    <option value="0">
                      ..........................................
                    </option>
                    <option value="Activa">Activa</option>
                    <option value="Inactiva">Inactiva</option>
                  </select>
                </td>

                <td>
                  <textarea
                    name="comentarios"
                    rows="4"
                    cols="40"
                    className="text-gray-700 bg-gray-100 border border-[#C4D92E] rounded p-2 focus:outline-none focus:ring-2 focus:ring-[#82A53D]"
                    type="text"
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

      <button className="btn-create" onClick={handleNuevaFila}>
        Crear NSCL
      </button>

      <button className="btn-create" onClick={handleAbrirTrazas}>
        Trazas
      </button>
      {mostrarVentana ? (
        <VentanaGuralp
          mostrarVentana={mostrarVentana}
          setVentana={setVentana}
          element={element}
          id={id}
        />
      ) : (
        <></>
      )}
      
    </>
  );
}
