import {
  MagnifyingGlassIcon,
  PencilSquareIcon,
  TrashIcon,
  TvIcon,
} from "@heroicons/react/20/solid";
import { useEffect, useState } from "react";
import SaveIcon from "./SaveIcon";
import { ENV } from "@/config/env";
import DashboardSnmp from "../Snmp/DashboardSnmp";

export default function CrudDispositivos({ dispositivos, setDispositivos, id }) {  // el id es el identificador de la estación

  const [busqueda, setBusqueda] = useState("");
  const [load, setLoad] = useState(false);
  const [filtro, setFiltro] = useState([]);
  const [editando, setEditando] = useState({
    estado: false,
    id: 0, // Identifica a que dispositivo estamos editando
  });

  const [datos, setDatos] = useState({  // de un solo registro en cuestión
    id_dispositivo: "",
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
    estacion: id, // llave foranea que conecta al dispositivo con la estación
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
          q.subgrupo.toLowerCase().includes(busqueda.toLowerCase())
        ),
      ]);
    }
  };

  const [mostrarVentanaSnmp, setVentanaSnmp] = useState(false);
  const [serialSnmp, setSerialSnmp] = useState(null);;


  // Función para hacer cambios, mientras se edita
  const handleHacerCambios = (e) => {
    setDatos({
      ...datos,
      [e.target.name]: e.target.value,
    });
  };

  // Función para activar la edición de un dispositivo
  const handleEditar = (dispositivo) => {
    setEditando({
      estado: !editando.estado,
      id: dispositivo.id_dispositivo,
    });

    setDatos({
      id_dispositivo: dispositivo.id_dispositivo,
      grupo: dispositivo.grupo,
      subgrupo: dispositivo.subgrupo,
      placa: dispositivo.placa,
      serial: dispositivo.serial,
      codigo_bidimensional: dispositivo.codigo_bidimensional,
      secuencia: dispositivo.secuencia,
      marca: dispositivo.marca,
      modelo: dispositivo.modelo,
      estado: dispositivo.estado,
      propietario: dispositivo.propietario,
      proveedor: dispositivo.proveedor,
      responsable: dispositivo.responsable,
      lugar: dispositivo.lugar,
      estacion: dispositivo.estacion,
      fecha_mantenimiento: dispositivo.fecha_mantenimiento,
      fecha_instalacion: dispositivo.fecha_instalacion,
      fecha_retiro: dispositivo.fecha_retiro,
      fecha_recepcion: dispositivo.fecha_recepcion,
      fecha_baja: dispositivo.fecha_baja,
      inventariado: dispositivo.inventariado,
      fecha_inventariado: dispositivo.fecha_inventariado,
      comentarios: dispositivo.comentarios
    })
  };

  // Función para llamar a los dispositivos de la base de datos
  const obtenerDispositivos = async () => {
    const response = await fetch("/api/dispositivos/get/" + id);  // el id es el identificador de la estación
    await response
      .json()
      .then((res) => {
        //console.log("res", res);
        setDispositivos(res.results);
      })
      .catch((err) => console.error(err));
  };

  // Nueva Fila
  const handleNuevaFila = () => {
    setNuevaFila(true);
  }

  const resetearDatos = () => {
    setDatos({
      id_dispositivo: "",
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
      estacion: id, // llave foranea que conecta al dispositivo con la estación
      fecha_mantenimiento: "",
      fecha_instalacion: "",
      fecha_retiro: "",
      fecha_recepcion: "",
      fecha_baja: "",
      inventariado: "",
      fecha_inventariado: "",
      comentarios: "",
    });
  }

  // Función para eliminar dispostivos de la base de datos
  const handleEliminar = (dispositivo) => {
    const confirm = window.confirm(
      `¿Estás seguro que deseas eliminar el dispositivo ${dispositivo.subgrupo}?`
    );
    if (confirm) {
      const response = fetch(ENV.URLBASE + "/api/dispositivos/delete",
        {
          method: "DELETE",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id_dispositivo: dispositivo.id_dispositivo,
          }),
        }
      );

      response
        .then((res) => {
          console.log(res);
          obtenerDispositivos();
          alert("Dispositivo eliminado");
        })
        .catch((err) => {
          console.error(err);
        });
      resetearDatos();
    }
  };

  // Función para actulizar la base de datos
  const handleUpdateBD = (e) => {
    fetch(ENV.URLBASE + "api/dispositivos/update", {
      method: "PUT",
      body: JSON.stringify({
        id_dispositivo: datos.id_dispositivo,
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

    obtenerDispositivos();
    resetearDatos();
    setEditando({
      estado: false,
      id: 0,
    });
    alert("Información actualizada");
  };

  // Función para crear nuevo dispositivo en la Base de datos
  const handleNuevoDispositivo = () => {

    // Comprobamos que hay datos para insertar
    const comprobar = comprobarDatosGuardar();
    if (comprobar) {

      const comprobarDatosNoVacios = comprobarCamposVacios();
      if (comprobarDatosNoVacios) {

        const guadar = confirm("¿Deseas guardar los datos?");
        if (guadar) {
          // Crear dispositivo en la BD
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
              alert("Dispositivo ingresado");
            })
            .catch((err) => {
              console.error(err);
            });

          setNuevaFila(false);
          resetearDatos();

        } else { // Pregunta Guardar Datos
          setNuevaFila(false);
          LimpiarCampos();
        }

      } else { // --- Datos no vacios
        alert("Los campos: Serial, Grupo y Subgrupo, son requeridos.");
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
    if (datos.grupo != "" && datos.subgrupo != "" && datos.serial != "") {
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


  // Función para eliminar dispostivos de la base de datos
  const handleSnmp = (ser) => {
    setVentanaSnmp(true)
    setSerialSnmp(ser)
  };


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
          placeholder="Buscar dispositivos por Subgrupo"
          value={busqueda}
          onChange={(e) => {
            setBusqueda(e.target.value);
            handleSearch();
          }}
          required
        />
      </div>


      {/* Tabla */}
      {dispositivos != null && dispositivos.length > 0 ? (
        <table>
          <thead>
            <tr>
              {" "}
              {/* Cabeceras */}
              <th>Editar/ Guardar</th>
              <th>Eliminar</th>
              <th>Metadato (SNMP)</th>
              {/* <th>ID</th> */}
              <th>Grupo</th>
              <th>Subgrupo</th>
              <th>Serial</th>
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
              <th>Fecha de mantenimiento</th>
              <th>Fecha de instalación</th>
              <th>Fecha de retiro</th>
              <th>Fecha de recepción</th>
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
                  {editando.estado && editando.id === dispositivo.id_dispositivo ? (
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
                      onClick={() => handleEditar(dispositivo)}
                      title="Editar/Guardar"
                    >
                      <PencilSquareIcon className="w-5 h-5" />
                    </button>
                  )}
                </td>

                {/* boton eliminar */}
                <td>
                  <button
                    className={`btn-remove ${editando.estado && editando.id === dispositivo.id_dispositivo
                      ? "btn-disabled"
                      : ""
                      }`}
                    onClick={() => handleEliminar(dispositivo)}
                  >
                    <TrashIcon className="w-5 h-5" />
                  </button>
                </td>

                {/* SNMP */}
                <td>
                  <button
                    className={`btn-normal`}
                    onClick={() => handleSnmp(dispositivo.serial)}
                  >
                    <TvIcon className="w-5 h-5" />
                  </button>
                  {mostrarVentanaSnmp ? (
                    <DashboardSnmp
                      setVentana={setVentanaSnmp}
                      id_serial={serialSnmp}
                    />
                  ) : (
                    <></>
                  )}
                </td>

                {/* Registros */}

                {/* <td>
                  {editando.estado && editando.id === dispositivo.id_dispositivo ? (
                    <input
                      className="text-gray-700 bg-gray-100 border border-[#C4D92E] rounded p-2 focus:outline-none focus:ring-2 focus:ring-[#82A53D]"
                      type="text"
                      name="id_dispositivo"
                      value={datos.id_dispositivo}
                      onChange={handleHacerCambios}
                    />
                  ) : (
                    <>{dispositivo.id_dispositivo}</>
                  )}
                </td> */}

                <td>
                  {editando.estado && editando.id === dispositivo.id_dispositivo ? (
                    <select
                      className="text-gray-700 bg-gray-100 border border-[#C4D92E] rounded p-2 focus:outline-none focus:ring-2 focus:ring-[#82A53D]"
                      name="grupo"
                      value={(datos != null) ? datos.grupo : ""}
                      onChange={handleHacerCambios}
                    >
                      <option value="0">..........................................</option>
                      <option value="INSTRUMENTACIÓN">INSTRUMENTACIÓN</option>
                      <option value="SISTEMA ELECTRICO">SISTEMA ELECTRICO</option>
                      <option value="TELECOMUNICACIONES">TELECOMUNICACIONES</option>
                      <option value="ACCESORIOS">ACCESORIOS</option>
                      <option value="EQUIPO DE SEGUIMIENTO">EQUIPO DE SEGUIMIENTO</option>
                    </select>
                  ) : (
                    <>{dispositivo.grupo}</>
                  )}
                </td>

                <td>
                  {editando.estado && editando.id === dispositivo.id_dispositivo ? (
                    <select
                      className="text-gray-700 bg-gray-100 border border-[#C4D92E] rounded p-2 focus:outline-none focus:ring-2 focus:ring-[#82A53D]"
                      name="subgrupo"
                      value={(datos != null) ? datos.subgrupo : ""}
                      onChange={handleHacerCambios}
                    >
                      <option value="0">..........................................</option>
                      <option value="DIGITALIZADOR">DIGITALIZADOR </option>
                      <option value="SISMÓMETRO DE BANDA ANCHA">SISMÓMETRO DE BANDA ANCHA</option>
                      <option value="INCLINÓMETRO">INCLINÓMETRO </option>
                      <option value="PANEL SOLAR">PANEL SOLAR</option>
                      <option value="ANTENA GNSS">ANTENA GNSS</option>
                      <option value="RECEPTOR GNSS">RECEPTOR GNSS </option>
                      <option value="REGULADOR DC">REGULADOR DC</option>
                      <option value="CONTROLADOR DE CARGA">CONTROLADOR DE CARGA</option>
                      <option value="ANTENA">ANTENA</option>
                      <option value="SWITCH">SWITCH</option>
                      <option value="SENSOR DE INFRASONIDO">SENSOR DE INFRASONIDO</option>
                      <option value="CÁMARA WEB">CÁMARA WEB</option>
                      <option value="TERMOCUPLA">TERMOCUPLA</option>
                      <option value="GABINETE DE ACERO">GABINETE DE ACERO</option>
                      <option value="TELESCOPIO">TELESCOPIO</option>
                      <option value="FIBRA ÓPTICA">FIBRA ÓPTICA</option>
                      <option value="ESPECTRÓMETRO">ESPECTRÓMETRO</option>
                      <option value="PC INTREGRADO">PC INTREGRADO</option>
                      <option value="ANTENA DE GPS">ANTENA DE GPS</option>
                      <option value="SISMOMETRO/DIGITALIZADOR">SISMOMETRO/DIGITALIZADOR</option>
                      <option value="SISMÓMETRO CORTO PERIODO TRIAXIAL">SISMÓMETRO CORTO PERIODO TRIAXIAL</option>
                      <option value="BASE NIVELANTE">BASE NIVELANTE</option>
                      <option value="SENSOR DE RADÓN">SENSOR DE RADÓN</option>
                      <option value="RADIO">RADIO</option>
                      <option value="ELEVADOR POE">ELEVADOR POE</option>
                      <option value="ACELERÓMETRO/DIGITALIZADOR">ACELERÓMETRO/DIGITALIZADOR</option>
                      <option value="MAGNETÓMETRO">MAGNETÓMETRO</option>
                      <option value="DIGITALIZADOR">DIGITALIZADOR</option>
                      <option value="PLUVIÓMETRO">PLUVIÓMETRO</option>
                      <option value="BATERIA">BATERIA</option>
                      <option value="ANALIZADOR DE ESPECTRO">ANALIZADOR DE ESPECTRO</option>
                      <option value="SCANDOAS">SCANDOAS</option>
                    </select>
                  ) : (
                    <>{dispositivo.subgrupo}</>
                  )}
                </td>

                <td>
                  {" "}
                  {editando.estado && editando.id === dispositivo.id_dispositivo ? (
                    <input
                      className="text-gray-700 bg-gray-100 border border-[#C4D92E] rounded p-2 focus:outline-none focus:ring-2 focus:ring-[#82A53D]"
                      type="text"
                      name="serial"
                      value={datos.serial}
                      onChange={handleHacerCambios}
                    />
                  ) : (
                    <>{dispositivo.serial}</>
                  )}
                </td>

                <td>
                  {editando.estado && editando.id === dispositivo.id_dispositivo ? (
                    <input
                      className="text-gray-700 bg-gray-100 border border-[#C4D92E] rounded p-2 focus:outline-none focus:ring-2 focus:ring-[#82A53D]"
                      type="text"
                      name="placa"
                      value={datos.placa}
                      onChange={handleHacerCambios}
                    />
                  ) : (
                    <>{dispositivo.placa}</>
                  )}
                </td>

                <td>
                  {editando.estado && editando.id === dispositivo.id_dispositivo ? (
                    <input
                      className="text-gray-700 bg-gray-100 border border-[#C4D92E] rounded p-2 focus:outline-none focus:ring-2 focus:ring-[#82A53D]"
                      type="text"
                      name="codigo_bidimensional"
                      value={datos.codigo_bidimensional}
                      onChange={handleHacerCambios}
                    />
                  ) : (
                    <>{dispositivo.codigo_bidimensional}</>
                  )}
                </td>

                <td>
                  {editando.estado && editando.id === dispositivo.id_dispositivo ? (
                    <input
                      className="text-gray-700 bg-gray-100 border border-[#C4D92E] rounded p-2 focus:outline-none focus:ring-2 focus:ring-[#82A53D]"
                      type="text"
                      name="secuencia"
                      value={datos.secuencia}
                      onChange={handleHacerCambios}
                    />
                  ) : (
                    <>{dispositivo.secuencia}</>
                  )}
                </td>

                <td>
                  {editando.estado && editando.id === dispositivo.id_dispositivo ? (
                    <select
                      className="text-gray-700 bg-gray-100 border border-[#C4D92E] rounded p-2 focus:outline-none focus:ring-2 focus:ring-[#82A53D]"
                      name="marca"
                      value={(datos != null) ? datos.marca : ""}
                      onChange={handleHacerCambios}
                    >
                      <option value="0">..........................................</option>
                      <option value="GURALP">GURALP</option>
                      <option value="NANOMETRICS">NANOMETRICS</option>
                      <option value="APPLIED GEOMECHANICS">APPLIED GEOMECHANICS</option>
                      <option value="ZYTECH">ZYTECH</option>
                      <option value="FREEWAVE">FREEWAVE</option>
                      <option value="TRIMBLE">TRIMBLE</option>
                      <option value="EVER EXCEED">EVER EXCEED</option>
                      <option value="MORNINGSTAR">MORNINGSTAR</option>
                      <option value="BRICK ELECTRIC">BRICK ELECTRIC</option>
                      <option value="PCTEL BLUEWAVE">PCTEL BLUEWAVE</option>
                      <option value="3ONEDATA">3ONEDATA</option>
                      <option value="TOPCON">TOPCON</option>
                      <option value="CHAPARRAL PHYSICS">CHAPARRAL PHYSICS</option>
                      <option value="PEIMAR">PEIMAR</option>
                      <option value="TRACER SERIES/EPEVER">TRACER SERIES/EPEVER</option>
                      <option value="SIXNET">SIXNET</option>
                      <option value="VIVOTEC">VIVOTEC</option>
                      <option value="JEWELL">JEWELL</option>
                      <option value="SOLARTECH">SOLARTECH</option>
                      <option value="BP SOLAR">BP SOLAR</option>
                      <option value="KYOCERA">KYOCERA</option>
                      <option value="XETAWAVE ">XETAWAVE </option>
                      <option value="GAMATEC">GAMATEC</option>
                      <option value="EPEVER">EPEVER</option>
                      <option value="OMEGA">OMEGA</option>
                      <option value="NUDAM">NUDAM</option>
                      <option value="UBIQUITI">UBIQUITI</option>
                      <option value="NO TIENE">NO TIENE</option>
                      <option value="CHALMERS">CHALMERS</option>
                      <option value="OCEAN OPTICS">OCEAN OPTICS</option>
                      <option value="GLOBALSAT">GLOBALSAT</option>
                      <option value="SILICON SOLAR">SILICON SOLAR</option>
                      <option value="SERCEL">SERCEL</option>
                      <option value="INTUICOM">INTUICOM</option>
                      <option value="LARSEN">LARSEN</option>
                      <option value="DAHUA">DAHUA</option>
                      <option value="MARPED MANUFACTURAS">MARPED MANUFACTURAS</option>
                      <option value="REFTEK">REFTEK</option>
                      <option value="BASE NIVELANTE">BASE NIVELANTE</option>
                      <option value="ALGADE">ALGADE</option>
                      <option value="CANADIAN SOLAR">CANADIAN SOLAR</option>
                      <option value="MOXA">MOXA</option>
                      <option value="AIR 802">AIR 802</option>
                      <option value="SCHÜLER WEAGE">SCHÜLER WEAGE</option>
                      <option value="SENSYS / STEFAN MAYER INSTRUMENTS">SENSYS / STEFAN MAYER INSTRUMENTS</option>
                      <option value="STC">STC</option>
                      <option value="WALEKER">WALEKER</option>
                      <option value="SGC">SGC</option>
                      <option value="POWER OVER ETHERNET">POWER OVER ETHERNET</option>
                      <option value="SOLAREX">SOLAREX</option>
                      <option value="VISION">VISION</option>
                      <option value="ANRITSU">ANRITSU</option>
                      <option value="GEÓNICA">GEÓNICA</option>
                      <option value="SINCLAIR">SINCLAIR</option>
                      <option value="SURSUM">SURSUM</option>
                    </select>
                  ) : (
                    <>{dispositivo.marca}</>
                  )}
                </td>

                <td>
                  {editando.estado && editando.id === dispositivo.id_dispositivo ? (
                    <input
                      className="text-gray-700 bg-gray-100 border border-[#C4D92E] rounded p-2 focus:outline-none focus:ring-2 focus:ring-[#82A53D]"
                      type="text"
                      name="modelo"
                      value={datos.modelo}
                      onChange={handleHacerCambios}
                    />
                  ) : (
                    <>{dispositivo.modelo}</>
                  )}
                </td>

                <td>
                  {editando.estado && editando.id === dispositivo.id_dispositivo ? (
                    <select
                      className="text-gray-700 bg-gray-100 border border-[#C4D92E] rounded p-2 focus:outline-none focus:ring-2 focus:ring-[#82A53D]"
                      name="estado"
                      value={(datos != null) ? datos.estado : ""}
                      onChange={handleHacerCambios}
                    >
                      <option value="0">..........................................</option>
                      <option value="EN DIAGNOSTICO">EN DIAGNOSTICO</option>
                      <option value="FUNCIONAL">FUNCIONAL</option>
                      <option value="EN TRANSITO">EN TRANSITO</option>
                    </select>
                  ) : (
                    <>{dispositivo.estado}</>
                  )}
                </td>

                <td>
                  {editando.estado && editando.id === dispositivo.id_dispositivo ? (
                    <select
                      className="text-gray-700 bg-gray-100 border border-[#C4D92E] rounded p-2 focus:outline-none focus:ring-2 focus:ring-[#82A53D]"
                      name="propietario"
                      value={(datos != null) ? datos.propietario : ""}
                      onChange={handleHacerCambios}
                    >
                      <option value="0">..........................................</option>
                      <option value="SGC">SGC</option>
                      <option value="ALCALDIA PASTO">ALCALDIA PASTO</option>
                    </select>
                  ) : (
                    <>{dispositivo.propietario}</>
                  )}
                </td>

                <td>
                  {editando.estado && editando.id === dispositivo.id_dispositivo ? (
                    <select
                      className="text-gray-700 bg-gray-100 border border-[#C4D92E] rounded p-2 focus:outline-none focus:ring-2 focus:ring-[#82A53D]"
                      name="proveedor"
                      value={(datos != null) ? datos.proveedor : ""}
                      onChange={handleHacerCambios}
                    >
                      <option value="0">..........................................</option>
                      <option value="AMPERE">AMPERE</option>
                      <option value="SANDOX">SANDOX</option>
                      <option value="DATUM INGENIERÍA SAS">DATUM INGENIERÍA SAS</option>
                      <option value="DIRIMPEX SAS">DIRIMPEX SAS</option>
                      <option value="GEOSYSTEM INGENIERÍA SAS">GEOSYSTEM INGENIERÍA SAS</option>
                      <option value="SANDOX">SANDOX</option>
                      <option value="SSI">SSI</option>
                      <option value="CHALMERS">CHALMERS</option>
                      <option value="METRICOM">METRICOM</option>
                      <option value="SIN PROVEEDOR">SIN PROVEEDOR</option>
                    </select>
                  ) : (
                    <>{dispositivo.proveedor}</>
                  )}
                </td>

                <td>
                  {editando.estado && editando.id === dispositivo.id_dispositivo ? (
                    <select
                      className="text-gray-700 bg-gray-100 border border-[#C4D92E] rounded p-2 focus:outline-none focus:ring-2 focus:ring-[#82A53D]"
                      name="responsable"
                      value={(datos != null) ? datos.responsable : ""}
                      onChange={handleHacerCambios}
                    >
                      <option value="0">..........................................</option>
                      <option value="SERVICIO GEOLOGICO COLOMBIANO">SERVICIO GEOLOGICO COLOMBIANO</option>
                    </select>
                  ) : (
                    <>{dispositivo.responsable}</>
                  )}
                </td>

                <td>
                  {editando.estado && editando.id === dispositivo.id_dispositivo ? (
                    <select
                      className="text-gray-700 bg-gray-100 border border-[#C4D92E] rounded p-2 focus:outline-none focus:ring-2 focus:ring-[#82A53D]"
                      name="lugar"
                      value={(datos != null) ? datos.lugar : ""}
                      onChange={handleHacerCambios}
                    >
                      <option value="0">..........................................</option>
                      <option value="LABORATORIO ELECTRONICA">LABORATORIO ELECTRONICA</option>
                      <option value="ESTACION">ESTACION</option>
                      <option value="BODEGA ELECTRONICA">BODEGA ELECTRONICA</option>
                      <option value="BODEGA DEFORMACIÓN">BODEGA DEFORMACIÓN</option>
                    </select>
                  ) : (
                    <>{dispositivo.lugar}</>
                  )}
                </td>

                <td>
                  {editando.estado && editando.id === dispositivo.id_dispositivo ? (
                    <input
                      className="text-gray-700 bg-gray-100 border border-[#C4D92E] rounded p-2 focus:outline-none focus:ring-2 focus:ring-[#82A53D]"
                      type="date"
                      name="fecha_mantenimiento"
                      value={datos.fecha_mantenimiento}
                      onChange={handleHacerCambios}
                    />
                  ) : (
                    <>{dispositivo.fecha_mantenimiento}</>
                  )}
                </td>

                <td>
                  {editando.estado && editando.id === dispositivo.id_dispositivo ? (
                    <input
                      className="text-gray-700 bg-gray-100 border border-[#C4D92E] rounded p-2 focus:outline-none focus:ring-2 focus:ring-[#82A53D]"
                      type="date"
                      name="fecha_instalacion"
                      value={datos.fecha_instalacion}
                      onChange={handleHacerCambios}
                    />
                  ) : (
                    <>{dispositivo.fecha_instalacion}</>
                  )}
                </td>

                <td>
                  {editando.estado && editando.id === dispositivo.id_dispositivo ? (
                    <input
                      className="text-gray-700 bg-gray-100 border border-[#C4D92E] rounded p-2 focus:outline-none focus:ring-2 focus:ring-[#82A53D]"
                      type="date"
                      name="fecha_retiro"
                      value={datos.fecha_retiro}
                      onChange={handleHacerCambios}
                    />
                  ) : (
                    <>{dispositivo.fecha_retiro}</>
                  )}
                </td>

                <td>
                  {editando.estado && editando.id === dispositivo.id_dispositivo ? (
                    <input
                      className="text-gray-700 bg-gray-100 border border-[#C4D92E] rounded p-2 focus:outline-none focus:ring-2 focus:ring-[#82A53D]"
                      type="date"
                      name="fecha_recepcion"
                      value={datos.fecha_recepcion}
                      onChange={handleHacerCambios}
                    />
                  ) : (
                    <>{dispositivo.fecha_recepcion}</>
                  )}
                </td>

                <td>
                  {editando.estado && editando.id === dispositivo.id_dispositivo ? (
                    <input
                      className="text-gray-700 bg-gray-100 border border-[#C4D92E] rounded p-2 focus:outline-none focus:ring-2 focus:ring-[#82A53D]"
                      type="date"
                      name="fecha_baja"
                      value={datos.fecha_baja}
                      onChange={handleHacerCambios}
                    />
                  ) : (
                    <>{dispositivo.fecha_baja}</>
                  )}
                </td>

                <td>
                  {editando.estado && editando.id === dispositivo.id_dispositivo ? (
                    <select
                      className="text-gray-700 bg-gray-100 border border-[#C4D92E] rounded p-2 focus:outline-none focus:ring-2 focus:ring-[#82A53D]"
                      name="inventariado"
                      value={(datos != null) ? datos.inventariado : ""}
                      onChange={handleHacerCambios}
                    >
                      <option value="0">..........................................</option>
                      <option value="Inventariado">Inventariado</option>
                      <option value="No Inventariado">No Inventariado</option>
                    </select>
                  ) : (
                    <>{dispositivo.inventariado}</>
                  )}
                </td>

                <td>
                  {editando.estado && editando.id === dispositivo.id_dispositivo ? (
                    <input
                      className="text-gray-700 bg-gray-100 border border-[#C4D92E] rounded p-2 focus:outline-none focus:ring-2 focus:ring-[#82A53D]"
                      type="date"
                      name="fecha_inventariado"
                      value={datos.fecha_inventariado}
                      onChange={handleHacerCambios}
                    />
                  ) : (
                    <>{dispositivo.fecha_inventariado}</>
                  )}
                </td>

                <td>
                  {editando.estado && editando.id === dispositivo.id_dispositivo ? (
                    <textarea
                      name="comentarios" rows="4" cols="40"
                      className="text-gray-700 bg-gray-100 border border-[#C4D92E] rounded p-2 focus:outline-none focus:ring-2 focus:ring-[#82A53D]"
                      type="text"
                      value={datos.comentarios}
                      onChange={handleHacerCambios}
                    />
                  ) : (
                    <>{dispositivo.comentarios}</>
                  )}
                </td>

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

                  {/* <td>
                    <input
                      className="text-gray-700 bg-gray-100 border border-[#C4D92E] rounded p-2 focus:outline-none focus:ring-2 focus:ring-[#82A53D]"
                      type="text"
                      name="id_dispositivo"
                      onChange={handleHacerCambios}
                      required
                    />
                  </td> */}

                  <td>
                    <select
                      className="text-gray-700 bg-gray-100 border border-[#C4D92E] rounded p-2 focus:outline-none focus:ring-2 focus:ring-[#82A53D]"
                      name="grupo"
                      onChange={handleHacerCambios}
                      required
                    >
                      <option value="0">..........................................</option>
                      <option value="INSTRUMENTACIÓN">INSTRUMENTACIÓN</option>
                      <option value="SISTEMA ELECTRICO">SISTEMA ELECTRICO</option>
                      <option value="TELECOMUNICACIONES">TELECOMUNICACIONES</option>
                      <option value="ACCESORIOS">ACCESORIOS</option>
                      <option value="EQUIPO DE SEGUIMIENTO">EQUIPO DE SEGUIMIENTO</option>
                    </select>
                  </td>

                  <td>
                    <select
                      className="text-gray-700 bg-gray-100 border border-[#C4D92E] rounded p-2 focus:outline-none focus:ring-2 focus:ring-[#82A53D]"
                      name="subgrupo"
                      onChange={handleHacerCambios}
                    >
                      <option value="0">..........................................</option>
                      <option value="DIGITALIZADOR">DIGITALIZADOR </option>
                      <option value="SISMÓMETRO DE BANDA ANCHA">SISMÓMETRO DE BANDA ANCHA</option>
                      <option value="INCLINÓMETRO">INCLINÓMETRO </option>
                      <option value="PANEL SOLAR">PANEL SOLAR</option>
                      <option value="ANTENA GNSS">ANTENA GNSS</option>
                      <option value="RECEPTOR GNSS">RECEPTOR GNSS </option>
                      <option value="REGULADOR DC">REGULADOR DC</option>
                      <option value="CONTROLADOR DE CARGA">CONTROLADOR DE CARGA</option>
                      <option value="ANTENA">ANTENA</option>
                      <option value="SWITCH">SWITCH</option>
                      <option value="SENSOR DE INFRASONIDO">SENSOR DE INFRASONIDO</option>
                      <option value="CÁMARA WEB">CÁMARA WEB</option>
                      <option value="TERMOCUPLA">TERMOCUPLA</option>
                      <option value="GABINETE DE ACERO">GABINETE DE ACERO</option>
                      <option value="TELESCOPIO">TELESCOPIO</option>
                      <option value="FIBRA ÓPTICA">FIBRA ÓPTICA</option>
                      <option value="ESPECTRÓMETRO">ESPECTRÓMETRO</option>
                      <option value="PC INTREGRADO">PC INTREGRADO</option>
                      <option value="ANTENA DE GPS">ANTENA DE GPS</option>
                      <option value="SISMOMETRO/DIGITALIZADOR">SISMOMETRO/DIGITALIZADOR</option>
                      <option value="SISMÓMETRO CORTO PERIODO TRIAXIAL">SISMÓMETRO CORTO PERIODO TRIAXIAL</option>
                      <option value="BASE NIVELANTE">BASE NIVELANTE</option>
                      <option value="SENSOR DE RADÓN">SENSOR DE RADÓN</option>
                      <option value="RADIO">RADIO</option>
                      <option value="ELEVADOR POE">ELEVADOR POE</option>
                      <option value="ACELERÓMETRO/DIGITALIZADOR">ACELERÓMETRO/DIGITALIZADOR</option>
                      <option value="MAGNETÓMETRO">MAGNETÓMETRO</option>
                      <option value="DIGITALIZADOR">DIGITALIZADOR</option>
                      <option value="PLUVIÓMETRO">PLUVIÓMETRO</option>
                      <option value="BATERIA">BATERIA</option>
                      <option value="ANALIZADOR DE ESPECTRO">ANALIZADOR DE ESPECTRO</option>
                      <option value="SCANDOAS">SCANDOAS</option>
                    </select>
                  </td>

                  <td>
                    <input
                      className="text-gray-700 bg-gray-100 border border-[#C4D92E] rounded p-2 focus:outline-none focus:ring-2 focus:ring-[#82A53D]"
                      type="text"
                      name="serial"
                      onChange={handleHacerCambios}
                      required
                    />
                  </td>

                  <td>
                    <input
                      className="text-gray-700 bg-gray-100 border border-[#C4D92E] rounded p-2 focus:outline-none focus:ring-2 focus:ring-[#82A53D]"
                      type="text"
                      name="placa"
                      onChange={handleHacerCambios}
                    />
                  </td>

                  <td>
                    <input
                      className="text-gray-700 bg-gray-100 border border-[#C4D92E] rounded p-2 focus:outline-none focus:ring-2 focus:ring-[#82A53D]"
                      type="text"
                      name="codigo_bidimensional"
                      onChange={handleHacerCambios}
                    />
                  </td>

                  <td>
                    <input
                      className="text-gray-700 bg-gray-100 border border-[#C4D92E] rounded p-2 focus:outline-none focus:ring-2 focus:ring-[#82A53D]"
                      type="text"
                      name="secuencia"
                      onChange={handleHacerCambios}
                    />
                  </td>

                  <td>
                    <select
                      className="text-gray-700 bg-gray-100 border border-[#C4D92E] rounded p-2 focus:outline-none focus:ring-2 focus:ring-[#82A53D]"
                      name="marca"
                      onChange={handleHacerCambios}
                    >
                      <option value="0">..........................................</option>
                      <option value="GURALP">GURALP</option>
                      <option value="NANOMETRICS">NANOMETRICS</option>
                      <option value="APPLIED GEOMECHANICS">APPLIED GEOMECHANICS</option>
                      <option value="ZYTECH">ZYTECH</option>
                      <option value="FREEWAVE">FREEWAVE</option>
                      <option value="TRIMBLE">TRIMBLE</option>
                      <option value="EVER EXCEED">EVER EXCEED</option>
                      <option value="MORNINGSTAR">MORNINGSTAR</option>
                      <option value="BRICK ELECTRIC">BRICK ELECTRIC</option>
                      <option value="PCTEL BLUEWAVE">PCTEL BLUEWAVE</option>
                      <option value="3ONEDATA">3ONEDATA</option>
                      <option value="TOPCON">TOPCON</option>
                      <option value="CHAPARRAL PHYSICS">CHAPARRAL PHYSICS</option>
                      <option value="PEIMAR">PEIMAR</option>
                      <option value="TRACER SERIES/EPEVER">TRACER SERIES/EPEVER</option>
                      <option value="SIXNET">SIXNET</option>
                      <option value="VIVOTEC">VIVOTEC</option>
                      <option value="JEWELL">JEWELL</option>
                      <option value="SOLARTECH">SOLARTECH</option>
                      <option value="BP SOLAR">BP SOLAR</option>
                      <option value="KYOCERA">KYOCERA</option>
                      <option value="XETAWAVE ">XETAWAVE </option>
                      <option value="GAMATEC">GAMATEC</option>
                      <option value="EPEVER">EPEVER</option>
                      <option value="OMEGA">OMEGA</option>
                      <option value="NUDAM">NUDAM</option>
                      <option value="UBIQUITI">UBIQUITI</option>
                      <option value="NO TIENE">NO TIENE</option>
                      <option value="CHALMERS">CHALMERS</option>
                      <option value="OCEAN OPTICS">OCEAN OPTICS</option>
                      <option value="GLOBALSAT">GLOBALSAT</option>
                      <option value="SILICON SOLAR">SILICON SOLAR</option>
                      <option value="SERCEL">SERCEL</option>
                      <option value="INTUICOM">INTUICOM</option>
                      <option value="LARSEN">LARSEN</option>
                      <option value="DAHUA">DAHUA</option>
                      <option value="MARPED MANUFACTURAS">MARPED MANUFACTURAS</option>
                      <option value="REFTEK">REFTEK</option>
                      <option value="BASE NIVELANTE">BASE NIVELANTE</option>
                      <option value="ALGADE">ALGADE</option>
                      <option value="CANADIAN SOLAR">CANADIAN SOLAR</option>
                      <option value="MOXA">MOXA</option>
                      <option value="AIR 802">AIR 802</option>
                      <option value="SCHÜLER WEAGE">SCHÜLER WEAGE</option>
                      <option value="SENSYS / STEFAN MAYER INSTRUMENTS">SENSYS / STEFAN MAYER INSTRUMENTS</option>
                      <option value="STC">STC</option>
                      <option value="WALEKER">WALEKER</option>
                      <option value="SGC">SGC</option>
                      <option value="POWER OVER ETHERNET">POWER OVER ETHERNET</option>
                      <option value="SOLAREX">SOLAREX</option>
                      <option value="VISION">VISION</option>
                      <option value="ANRITSU">ANRITSU</option>
                      <option value="GEÓNICA">GEÓNICA</option>
                      <option value="SINCLAIR">SINCLAIR</option>
                      <option value="SURSUM">SURSUM</option>
                    </select>
                  </td>

                  <td>
                    <input
                      className="text-gray-700 bg-gray-100 border border-[#C4D92E] rounded p-2 focus:outline-none focus:ring-2 focus:ring-[#82A53D]"
                      type="text"
                      name="modelo"
                      onChange={handleHacerCambios}
                    />
                  </td>

                  <td>
                    <select
                      className="text-gray-700 bg-gray-100 border border-[#C4D92E] rounded p-2 focus:outline-none focus:ring-2 focus:ring-[#82A53D]"
                      name="estado"
                      onChange={handleHacerCambios}
                    >
                      <option value="0">..........................................</option>
                      <option value="EN DIAGNOSTICO">EN DIAGNOSTICO</option>
                      <option value="FUNCIONAL">FUNCIONAL</option>
                      <option value="EN TRANSITO">EN TRANSITO</option>
                    </select>
                  </td>

                  <td>
                    <select
                      className="text-gray-700 bg-gray-100 border border-[#C4D92E] rounded p-2 focus:outline-none focus:ring-2 focus:ring-[#82A53D]"
                      name="propietario"
                      onChange={handleHacerCambios}
                    >
                      <option value="0">..........................................</option>
                      <option value="SGC">SGC</option>
                      <option value="ALCALDIA PASTO">ALCALDIA PASTO</option>
                    </select>
                  </td>

                  <td>
                    <select
                      className="text-gray-700 bg-gray-100 border border-[#C4D92E] rounded p-2 focus:outline-none focus:ring-2 focus:ring-[#82A53D]"
                      name="proveedor"
                      onChange={handleHacerCambios}
                    >
                      <option value="0">..........................................</option>
                      <option value="AMPERE">AMPERE</option>
                      <option value="SANDOX">SANDOX</option>
                      <option value="DATUM INGENIERÍA SAS">DATUM INGENIERÍA SAS</option>
                      <option value="DIRIMPEX SAS">DIRIMPEX SAS</option>
                      <option value="GEOSYSTEM INGENIERÍA SAS">GEOSYSTEM INGENIERÍA SAS</option>
                      <option value="SANDOX">SANDOX</option>
                      <option value="SSI">SSI</option>
                      <option value="CHALMERS">CHALMERS</option>
                      <option value="METRICOM">METRICOM</option>
                      <option value="SIN PROVEEDOR">SIN PROVEEDOR</option>
                    </select>
                  </td>

                  <td>
                    <select
                      className="text-gray-700 bg-gray-100 border border-[#C4D92E] rounded p-2 focus:outline-none focus:ring-2 focus:ring-[#82A53D]"
                      name="responsable"
                      onChange={handleHacerCambios}
                    >
                      <option value="0">..........................................</option>
                      <option value="SERVICIO GEOLOGICO COLOMBIANO">SERVICIO GEOLOGICO COLOMBIANO</option>
                    </select>
                  </td>

                  <td>
                    <select
                      className="text-gray-700 bg-gray-100 border border-[#C4D92E] rounded p-2 focus:outline-none focus:ring-2 focus:ring-[#82A53D]"
                      name="lugar"
                      onChange={handleHacerCambios}
                    >
                      <option value="0">..........................................</option>
                      <option value="LABORATORIO ELECTRONICA">LABORATORIO ELECTRONICA</option>
                      <option value="ESTACION">ESTACION</option>
                      <option value="BODEGA ELECTRONICA">BODEGA ELECTRONICA</option>
                      <option value="BODEGA DEFORMACIÓN">BODEGA DEFORMACIÓN</option>
                    </select>
                  </td>

                  {/* <td>
                    <input
                      type="text"
                      name="estacion"
                      onChange={handleHacerCambios}
                    />
                  </td> */}

                  <td>
                    <input
                      type="date"
                      className="text-gray-700 bg-gray-100 border border-[#C4D92E] rounded p-2 focus:outline-none focus:ring-2 focus:ring-[#82A53D]"
                      name="fecha_mantenimiento"
                      onChange={handleHacerCambios}
                    />
                  </td>

                  <td>
                    <input
                      type="date"
                      className="text-gray-700 bg-gray-100 border border-[#C4D92E] rounded p-2 focus:outline-none focus:ring-2 focus:ring-[#82A53D]"
                      name="fecha_instalacion"
                      onChange={handleHacerCambios}
                    />
                  </td>

                  <td>
                    <input
                      className="text-gray-700 bg-gray-100 border border-[#C4D92E] rounded p-2 focus:outline-none focus:ring-2 focus:ring-[#82A53D]"
                      type="date"
                      name="fecha_retiro"
                      onChange={handleHacerCambios}
                    />
                  </td>

                  <td>
                    <input
                      className="text-gray-700 bg-gray-100 border border-[#C4D92E] rounded p-2 focus:outline-none focus:ring-2 focus:ring-[#82A53D]"
                      type="date"
                      name="fecha_recepcion"
                      onChange={handleHacerCambios}
                    />
                  </td>

                  <td>
                    <input
                      className="text-gray-700 bg-gray-100 border border-[#C4D92E] rounded p-2 focus:outline-none focus:ring-2 focus:ring-[#82A53D]"
                      type="date"
                      name="fecha_baja"
                      onChange={handleHacerCambios}
                    />
                  </td>

                  <td>
                    <select
                      className="text-gray-700 bg-gray-100 border border-[#C4D92E] rounded p-2 focus:outline-none focus:ring-2 focus:ring-[#82A53D]"
                      name="inventariado"
                      onChange={handleHacerCambios}
                    >
                      <option value="0">..........................................</option>
                      <option value="Inventariado">Inventariado</option>
                      <option value="No Inventariado">No Inventariado</option>
                    </select>
                  </td>

                  <td>
                    <input
                      type="date"
                      className="text-gray-700 bg-gray-100 border border-[#C4D92E] rounded p-2 focus:outline-none focus:ring-2 focus:ring-[#82A53D]"
                      name="fecha_inventariado"
                      onChange={handleHacerCambios}
                    />
                  </td>

                  <td>
                    <textarea name="comentarios" rows="4" cols="40"
                      className="text-gray-700 bg-gray-100 border border-[#C4D92E] rounded p-2 focus:outline-none focus:ring-2 focus:ring-[#82A53D]"
                      type="text"
                      id="comentarios"
                      placeholder="Escriba un comentario"
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

      <button className="btn-create" onClick={handleNuevaFila}>
        Crear dispositivo
      </button>

    </>
  );
}