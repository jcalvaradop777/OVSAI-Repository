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
          <section
            className="relative p-2 block bg-slate-100 text-slate-800 rounded-tl-[inherit] rounded-tr-[inherit]"
            role="heading"
          >
            {Modal.title}
          </section>
          
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
            <button
              type="button"
              className="text-white bg-[#82A53D] hover:bg-[#C4D92E] hover:text-[#8A8C8E] focus:ring-4 focus:text-white focus:ring-red-500 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
              onClick={() => {
                setSelected((value) => (value = 0));
                setShow(false);
              }}
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
