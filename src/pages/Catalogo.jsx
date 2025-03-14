export default function Catalogo() {
  return (
    <div className="container mx-auto p-20">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 justify-center items-center w-full gap-7">
        <div className="flex rounded shadow-md items-center justify-center p-4">
          <button>
            <img
              src="../img/immagine_acer.webp"
              alt="Acer"
              className="max-w-full h-auto"
            />
          </button>
        </div>
        <div className="flex rounded shadow-md items-center justify-center p-4">
          <button>
            <img
              src="../img/immagine_samsung.png"
              alt="Samsung"
              className="max-w-full h-auto"
            />
          </button>
        </div>
        <div className="flex rounded shadow-md items-center justify-center p-4">
          <button>
            <img
              src="../img/immagine_Lenovo.png"
              alt="Lenovo"
              className="max-w-full h-auto"
            />
          </button>
        </div>
        <div className="flex rounded shadow-md items-center justify-center p-4">
          <button>
            <img
              src="../img/immagine_fujitsu.jpeg"
              alt="Fujitsu"
              className="max-w-full h-auto"
            />
          </button>
        </div>
        <div className="flex rounded shadow-md items-center justify-center p-4">
          <button>
            <img
              src="../img/immagine_asus.jpeg"
              alt="Asus"
              className="max-w-full h-auto"
            />
          </button>
        </div>
        <div className="flex rounded shadow-md items-center justify-center p-4">
          <button>
            <img
              src="../img/immagine_schedamadre.jpg"
              alt="Scheda Madre"
              className="max-w-full h-auto"
            />
          </button>
        </div>
      </div>
    </div>
  );
}
