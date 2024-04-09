<<<<<<< HEAD
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
      case "/guralp":
        return <Guralp />;
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
=======
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
      case "/guralp":
        return <Guralp />;
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
>>>>>>> a3ae5695d3937190463fdf11d41378b13015bf77
