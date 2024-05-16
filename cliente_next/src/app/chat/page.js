"use client";

import { Cog6ToothIcon, MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import Sidebar from "../components/Sidebar";
import "@/app/styles/chat-styles.css";
import { useEffect, useState } from "react";

// Socket
import { socket } from "@/socket";

export default function Chat() {
  const [search, setSearch] = useState(false);
  const [config, setConfig] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  // Estados de socket
  const [isConnected, setIsConnected] = useState(false);

  // Función para mostrar/ocultar buscador
  const handleSearch = () => {
    setSearch(!search);
  };

  // Función para mostrar panel de configuración
  const handleConfig = () => {
    setConfig(true);
  };

  // Función para ocultar panel de configuración
  const cancelConfig = () => {
    setConfig(false);
  };

  // Función para devolver fecha actual - formato: Colombia

  const getDate = () => {
    const currentDate = new Date();

    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      timeZone: "America/Bogota",
    };

    return currentDate.toLocaleDateString("es-CO", options);
  };

  // Función para enviar mensaje usando el Socket

  const handleSendMessage = (e) => {
    if (e.key === "Enter") {
      if (message.length > 0) {
        socket.emit("new-message", {
          id: socket.id,
          message,
          date: getDate(),
        });

        clearMessage();
      }
    }
  };

  // Función para guardar el mensaje del input message

  const handleChangeMessage = (e) => {
    setMessage(e.target.value);
  };

  // Función limpiar entrada mensaje

  const clearMessage = () => {
    setMessage("");
  };

  // Funciones del socket

  useEffect(() => {
    if (socket.connected) {
      onConnect();

      // Actualizar mensajes

      socket.on("update-messages", (messages_) => {
        setMessages(messages_);
      });
    }

    function onConnect() {
      setIsConnected(true);
    }

    function onDisconnect() {
      setIsConnected(false);
    }

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
    };
  }, []);

  return (
    <>
      <Sidebar />
      <main className="absolute mt-0 top-0 ml-0 left-0 w-full overflow-y-auto">
        <section role="columnheader" className="container-column"></section>
        <div className="inline-block">
          <section className="absolute md:w-1/2 sm:w-1/6 lg:w-2/3 h-screen mt-0 top-0 border-solid border-slate-800 bg-slate-500">
            {/* Encabezado del Chat */}
            <header
              role="contentinfo"
              className="relative m-2 box-border bg-slate-300 border-none p-3 font-normal text-lg rounded-md"
            >
              <span className="name-chat">Chat</span>
              <nav className="inline-block align-middle float-end">
                <ul className="inline-block">
                  <li className="btn-chat-header" onClick={handleSearch}>
                    <MagnifyingGlassIcon className="icon-chat-header" />
                  </li>
                  <li className="btn-chat-header" onClick={handleConfig}>
                    <Cog6ToothIcon className="icon-chat-header" />
                  </li>
                </ul>
              </nav>
            </header>
            {/* --- */}
            {/* Caja de búsqueda */}
            {search ? (
              <section role="searchbox">
                <form className="max-w-full ml-2 mr-2 box-border">
                  <label
                    for="searchBox"
                    className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
                  >
                    Búsqueda
                  </label>
                  <div className="relative box-border">
                    <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                      <MagnifyingGlassIcon className="w-4 h-4" />
                    </div>
                    <input
                      type="search"
                      id="searchBox"
                      className="block w-full box-border p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
                      placeholder="Buscar historial o registros..."
                      required
                    />
                    <button
                      type="submit"
                      className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                      Buscar
                    </button>
                  </div>
                </form>
              </section>
            ) : (
              <></>
            )}
            {/* --- */}
            {/* Configuración del Chat */}
            {config ? (
              <section
                role="tabpanel"
                className="max-w-full p-3 box-border bg-white rounded-lg border-none m-2 text-black text-pretty"
              >
                <label
                  for="show_date"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Mostrar fecha y hora en cada nuevo registro
                  <label className="flex items-center cursor-pointer mt-2">
                    <input type="checkbox" className="sr-only peer" checked />
                    <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </label>
                <label
                  for="push_notification"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Recibir notificaciones push
                  <label className="flex items-center cursor-pointer mt-2">
                    <input type="checkbox" className="sr-only peer" checked />
                    <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </label>
                <hr className="h-px my-3 bg-gray-200 border-0 dark:bg-gray-700" />
                <button className="btn-cancel" onClick={cancelConfig}>
                  Cancelar
                </button>
              </section>
            ) : (
              <></>
            )}
            {/* --- */}
            <section role="main" className="chat-main">
              <ul className="block list-none">
                {messages.map((msg) => (
                  <li className="item-chat">
                    {msg.id === socket.id ? "Tú" : msg.id} | {msg.date}
                    <br />
                    {msg.message}
                  </li>
                ))}
              </ul>
            </section>
            <section className="input-chat">
              <input
                type="text"
                name="message-chat"
                id="message-chat"
                placeholder="Escribe un mensaje..."
                className="input-message-contain"
                onChange={handleChangeMessage}
                onKeyDown={handleSendMessage}
                value={message}
              />
            </section>
          </section>
        </div>
      </main>
    </>
  );
}
