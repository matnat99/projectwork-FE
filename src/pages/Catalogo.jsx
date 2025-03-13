export default function Catalogo() {
  return (
    <div className="containers mx-auto">
      <div className="grid grid-cols-3 justify-center items-center w-full gap-7">
        <div className="flex-1 rounded shadow-md flex items-center justify-center">
          <div className="text-white font-bold text-xl">
            <button>
              <img src="../img/immagine_acer.webp" alt="" />
            </button>
          </div>
        </div>

        <div className="flex-1 rounded shadow-md flex items-center justify-center">
          <div className="font-bold text-xl">
            <button>
              <img src="../img/immagine_samsung.png" alt="" />
            </button>
          </div>
        </div>

        <div className="flex-1 rounded shadow-md flex items-center justify-center">
          <div className="text-white font-bold text-xl">
            <button>
              <img src="../img/immagine_Lenovo.png" alt="" />
            </button>
          </div>
        </div>
        <div className="flex-1 rounded shadow-md flex items-center justify-center">
          <div className="text-white font-bold text-xl">
            <button>
              <img src="../img/immagine_fujitsu.jpeg" alt="" />
            </button>
          </div>
        </div>
        <div className="flex-1 rounded shadow-md flex items-center justify-center">
          <div className="text-white font-bold text-xl">
            <button>
              <img src="../img/immagine_asus.jpeg" alt="" />
            </button>
          </div>
        </div>
        <div className="flex-1 rounded shadow-md flex items-center justify-center">
          <div className="text-white font-bold text-xl">
            <button>
              <img src="../img/immagine_schedamadre.jpg" alt="" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
