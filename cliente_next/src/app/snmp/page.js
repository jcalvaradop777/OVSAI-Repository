"use client";

import "@/app/styles/chat-styles.css";
import { Select, SelectItem } from "@nextui-org/react";
import Sidebar from "../components/Sidebar";

export default function SNMPDispositivo() {
  return (
    <>
      <Sidebar />
      <Select label={"Seleccionar método"} className="max-w-xs">
        <SelectItem key={"1"}>Obtener temperatura CPU</SelectItem>
        <SelectItem key={"2"}>Obtener número de procesadores</SelectItem>
        <SelectItem key={"3"}>Obtener memoría física total</SelectItem>
      </Select>
      {/* <Sidebar />
      <main className="absolute mt-0 top-0 ml-0 left-0 w-full overflow-y-auto">
        <section role="columnheader" className="container-column"></section>
        <div>
          <form action="" method="POST">
            <Select label={"Seleccionar método"} className="max-w-xs">
              <SelectItem key={"1"}>Obtener temperatura CPU</SelectItem>
              <SelectItem key={"2"}>Obtener número de procesadores</SelectItem>
              <SelectItem key={"3"}>Obtener memoría física total</SelectItem>
            </Select>
          </form>
        </div>
      </main> */}
    </>
  );
}
