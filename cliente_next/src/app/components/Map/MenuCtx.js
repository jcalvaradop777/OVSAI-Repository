import { useState } from "react";
import VentanaGuralp from "../Modals/VentanaGuralp";
import Estacion from "../Forms/Estacion";
import EditModal from "../Modals/EditModal";
import VentanaEstaciones from "../Modals/VentanaEstaciones";

export default function MenuContext({
  Mposition,
  setMPosition,
  Modal,
  setModal,
  _Map,
  _setMap,
  setSelected,
  setShow,
}) {
  const [mostrarVentana, setVentana] = useState(false);
  const [showEstaciones, setMostrarEstaciones] = useState(false);
  // Estado de modal para editar emplazamiento/estación/sensor
  const [showEdit, setShowEdit] = useState(false);

  const abrirTrazas = () => {
    setVentana(true);
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
          emplazamiento={Mposition.element}
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
    setShowEdit(true);
  };

  const handleEliminar = async () => {
    if (Mposition.element != null) {
      const confirm = window.confirm(
        `¿Estás seguro que deseas eliminar el elemento ${Mposition.element.name}?`
      );
      if (confirm) {
        const response = await fetch(
          Mposition.element.type === 1
            ? "/api/emplazamientos/delete"
            : Mposition.element.type === 2
            ? "/api/estaciones/delete"
            : "",
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              id: Mposition.element.id,
              type: Mposition.element.type,
            }),
          }
        );

        if (response.ok) {
          _setMap({
            ..._Map,
            _data: {},
            reload: true,
          });
        }
      }
    }
  };

  const mostrarEstaciones = () => {
    setMostrarEstaciones(true);
    console.log(Mposition);
  };

  const mostrarSensores = () => {
    console.log("sensores");
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
          Editar
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
          Gráficas
        </li>
        {console.log(Mposition.element.type)}
        {Mposition.element.type === 1 ? (
          <>
            <li
              className="cursor-pointer select-none p-2 rounded-md"
              onClick={mostrarEstaciones}
            >
              Estaciones
            </li>
            <li
              className="cursor-pointer select-none p-2 rounded-md"
              onClick={mostrarSensores}
            >
              Sensores
            </li>
          </>
        ) : Mposition.element.type === 2 ? (
          <li
            className="cursor-pointer select-none p-2 rounded-md"
            onClick={mostrarSensores}
          >
            Sensores
          </li>
        ) : (
          <></>
        )}
        <li className="cursor-pointer select-none p-2 rounded-md">Sensores</li>
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
        <li className="cursor-pointer select-none p-2 rounded-md">
          Agregar sensor
        </li>
      </ul>
      {mostrarVentana ? (
        <VentanaGuralp
          mostrarVentana={mostrarVentana}
          setVentana={setVentana}
        />
      ) : (
        <></>
      )}
      {showEdit ? (
        <EditModal
          Mposition={Mposition}
          setMPosition={setMPosition}
          setShowEdit={setShowEdit}
          showEdit={showEdit}
          type={1}
        />
      ) : (
        <></>
      )}
      {showEstaciones ? (
        <VentanaEstaciones
          emplazamiento={Mposition.element}
          mostrar={showEstaciones}
        />
      ) : (
        <></>
      )}
    </>
  );
}
