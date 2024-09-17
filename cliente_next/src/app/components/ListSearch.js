import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { useState } from "react";

export default function ListSearch() {
  const [show, setShow] = useState(false);
  const [volcanes] = useState([
    //  Volcanes de prueba para el mapa
    { name: "Volcán Galeras", lat: 1.2166666666667, long: -77.366666666667 },
    { name: "Volcán Chiles", lat: 0.82111111, long: -77.935 },
    { name: "Volcán Cumbal", lat: 0.95583333333333, long: -77.883333333333 },
    { name: "OVSPA", lat: 1.210545, long: -77.257391 },
  ]);

  const open = () => {
    setShow(!show);
  };

  return (
    <div className="absolute ml-[326px] w-max bg-transparent top-1 z-50">
      <button
        className={`flex w-max ${show ? "rounded-tl-lg rounded-tr-lg" : "rounded-lg"} bg-[#82A53D] px-4 py-2 text-left text-sm font-medium text-white hover:bg-[#C4D92E] hover:text-[#8A8C8E] focus:outline-none focus-visible:ring`}
        onClick={open}
      >
        Seleccionar volcán
        <ChevronDownIcon
          width={25}
          height={25}
          className="flex align-top mt-[-5px]"
        />
      </button>
      {show ? (
        <ul className="relative p-0 ml-0 mt-0 bg-transparent box-border list-none rounded-bl-lg rounded-br-lg">
          {volcanes.map((volcan, i) => (
            <a
              key={"volcanItem-" + i}
              href={"#14/" + volcan.lat + "/" + volcan.long}
              onClick={open}
            >
              <li className="relative cursor-pointer select-none p-2 box-border bg-slate-50 text-slate-800 text-base hover:bg-slate-200">
                {volcan.name}
              </li>
            </a>
          ))}
        </ul>
      ) : (
        <></>
      )}
    </div>
  );
}
