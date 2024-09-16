"use client";

import {
  BuildingLibraryIcon,
  ChatBubbleOvalLeftIcon,
  DocumentIcon,
  HomeIcon,
  InboxIcon,
} from "@heroicons/react/20/solid";
import Link from "next/link";
import { usePathname } from "next/navigation";

// Componentes
import Estacion from "./Estaciones/FrmIngresarEstacion";
import { ENV } from "@/config/env";
import { useEffect, useState } from "react";
import { cargarBoletin, runOVSAIBot } from "@/OVSAIBot";
import { EnterFullScreenIcon } from "@radix-ui/react-icons";
import { Input, Tooltip } from "@nextui-org/react";
import Image from "next/image";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRobot } from "@fortawesome/free-solid-svg-icons";
import { EnterFullScreenIcon } from "@radix-ui/react-icons";

export default function Sidebar({
  Modal,
  setModal,
  _Map,
  _setMap,
  selected,
  setSelected,
  setShow,
}) {
  const pathname = usePathname();

  const seleccionarHerramienta = (e) => {
    setShow(false);
    const valorSeleccionado = parseInt(e.target.getAttribute("data-type"));
    if (valorSeleccionado !== selected) {
      // Guardamos la herramienta seleccionada en un estado
      setSelected((value) => (value = valorSeleccionado));
    }
    if (valorSeleccionado === selected) {
      // Si vuelve a dar clic y es igual al valor guardado, se deselecciona
      setSelected((value) => (value = 0));
    }

    console.log("ok");
  };

  const obtenerEstaciones = async () => {
    const res = await fetch(`${ENV.URLBASE}api/estaciones/get/`);
    return res.json();
  };

  const [last, setLast] = useState(null);
  const [estaciones, setEstaciones] = useState([]);
  const [queryEstacion, setQueryEstacion] = useState("");
  const [filterEstacion, setFilterEstacion] = useState("");
  const [filtroEstaciones, setFiltroEstaciones] = useState([]);
  const [Loading, setLoading] = useState(true);

  // Estados del chat de IA
  const [chat, setChat] = useState(false);
  const [mensajes, setMensajes] = useState([]);
  const [mensaje, setMsg] = useState("");
  const [data, setData] = useState([]);
  const [chatFullScreen, setChatFullScreen] = useState(false);
  const [boletinActivado, setActivarBoletin] = useState(false);
  // ----

  const handleEnviarMensaje = () => {
    const obtenerBox = document.querySelector("#mensajes-chat");
    if (mensaje.trim().length > 0) {
      setMensajes((lastMessags) => [
        ...lastMessags,
        {
          rol: "user",
          msg: mensaje,
        },
      ]);

      // Hacer la pregunta

      runOVSAIBot(mensaje, data, boletinActivado)
        .then((res) => {
          setMensajes((lastMessags) => [
            ...lastMessags,
            {
              rol: "chat",
              msg: res,
            },
          ]);
          setActivarBoletin(false);
        })
        .catch((err) => {
          console.log(err);
        });

      // Eliminar mensaje de la caja de texto
      setMsg("");

      console.log(mensajes);

      obtenerBox.scrollIntoView({ behavior: "smooth" });
      obtenerBox.scrollTop = obtenerBox.scrollHeight;
    }
  };

  const obtenerDatos = async () => {
    try {
      const datos = await fetch("/api/ovsaibot/data-train/get/");
      const respuesta = await datos.json();

      if (respuesta && Array.isArray(respuesta) && respuesta.length > 0) {
        setData([
          ...respuesta.map((r) => {
            return {
              text: `${r.input}`,
            };
          }),
        ]);
      }
    } catch (err) {
      console.error(
        "Los datos de entrenamiento de la IA, no se pudieron cargar"
      );
    }
  };

  useEffect(() => {
    if (_Map != null || _Map != undefined) {
      if (last != _Map.markers.length) {
        try {
          obtenerEstaciones()
            .then((res) => {
              setEstaciones(res);
              setFiltroEstaciones(res);
              if (Array.isArray(res)) setLast(res.length);
            })
            .catch((err) => console.error(err));
        } catch (err) {
          console.error("No se pueden cargar las estaciones");
        }
      }

      if (Loading) {
        obtenerDatos();

        setLoading(false);
      }
    }
  }, [_Map, last]);

  useEffect(() => {
    if (estaciones.length > 0) {
      setFiltroEstaciones([
        ...estaciones.filter(
          (estacion) =>
            estacion.id.toLowerCase().includes(queryEstacion) ||
            estacion.nombre.toLowerCase().includes(queryEstacion)
        ),
      ]);
    }
  }, [queryEstacion, filterEstacion]);

  return (
    <>
      <div className="sidebar shadow-xl shadow-blue-gray-900/5">
        <div className="sidebar-icon">
          <Image width={320} height={100} src="/logoSgc2.webp" />
        </div>

        <div className="sidebar-titulo-box">
          <h5 className="sidebar-titulo">
            <b>OVSAI</b>
          </h5>
        </div>

        <nav className="sidebar-nav">
          <Link
            href={"/"}
            className="flex w-full justify-between rounded-lg bg-purple-100 px-4 py-2 text-left text-sm font-medium text-purple-900 hover:bg-purple-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500/75"
          >
            Inicio
          </Link>
          {pathname === "/volcan" ? (
            <>
              {/* Estaciones*/}
              <details>
                <summary>
                  <span>Estaciones</span>
                </summary>
                <ul className="grid grid-cols-3 relative p-0 m-0 list-none gap-1">
                  {/* Icono gris de estación (casita) de la barra izquierda */}
                  <li
                    className={`relative cursor-pointer select-none p-2 border-solid border-slate-400 border-[1px] rounded-xl shadow-md ${
                      selected === 2
                        ? "border-solid border-2 border-slate-900"
                        : ""
                    }`}
                    onClick={(e) => {
                      seleccionarHerramienta(e);
                      // Mostramos el formulario para crear estación
                      setModal({
                        ...Modal,
                        //title: "Crear Estación",
                        content: (
                          <Estacion
                            emplazamiento={null}
                            _Map={_Map}
                            _setMap={_setMap}
                            setSelected={setSelected}
                            setShow={setShow}
                          />
                        ),
                      });
                    }}
                    title={
                      "Haga clic aquí y posteriormente en el mapa para crear una Estación"
                    }
                    data-type="2"
                  >
                    <div
                      className="w-full h-full absolute z-50 bg-transparent border-none p-0 m-0 left-0 top-0"
                      data-type="2"
                    ></div>
                    <span style={{ color: "gray" }}>
                      <HomeIcon className="w-full h-auto" />
                      <div style={{ textAlign: "center" }}>
                        <span className="text-black">Crear</span>
                      </div>
                    </span>
                  </li>
                </ul>
                <div className="flex w-full flex-wrap gap-4 mt-1">
                  <Input
                    type="text"
                    placeholder="Buscar estación"
                    onValueChange={(value) => {
                      if (value.trim() != queryEstacion)
                        setQueryEstacion(value.trim());
                    }}
                  />
                  {filtroEstaciones.length > 0 ? (
                    <ul>
                      {filtroEstaciones.map((estacion, i) => {
                        return (
                          <li
                            key={`estacion-${i}`}
                            className="m-2 w-full p-2 cursor-pointer"
                          >
                            {estacion.id} : {estacion.nombre}
                          </li>
                        );
                      })}
                    </ul>
                  ) : (
                    <>
                      {estaciones.length == 0 ? (
                        <div className="p-2 w-full mt-2">No hay estaciones</div>
                      ) : estaciones.length > 0 &&
                        filtroEstaciones.length == 0 ? (
                        <div className="p-2 w-full mt-2">No hay resultados</div>
                      ) : (
                        <></>
                      )}
                    </>
                  )}
                </div>
                {/* <FiltrosEstaciones
                  datos={estaciones}
                  setEstaciones={setEstaciones}
                  campos={["id", "nombre"]}
                /> */}
              </details>
            </>
          ) : (
            <Link
              href={"/volcan"}
              className="flex w-full justify-between rounded-lg bg-purple-100 px-4 py-2 text-left text-sm font-medium text-purple-900 hover:bg-purple-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500/75"
            >
              Volcan
            </Link>
          )}
        </nav>

        {/* para llamar rapidamente a una pagina y hacer pruebas
        <div className="flex items-center justify-center">
          <Link
            href={"/anomalias"}
            className="flex w-full justify-between rounded-lg bg-purple-100 px-4 py-2 text-left text-sm font-medium text-purple-900 hover:bg-purple-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500/75"
          >
            Anomalias
          </Link>
        </div>
        */}
        {/* <Link
          href={"/snmp"}
          className="flex w-full justify-between rounded-lg bg-purple-100 px-4 py-2 text-left text-sm font-medium text-purple-900 hover:bg-purple-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500/75"
        >
          SNMP
        </Link> */}
        <Link
          href={"/ovsaibothome"}
          className="flex w-full justify-between rounded-lg bg-purple-100 px-4 py-2 text-left text-sm font-medium text-purple-900 hover:bg-purple-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500/75"
        >
          OVSAIBOT Home
        </Link>
      </div>

      {/* Burbuja CHAT*/}
      <button
        className="fixed w-10 h-10 left-[300px] bottom-2 z-[2000]  text-[#82A53D] hover:animate-pulse hover:w-12 hover:h-12"
        onClick={() => {
          setChat(!chat);
        }}
      >
        <ChatBubbleOvalLeftIcon width={40} height={40} />
      </button>

      {chat ? (
        <div
          className={`fixed ${
            chatFullScreen ? "w-full h-full" : "w-72 h-96 left-[350px]"
          } p- bottom-2 box-border bg-slate-200 z-[2000]`}
        >
          <section className="relative w-full box-border p-2 bg-[#82A53D] flex flex-row gap-1-">
            <span className="align-middle justify-center">OVSAIBot</span>
            <button
              onClick={() => {
                setChatFullScreen(!chatFullScreen);
              }}
              className="cursor-pointer select-none p-2 rounded-md absolute right-0 top-0"
            >
              <EnterFullScreenIcon width={30} height={30} />
            </button>
            <Tooltip
              placement="top"
              content={<b>Activar boletin</b>}
              color="primary"
            >
              <button
                onClick={() => {
                  setActivarBoletin(true);
                  cargarBoletin();
                }}
                className="cursor-pointer select-none p-2 rounded-md absolute right-9 top-0"
              >
                <DocumentIcon width={30} height={30} />
              </button>
            </Tooltip>
          </section>
          <section
            id="mensajes-chat"
            className="relative flex flex-col gap-1 w-full box-border overflow-y-auto p-2 h-72"
          >
            {mensajes.map((m, i) => (
              <div
                key={`msgChat-${i}`}
                className={`w-full ${
                  m.rol === "user"
                    ? "bg-slate-300 text-black"
                    : "bg-[#82A53D] text-black"
                } p-2 box-border`}
              >
                {m.msg}
              </div>
            ))}
          </section>
          <section className="relative w-full box-border p-0 h-4">
            <input
              type="text"
              placeholder="Mensaje"
              onChange={(e) => {
                setMsg(e.target.value);
              }}
              value={mensaje}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleEnviarMensaje();
                }
              }}
              className="w-full h-auto p-2 cursor-text border-gray-700 text-black focus:outline-0"
            />
          </section>
        </div>
      ) : (
        <></>
      )}
    </>
  );
}
