import { motion } from "framer-motion";

const stars = Array.from({ length: 120 });

const CosmicBackground = () => {
  return (
    <div className="fixed inset-0 overflow-hidden -z-10 bg-[#020617]">

      {/* Nebula Glow */}
      <div className="absolute w-[700px] h-[700px] bg-violet-700/20 blur-[180px] rounded-full -top-52 -left-40" />

      <div className="absolute w-[600px] h-[600px] bg-cyan-500/20 blur-[180px] rounded-full bottom-0 right-0" />

      {/* Stars */}

      {stars.map((_, index) => (
        <motion.div
          key={index}
          className="absolute bg-white rounded-full"
          style={{
            width: Math.random() * 3 + 1,
            height: Math.random() * 3 + 1,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
          }}
          animate={{
            opacity: [0.2, 1, 0.2],
          }}
          transition={{
            duration: Math.random() * 4 + 2,
            repeat: Infinity,
          }}
        />
      ))}

    </div>
  );
};

export default CosmicBackground;