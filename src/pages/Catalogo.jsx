export default function Catalogo() {
  return (
    <div className="container mx-auto p-20 flex justify-center">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
        {[
          { src: "../img/immagine_acer.webp", alt: "Acer" },
          { src: "../img/immagine_samsung.png", alt: "Samsung" },
          { src: "../img/immagine_Lenovo.png", alt: "Lenovo" },
          { src: "../img/immagine_fujitsu.jpeg", alt: "Fujitsu" },
          { src: "../img/immagine_asus.jpeg", alt: "Asus" },
          { src: "../img/immagine_schedamadre.jpg", alt: "Scheda Madre" },
        ].map((item, index) => (
          <div key={index} className="flex w-full h-48 overflow-hidden object-contain">
            <button className="w-full h-full flex items-center justify-center">
              <img
                src={item.src}
                alt={item.alt}
                className="w-full h-full object-contain"
              />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
