import { motion } from "framer-motion";

const Planet = () => {
  return (
    <motion.div
      animate={{
        rotate: 360,
        y: [0, -20, 0],
      }}
      transition={{
        rotate: {
          duration: 40,
          repeat: Infinity,
          ease: "linear",
        },
        y: {
          duration: 4,
          repeat: Infinity,
          repeatType: "reverse",
        },
      }}
      className="
      fixed
      top-10
      right-10
      w-56
      h-56
      rounded-full
      bg-gradient-to-br
      from-cyan-300
      via-blue-500
      to-indigo-900
      shadow-[0_0_80px_rgba(59,130,246,.8)]
      z-20
      "
    />
  );
};

export default Planet;