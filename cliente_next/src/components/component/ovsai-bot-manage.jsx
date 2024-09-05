"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { runOVSAIBot } from "@/OVSAIBot";

export function OvsaiBotManage() {
  const [data, setData] = useState([]);
  const [newData, setNewData] = useState({
    text: "",
    image: null,
  });
  const [Loading, setLoading] = useState(false);
  const [predictions, setPredictions] = useState([]);
  const [prompt, setPrompt] = useState("");

  const handleAddData = async () => {
    /* setData([
      ...data,
      {
        id: data.length + 1,
        text: newData.text,
        image: newData.image,
      },
    ]) */

    await fetch("/api/ovsaibot/data-train/add/", {
      method: "POST",
      body: JSON.stringify({
        input: newData.text,
        fecha_creacion: `${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`,
      }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.success) {
          obtenerDatos();
        }
      })
      .catch((err) => console.log(err));

    setNewData({ text: "" });
  };
  const handleEditData = (id) => {
    const updatedData = data.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          text: newData.text,
          image: newData.image,
        };
      }
      return item;
    });
    setData(updatedData);
    setNewData({ text: "", image: null });
  };
  const handleDeleteData = async (id) => {
    const eliminar = await fetch("/api/ovsaibot/data-train/delete/", {
      method: "DELETE",
      body: JSON.stringify({
        id_dato: id,
      }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    const respuesta = await eliminar.json();

    if (respuesta.success) {
      obtenerDatos();
    }
  };
  const handleInputChange = (e) => {
    setNewData({ ...newData, [e.target.name]: e.target.value });
  };

  const obtenerDatos = async () => {
    const datos = await fetch("/api/ovsaibot/data-train/get/");
    const respuesta = await datos.json();

    if (respuesta && Array.isArray(respuesta) && respuesta.length > 0) {
      setData([...respuesta]);
    }
  };

  useEffect(() => {
    if (!Loading) {
      obtenerDatos();
      setLoading(true);
    }
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-primary text-primary-foreground py-4 px-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">
          Entrenamiento <b>OVSAIBOT</b>
        </h1>
        <nav className="flex gap-4">
          <Link href="/" className="hover:underline" prefetch={false}>
            Inicio
          </Link>
          <Link href="/volcan" className="hover:underline" prefetch={false}>
            Volcan
          </Link>
        </nav>
      </header>
      <main className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-8 p-8">
        <section>
          <h2 className="text-xl font-bold mb-4">Entrenamiento</h2>
          <div className="bg-background rounded-lg shadow p-6 space-y-6">
            <div className="flex items-center gap-4">
              <input
                type="text"
                placeholder="Ingresa entrada"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                name="text"
                value={newData.text}
                onChange={handleInputChange}
              />
              <button
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 focus:outline-none"
                onClick={handleAddData}
              >
                Agregar dato
              </button>
            </div>
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th
                    className="px-6 py-3 bg-gray-50 text-left text-xs   
 font-medium text-gray-500 uppercase tracking-wider"
                  >
                    ID
                  </th>
                  <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {" "}
                      Entrada
                  </th>
                  <th className="px-6 py-3 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {data.map((item) => (
                  <tr key={item.id_dato}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {item.id_dato}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {item.input}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button className="text-indigo-600 hover:text-indigo-900">
                        {" "}
                         
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M11 5H6a2 2 0 00-2 2v11l9-9m-5   
 9v2m-6 0v2"
                          />
                        </svg>
                      </button>
                      <button className="text-red-600 hover:text-red-900 ml-4">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          {" "}
                           
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1   
 1 0 00-1 1v3M4 7h16"
                          />
                        </svg>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
        <section>
          <h2 className="text-xl font-bold mb-4">Probar modelo</h2>
          <div className="bg-background rounded-lg shadow p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="input-data"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Ingresa un prompt:
                </label>
                <textarea
                  className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                  value={prompt}
                  onChange={(e) => {
                    setPrompt(e.target.value);
                  }}
                  id="input-data"
                  rows={4}
                ></textarea>
              </div>
            </div>
            <button
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 focus:outline-none"
              onClick={() => {
                const response = runOVSAIBot(prompt, [
                  ...data.map((r) => {
                    return {
                      text: `${r.input}`,
                    };
                  }),
                ]);
                setPredictions([...predictions, response]);
              }}
            >
              Enviar
            </button>
            <ul className="w-full max-h-64 list-none overflow-y-auto flex flex-col gap-2">
              {predictions.map((pred) => {
                return (
                  <li className="w-full h-auto p-2 cursor-pointer select-none">
                    {pred}
                  </li>
                );
              })}
            </ul>
            <div className="bg-muted rounded-lg p-4">
              <h3 className="text-lg font-bold mb-2">Model Performance</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <div className="text-4xl font-bold">92%</div>
                  <div className="text-muted-foreground">Accuracy</div>
                </div>
                <div>
                  <div className="text-4xl font-bold">0.85</div>
                  <div className="text-muted-foreground">F1-Score</div>
                </div>
                <div>
                  <div className="text-4xl font-bold">0.88</div>
                  <div className="text-muted-foreground">Precision</div>
                </div>
                <div>
                  <div className="text-4xl font-bold">0.91</div>
                  <div className="text-muted-foreground">Recall</div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

function FilePenIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 22h6a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v10" />
      <path d="M14 2v4a2 2 0 0 0 2 2h4" />
      <path d="M10.4 12.6a2 2 0 1 1 3 3L8 21l-4 1 1-4Z" />
    </svg>
  );
}

function TrashIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 6h18" />
      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
    </svg>
  );
}
