import { useState } from "react";
import VentanaGuralp from "../Modals/VentanaGuralp";
import Estacion from "./FrmIngresarEstacion";
import VentanaEditarEstacion from "../Modals/VentanaEditarEstacion";
import VentanaIngresarDispositivo from "../Modals/VentanaIngresarDispositivo";
import VentanaAnomalias from "../Modals/VentanaAnomalias";
import { ENV } from "@/config/env";

export default function MenuContext({
  Mposition,  // almacena la información de la estación
  setMPosition,
  Modal,
  setModal,
  _Map,
  _setMap,
  setSelected,
  setShow,
}) {

  const [mostrarVentana, setVentana] = useState(false);
  const [mostrarAnomalias, setAnomalias] = useState(false);
  const [mostrarEdicion, setEdicion] = useState(false);
  const [showDispositivos, setMostrarDispositivos] = useState(false);
  // Estado de modal para editar emplazamiento/estación/sensor

  const abrirTrazas = () => {
    setVentana(true);
  };

  const abrirAnomalias = () => {
    setAnomalias(true);
  };

  const crearEstacion = () => {
    // Le asignamos un valor de 4 a la herramienta, para que no tenga conflictos
    // Pero sigue siendo una estación
    setSelected((value) => (value = 4));
    // Asignamos el contenido con setModal > content de la ventana modal
    setModal({
      ...Modal,
      content: (
        <Estacion
          _Map={_Map}
          _setMap={_setMap}
          setSelected={setSelected}
          setShow={setShow}
        />
      ),
    });

    // Mostramos ventana modal
    setShow((value) => (value = true));
  };

  const handleEditar = () => {
    setEdicion(true);
  };

  const handleEliminar = async () => {
    if (Mposition.element != null) {
      const confirm = window.confirm(
        `¿Estás seguro que deseas eliminar el elemento ${Mposition.element.nombre}?`
      );
      if (confirm) {
        const response = await fetch(ENV.URLBASE + "/api/estaciones/delete", {
            method: "DELETE",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              id: Mposition.element.id,
              //type: Mposition.element.type,
            }),
          }
        );

        if (response.ok) {
          _setMap({
            ..._Map,
            _data: {},
            reload: true,
          });

          setMPosition({
            x: 0,
            y: 0,
            visible: false,
            element: null
          });
          
        }
      }
    }
  };

  const verDispositivos = () => {
    setMostrarDispositivos(true);
  };

  return (
    <>
      <ul
        style={{ left: `${Mposition.x}px`, top: `${Mposition.y}px` }}
        className={`absolute bg-white p-1 box-content border border-slate-700 shadow-lg list-none w-max rounded-xl z-50 text-sm`}
      >
        <li
          className="cursor-pointer select-none p-2 rounded-md"
          onClick={handleEditar}
        >
          Datos
        </li>

        <li
          className="cursor-pointer select-none p-2 rounded-md"
          onClick={handleEliminar}
        >
          Eliminar
        </li>

        <li
          className="cursor-pointer select-none p-2 rounded-md"
          onClick={abrirTrazas}
        >
          Trazas
        </li>

        <li
          className="cursor-pointer select-none p-2 rounded-md"
          onClick={abrirAnomalias}
        >
          Anomalías
        </li>

        <li
          className="cursor-pointer select-none p-2 rounded-md"
          onClick={verDispositivos}
        >
          Dispositivos
        </li>

        {Mposition.element != null ? (
          Mposition.element.type === 1 ? (
            <li
              className="cursor-pointer select-none p-2 rounded-md"
              onClick={crearEstacion}
            >
              Agregar estación
            </li>
          ) : (
            <></>
          )
        ) : (
          <></>
        )}

      </ul>

      {mostrarVentana ? (
        <VentanaGuralp
          mostrarVentana={mostrarVentana}
          setVentana={setVentana}
        />
      ) : (
        <></>
      )}

      {mostrarAnomalias ? (
        <VentanaAnomalias
          mostrarAnomalias={mostrarAnomalias}
          setAnomalias={setAnomalias}
        />
      ) : (
        <></>
      )}

      {mostrarEdicion ? (
        <VentanaEditarEstacion
          mostrar={mostrarEdicion}
          setMostrar={setEdicion}
          id={Mposition.element.id}
        />
      ) : (
        <></>
      )}

      {showDispositivos ? (
        <VentanaIngresarDispositivo
          mostrar={showDispositivos}
          id={Mposition.element.id} // el id es el identificador de la estación
        />
      ) : (
        <></>
      )}

    </>
  );
}
