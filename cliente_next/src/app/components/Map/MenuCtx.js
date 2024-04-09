<<<<<<< HEAD
import { useState } from "react";
import VentanaGuralp from "../Modals/VentanaGuralp";

export default function MenuContext({ Mposition, setMPosition }) {
  const [mostrarVentana, setVentana] = useState(false);

  const abrirTrazas = () => {
    setVentana(true);
  }

  return (
    <>
      <ul
        style={{ left: `${Mposition.x}px`, top: `${Mposition.y}px` }}
        className={`absolute bg-white p-1 box-content border border-slate-700 shadow-lg list-none w-max rounded-xl z-50`}
      >
        <li className="cursor-pointer select-none p-2 rounded-md">Editar</li>
        <li className="cursor-pointer select-none p-2 rounded-md">Eliminar</li>
        <li className="cursor-pointer select-none p-2 rounded-md" onClick={abrirTrazas}>Trazas</li>
        <li className="cursor-pointer select-none p-2 rounded-md">
          Habilitar/Deshabilitar
        </li>
        <li className="cursor-pointer select-none p-2 rounded-md">
          Agregar estación
        </li>
        <li className="cursor-pointer select-none p-2 rounded-md">
          Agregar sensor
        </li>
      </ul>
      {mostrarVentana ? <VentanaGuralp mostrarVentana={mostrarVentana} setVentana={setVentana} /> : <></>}
    </>
=======
export default function MenuContext({ Mposition, setMPosition }) {
  return (
    <ul
      style={{ left: `${Mposition.x}px`, top: `${Mposition.y}px` }}
      className={`absolute bg-white p-1 box-content border border-slate-700 shadow-lg list-none w-max rounded-xl z-50`}
    >
      <li className="cursor-pointer select-none p-2 rounded-md">Editar</li>
      <li className="cursor-pointer select-none p-2 rounded-md">Eliminar</li>
      <li className="cursor-pointer select-none p-2 rounded-md">
        Habilitar/Deshabilitar
      </li>
      <li className="cursor-pointer select-none p-2 rounded-md">
        Agregar estación
      </li>
      <li className="cursor-pointer select-none p-2 rounded-md">
        Agregar sensor
      </li>
    </ul>
>>>>>>> a3ae5695d3937190463fdf11d41378b13015bf77
  );
}
