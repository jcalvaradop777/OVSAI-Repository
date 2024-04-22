import { useState } from "react";
import VentanaGuralp from "../Modals/VentanaGuralp";
import Estacion from "../Forms/Estacion";

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

  return (
    <>
      <ul
        style={{ left: `${Mposition.x}px`, top: `${Mposition.y}px` }}
        className={`absolute bg-white p-1 box-content border border-slate-700 shadow-lg list-none w-max rounded-xl z-50`}
      >
        <li className="cursor-pointer select-none p-2 rounded-md">Editar</li>
        <li className="cursor-pointer select-none p-2 rounded-md">Eliminar</li>
        <li
          className="cursor-pointer select-none p-2 rounded-md"
          onClick={abrirTrazas}
        >
          Trazas
        </li>
        <li className="cursor-pointer select-none p-2 rounded-md">
          Habilitar/Deshabilitar
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
    </>
  );
}
