export default function Basic({ title, content, show, setShow }) {
  return show ? (
    <>
      <div className="fixed block w-full h-full m-0 p-0 z-[100] top-0 left-0 bg-[rgba(0,0,0,0.5)]">
        <div className="block ml-auto mr-auto top-1/4 p-0 relative max-w-sm min-w-44 rounded-xl">
          <section
            className="relative p-2 block bg-slate-100 text-slate-800 rounded-tl-[inherit] rounded-tr-[inherit]"
            role="heading"
          >
            {title}
          </section>
          <section
            role="main"
            className="p-2 relative block bg-slate-100 text-slate-800"
          >
            {content}
          </section>
          <section
            role="footer"
            className="p-2 relative block bg-slate-100 text-slate-800 rounded-bl-[inherit] rounded-br-[inherit]"
          >
            <button
              type="button"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            >
              Cerrar
            </button>
          </section>
        </div>
      </div>
    </>
  ) : (
    <></>
  );
}
