import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { useState } from "react";

export default function ListSearch({ volcanes }) {
  const [show, setShow] = useState(false);

  const open = () => {
    setShow(!show);
  };

  return (
    <div className="absolute ml-[326px] w-max bg-slate-200 top-1 z-50">
      <button
        className="flex w-max rounded-lg bg-purple-100 px-4 py-2 text-left text-sm font-medium text-purple-900 hover:bg-purple-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500/75"
        onClick={open}
      >
        Seleccionar volcán
        <ChevronDownIcon
          width={25}
          height={25}
          className="flex align-top mt-0"
        />
      </button>
      {show ? (
        <ul className="absolute p-0 ml-0 mt-0 bg-transparent box-border list-none">
          {volcanes.map((volcan, i) => 
            <a
              key={"volcanItem-" + i}
              href={"#14/" + volcan.lat + "/" + volcan.long}
              onClick={open}
            >
              <li className="relative cursor-pointer select-none p-2 box-border bg-slate-50 text-slate-800 text-base hover:bg-slate-200">
                {volcan.name}
              </li>
            </a>
          )}
        </ul>
      ) : (
        <></>
      )}
    </div>
  );
}
