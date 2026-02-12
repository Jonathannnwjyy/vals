import React, { useState } from "react";
import { motion, AnimatePresence, useAnimation } from "framer-motion";
import { Heart, Stars, MailOpen, Cloud } from "lucide-react";
import confetti from "canvas-confetti";

export default function ValentinePage() {
  const [noCount, setNoCount] = useState(0);
  const [yesCount, setYesCount] = useState(0);
  const [isAccepted, setIsAccepted] = useState(false);
  const [isEnvelopeOpened, setIsEnvelopeOpened] = useState(false);

  const cardControls = useAnimation();

  const noTexts = ["No", "Masak sih gamau?", "Pwis pwisss", "Sakit hati"];

  const yesTexts = [
    "Yes",
    "RILL KAH? 🤨",
    "MANG EAK? 😮",
    "Pinky promise? 🤙",
    "MAUUU DONGG",
  ];

  const handleNoClick = () => {
    setNoCount((prev) => prev + 1);
    cardControls.start({
      x: [0, -20, 20, -20, 20, 0],
      transition: { duration: 0.5 },
    });
  };

  const handleYesClick = () => {
    if (yesCount < 4) {
      setYesCount((prev) => prev + 1);
    } else {
      setIsAccepted(true);
      triggerBigConfetti();
    }
  };

  const handleOpenEnvelope = () => {
    setIsEnvelopeOpened(true);
    setTimeout(() => {
      triggerConfetti();
    }, 600);
  };

  const triggerConfetti = () => {
    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 100 };
    const randomInRange = (min, max) => Math.random() * (max - min) + min;

    const interval = setInterval(function () {
      const timeLeft = animationEnd - Date.now();
      if (timeLeft <= 0) return clearInterval(interval);

      const particleCount = 50 * (timeLeft / duration);
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
      });
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
      });
    }, 250);
  };

  const triggerBigConfetti = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    });
  };

  const noScale = 1 - noCount * 0.3;
  const yesScale = 1 + noCount * 0.1 + yesCount * 0.2;

  const flapVariants = {
    closed: { rotateX: 0 },
    opened: { rotateX: 180 },
  };

  const paperVariants = {
    closed: {
      y: 0,
      opacity: 0,
      scale: 0.5,
    },
    opened: {
      y: "-35vh", // Kertas naik setinggi 1/3 layar
      opacity: 1,
      scale: 1,
      zIndex: 50,
      transition: {
        delay: 0.5,
        duration: 0.8,
        ease: "backOut",
      },
    },
  };

  // --- PERBAIKAN DI SINI ---
  const floatingPaperVariants = {
    animate: {
      y: [0, -10, 0], // Gerakan relatif kecil di dalam parent
      rotate: [0, 2, -2, 0],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full bg-gradient-to-br from-pink-300 via-rose-200 to-purple-200 overflow-hidden relative selection:bg-rose-300">
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={`heart-${i}`}
            initial={{
              y: "110vh",
              x: Math.random() * 100 + "vw",
              opacity: 0,
              scale: 0.5,
            }}
            animate={{ y: "-10vh", opacity: [0, 0.8, 0], scale: [0.5, 1, 0.5] }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: "linear",
            }}
            className="absolute text-rose-500/20"
          >
            <Heart size={Math.random() * 40 + 20} fill="currentColor" />
          </motion.div>
        ))}

        {[...Array(5)].map((_, i) => (
          <motion.div
            key={`cloud-${i}`}
            initial={{ x: "-10vw", y: Math.random() * 80 + "vh", opacity: 0.4 }}
            animate={{ x: "110vw" }}
            transition={{
              duration: Math.random() * 20 + 30,
              repeat: Infinity,
              delay: Math.random() * 10,
              ease: "linear",
            }}
            className="absolute text-white/40"
          >
            <Cloud size={Math.random() * 60 + 40} fill="currentColor" />
          </motion.div>
        ))}

        {[...Array(10)].map((_, i) => (
          <motion.div
            key={`star-${i}`}
            className="absolute text-yellow-400/60"
            initial={{
              x: Math.random() * 100 + "vw",
              y: Math.random() * 100 + "vh",
            }}
            animate={{ opacity: [0.2, 1, 0.2], scale: [0.8, 1.2, 0.8] }}
            transition={{ duration: Math.random() * 2 + 1, repeat: Infinity }}
          >
            <Stars size={Math.random() * 20 + 10} />
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {isEnvelopeOpened && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            className="fixed inset-0 bg-black z-20"
          />
        )}
      </AnimatePresence>

      <motion.div
        animate={cardControls}
        className={`z-30 text-center p-8 max-w-md w-full ${!isAccepted ? "bg-white/40 backdrop-blur-lg shadow-2xl border border-white/60" : ""} rounded-3xl transition-all duration-500`}
      >
        <AnimatePresence mode="wait">
          {isAccepted ? (
            <motion.div
              key="envelope-container"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="relative flex flex-col items-center justify-center min-h-[500px]"
            >
              <div className="relative w-64 h-48 mt-20 perspective-1000">
                <motion.div
                  animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="absolute inset-0 bg-rose-400 blur-3xl -z-10 rounded-full"
                />

                <svg
                  className="absolute inset-0 w-full h-full z-10 overflow-visible"
                  viewBox="0 0 200 150"
                >
                  <path
                    d="M0,0 L100,75 L200,0 L200,150 L0,150 Z"
                    fill="#e11d48"
                    className="fill-rose-600 shadow-md"
                  />
                </svg>

                <motion.div
                  variants={paperVariants}
                  initial="closed"
                  animate={isEnvelopeOpened ? ["opened", "animate"] : "closed"}
                  className="absolute left-2 right-2 bg-white p-4 z-20 rounded-lg shadow-2xl text-center flex flex-col items-center justify-center origin-bottom border-2 border-rose-100 overflow-hidden"
                  style={{ top: "10px", height: "33vh" }}
                >
                  <motion.div
                    variants={floatingPaperVariants}
                    className="w-full h-full flex flex-col items-center justify-center gap-2"
                  >
                    <h2 className="text-lg md:text-xl font-bold text-rose-600 font-serif leading-tight">
                      YEYYYYY
                    </h2>
                    {/* GANTI LINK GAMBAR DI SINI (Contoh pakai yang stabil) */}
                    <img
                      src="images/intan.jpeg"
                      alt="Cuddle"
                      className="w-20 h-20 md:w-28 md:h-28 rounded-lg object-contain"
                    />
                    <p className="text-gray-800 text-xs md:text-sm font-medium leading-tight">
                      Be ready yaa hari sabtu nanti
                    </p>
                    <p className="text-gray-800 text-xs md:text-sm font-medium leading-tight">
                      I'll pick you up at 11.30 AM
                    </p>
                    <p className="text-rose-500 text-xs md:text-sm font-bold">
                      Love you so much! ❤️
                    </p>
                  </motion.div>
                </motion.div>

                <svg
                  className="absolute inset-0 w-full h-full z-30 overflow-visible pointer-events-none"
                  viewBox="0 0 200 150"
                >
                  <path
                    d="M0,150 L100,75 L200,150 Z"
                    fill="#be123c"
                    className="fill-rose-700"
                  />
                  <path
                    d="M0,0 L0,150 L100,75 Z"
                    fill="#be123c"
                    className="fill-rose-700"
                  />
                  <path
                    d="M200,0 L200,150 L100,75 Z"
                    fill="#be123c"
                    className="fill-rose-700"
                  />

                  <motion.path
                    d="M0,0 L100,75 L200,0 Z"
                    fill="#9f1239"
                    className="fill-rose-800"
                    variants={flapVariants}
                    initial="closed"
                    animate={isEnvelopeOpened ? "opened" : "closed"}
                    transition={{ duration: 0.6, ease: "easeInOut" }}
                    style={{ originY: 0 }}
                  />
                </svg>
              </div>

              <AnimatePresence>
                {!isEnvelopeOpened && (
                  <motion.button
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.5 }}
                    whileHover={{ scale: 1.1, rotate: [0, -5, 5, 0] }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleOpenEnvelope}
                    className="mt-28 z-40 bg-gradient-to-r from-rose-500 to-pink-600 text-white px-8 py-3 rounded-full font-bold shadow-xl flex items-center gap-2 ring-4 ring-rose-200"
                  >
                    <MailOpen size={20} />
                    Dibuka Pelan-pelan
                  </motion.button>
                )}
              </AnimatePresence>
            </motion.div>
          ) : (
            <motion.div
              key="question"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              className="flex flex-col items-center gap-6"
            >
              <div className="relative">
                <img
                  src="https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExazB4OWk1Z2J4Y2Z6M2h2dWx5Y2Z6M2h2dWx5Y2Z6M2h2dWx5eSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/KztT2c4u8mYYUiMKdJ/giphy.gif"
                  alt="Cute asking"
                  className="w-40 h-40 object-contain drop-shadow-md"
                />
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.2, 1] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                  className="absolute -top-4 -right-4 text-yellow-500 drop-shadow-lg"
                >
                  <Stars size={32} fill="currentColor" />
                </motion.div>
                <motion.div
                  animate={{ y: [0, -10, 0], opacity: [0, 1, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                  className="absolute -left-4 top-10 text-rose-400"
                >
                  <Heart size={20} fill="currentColor" />
                </motion.div>
              </div>

              <h1 className="text-3xl md:text-4xl font-extrabold text-rose-600 leading-tight">
                {"Will you be my Valentine?".split(" ").map((word, index) => (
                  <motion.span
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 + 0.5 }}
                    className="inline-block mr-2"
                  >
                    {word}
                  </motion.span>
                ))}
              </h1>

              <div className="flex flex-col items-center justify-center gap-4 mt-8 w-full min-h-[100px]">
                <motion.button
                  whileHover={{ scale: yesScale + 0.1 }}
                  whileTap={{ scale: yesScale - 0.1 }}
                  animate={{
                    scale: yesScale,
                    boxShadow: [
                      "0px 0px 0px rgba(244, 63, 94, 0)",
                      "0px 0px 20px rgba(244, 63, 94, 0.5)",
                      "0px 0px 0px rgba(244, 63, 94, 0)",
                    ],
                  }}
                  transition={{
                    scale: { type: "spring", stiffness: 200, damping: 10 },
                    boxShadow: { duration: 1.5, repeat: Infinity },
                  }}
                  className={`px-8 py-3 rounded-full font-bold text-white shadow-lg transition-all duration-300 ${
                    yesCount === 4
                      ? "bg-gradient-to-r from-rose-500 to-pink-600 animate-pulse text-xl ring-4 ring-pink-300"
                      : "bg-rose-500 hover:bg-rose-600"
                  }`}
                  onClick={handleYesClick}
                >
                  {yesTexts[yesCount]}
                </motion.button>

                <AnimatePresence>
                  {noCount < 3 && (
                    <motion.button
                      initial={{ scale: 1 }}
                      animate={{ scale: noScale, opacity: 1 }}
                      exit={{ scale: 0, opacity: 0 }}
                      whileHover={{
                        x: [0, -5, 5, -5, 5, 0],
                        backgroundColor: "#ffe4e6",
                      }}
                      className="px-8 py-3 rounded-full font-bold text-rose-500 bg-white border-2 border-rose-200 hover:bg-rose-50 shadow-md whitespace-nowrap mt-4"
                      onClick={handleNoClick}
                    >
                      {noTexts[noCount]}
                    </motion.button>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
