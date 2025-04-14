import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import hoverImagePeta from "../assets/FullMap.png";

const MainMenu = () => {
  const navigate = useNavigate();
  const [, setIsLoaded] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = hoverImagePeta;
    img.onload = () => setIsLoaded(true);
  }, []);

  const handleNavigate = (path: string) => {
    navigate(path);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.2,
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const itemVariants = {
    hidden: { y: 15, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.4, ease: "easeOut" },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-100 dark:from-gray-900 dark:to-amber-950 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-orange-300 opacity-20 dark:bg-orange-700 dark:opacity-10 blur-3xl"></div>
        <div className="absolute top-1/3 -left-20 w-80 h-80 rounded-full bg-amber-300 opacity-20 dark:bg-amber-700 dark:opacity-10 blur-3xl"></div>
        <div className="absolute bottom-20 right-1/4 w-60 h-60 rounded-full bg-yellow-300 opacity-20 dark:bg-yellow-700 dark:opacity-10 blur-3xl"></div>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="container mx-auto px-4 pt-36 pb-16 relative z-10"
      >
        <motion.div
          variants={itemVariants}
          className="flex flex-col md:flex-row gap-10 items-center mb-16 md:mb-24"
        >
          <div className="w-full md:w-1/2 text-center md:text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="inline-block mb-3 px-4 py-1 bg-orange-100 dark:bg-orange-900/40 text-orange-800 dark:text-orange-300 rounded-full text-sm font-semibold"
            >
              Sistem Informasi Terintegrasi
            </motion.div>

            <motion.h1
              className="text-5xl md:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-orange-700 to-amber-700 dark:from-orange-400 dark:to-amber-400 bg-clip-text text-transparent mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              SIOTIK
            </motion.h1>

            <motion.h2
              className="text-2xl md:text-3xl font-semibold text-orange-700 dark:text-orange-400 mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              Sistem Informasi Okupasi TIK
            </motion.h2>

            <motion.p
              className="text-gray-700 dark:text-gray-300 mb-8 text-lg leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              Platform terdepan untuk mengakses data terintegrasi tentang
              okupasi bidang Teknologi Informasi dan Komunikasi di sekolah
              kejuruan Sulawesi Utara.
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.8 }}
            >
              <motion.button
                className="px-6 py-3 bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white font-semibold rounded-lg shadow-lg transition-all duration-300 hover:shadow-orange-500/20 dark:hover:shadow-orange-400/10 dark:from-orange-700 dark:to-amber-700 dark:hover:from-orange-600 dark:hover:to-amber-600"
                whileHover={{
                  scale: 1.03,
                  boxShadow: "0 10px 25px -5px rgba(249, 115, 22, 0.4)",
                }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleNavigate("/form")}
              >
                Cari Okupasi
              </motion.button>
            </motion.div>
          </div>

          <motion.div
            className="w-full md:w-1/2 relative"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            <div className="relative overflow-hidden rounded-2xl shadow-2xl transform rotate-1 hover:rotate-0 transition-transform duration-700">
              <motion.div
                className="bg-orange-200 dark:bg-orange-900 absolute inset-0 z-0"
                animate={{
                  backgroundPosition: ["0% 0%", "100% 100%"],
                }}
                transition={{
                  duration: 25,
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
                style={{
                  backgroundImage: `url(${hoverImagePeta})`,
                  backgroundSize: "cover",
                  filter: "blur(1px)",
                }}
              />
              <div className="relative z-10 p-8 backdrop-blur-sm bg-white/40 dark:bg-black/40">
                <h3 className="text-2xl font-bold text-orange-900 dark:text-white mb-4">
                  Peta Okupasi Interaktif
                </h3>
                <p className="text-orange-900 dark:text-orange-100 mb-6 leading-relaxed">
                  Visualisasi peta yang menampilkan persebaran sekolah kejuruan
                  beserta data okupasi Teknologi Informasi dan Komunikasi (TIK).
                </p>
                <motion.button
                  className="px-5 py-2 bg-orange-900 text-white rounded-lg font-medium hover:bg-orange-800 dark:bg-orange-600 dark:hover:bg-orange-500 transition-colors shadow-lg shadow-orange-900/20 dark:shadow-orange-700/20"
                  whileHover={{
                    scale: 1.05,
                    boxShadow: "0 10px 25px -5px rgba(194, 65, 12, 0.5)",
                  }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleNavigate("/home")}
                >
                  Lihat Peta
                </motion.button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default MainMenu;