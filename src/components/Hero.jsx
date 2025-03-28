import { motion } from "framer-motion";

export default function Hero() {
  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white">
      <motion.div
        className="text-4xl font-bold"
        initial={{ x: "-100vw", opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 50, duration: 1.5 }}
      >
        <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl mb-5 font-bold">
          Affidabilità garantita, dai marchi che contano
        </div>
        <div className="text-lg sm:text-xl md:text-2xl lg:text-3xl mb-3 font-semibold">
          Qualità e durata nel tempo: la nostra priorità
        </div>
        <div className="text-sm sm:text-base md:text-lg max-w-3xl mx-auto">
          Selezioniamo solo i migliori brand per offrirti prodotti affidabili.
          Garantiamo prestazioni eccellenti e un supporto costante. Ogni
          componente è scelto per stabilità, sicurezza e innovazione. Con noi,
          l’esperienza d’acquisto è senza sorprese. Marchi di fiducia e
          soluzioni su misura per te.
        </div>
      </motion.div>
    </div>
  );
}
