import { XMarkIcon } from "@heroicons/react/20/solid";

export default function Basic({
  Modal,
  setModal,
  selected,
  setSelected,
  show,
  setShow,
}) {
  // La ventana modal solo se muestra si "show" es verdadero y se ha seleccionado una herramienta
  return show && selected !== 0 ? (
    <>
      <div className="fixed block w-full h-full m-0 p-0 z-[100] top-0 left-0 bg-[rgba(0,0,0,0.5)] overflow-y-auto mb-10">
        <div className="block ml-auto mr-auto top-1/4 p-0 relative max-w-sm min-w-44 rounded-xl bottom-10">

          {/* <section
            className="relative p-2 block bg-slate-100 text-slate-800 rounded-tl-[inherit] rounded-tr-[inherit]"
            role="heading"
          >
            {Modal.title}
          </section> */}

          <div className="flex items-center justify-center bg-[#82A53D]">
            <h5 className="block antialiased tracking-normal font-sans text-xl font-semibold leading-snug text-white ml-auto">
              <b>Crear estación</b>
            </h5>

            <button
              type="button"
              className="btn-close ml-auto"
              onClick={() => {
                setSelected((value) => (value = 0));
                setShow(false);
              }}
            >
              <XMarkIcon
                width="20"
                height="20"
              />
            </button>
          </div>

          <section
            role="main"
            className="p-2 relative block bg-slate-100 text-slate-800"
          >
            {Modal.content}
          </section>

          <section
            role="footer"
            className="p-2 relative block bg-slate-100 text-slate-800 rounded-bl-[inherit] rounded-br-[inherit]"
          >
            
          </section>
        </div>
      </div>
    </>
  ) : (
    <></>
  );
}
