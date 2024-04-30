"use client";

import Sidebar from "./components/Sidebar";

import { usePathname, useRouter } from "next/navigation";
import Guralp from "./guralp/page";
import Volcan from "./volcan/page";

export default function Home() {
  const router = useRouter();

  const getContent = () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const pathname = usePathname();
    switch (pathname) {
      case "/":
        return <h1>Hola</h1>
      case "/volcan":
        return (
          <Volcan />
        );
      default:
        return <h1>No encontrado</h1>;
    }
  };
  return (
    <>
      <div className="w-full h-full">
        <Sidebar
        />
        {getContent()}
      </div>
    </>
  );
}
