"use client";

import { Disclosure } from "@headlessui/react";
import { ChevronUpIcon, PlusIcon } from "@heroicons/react/20/solid";
import Basic from "./Modals/Basic";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import GraficaOriginal from './Traza';

import React from 'react';
import { renderToString } from 'react-dom/server';
export default function Sidebar({
  emplazamientos,
  estaciones,
  sensores,
  setE,
  setEs,
  setS,
  _selected,
  _setSelected,
}) {
  const [dataForm, setDataForm] = useState({});
  const [show, setShow] = useState(false);
  const [title, setTitle] = useState(null);
  const [content, setContent] = useState(null);

  const create = (type) => { };

  const [typeContent] = useState({
    1: {
      title: "Crear emplazamiento",
      content: (
        <>
          <form method="POST" onSubmit={create}>
            <label
              htmlFor="name"
              className="lock mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Nombre emplazamiento:{" "}
            </label>
            <input
              type="text"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              id="name"
              placeholder="Nombre emplazamiento"
            />
            <label
              htmlFor="long"
              className="lock mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Posición emplazamiento:{" "}
            </label>
            <input
              type="text"
              id="long"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Longitud"
            />
            <input
              type="text"
              id="lat"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Latitud"
            />
            <label
              htmlFor="color"
              className="lock mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Color emplazamiento:{" "}
            </label>
            <input type="color" id="color" />
            <button type="submit">Crear emplazamiento</button>
          </form>
        </>
      ),
    },
  });

  const addData = (name, value) => {
    setDataForm({
      ...dataForm,
      name: value,
    });
  };

  const clearData = () => {
    if (Object.keys(dataForm).length > 0) {
      setDataForm({});
    }
  };

  const openModal = (type) => {
    clearData();

    setShow(true);

    setTitle(typeContent[type].title);
    setContent(typeContent[type].content);
  };

  const pathname = usePathname();

  function ListButton({ _title, _type, data }) {
    return (
      <Disclosure>
        {({ open }) => (
          <>
            <Disclosure.Button className="flex w-full justify-between rounded-lg bg-purple-100 px-4 py-2 text-left text-sm font-medium text-purple-900 hover:bg-purple-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500/75">
              <span>{_title}</span>
              <ChevronUpIcon
                className={`${open ? "" : "rotate-180 transform"
                  } h-5 w-5 text-purple-500`}
              />
            </Disclosure.Button>
            <Disclosure.Panel className="px-4 pb-2 pt-4 text-sm text-gray-500">
              <ul
                className="grid grid-cols-3 relative p-0 m-0 list-none gap-1
                    "
              >
                {Array.isArray(data) ? (
                  data.map((item, id) => (
                    <li
                      key={"item-" + id}
                      className={`relative cursor-pointer select-none p-2 border-solid border-slate-400 border-[1px] rounded-xl shadow-md ${_selected.id === item.id && _selected.type === item.type
                          ? "border-blue-800 border-[2px] border-solid"
                          : ""
                        }`}
                      onClick={(e) => {
                        e.preventDefault();
                        if (_type != 1) {
                          _setSelected(item);
                        } else {
                          alert("Llevando a la ubicación...")
                        }
                      }}
                      title={item.name}
                    >
                      <span style={{ color: `${item.color}` }}>
                        {item.icon}
                        {item.name.substr(0, 5)}...
                      </span>
                    </li>
                  ))
                ) : (
                  <></>
                )}
              </ul>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    );
  }

  return (
    <>
      <div className="relative flex flex-col bg-clip-border bg-white text-gray-700 h-[calc(100vh)] w-full max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5 z-50">
        
        <div className="flex items-center justify-center text-center bg-green-600">
          <img alt="Logo" src="logoSGCblanco.png" class="h-11 pl-2"></img>
          <h5 className="block antialiased tracking-normal font-sans text-xl leading-snug text-white">
            <b>Servicio Geológico Colombiano</b>
          </h5>
        </div>

        <div className="mb-2 p-4  text-center">
          <h5 className="block antialiased tracking-normal font-sans text-xl font-semibold leading-snug text-gray-900">
            <b>OVSAI</b>
          </h5>
        </div>
        <nav className="flex flex-col gap-1 min-w-[240px] p-2 font-sans text-base font-normal text-gray-700">
          {pathname === "/" ? (
            <>
              {/* Emplazamientos */}
              <ListButton
                _title={"Emplazamientos"}
                _type={1}
                data={emplazamientos}
              />
              {/* Estaciones */}
              <ListButton _title={"Estaciones"} _type={2} data={estaciones} />
              {/* Sensores */}
              <ListButton _title={"Sensores"} _type={3} data={sensores} />
            </>
          ) : (
            <Link
              href={"/volcan"}
              className="flex w-full justify-between rounded-lg bg-purple-100 px-4 py-2 text-left text-sm font-medium text-purple-900 hover:bg-purple-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500/75"
            >
              Volcan
            </Link>
          )}
          {/* Enlaces */}

          <button className="flex w-full justify-between rounded-lg bg-purple-100 px-4 py-2 text-left text-sm font-medium text-purple-900 hover:bg-purple-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500/75"
            onClick={() => { window.open('/guralp', 'guralp', 'width=400,height=300'); }}>Guralp</button>

        </nav>
      </div>
      <Basic show={show} setShow={setShow} title={title} content={content} />
    </>
  );
}
