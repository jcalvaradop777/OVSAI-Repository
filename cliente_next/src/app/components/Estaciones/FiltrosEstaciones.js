"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function FiltrosEstaciones({
  datos,
  setEstaciones,
  campos = [],
}) {
  const [query, setQuery] = useState("");
  const [keys] = useState([...campos]);
  const [filter, setFilter] = useState("0");
  const [results, setResults] = useState([]);
  const [load, setLoad] = useState(false);

  const handleQuery = (e) => {
    setQuery(e.target.value);

    setResults([]);
  };

  const normalizarTexto = (text = "") => {
    if (text == 0) {
      return text.toString();
    } else {
      if (text != null) {
        return text
          .normalize("NFD")
          .replace(/[\u0300-\u036F]/g, "")
          .toLowerCase()
          .trim();
      }
    }
    return text;
  };

  const doQueryAdvanced = (data = [], q = "") => {
    if (data.length > 0 && q.trim().length > 0) {
      q = normalizarTexto(q);
      q = q.split(" ");

      // Recorremos datos
      data.forEach((d) => {
        Object.keys(d).forEach((v) => {
          q.forEach((qq) => {
            if (d[v] != null) {
              if (normalizarTexto(d[v]).includes(normalizarTexto(qq))) {
                const filter = data.filter((dt) =>
                  normalizarTexto(dt[v]).includes(normalizarTexto(qq))
                );

                console.log(filter);
                setResults([...filter]);
              } else {
                //setResults([]);
                console.log("No results");
              }
            }
          });
        });
      });
    }
  };

  const loadData = () => {
    if (datos.length > 0) {
      setResults([...datos]);
    }
  };

  const doQuery = () => {
    if (query.trim().length > 0) {
      // Si hay filtros, se aplica lo siguiente
      if (filter.trim().length > 0 && filter != 0) {
        datos.forEach((d) => {
          Object.keys(d).forEach((campo) => {
            if (filter === campo) {
              const filtro = datos.filter((v) =>
                normalizarTexto(v[campo]).includes(normalizarTexto(query))
              );
              if (filtro.length > 0) {
                if (!results.some((v) => v.id === d.id)) {
                  //setResults([...results, d]);
                  setResults([...filtro]);
                }
                //console.log(datos.filter((v) => normalizarTexto(v[campo]).includes(normalizarTexto(query))));
              } else {
                console.log("No results");
                console.log(
                  normalizarTexto(d[campo]) + " - " + normalizarTexto(query)
                );
                setResults([]);
              }
            }
          });
        });
      } else {
        console.log("No hay filtros");
        doQueryAdvanced(datos, query);
      }
    } else {
      setTimeout(() => {
        loadData();
      }, 1000)
    }
  };

  useEffect(() => {
    doQuery();
  }, [query]);

  useEffect(() => {
    if (!load) {
      loadData();

      setLoad(true);
    }
  }, [load, datos]);

  return (
    <main>
      <input
        type="search"
        name="query"
        className="w-full h-auto p-2 cursor-text select-text block mt-1 mb-1 text-black text-lg border-solid border-slate-500 rounded-lg border-[1px]"
        id="query"
        onChange={handleQuery}
        value={query}
        placeholder="Buscar"
      />
      <div className="block bg-slate-300 border-solid border-slate-600 rounded-lg p-2">
        Filtrar por:
        {keys.length > 0 ? (
          <select
            name="filters"
            id="filters"
            onChange={(e) => {
              setFilter(e.target.value);

              doQuery();
            }}
          >
            <option value={0}>Filtrar por</option>
            {keys.map((k, i) => {
              return (
                <option key={"ofilter-" + i} value={k}>
                  {k}
                </option>
              );
            })}
          </select>
        ) : (
          <></>
        )}
      </div>
      <div className="results">
        <ul>
          {results.map((r, i) => {            
            return (
              <a onClick={() => {
                const obtenerMarcador = document.querySelector(`.maplibregl-marker[data-id=${r.id}]`);
                obtenerMarcador.style.border = "solid 4px red";
                setTimeout(() => {
                  obtenerMarcador.style.border = "none";
                }, 2000);
              }} href={`#19/${r.latitud}/${r.longitud}`} key={"result-" + i}>
                <li className="w-full h-auto p-2 cursor-pointer select-none border-solid border-slate-100 border-[1px]">
                Estación: {r.nombre} <br />
                Latitud: {r.latitud} <br />
                Longitud: {r.longitud}
              </li>
              </a>
            );
          })}
        </ul>
      </div>
    </main>
  );
}
