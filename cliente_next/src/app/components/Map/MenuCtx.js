import VentanaGuralp from "../Modals/VentanaGuralp.js"

export default function MenuContext({ Mposition, setMPosition }) {
  return (
    <>
      <ul
      style={{ left: `${Mposition.x}px`, top: `${Mposition.y}px` }}
      className={`absolute bg-white p-1 box-content border border-slate-700 shadow-lg list-none w-max rounded-xl z-50`}
    >
      <li className="cursor-pointer select-none p-2 rounded-md">Editar</li>
      <li className="cursor-pointer select-none p-2 rounded-md">Eliminar</li>
      <li className="cursor-pointer select-none p-2 rounded-md">Trazas</li>
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
    <VentanaGuralp />
    </>
  );
}
